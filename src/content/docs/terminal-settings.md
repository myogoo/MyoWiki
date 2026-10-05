---
title: Terminal settings
description: Find Myotus settings, control the upgrade panel, and configure terminal key bindings.
---

Myotus adds a tab to AE2's **Terminal Settings** screen. Myotus-related addons can contribute their own settings here too.

## Upgrade panel button

The upgrade-panel button option controls whether the terminal toolbar shows the button that opens the Myotus Terminal Upgrade Panel.

Turning off the button is a presentation setting. It does not uninstall the cards in your terminal.

## View Cell slots

On **Minecraft 1.21.1**, the View Cell option controls a second column of AE2 View Cell slots in the Myotus upgrade panel.

On **Minecraft 1.20.1**, that option is disabled and marked as 1.21.1-only. Do not expect the 1.21.1 panel layout to apply to the Forge version.

## Terminal key bindings

Settings on this page are synchronized with Minecraft's key mappings. By default, the terminal-specific shortcuts work while a terminal is open.

| Action | Key mapping ID |
| --- | --- |
| Open Terminal Settings | `key.myotus.open.terminal_setting` |
| Toggle Terminal Upgrade Panel | `key.myotus.toggle.upgrade_terminal_panel` |

Use the key currently assigned in your own settings; a modpack or player can change it.

## A note on newer panels

Draggable equipment panels and the terminal module API are development work. This page describes the published source snapshot, not those uncommitted features.

Adapted from the [Myotus in-game guide](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/main/resources/assets/myotus/ae2guide/feature/terminal-settings.md).
