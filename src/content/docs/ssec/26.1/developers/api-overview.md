---
slug: ssec/26.1/developers/api-overview
title: API Overview
description: Public entrypoints, annotations, and extension areas in SSECLib 26.1.
sidebar:
  order: 1
---

## Core entry points

The SSEC public surface centers on:

- `SSECInitializer`
- `@SSCommand`
- `@SSCExecute`
- `@SSCArgument`
- `@SSCAlias`
- `@SSCPermission`
- `@SSEvent`
- `SSCArgumentAdapter`

## Initialization contract

`SuperSexyEventCommandLib` loads every registered `SSECInitializer`, runs `onInitializeSSEC()`, collects scan packages, and then calls `SSECScanner.initialize()`.

That split is important:

- initializers provide configuration
- scanners discover annotated classes
- registrars translate those classes into real command and event registrations

## Main extension areas

### Command registration

Author root commands and subcommands with `@SSCommand`, then mark executable methods with `@SSCExecute`. See [Command System](/ssec/26.1/developers/command-system/).

### Permission and alias policy

Add redirect aliases with `@SSCAlias` and gate execution with `@SSCPermission`. See [Permissions and Aliases](/ssec/26.1/developers/permissions-and-aliases/).

### Argument mapping

Use built-in type adapters or register your own `SSCArgumentAdapter` during initialization. See [Argument Types](/ssec/26.1/developers/argument-types/).

### Event registration

Register Fabric callback listeners by annotating methods with `@SSEvent`. See [Event System](/ssec/26.1/developers/event-system/).

## Example

```java
public class MyModSSEC implements SSECInitializer {
    @Override
    public void onInitializeSSEC() {
        // CommandRegistrar.registerAdapter(MyType.class, new MyTypeAdapter());
    }

    @Override
    public String[] getPackagesToScan() {
        return new String[] { "com.example.mymod.command", "com.example.mymod.event" };
    }
}
```

## Recommended next pages

- [Command System](/ssec/26.1/developers/command-system/)
- [Event System](/ssec/26.1/developers/event-system/)
- [Permissions and Aliases](/ssec/26.1/developers/permissions-and-aliases/)
- [Argument Types](/ssec/26.1/developers/argument-types/)
