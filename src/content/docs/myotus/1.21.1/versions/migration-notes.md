---
slug: myotus/1.21.1/versions/migration-notes
title: Migration Notes
description: Loader, API, config, and publishing differences between Myotus 1.20.1 and 1.21.1.
sidebar:
  order: 4
---

## Loader and Java changes

| Area | 1.20.1 | 1.21.1 |
| --- | --- | --- |
| Loader stack | Forge | NeoForge |
| Java target | 17 | 21 |
| Mod metadata | `mods.toml` | generated `neoforge.mods.toml` from templates |

## Public API changes

### Shared in the current source trees

- static convenience accessors on `MyotusAPI`
- fluent aliases on `IMyotusAPI`, `IModRegistrar`, and `IConfigRegistrar`
- `MyoConfigTabContext` and `MyoConfigTabVisibility`
- `MyoModCondition`
- `ITerminalUpgradeCard`
- `TerminalUpgradeHelper`

### Line-specific differences

- `1.20.1` implements `MyoModCondition` through Forge's `IConditionSerializer`; `1.21.1` uses NeoForge condition codecs.
- `1.20.1` includes a Myotus-owned AE2WTLib `AddTerminalEvent` compatibility facade; `1.21.1` relies on AE2WTLib's upstream API module.
- `1.20.1` exposes the Myotus networking facade; it is not present in the inspected `1.21.1` API package.

## User-facing differences

### Removed or changed

- `activeTabSorting` only exists in the inspected `1.20.1` config spec

### Added

- `1.21.1` adds a toggle key for the sub side panel
- both maintained lines now have upgrade-card slot and storage infrastructure

## Build and publishing differences

### 1.20.1

- ForgeGradle mod build
- geared toward direct mod development

### 1.21.1

- NeoForge moddev toolchain
- Maven publishing support
- API jar generation
- local repository publishing path

## Migration strategy

1. Move loader and Java assumptions first.
2. Keep shared API usage in the registrar/runtime-manager layer where possible.
3. Treat `MyoModCondition` registration as loader-specific.
4. Treat AE2WTLib registration as API-compatible but implementation-specific.
5. Re-check config and keybind docs instead of assuming parity between lines.
