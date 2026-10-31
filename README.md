# MAHYAR VPN

MAHYAR VPN is an independent Windows desktop client architecture focused on domain-fronted proxy engines. It is intentionally honest about engine availability: this repository does not bundle third-party binaries, credentials, server lists, certificates, or upstream MITM assets.

## Run

```bash
npm install
npm start
```

Place legally obtained engine binaries in `engines/lantern/lantern.exe` or `engines/geph/geph5-client.exe`. MAHYAR VPN detects them at launch. The Geph integration requires a valid official Geph configuration; the generated placeholder is deliberately not runnable.

## Build Windows artifacts

Run `npm run build` on Windows or in a Windows CI runner. The project produces an NSIS installer and portable build. The current sandbox is Linux, so a Windows executable cannot be produced or tested here.

## Scope and attribution

The implementation is independent and carries only lifecycle and analysis-derived ideas, not the unrelated MLMVPN application. See `docs/DOMAIN-FRONTING-ANALYSIS.md` and `MLMVPN-LICENSE.txt`. The product must retain the required attribution: “Based on MLMVPN for Windows” with the upstream link, while clearly stating that MLMVPN did not produce or support MAHYAR VPN.

## Build a Windows `.exe` with GitHub Actions

Push this repository to GitHub, open the **Actions** tab, choose **Build MAHYAR VPN for Windows**, click **Run workflow**, and wait for the `package` job to finish. The workflow runs on `windows-latest`, executes the tests first, then uploads both the NSIS installer and portable `.exe` under the workflow run's **Artifacts** section.

The workflow does not download or bundle Lantern, Geph, Xray, Psiphon, Tor, certificates, credentials, or server lists. If you add legally redistributable engine files to `engines/`, they will be packaged according to the project configuration; otherwise the resulting app will clearly show that the engine binary is missing.

## Large Xray files are downloaded in Actions

Do not commit `xray.exe`, `geoip.dat`, or `geosite.dat` to this repository. The Windows workflow downloads the latest official `Xray-windows-64` release from `XTLS/Xray-core`, verifies the release SHA-256 digest when GitHub publishes one, extracts those three files into `engines/xray/`, checks the Xray version, and only then packages the app. The repository therefore stays below GitHub's large-file upload limit while the build remains reproducible from the official source.
