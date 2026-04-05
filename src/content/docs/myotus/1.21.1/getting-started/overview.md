---
slug: myotus/1.21.1/getting-started/overview
title: Overview
description: What Myotus is, who it is for, and what each supported version includes.
sidebar:
  order: 1
---

Myotus is a **shared library for Applied Energistics 2 terminal extensions**.

The inspected `1.21.1` tree lives at `/mnt/f/IntelliJ/MyoCertus/MyoCertus_1_21_1` and targets NeoForge `21.1.219` on Java `21`.

It is not designed as a large standalone gameplay mod. Instead, it provides a shared place for:

- optional mod integration registration and runtime gating
- item-list integration markers and static subscriber dispatch
- terminal configuration tab registration
- terminal upgrade card hooks and persistent storage support
- `1.21.1` config tab visibility and NeoForge data conditions

## Who should use it

- **Players** who install another mod that depends on Myotus and need to understand the terminal settings it exposes.
- **Addon developers** who want to add optional behavior to AE2 terminals without reimplementing loader checks and config tab registration.
- **Maintainers** supporting both Forge `1.20.1` and NeoForge `1.21.1`.

## Core behavior by version

| Line | Loader | Focus |
| --- | --- | --- |
| `1.20.1` | Forge `47.4.17` | Core terminal config tabs, item-list subscriber hooks, keybinding, runtime integration tracking |
| `1.21.1` | NeoForge `21.1.219` | Same foundation plus config-tab visibility, NeoForge data conditions, terminal upgrade cards, persistent upgrade storage, and publishing setup |

## Built-in integration markers

The Myotus bootstrap registers integration markers for these mod IDs in both lines:

- `jei`
- `emi`
- `roughlyenoughitems`
- `ae2wtlib`
- `ae2fct`
- `ae2tb`

The repository also contains GuideME-related optional runtime integration and mixin code, even though GuideME is not registered through the same marker list in the constructor bootstrap.

## Additional `1.21.1` API surface

This line also adds:

- `MyotusAPI.modRegistrar()`, `MyotusAPI.configRegistrar()`, and `MyotusAPI.modIntegrationManager()`
- `MyoConfigTabContext` and `MyoConfigTabVisibility`
- `MyoModCondition` for NeoForge conditions
- `MyotusAPI.isInitialized()`
- fluent registrar aliases on both `IModRegistrar` and `IConfigRegistrar`
- `ITerminalUpgradeCard`, `TerminalUpgradeHelper`, and `TerminalUpgradeStorageKey`

## Where to go next

- [Installation](/myotus/1.21.1/getting-started/installation/) for runtime requirements.
- [Project Structure](/myotus/1.21.1/getting-started/project-structure/) for package and resource layout.
- [Item List Integrations](/myotus/1.21.1/developers/item-list-integrations/) for JEI, EMI, and REI subscriber flow.
- [Version Matrix](/myotus/1.21.1/versions/version-matrix/) for a quick side-by-side comparison.
