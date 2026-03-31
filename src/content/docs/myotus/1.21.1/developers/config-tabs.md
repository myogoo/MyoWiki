---
slug: myotus/1.21.1/developers/config-tabs
title: Config Tabs
description: How to register terminal configuration tabs with Myotus and how the backing style path is used.
sidebar:
  order: 2
---

`MyoConfigTab` is the record used to describe a tab in the Myotus terminal settings UI.

## What a config tab contains

- a title component
- either a texture blitter or an `ItemStack` icon
- a `stylePath` pointing to the active screen style JSON
- a `MyoConfigTabScreen` implementation used to build the tab UI
- a `MyoConfigTabVisibility` predicate used to decide whether the tab should render for the current terminal

## Example

```java
MyotusAPI.configRegistrar().registerTerminalConfigTab(new MyoConfigTab(
        Component.literal("Example"),
        Icon.COG,
        "example_terminal.json",
        new ExampleConfigScreen())
        .visibleWhen(context -> context.isItemHost()));
```

## Icon options

`MyoConfigTab` supports multiple icon shapes:

- AE2 `Icon`
- Myotus `MyoIcon`
- plain `ItemStack`

## Visibility helpers

`1.21.1` adds a first-class visibility layer:

- `MyoConfigTabVisibility.ALWAYS_VISIBLE`
- `MyoConfigTab.visibleWhen(...)`
- `MyoConfigTabContext.from(menu)`

`MyoConfigTabContext` lets a visibility check inspect the current terminal host.

Useful helpers include:

- `isItemHost()`
- `getHostItemStack()`
- `isHostItem(Item)`
- `isHostItem(ResourceLocation)`
- `isHostItemFrom(String namespace)`

That means addon tabs can be shown only for specific portable terminals or host item families without manually duplicating host-inspection code in the UI layer.

## Style path

The `stylePath` should point at the relevant screen style JSON. In the inspected source trees, Myotus itself registers a tab backed by:

```text
assets/ae2/screens/config/myotus.json
```

## What Myotus registers for itself

Both lines call `MyotusConfigTab.initialize()` during common setup and register the built-in terminal settings tab with:

- translated title text
- the Myotus icon set
- `myotus.json` as the style path
- `MyotusConfigScreen` as the screen implementation

## Registrar helpers

`IConfigRegistrar` in `1.21.1` also adds fluent helpers:

- `registerTerminalConfigTab(tab)`
- `registerTerminalConfigTabs(iterable)`

Those helpers are not present in the older `1.20.1` line.
