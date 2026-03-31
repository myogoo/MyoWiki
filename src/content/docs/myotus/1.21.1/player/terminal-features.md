---
slug: myotus/1.21.1/player/terminal-features
title: Terminal Features
description: What players can expect from Myotus in AE2 terminals and how the two supported lines differ.
sidebar:
  order: 1
---

Myotus focuses on **terminal behavior and extension hooks**, so the visible feature set is intentionally lean unless another addon builds on top of it.

## Shared behavior

Both supported lines include:

- a terminal settings entry point
- a Myotus-specific client config file
- terminal-aware keybinding context
- integration-aware command output

## 1.20.1 highlights

- Includes a terminal settings screen registered through `MyotusConfigTab.initialize()`
- Supports sorting active tabs first through the `activeTabSorting` client option
- Can optionally open the side panel automatically when the terminal opens

## 1.21.1 highlights

- Keeps the terminal settings screen and side-panel open behavior
- Adds a dedicated keybind for toggling the sub side panel
- Adds the underlying system for terminal upgrade cards and player-persistent slot storage

## Important expectation for players

Myotus is **not** a content-heavy standalone mod. On its own, the runtime experience is mostly:

- settings UI support
- compatibility hooks
- terminal-side utility behavior

The larger payoff appears when another mod depends on the Myotus API.
