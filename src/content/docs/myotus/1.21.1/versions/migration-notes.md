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

### New in 1.21.1

- static convenience accessors on `MyotusAPI`
- fluent aliases on `IMyotusAPI`, `IModRegistrar`, and `IConfigRegistrar`
- `MyoConfigTabContext` and `MyoConfigTabVisibility`
- `MyoModCondition`
- `ITerminalUpgradeCard`
- `TerminalUpgradeHelper`

### Still conceptually shared

- config-tab registration
- optional integration registration
- runtime integration queries

## User-facing differences

### Removed or changed

- `activeTabSorting` only exists in the inspected `1.20.1` config spec

### Added

- `1.21.1` adds a toggle key for the sub side panel
- `1.21.1` adds upgrade-card slot and storage infrastructure
- `1.21.1` adds a second terminal config gate path via `MyoConfigTab.visibleWhen(...)`

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
3. Treat upgrade-card functionality as `1.21.1`-only unless you backport it yourself.
4. Re-check config and keybind docs instead of assuming parity between lines.
