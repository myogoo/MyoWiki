---
slug: myotus/1.21.1/developers/command-system
title: Command System
description: How Myotus discovers annotated command classes and turns them into Brigadier nodes.
sidebar:
  order: 5
---

Myotus uses an **annotation-driven command pipeline** in both supported lines. The system is intentionally small, but it is fully source-backed and already powers `/myotus mods`.

## Registration flow

Command registration starts in `init/MyotusCommand` on `RegisterCommandsEvent`.

At startup, Myotus:

1. scans mod file annotation metadata for classes marked with `@MyoCommand`
2. loads those classes by reflection
3. selects root nodes where `parent() == void.class`
4. recursively attaches subcommands whose `parent()` points at the current command class

This means command discovery is not hardcoded to a manual list. If the annotation is present and the class is loadable, it can be picked up automatically.

## Core annotations

### `@MyoCommand`

Marks a class as a command node.

```java
@MyoCommand("myotus")
public final class RootCommand {
}

@MyoCommand(value = "mods", parent = RootCommand.class)
public final class ModsCommand {
}
```

- `value` is the literal Brigadier node name
- `parent` controls where the node is attached
- `void.class` means the node is a root command

### `@MyoExecute`

Marks the static method to run when the node executes.

```java
@MyoExecute
public static int execute(CommandSourceStack source) {
    return 1;
}
```

Important rules from `CommandRegistrar`:

- the method must be `static`
- the return type is expected to be `int`
- execution failures are logged and return `0`

### `@MyoArgument`

Marks a method parameter that should become a Brigadier argument.

```java
@MyoExecute
public static int execute(CommandSourceStack source, @MyoArgument("enabled") boolean enabled) {
    return 1;
}
```

Parameters without `@MyoArgument` are only accepted when they are one of the context types:

- `CommandContext`
- `CommandSourceStack`

## Supported parameter types

The current registrar maps only a small set of Java types to Brigadier argument types:

| Java type | Brigadier argument |
| --- | --- |
| `int` / `Integer` | `IntegerArgumentType.integer()` |
| `boolean` / `Boolean` | `BoolArgumentType.bool()` |
| `String` | `StringArgumentType.string()` |
| `ServerPlayer` | `EntityArgument.player()` |
| `Entity` | `EntityArgument.entity()` |

If you use any other parameter type, registration logs an error and the node does not get a valid argument mapping.

## Subcommand layout

Myotus supports two subcommand patterns:

- nested command classes declared inside another command class
- separate top-level classes whose `parent` points at the desired parent node

`CommandRegistrar` checks both patterns, so you can choose whichever layout is easier to maintain.

## Minimal example

```java
@MyoCommand("myotus")
public final class RootCommand {
}

@MyoCommand(value = "set-flag", parent = RootCommand.class)
public final class SetFlagCommand {
    @MyoExecute
    public static int execute(CommandSourceStack source, @MyoArgument("enabled") boolean enabled) {
        source.sendSuccess(() -> Component.literal("enabled=" + enabled), false);
        return 1;
    }
}
```

That pattern matches how the built-in `/myotus mods` command is authored.

## Practical limitations

- There is no automatic support for optional arguments.
- `String` parameters use plain `string()` parsing, not a greedy string variant.
- Validation errors are runtime-logged, not compile-time enforced.
- Discovery is annotation-based, so forgetting `@MyoCommand` means the class is invisible to the registrar.

## Version notes

The command bootstrap and registrar structure are effectively the same in `1.20.1` and `1.21.1`.

The main difference is documentation depth: the `1.21.1` command annotations include fuller Javadocs, so that line is the better reference when you want to understand intended usage.
