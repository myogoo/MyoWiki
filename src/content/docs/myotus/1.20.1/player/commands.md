---
slug: myotus/1.20.1/player/commands
title: Commands
description: User-visible commands available in Myotus and how they are registered.
sidebar:
  order: 3
---

## Root command

Myotus uses an annotation-driven command system with the root literal:

```text
/myotus
```

## Built-in subcommand

### `/myotus mods`

Prints the currently active optional integrations to the command source.

This subcommand is backed by `LoadTestCommand` in both inspected lines and is useful for:

- confirming that expected optional mods are loaded
- checking which integration branches Myotus considers active at runtime
- debugging pack or dev-instance compatibility

## Why the command exists

The command output is a practical view into the runtime state exposed by `IModIntegrationManager`. If an integration is registered but not active, it will not appear in the active list.

## Developer note

The command tree is assembled by reflection over classes annotated with:

- `@MyoCommand`
- `@MyoExecute`
- `@MyoArgument`

That matters when you extend the system and want your new commands to follow the same registration model.
