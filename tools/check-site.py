#!/usr/bin/env python3
"""Pre-publish guard for the GitHub Pages site in docs/.

Fails (exit 1) when something would leak or break on the public site:
  * any image under docs/ still carries EXIF metadata (GPS, device, timestamps)
  * a file under private/ (positioning brief, evidence ledger) is tracked by git
  * an email address appears in the site's own HTML/JSON/CSS/JS
  * resume-data.json is invalid or references a local asset that doesn't exist
  * an image exceeds the per-file budget, or docs/ exceeds the total budget

Run locally:  pip install pillow && python tools/check-site.py
"""
import json
import pathlib
import re
import subprocess
import sys

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"}
MAX_IMAGE_BYTES = 1_200_000
MAX_DOCS_BYTES = 30_000_000
EMAIL = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}")

errors = []


def check_images():
    for path in sorted(DOCS.rglob("*")):
        if path.suffix.lower() not in IMAGE_EXT:
            continue
        rel = path.relative_to(ROOT)
        with Image.open(path) as im:
            exif = im.getexif()
            if len(exif) or "exif" in im.info:
                gps = " (includes GPS)" if exif.get_ifd(0x8825) else ""
                errors.append(f"{rel}: EXIF metadata present{gps}; re-encode without it")
        if path.stat().st_size > MAX_IMAGE_BYTES:
            errors.append(f"{rel}: {path.stat().st_size:,} bytes exceeds {MAX_IMAGE_BYTES:,}")


def check_private_not_tracked():
    try:
        tracked = subprocess.run(["git", "ls-files", "private"], cwd=ROOT,
                                 capture_output=True, text=True, check=True).stdout.split()
    except (OSError, subprocess.CalledProcessError):
        return
    for f in tracked:
        errors.append(f"{f}: private material is tracked by git; remove it from the index")


def check_no_emails():
    own = [p for p in DOCS.rglob("*") if p.suffix in {".html", ".json", ".css", ".js", ".svg"}
           and "vendor" not in p.parts]
    for path in own:
        for m in EMAIL.finditer(path.read_text(encoding="utf-8", errors="ignore")):
            # Font/vector files and version pins like "x@2.0.0" are not addresses.
            if re.search(r"@\d", m.group(0)):
                continue
            errors.append(f"{path.relative_to(ROOT)}: email address '{m.group(0)}' in public site")


def check_data():
    data_path = DOCS / "data" / "resume-data.json"
    try:
        data = json.loads(data_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"{data_path.relative_to(ROOT)}: {exc}")
        return
    refs = []

    def walk(node):
        if isinstance(node, dict):
            for k, v in node.items():
                if k in {"src", "logo", "asset", "photo", "photoFallback"} and isinstance(v, str):
                    refs.append(v)
                walk(v)
        elif isinstance(node, list):
            for v in node:
                walk(v)

    walk(data)
    for ref in refs:
        if ref.startswith(("http://", "https://")):
            continue
        if not (DOCS / ref).is_file():
            errors.append(f"resume-data.json references missing asset: {ref}")


def check_budget():
    total = sum(p.stat().st_size for p in DOCS.rglob("*") if p.is_file())
    if total > MAX_DOCS_BYTES:
        errors.append(f"docs/ is {total:,} bytes; budget is {MAX_DOCS_BYTES:,}")
    return total


if __name__ == "__main__":
    check_images()
    check_private_not_tracked()
    check_no_emails()
    check_data()
    total = check_budget()
    if errors:
        print("site-check FAILED:")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)
    print(f"site-check passed ({total / 1e6:.1f} MB in docs/)")
