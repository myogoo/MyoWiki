---
slug: ssec/26.1/getting-started/overview
title: Overview
description: What SSECLib is, how it starts, and where the public API begins.
sidebar:
  order: 1
---

SSECLib is an **annotation-driven command and event framework** for Fabric mods.

Instead of building Brigadier trees by hand and registering Fabric event callbacks one by one, you:

- expose one or more `ssec` entrypoints in `fabric.mod.json`
- implement `SSECInitializer`
- point the library at the packages that contain annotated classes
- let the scanner register command and event handlers

## Startup flow

`SuperSexyEventCommandLib` is the Fabric `ModInitializer` for the library.

At startup it:

1. loads every `ssec` entrypoint via `FabricLoader.getEntrypoints("ssec", SSECInitializer.class)`
2. calls `onInitializeSSEC()` on each initializer
3. collects the packages returned by `getPackagesToScan()`
4. runs `SSECScanner.initialize()` after every package has been registered

This is the main contract of the framework: your mod tells SSEC where the annotated classes are, and SSEC handles discovery and registration.

## Main public surface

The public API is intentionally small:

- `SSECInitializer` for entrypoint setup
- `@SSCommand`, `@SSCExecute`, `@SSCArgument`, `@SSCAlias`, and `@SSCPermission` for commands
- `@SSEvent` for Fabric event listeners
- `SSCArgumentAdapter` for custom argument mapping
- `PermissionLevel` and `SSCPermissionChecker` for permission policies

## When to use it

SSEC is useful when your mod has:

- multiple commands or subcommands
- repeatable permission rules
- a lot of command argument parsing
- several Fabric callbacks that you want to keep close to feature code

If your mod has only one small command and no reusable event layer, plain Brigadier and plain Fabric callbacks may still be simpler.

## Recommended next pages

- [Installation](/ssec/26.1/getting-started/installation/)
- [API Overview](/ssec/26.1/developers/api-overview/)
- [Command System](/ssec/26.1/developers/command-system/)
- [Event System](/ssec/26.1/developers/event-system/)
