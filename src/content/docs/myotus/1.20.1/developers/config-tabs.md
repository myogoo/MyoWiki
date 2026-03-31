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

## Example

```java
MyotusAPI.get().configRegistrar().terminalConfigTab(new MyoConfigTab(
        Component.literal("Example"),
        Icon.COG,
        "example_terminal.json",
        new ExampleConfigScreen()));
```

## Icon options

`MyoConfigTab` supports multiple icon shapes:

- AE2 `Icon`
- Myotus `MyoIcon`
- plain `ItemStack`

## What this line does not include

The Forge line does not include:

- `MyoConfigTabVisibility`
- `MyoConfigTabContext`
- the `visibleWhen()` copy helper
- bulk registration helpers on `IConfigRegistrar`

If you need conditional visibility on `1.20.1`, gate the registration yourself before calling `terminalConfigTab(tab)`.

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
