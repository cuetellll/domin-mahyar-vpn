# Xray-MITM real-connection runbook

The MAHYAR VPN Xray-MITM adapter is now implemented, but it requires two external assets that were absent from the original repository clone:

```text
engines/xray/xray.exe
engines/xray/mitm_domainfronting_v23.json
```

On Windows, the app will create a per-user CA by running `xray tls cert -ca`, ask Windows to trust it through the current-user Root store, replace certificate placeholders in the supplied JSON, and launch Xray with `run -c <runtime-config>`. It then checks the local SOCKS port at `127.0.0.1:20900`.

A listening port alone is deliberately not reported as a verified internet connection. The config must have a working outbound/fronting mapping and the operator must test it from the target network. If the config is absent, invalid, or its endpoints are blocked, the app reports that condition instead of pretending success.

The original repository’s `mitm-manager.js` confirms this same contract: it generated a machine-specific certificate, trusted it only after Windows confirmation, substituted paths into an external MITM config, and delegated transport to Xray. It did not contain the Xray binary or the MITM JSON asset.
