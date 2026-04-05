---
slug: myotus/1.21.1/versions/neoforge-1-21-1
title: NeoForge 1.21.1
description: Notes specific to the NeoForge-based Myotus 1.21.1 codebase.
sidebar:
  order: 3
---

## Runtime baseline

- Minecraft `1.21.1`
- NeoForge `21.1.219`
- Java `21`
- Applied Energistics 2 `19.2.17`
- GuideME `21.1.6`
- Current local Myotus version `19.0.5`

## Source naming note

The inspected local path is:

```text
/mnt/f/IntelliJ/MyoCertus/MyoCertus_1_21_1
```

Even though the folder is named `MyoCertus_1_21_1`, the actual mod ID, packages, and published coordinates are `myotus`.

The current published-style coordinate declared by the local Gradle metadata is `me.myogoo:myotus:19.0.5`.

## Major additions over 1.20.1

- static convenience methods on `MyotusAPI`
- fluent registrar aliases
- `MyoConfigTabContext` and `MyoConfigTabVisibility`
- `MyoModCondition`
- `ITerminalUpgradeCard`
- `TerminalUpgradeHelper`
- player-persistent terminal upgrade storage
- item registration for upgrade-card examples
- Maven publishing configuration and local repository publishing support

## Build and publishing model

The NeoForge line uses:

- `net.neoforged.moddev`
- `java-library`
- `maven-publish`
- `com.vanniktech.maven.publish`

This is the line that is clearly shaped to be consumed as a published library dependency.

The source tree also includes a dedicated API jar task and generates `neoforge.mods.toml` from `src/main/templates`.

The publication target is the local `repo/` directory in the project root. The `apiJar` task exists, but the inspected build script does not wire it into the published Maven artifacts.

## Dev-only sample content

`DiamondUpgradeCardItem` is gated to non-production environments and exists as a development example for the upgrade-card API.
