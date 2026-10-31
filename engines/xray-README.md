# Xray-MITM assets

The supplied MITM configuration is stored at:

```text
engines/xray/mitm_domainfronting_v23.json
```

It expects these additional files:

```text
engines/xray/xray.exe
engines/xray/geoip.dat
engines/xray/geosite.dat
```

The configuration's primary local endpoint is `127.0.0.1:10808` with protocol `mixed` (SOCKS/HTTP). The MAHYAR integration detects that port from the JSON instead of hardcoding a different port.

MAHYAR VPN creates the per-machine certificate and key at runtime and replaces `__MLM_CERT_PATH__` and `__MLM_KEY_PATH__`. It never ships a shared private key.
