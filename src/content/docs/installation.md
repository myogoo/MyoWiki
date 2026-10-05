---
title: Install Myotus
description: Choose the correct Myotus build for your Minecraft version and mod loader.
---

Myotus is a library for Applied Energistics 2 addons. If another mod asks for Myotus, install the matching runtime mod alongside that addon and AE2.

## Choose your Minecraft version

| Minecraft | Loader | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | NeoForge | 21 |
| 26.1.2 | NeoForge | 25 |

The three builds are not interchangeable. See [versions and downloads](/versions/) for links to the corresponding GitHub releases.

## Add the runtime mod

1. Close Minecraft and back up your instance before replacing an existing mod.
2. Download the **normal Myotus JAR** for your Minecraft version. Do not use a `-sources.jar`, `-api.jar`, or `-dev.jar` as the runtime mod.
3. Put the JAR in your instance's `mods` folder. Keep only one Myotus runtime version in that instance.
4. Install the matching AE2 version and any dependencies required by your addons.
5. Launch the instance and check the mod list for Myotus.

:::tip[Using a modpack?]
Keep the versions selected by the pack unless you are deliberately testing an update. A newer Myotus build is not automatically compatible with every older addon.
:::

## If loading fails

Check the first relevant error in `logs/latest.log` or the generated crash report. Include the Minecraft version, loader version, Myotus filename, AE2 version, and involved addon versions in your [issue report](https://github.com/mc-myo-s-mod/Myotus/issues).

Common things to check:

- A Forge build installed in NeoForge, or a build for another Minecraft version.
- Two Myotus runtime JARs in the same instance.
- An API-only artifact installed as a mod.
- An addon requesting a different Myotus or AE2 version range.

## Developing an addon instead?

The [addon quickstart](/quickstart/) explains the compile-only API classifier and the normal runtime dependency.
