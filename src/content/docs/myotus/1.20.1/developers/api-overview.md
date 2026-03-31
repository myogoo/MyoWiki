---
slug: myotus/1.20.1/developers/api-overview
title: API Overview
description: Public API entry points, extension areas, and line-specific limitations in Myotus 1.20.1.
sidebar:
  order: 1
---

## Core entry points

The Myotus public surface centers on:

- `IMyotusAPI`
- `MyotusAPI`
- `IModRegistrar`
- `IConfigRegistrar`
- `IModIntegrationManager`
- `MyoConfigTab`
- `SafeClass`

## Main extension areas

### Optional integrations

Register an annotation marker against a mod ID, then query whether it is active at runtime.

### Item-list integrations

Mark JEI, EMI, or REI integration classes with the loader marker annotations and expose static `@MyotusSubscriber` methods for registration callbacks. See [Item List Integrations](/myotus/1.20.1/developers/item-list-integrations/).

### Terminal config tabs

Register new tabs for the terminal settings UI with `MyoConfigTab`.

### Runtime integration state

Check whether a registered integration is currently loaded before touching version-specific behavior.

### Annotation-driven commands

Author Brigadier nodes with `@MyoCommand`, `@MyoExecute`, and `@MyoArgument` instead of hand-building the tree. See [Command System](/myotus/1.20.1/developers/command-system/).

## Example

```java
MyotusAPI.get().modRegistrar().loadableMod(MyMarker.class, "examplemod", "[1.0.0,)");

if (MyotusAPI.get().modIntegrationManager().isLoaded(MyMarker.class)) {
    // Safe to run the optional integration branch.
}
```

`loadableMod(...)` accepts a Maven-style version range. If you omit the range, Myotus treats it as `*` and only checks whether the mod is present.

## Compatibility notes

### 1.20.1

- `MyotusAPI.get()` is the main stable entry point.
- Registrar interfaces expose the core `loadableMod()` and `terminalConfigTab()` methods.
- `MyoConfigTab` does not yet expose visibility predicates or tab-context helpers.
- There is no `MyoModCondition`, `MyotusAPI.isInitialized()`, or terminal upgrade card API in this line.

### 1.21.1

- Adds convenience methods directly on `MyotusAPI`
- Adds fluent aliases such as `registerLoadableMod()` and `registerTerminalConfigTab()`
- Adds `MyotusAPI.isInitialized()`
- Adds `MyoConfigTabContext`, `MyoConfigTabVisibility`, and `visibleWhen()`
- Adds `MyoModCondition` for NeoForge data conditions
- Adds `ITerminalUpgradeCard` and persistent upgrade-slot infrastructure

If you target both lines, code to the common behavior first, then branch only where `1.21.1` adds extra capabilities.

## Recommended next pages

- [Config Tabs](/myotus/1.20.1/developers/config-tabs/)
- [Optional Integrations](/myotus/1.20.1/developers/optional-integrations/)
- [Item List Integrations](/myotus/1.20.1/developers/item-list-integrations/)
- [Command System](/myotus/1.20.1/developers/command-system/)
- [Terminal Upgrade Cards](/myotus/1.20.1/developers/terminal-upgrade-cards/)
- [Upgrade Storage](/myotus/1.20.1/developers/upgrade-storage/)
