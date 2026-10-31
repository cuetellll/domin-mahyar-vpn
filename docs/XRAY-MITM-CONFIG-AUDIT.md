# Supplied Xray-MITM configuration audit

The supplied `mitm_domainfronting_v23.json` is now included at `engines/xray/mitm_domainfronting_v23.json`.

## What is present

- Xray minimum version metadata: `26.2.6`.
- Per-machine certificate placeholders: `__MLM_CERT_PATH__` and `__MLM_KEY_PATH__`.
- A `mixed` local proxy inbound on `127.0.0.1:10808`. This is the primary browser/system-proxy endpoint and supports SOCKS/HTTP semantics.
- Two TLS MITM tunnel inbounds on ports `11666` and `11777`.
- Domain routing for Google/Google Video, Fastly, Reddit, CNN, Meta, and related domains.
- DNS rules and custom TLS re-pack outbounds.

MAHYAR VPN now detects the `mixed` inbound as the local SOCKS/HTTP port instead of assuming `20900`.

## What is still required

1. `engines/xray/xray.exe` — an official Windows Xray binary. This is not included in the supplied JSON.
2. `engines/xray/geoip.dat` and `engines/xray/geosite.dat` — the config references `geoip:*` and `geosite:*` databases. Put compatible databases beside `xray.exe`, or adjust the Xray asset paths according to the official release layout.
3. Windows certificate approval — MAHYAR creates a unique local CA and Windows must approve adding it to the current-user Root store.
4. A reachable network path — the config uses `1.1.1.1` DNS-over-HTTP/2 and direct TLS re-origination destinations. The config cannot guarantee availability on every ISP or network.

## Important behavior

The config routes only selected domain families through its MITM/fronting path and sends Iran/private domains direct. It is not a full-tunnel VPN configuration. The user must configure Windows or the browser to use `127.0.0.1:10808`, unless a future MAHYAR system-proxy adapter applies that setting automatically.

A local port opening does not prove that a remote site works. The MAHYAR Xray integration therefore performs a real SOCKS5/TLS probe before marking the session connected.

The original donation addresses and creator metadata remain inside the supplied config because they were part of the user-provided file. They are not credentials used by MAHYAR VPN.
