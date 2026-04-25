---
slug: myotus/1.20.1/developers/config-tabs
title: Config Tabs
description: How to register terminal configuration tabs with Myotus in Forge 1.20.1.
sidebar:
  order: 2
---

`MyoConfigTab` is the record used to describe a tab in the Myotus terminal settings UI.

## What this line exposes

In `1.20.1`, a config tab definition contains:

- a title component
- either a texture blitter or an `ItemStack` icon
- a `stylePath` pointing at the active screen style JSON
- a `MyoConfigTabScreen` implementation used to build the tab UI
- a `MyoConfigTabVisibility` predicate that decides whether the tab is visible for the currently opened terminal

## Example

```java
MyotusAPI.configRegistrar().registerTerminalConfigTab(new MyoConfigTab(
        Component.literal("Example"),
        Icon.COG,
        "example_terminal.json",
        new ExampleConfigScreen())
        .visibleWhen(context -> context.menu() != null));
```

## Icon options

`MyoConfigTab` supports multiple icon shapes:

- AE2 `Icon`
- Myotus `MyoIcon`
- plain `ItemStack`

## Visibility

`MyoConfigTab.visibleWhen(...)` returns a copy of the tab with a new predicate attached.

The predicate receives a `MyoConfigTabContext`, which is built from the current `MEStorageMenu`. Use this when a tab should only appear for specific terminal hosts, item terminals, or optional integration states.

`IConfigRegistrar` also exposes bulk and fluent helpers:

- `registerTerminalConfigTab(tab)`
- `registerTerminalConfigTabs(tabs)`

## Style path

The `stylePath` should point at the relevant screen style JSON. In the inspected source tree, Myotus itself registers a tab backed by:

```text
assets/ae2/screens/config/myotus.json
```

## What Myotus registers for itself

`MyotusConfigTab.initialize()` runs during common setup and registers the built-in terminal settings tab with:

- translated title text
- the Myotus icon set
- `myotus.json` as the style path
- `MyotusConfigScreen` as the screen implementation

The screen currently exposes the keybinding editor, while the bug-report button lives in the terminal settings toolbar.
