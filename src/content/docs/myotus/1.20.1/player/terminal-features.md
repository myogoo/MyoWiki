---
slug: myotus/1.20.1/player/terminal-features
title: Terminal Features
description: What players can expect from Myotus in AE2 terminals on Forge 1.20.1.
sidebar:
  order: 1
---

Myotus focuses on **terminal behavior and extension hooks**, so the visible feature set is intentionally lean unless another addon builds on top of it.

## Shared behavior

In the Forge `1.20.1` line, players get:

- an AE2 terminal settings tab named `Myotus Setting`
- a comma hotkey that opens terminal settings while the terminal screen is focused
- a side-panel toggle on the terminal screen
- terminal upgrade slots for addons that provide `ITerminalUpgradeCard` items
- a bug-report button in the terminal settings toolbar
- integration-aware command output through `/myotus mods`

## 1.20.1 highlights

- The terminal settings tab is registered through `MyotusConfigTab.initialize()`.
- The side panel starts closed by default and follows `tab.openSidePanel` when the screen opens.
- The `Open Terminal Setting Screen` keybinding is bound to the comma key by default.
- The `tab.activeTabSorting` config entry still exists in the spec, but the config screen no longer renders a working checkbox for it.
- Upgrade card slots are infrastructure for addons. Myotus only exposes the slot/storage behavior and development sample items.

## Important expectation for players

Myotus is **not** a content-heavy standalone mod. On its own, the runtime experience is mostly:

- settings UI support
- compatibility hooks
- terminal-side utility behavior

The larger payoff appears when another mod depends on the Myotus API.
