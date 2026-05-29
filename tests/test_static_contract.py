from __future__ import annotations

import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class StaticContractTests(unittest.TestCase):
    def test_public_entrypoints_exist(self) -> None:
        required = [
            "README.md",
            "coach/START_HERE.md",
            "coach/rules.md",
            "landing/index.html",
            "landing/styles.css",
            "landing/app.js",
            "llms.txt",
            "robots.txt",
            "sitemap.xml",
        ]
        for path in required:
            with self.subTest(path=path):
                self.assertTrue((ROOT / path).is_file(), path)

    def test_landing_page_references_existing_local_assets(self) -> None:
        html = (ROOT / "landing/index.html").read_text(encoding="utf-8")
        for ref in re.findall(r'(?:src|href)="([^"]+)"', html):
            if ref.startswith(("/", "mailto:", "http://", "https://")) or ref.startswith("#"):
                continue
            ref = ref.split("#", 1)[0].split("?", 1)[0]
            with self.subTest(ref=ref):
                self.assertTrue((ROOT / "landing" / ref).exists(), ref)

    def test_safety_boundary_is_documented(self) -> None:
        text = (ROOT / "reference/safety-boundaries.md").read_text(encoding="utf-8").lower()
        self.assertIn("not therapy", text)
        self.assertIn("crisis", text)


if __name__ == "__main__":
    unittest.main()
