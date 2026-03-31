---
slug: myotus/1.21.1/player/configuration
title: Configuration
description: Client config keys and keybindings exposed by Myotus in each supported version line.
sidebar:
  order: 2
---

## Config file

Both lines register a client config file named:

```text
myotus-client.toml
```

## Client options

| Key | 1.20.1 | 1.21.1 | Default | Meaning |
| --- | --- | --- | --- | --- |
| `tab.activeTabSorting` | Yes | No | `true` | Sort the active tab first in the inventory screen |
| `tab.openSidePanel` | Yes | Yes | `false` | Open the side panel automatically when the terminal opens |

## Keybindings

| Action | 1.20.1 | 1.21.1 | Default key |
| --- | --- | --- | --- |
| Open terminal settings | Yes | Yes | `,` |
| Toggle sub side panel | No | Yes | `.` |

Both keybindings are registered in the `myotus` key category and use a terminal-specific conflict context, so they are only intended to matter while interacting with AE2 terminal screens.

## What the settings UI actually exposes

The Myotus config tab is **not** a full mirror of every TOML key.

- In `1.20.1`, the source still defines `activeTabSorting`, but the checkbox wiring in `MyotusConfigScreen` is commented out.
- In both lines, the config tab clearly exposes keybinding buttons.
- In both lines, `openSidePanel` is persisted through the side-panel toggle button logic as well as the config spec.

## Notes for pack maintainers

- If you document both lines, call out that `activeTabSorting` is a `1.20.1`-only option.
- The side-panel toggle key is currently specific to `1.21.1`.
- Key names are localized through `assets/myotus/lang/en_us.json`.
