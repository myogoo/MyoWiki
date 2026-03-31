---
slug: myotus/1.20.1/player/configuration
title: Configuration
description: Client config keys and keybindings exposed by Myotus in the Forge 1.20.1 line.
sidebar:
  order: 2
---

## Config file

Myotus registers a client config file named:

```text
myotus-client.toml
```

The config spec lives in `MyotusClientConfig` and is registered during mod initialization.

## Client options

| Key | Default | Meaning | Notes |
| --- | --- | --- | --- |
| `tab.activeTabSorting` | `true` | Sort the active tab first in the inventory screen | Present in the config spec, but the checkbox wiring is currently commented out in `MyotusConfigScreen` |
| `tab.openSidePanel` | `false` | Open the side panel automatically when the terminal opens | Read by `MEStorageScreenMixin` and updated by the side-panel toggle button |

## Keybindings

| Action | Default key | Where it works |
| --- | --- | --- |
| Open terminal settings | `,` | Only while an AE2 terminal screen is open |

The keybinding uses a terminal-specific conflict context, so it will not trigger outside `MEStorageScreen`.

## What the settings UI actually exposes

The Myotus config tab is not a full mirror of every TOML key.

- The tab currently exposes the keybinding editor for `Open Terminal Setting Screen`.
- The tab title is localized as `Myotus Setting`.
- The left toolbar in terminal settings includes a bug-report button that copies the issue URL to the clipboard.
- The AE2 settings tab remains available alongside the Myotus tab.

## Notes for pack maintainers

- `tab.openSidePanel` controls whether the floating side panel starts open when a terminal screen appears.
- `tab.activeTabSorting` exists in the config spec, but there is no active checkbox in the current screen code.
- Key names are localized through `assets/myotus/lang/en_us.json`.
