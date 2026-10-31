# GitHub Actions Xray download

The repository intentionally contains only the supplied MITM JSON config. The workflow downloads the current official 64-bit Windows Xray release at build time from:

```text
https://github.com/XTLS/Xray-core/releases
```

It looks for an asset named like `Xray-windows-64.zip`, verifies the asset digest when available, extracts `xray.exe`, `geoip.dat`, and `geosite.dat`, and places them under `engines/xray/` before electron-builder runs.

This avoids committing files larger than GitHub's normal upload limit. It also means a future Xray release can change behavior; pin a specific release tag and checksum in the workflow if you need long-term reproducibility rather than the latest official release.
