---
slug: myotus/1.20.1/versions/neoforge-1-21-1
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

## Source naming note

The inspected local path is:

```text
/mnt/f/IntelliJ/MyoCertus/MyoCertus_1_21_1
```

Even though the folder is named `MyoCertus_1_21_1`, the actual mod ID, packages, and published coordinates are `myotus`.

## Major additions over 1.20.1

- static convenience methods on `MyotusAPI`
- fluent registrar aliases
- `ITerminalUpgradeCard`
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

## Dev-only sample content

`DiamondUpgradeCardItem` is gated to non-production environments and exists as a development example for the upgrade-card API.
