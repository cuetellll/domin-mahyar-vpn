# Domain Fronting extraction record

## Findings

The upstream repository contains no `core/` engine binaries in Git. Its own build documentation says the missing `core/` directory is populated separately and includes approximately 450 MB of third-party software. Therefore an independently built app cannot claim a working tunnel from the repository clone alone.

There are three relevant upstream paths:

1. **Lantern integration.** `lantern-manager.js` launches an external `lantern.exe` with `-socks`, `-http`, `-configdir`, `-deviceid`, and `-proxyall=false`. It expects a separately built Lantern/Flashlight binary. The manager distinguishes a listening SOCKS port from a proven data path and performs full TLS/SOCKS probes rather than trusting a successful handshake alone. `docs/LANTERN-BUILD.md` explains that the upstream core is `getlantern/flashlight`, with a custom `cmd/lanternproxy` entry point and required patches. The document identifies GPL-3.0 for Flashlight and states that the binary is not in the repository.

2. **Geph integration.** `geph-manager.js` launches `geph5-client.exe` with `--config <file>`, talks to a line-delimited JSON-RPC control port, and uses the official Geph broker configuration. `docs/GEPH-BUILD.md` identifies the official Geph source, the expected client binary, the domain-fronting broker list, registration flow, RPC methods, and MPL-2.0 for the Geph source. The binary and account data are not in the repository.

3. **The “Domain Fronting” panel.** `public/components/fronting.js` calls `mitm-manager.js` and then starts Xray through the V2Ray route. `mitm-manager.js` expects a missing `core/xray.exe` and missing `core/mitm/mitm_domainfronting_v23.json`. It creates a per-machine CA with Xray, asks the user to trust it through Windows, substitutes certificate paths into the config, and exposes the local MITM config. This is a separate local TLS interception design, not interchangeable with Lantern or Geph.

`front-guard.js` is supporting lifecycle code. It monitors SOCKS engines, checks the SOCKS greeting, tracks repeated misses, and can fail closed/restart under a live tunnel. It is not itself a Domain Fronting protocol implementation.

## Independent architecture

MAHYAR VPN uses a small Electron main process, a context-isolated preload bridge, a renderer UI, a settings store, and an engine manager. The engine manager owns child-process lifecycle, local port detection, error reporting, and cleanup. The UI never treats “process started” or “port listening” as equivalent to verified end-to-end connectivity.

The present build intentionally stops at a real local SOCKS listener because no upstream engines or legally packaged test configuration are available in this environment. Adding official engine files enables the launch path; a production release should add the engine-specific full TLS/data-path probes, signed binaries, complete licenses/notices, and Windows-only packaging tests.

## Licenses and attribution

The upstream repository uses a custom MLMVPN Attribution License and requires product, source, and announcement attribution. The unmodified license is retained as `MLMVPN-LICENSE.txt`. Third-party engines retain their own licenses and must be redistributed only after separate compliance review.
