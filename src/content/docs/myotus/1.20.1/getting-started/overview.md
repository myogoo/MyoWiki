---
slug: myotus/1.20.1/getting-started/overview
title: Overview
description: What Myotus is, who it is for, and what the Forge 1.20.1 line includes.
sidebar:
  order: 1
---

Myotus is a **shared library for Applied Energistics 2 terminal extensions**.

It is not designed as a large standalone gameplay mod. In `1.20.1`, it provides a shared place for:

- optional mod integration registration
- item-list integration markers and subscriber dispatch
- terminal configuration tab registration
- runtime integration checks
- terminal-side UI helpers
- annotation-driven commands

## Who should use it

- **Players** who install another mod that depends on Myotus and need to understand the terminal settings it exposes.
- **Addon developers** who want to add optional behavior to AE2 terminals without reimplementing loader checks and config tab registration.
- **Maintainers** supporting Forge `1.20.1` specifically or comparing it with the NeoForge `1.21.1` line.

## Baseline

- Loader: Forge `47.4.17`
- Minecraft: `1.20.1`
- Java: `17`
- AE2: `15.4.10`

## Bootstrap flow

`Myotus.java` contains the startup logic for this line:

1. it installs `MyotusAPIImpl.INSTANCE` as the active API implementation
2. it registers the built-in optional integration markers for JEI, EMI, REI, AE2WTLib, AE2FCT, and AE2TB
3. it calls `MyoConfig.initialize()` so Forge can write `myotus-client.toml`
4. it waits for common setup and then calls `MyotusConfigTab.initialize()` to register the terminal settings tab

## Built-in integration markers

The Myotus bootstrap registers integration markers for these mod IDs in `1.20.1`:

- `jei`
- `emi`
- `roughlyenoughitems`
- `ae2wtlib`
- `ae2fct`
- `ae2tb`

The repository also contains GuideME-related addon and mixin code, even though GuideME is not registered through the same marker list in the constructor bootstrap.

## Important limitations

The Forge line does not include:

- `MyoConfigTabContext`
- `MyoConfigTabVisibility`
- `MyoModCondition`
- `ITerminalUpgradeCard`
- persistent terminal upgrade storage

## Where to go next

- [Installation](/myotus/1.20.1/getting-started/installation/) for runtime requirements.
- [Project Structure](/myotus/1.20.1/getting-started/project-structure/) for package and resource layout.
- [Configuration](/myotus/1.20.1/player/configuration/) for the keybinding and client config.
- [Item List Integrations](/myotus/1.20.1/developers/item-list-integrations/) for JEI, EMI, and REI subscriber flow.
