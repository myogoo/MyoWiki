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
/mnt/f/IntelliJ/Minecraft/Myotus/Myotus_1_21_1
```

The actual mod ID, packages, and published coordinates are `myotus`.

## Main differences from 1.20.1

- NeoForge `21.1.219` and Java `21`
- NeoForge condition codec registration
- upstream AE2WTLib API module behavior
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
