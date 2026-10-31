# Windows release asset checklist

Before running GitHub Actions, extract the official Xray Windows ZIP and place these files in the repository:

```text
engines/xray/xray.exe
engines/xray/geoip.dat
engines/xray/geosite.dat
```

The supplied MITM config is already present at:

```text
engines/xray/mitm_domainfronting_v23.json
```

No `.crt` or `.key` file should be committed. MAHYAR creates a unique certificate and private key on each Windows machine and asks the user to approve the certificate trust operation.

The app uses the config's `mixed` inbound at `127.0.0.1:10808`. After a real TLS probe succeeds, it applies that address as the Windows user proxy and restores the previous user proxy settings when disconnected or shut down.

The config is not a full-tunnel VPN. It applies only to traffic that uses the Windows proxy and only selected routed domains. It also references external DNS and routing databases, so the network must be able to reach the configured endpoints.
