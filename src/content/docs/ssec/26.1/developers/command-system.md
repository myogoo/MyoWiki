---
slug: ssec/26.1/developers/command-system
title: Command System
description: How SSEC turns annotated classes into Brigadier command trees.
sidebar:
  order: 2
---

## Command annotations

SSEC command registration is built around five annotations:

- `@SSCommand` declares a root command or subcommand class
- `@SSCExecute` marks the executable method
- `@SSCArgument` maps method parameters to Brigadier arguments
- `@SSCAlias` registers redirect aliases
- `@SSCPermission` applies permission rules

## Shape of a command

```java
@SSCommand("greeting")
@SSCAlias({ "hi", "hello" })
@SSCPermission(permission = PermissionLevel.GAME_MASTER)
public class GreetingCommand {

    @SSCExecute
    public static void execute(
            CommandContext<CommandSourceStack> ctx,
            @SSCArgument("name") String name
    ) {
        // ...
    }

    @SSCommand(value = "shout", parent = GreetingCommand.class)
    public static class ShoutCommand {
        @SSCExecute
        public static void execute(
                CommandContext<CommandSourceStack> ctx,
                @SSCArgument("msg") String msg
        ) {
            // ...
        }
    }
}
```

This produces a root command plus a nested subcommand without hand-writing literal and argument builders.

## What `CommandRegistrar` does

The registrar:

- verifies `@SSCommand` is present
- builds a Brigadier tree from the annotated class graph
- resolves parent-child relationships, including cross-file parents
- registers root aliases and subcommand aliases
- applies permission predicates
- maps Java parameter types to Brigadier argument types through the adapter registry

## Built-in argument adapters

`CommandRegistrar` pre-registers adapters for primitives, strings, vectors, entities, block positions, NBT, scoreboard types, colors, styles, UUIDs, and more.

For the full supported set, see [Argument Types](/ssec/26.1/developers/argument-types/).

## Custom argument types

If a parameter type is not built in, register an `SSCArgumentAdapter` during `onInitializeSSEC()`.

```java
public class MyCommandInitializer implements SSECInitializer {
    @Override
    public void onInitializeSSEC() {
        CommandRegistrar.registerAdapter(MyType.class, new MyTypeAdapter());
    }

    @Override
    public String[] getPackagesToScan() {
        return new String[] { "com.example.mymod.command" };
    }
}
```

## Practical rules

- Keep `@SSCExecute` methods static unless you have a reason to instantiate a target.
- Put reusable permission policy on the command class, then use `propagate` when children should inherit it.
- Register custom adapters before the scan runs.
- Treat aliases as redirects, not independent command implementations.
