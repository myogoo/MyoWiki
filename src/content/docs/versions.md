---
title: Versions & downloads
description: Separate Myotus release downloads from source-build coordinates for each Minecraft version.
---

Choose the **Minecraft version and loader first**. Myotus version numbers do not make JARs interchangeable across Minecraft versions.

## Minecraft 1.20.1

**Forge · Java 17**

[Download Myotus 15.1.0](https://github.com/mc-myo-s-mod/Myotus/releases/tag/v1.20.1-15.1.0)

Use the normal runtime JAR from the release assets. The 15.x API is the Forge line; it also exposes the Forge-specific networking and AE2WTLib registration APIs.

## Minecraft 1.21.1

**NeoForge · Java 21**

[Download Myotus 19.1.1](https://github.com/mc-myo-s-mod/Myotus/releases/tag/v1.21.1-19.1.1)

Use the 19.x line for this Minecraft version. Development work on terminal modules is separate from the published API snapshot documented here.

## Minecraft 26.1.2

**NeoForge · Java 25**

[View the 26.1.2 release](https://github.com/mc-myo-s-mod/Myotus/releases/tag/v26.1.2-26.0.0)

:::caution[Release tag and source version differ]
The public release tag is `v26.1.2-26.0.0`, while the documented source configures `26.1.0` Maven coordinates. These are intentionally shown separately. The `26.1.0` examples in this wiki are local/source-build examples, not a claim that this version is available from a remote Maven repository.
:::

## Source build matrix

These values are from the [documented source snapshot](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51), not a live compatibility feed.

| Minecraft | Loader in source | AE2 in source | Myotus coordinates |
| --- | --- | --- | --- |
| 1.20.1 | Forge 47.4.17 | 15.4.10 | `me.myogoo:myotus:15.1.0` |
| 1.21.1 | NeoForge 21.1.219 | 19.2.17 | `me.myogoo:myotus:19.1.1` |
| 26.1.2 | NeoForge 26.1.2.97 | 26.1.10-beta | `me.myogoo:myotus:26.1.0` |

For the latest published files, consult [all GitHub releases](https://github.com/mc-myo-s-mod/Myotus/releases). Release links were checked on **October 4, 2026**. Remote Maven artifact availability has not been verified by this wiki.

## Porting between versions

Read the [API differences table](/architecture/#version-differences-that-affect-addons). Minecraft types, recipes, conditions, and networking differ between loader lines. Compile and test against each actual target.
