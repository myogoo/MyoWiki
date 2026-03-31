---
slug: myotus/1.20.1/versions/forge-1-20-1
title: Forge 1.20.1
description: Notes specific to the Forge-based Myotus 1.20.1 codebase.
sidebar:
  order: 2
---

## Runtime baseline

- Minecraft `1.20.1`
- Forge `47.4.17`
- Java `17`
- Applied Energistics 2 `15.4.10`

## Build profile

The `1.20.1` line is a classic ForgeGradle project using:

- `net.minecraftforge.gradle`
- Sponge Mixin Gradle
- `mods.toml`
- access transformers

## Visible capabilities

- terminal settings screen integration
- config-tab registration support
- optional mod registration and runtime checks
- `/myotus mods` integration inspection command
- client config entries for active-tab sorting and side-panel open behavior

## What it does not have

Compared to `1.21.1`, this line does **not** expose:

- terminal upgrade cards
- player-persistent terminal upgrade storage
- the newer fluent public API helpers
- the Maven publishing setup present in the NeoForge line

## When to prefer it

Use this line when the rest of your addon or modpack is still anchored to Forge `1.20.1` and AE2 `15.x`.
