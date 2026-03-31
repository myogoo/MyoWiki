---
slug: myotus/1.21.1/developers/api-overview
title: API Overview
description: Public API entry points, extension areas, and line-by-line differences in Myotus.
sidebar:
  order: 1
---

## Core entry points

The Myotus public surface centers on:

- `MyotusAPI`
- `IMyotusAPI`
- `IModRegistrar`
- `IConfigRegistrar`
- `IModIntegrationManager`
- `MyoConfigTab`
- `MyoConfigTabContext`
- `MyoConfigTabVisibility`
- `MyoModCondition`
- `ITerminalUpgradeCard`
- `TerminalUpgradeHelper`
- `TerminalUpgradeStorageKey`
- `SafeClass`

## Access Patterns

`MyotusAPI` exposes the static convenience entry points:

- `MyotusAPI.get()`
- `MyotusAPI.isInitialized()`
- `MyotusAPI.modRegistrar()`
- `MyotusAPI.configRegistrar()`
- `MyotusAPI.modIntegrationManager()`

The fluent registration helpers live on the service interfaces instead:

- `IMyotusAPI.registerLoadableMod(...)`
- `IMyotusAPI.registerConfigTab(...)`
- `IModRegistrar.registerLoadableMod(...)`
- `IConfigRegistrar.registerTerminalConfigTab(...)`
- `IConfigRegistrar.registerTerminalConfigTabs(...)`

## Main extension areas

### Optional integrations

Register an annotation marker against a mod ID, then query whether it is active at runtime.

### Item-list integrations

Use the item-list annotation set plus `@MyotusSubscriber` to organize JEI, EMI, and REI registration code behind Myotus-managed loader checks. See [Item List Integrations](/myotus/1.21.1/developers/item-list-integrations/).

### Terminal config tabs

Register new tabs for the terminal settings UI with `MyoConfigTab`, and gate them per terminal host with `MyoConfigTabVisibility`.

### Runtime integration state

Check whether a registered integration is currently loaded before touching version-specific behavior.

### Datagen conditions

Gate NeoForge data or JSON output on active Myotus integrations with `MyoModCondition`. See [Datagen Conditions](/myotus/1.21.1/developers/datagen-conditions/).

### Annotation-driven commands

Author Brigadier nodes with `@MyoCommand`, `@MyoExecute`, and `@MyoArgument` instead of hand-building the tree. See [Command System](/myotus/1.21.1/developers/command-system/).

### Terminal upgrade cards and storage

On `1.21.1`, Myotus adds both the `ITerminalUpgradeCard` hook and the menu/storage layer behind it. See [Terminal Upgrade Cards](/myotus/1.21.1/developers/terminal-upgrade-cards/) and [Upgrade Storage](/myotus/1.21.1/developers/upgrade-storage/).

## Example

```java
MyotusAPI.modRegistrar()
        .registerLoadableMod(MyMarker.class, "examplemod", "[1.0.0,)");

if (MyotusAPI.modIntegrationManager().isLoaded("examplemod")) {
    // Safe to run the optional integration branch.
}
```

## Compatibility notes

### 1.20.1

- The API surface is smaller and less fluent.
- `MyotusAPI.get()` is the main stable entry point.
- Registrar interfaces expose the core `loadableMod()` and `terminalConfigTab()` methods.
- `MyoConfigTab` does not expose per-host visibility rules.
- There is no `MyoModCondition` or terminal upgrade API in that line.

### 1.21.1

- Adds static convenience methods directly on `MyotusAPI`
- Adds fluent aliases on `IMyotusAPI`, `IModRegistrar`, and `IConfigRegistrar`
- Keeps `MyotusAPI.isInitialized()` alongside the other static accessors
- Adds `MyoConfigTabContext`, `MyoConfigTabVisibility`, and `visibleWhen()`
- Adds `MyoModCondition` for data conditions
- Adds `ITerminalUpgradeCard`, `TerminalUpgradeHelper`, and persistent upgrade-slot infrastructure

If you target both lines, code to the common behavior first, then branch only where `1.21.1` adds extra capabilities.

## Recommended next pages

- [Config Tabs](/myotus/1.21.1/developers/config-tabs/)
- [Optional Integrations](/myotus/1.21.1/developers/optional-integrations/)
- [Item List Integrations](/myotus/1.21.1/developers/item-list-integrations/)
- [Command System](/myotus/1.21.1/developers/command-system/)
- [Datagen Conditions](/myotus/1.21.1/developers/datagen-conditions/)
- [Terminal Upgrade Cards](/myotus/1.21.1/developers/terminal-upgrade-cards/)
- [Upgrade Storage](/myotus/1.21.1/developers/upgrade-storage/)
