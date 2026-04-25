---
slug: myotus/1.20.1/versions/version-matrix
title: Version Matrix
description: Quick side-by-side comparison of the Myotus 1.20.1 and 1.21.1 lines.
sidebar:
  order: 1
---

| Area | 1.20.1 | 1.21.1 |
| --- | --- | --- |
| Source path | `/mnt/f/IntelliJ/Minecraft/Myotus/Myotus_1_20_1` | `/mnt/f/IntelliJ/Minecraft/Myotus/Myotus_1_21_1` |
| Myotus version | `15.0.7` | `19.0.9` |
| Loader | Forge `47.4.17` | NeoForge `21.1.219` |
| Java | `17` | `21` |
| Minecraft | `1.20.1` | `1.21.1` |
| AE2 | `15.4.10` | `19.2.17` |
| GuideME | `20.1.11` | `21.1.6` |
| Optional AE2WTLib dependency | `15.3.3-forge` compile-only compatibility target | `19.2.5` runtime-enabled dev target |
| Config model | `ForgeConfigSpec` | `ModConfigSpec` |
| Config keys | `activeTabSorting`, `openSidePanel` | `openSidePanel` |
| Extra keybind | None | Toggle sub side panel |
| Datagen condition | Forge `ICondition` serializer | NeoForge condition codec |
| Upgrade card API | Yes | Yes |
| AE2WTLib terminal registration | Myotus compatibility facade for `AddTerminalEvent` | Upstream AE2WTLib API |
| Publishing setup | Basic mod build | Maven publish + API jar workflow |

## High-level guidance

- Choose **`1.20.1`** if you are maintaining a Forge-based AE2 addon for the `1.20.1` ecosystem.
- Choose **`1.21.1`** if you want the newer NeoForge toolchain, upstream AE2WTLib API behavior, and the publishing/API-jar workflow.
- Read [Migration Notes](/myotus/1.20.1/versions/migration-notes/) before trying to keep both lines in sync.
