---
slug: myotus/1.20.1/developers/api-overview
title: API Overview
description: Public API entry points, extension areas, and line-specific limitations in Myotus 1.20.1.
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
- AE2WTLib compatibility types under `de.mari_023.ae2wtlib.api.registration`

## Access patterns

`MyotusAPI` exposes the static convenience entry points:

- `MyotusAPI.get()`
- `MyotusAPI.isInitialized()`
- `MyotusAPI.modRegistrar()`
- `MyotusAPI.configRegistrar()`
- `MyotusAPI.creativeTabRegistrar()`
- `MyotusAPI.network()`
- `MyotusAPI.modIntegrationManager()`

The service interfaces also expose fluent helpers:

- `IMyotusAPI.registerLoadableMod(...)`
- `IMyotusAPI.registerConfigTab(...)`
- `IMyotusAPI.registerCreativeTabItem(...)`
- `IMyotusAPI.registerCreativeTabStack(...)`
- `IModRegistrar.registerLoadableMod(...)`
- `IConfigRegistrar.registerTerminalConfigTab(...)`
- `IConfigRegistrar.registerTerminalConfigTabs(...)`

## Main extension areas

### Optional integrations

Register an annotation marker against a mod ID, then query whether it is active at runtime.

### Item-list integrations

Mark JEI, EMI, or REI integration classes with the loader marker annotations and expose static `@MyotusSubscriber` methods for registration callbacks. See [Item List Integrations](/myotus/1.20.1/developers/item-list-integrations/).

### Terminal config tabs

Register new tabs for the terminal settings UI with `MyoConfigTab`, and gate them per terminal host with `MyoConfigTabVisibility`.

### Runtime integration state

Check whether a registered integration is currently loaded before touching version-specific behavior.

### Datagen conditions

Gate Forge data or JSON output on active Myotus integrations with `MyoModCondition`. See [Datagen Conditions](/myotus/1.20.1/developers/datagen-conditions/).

### Annotation-driven commands

Author Brigadier nodes with `@MyoCommand`, `@MyoExecute`, and `@MyoArgument` instead of hand-building the tree. See [Command System](/myotus/1.20.1/developers/command-system/).

### Terminal upgrade cards and storage

Myotus adds both the `ITerminalUpgradeCard` hook and the menu/storage layer behind it. See [Terminal Upgrade Cards](/myotus/1.20.1/developers/terminal-upgrade-cards/) and [Upgrade Storage](/myotus/1.20.1/developers/upgrade-storage/).

### AE2WTLib terminal registration compatibility

The Forge line provides a compatibility facade for the AE2WTLib `1.21.1` registration API:

- `AddTerminalEvent`
- `WTDefinition`
- `WTDefinitionBuilder`
- `Icon`

This lets addon code register extra AE2WTLib wireless terminals through the 1.21-style `AddTerminalEvent.register(...)` flow while Myotus delegates the actual registration into AE2WTLib `1.20.1`'s `WUTHandler`.

## Example

```java
MyotusAPI.modRegistrar()
        .registerLoadableMod(MyMarker.class, "examplemod", "[1.0.0,)");

if (MyotusAPI.modIntegrationManager().isLoaded("examplemod")) {
    // Safe to run the optional integration branch.
}
```

`loadableMod(...)` accepts a Maven-style version range. If you omit the range, Myotus treats it as `*` and only checks whether the mod is present.

## Compatibility notes

### 1.20.1

- Uses Forge `47.4.17`, Java `17`, and AE2 `15.4.10`.
- `MyoModCondition` is a Forge condition with an `IConditionSerializer`.
- The AE2WTLib compatibility API targets AE2WTLib `15.3.3-forge` and is compile-only by default.
- `WTDefinitionBuilder.upgradeCount(...)` and `noUpgrades()` are chain-compatible, but AE2WTLib `1.20.1` does not persist a per-terminal upgrade count.
- Myotus also exposes a small networking facade in this line.

### 1.21.1

- Uses NeoForge `21.1.219`, Java `21`, and AE2 `19.2.17`.
- Uses the upstream AE2WTLib `19.2.5` API instead of the 1.20 compatibility facade.
- `MyoModCondition` is registered through the NeoForge condition codec path.
- Publishing is set up for Maven/API-jar workflows.

If you target both lines, code to the shared Myotus API first, then branch only for loader-specific condition registration or AE2WTLib implementation differences.

## Recommended next pages

- [Config Tabs](/myotus/1.20.1/developers/config-tabs/)
- [Optional Integrations](/myotus/1.20.1/developers/optional-integrations/)
- [Item List Integrations](/myotus/1.20.1/developers/item-list-integrations/)
- [Command System](/myotus/1.20.1/developers/command-system/)
- [Datagen Conditions](/myotus/1.20.1/developers/datagen-conditions/)
- [Terminal Upgrade Cards](/myotus/1.20.1/developers/terminal-upgrade-cards/)
- [Upgrade Storage](/myotus/1.20.1/developers/upgrade-storage/)
