---
slug: ssec/26.1/getting-started/installation
title: Installation
description: Dependency, runtime, and entrypoint setup for consuming SSECLib in a Fabric mod.
sidebar:
  order: 2
---

## Runtime expectations

The local `sseclib` build metadata for this line declares:

- artifact name `ssec`
- group `me.myogoo`
- version `26.1`
- loader target `Fabric`
- Java target `25`
- Fabric Loader `0.18.4`
- Fabric API `0.143.12+26.1`

That means the intended published coordinate for this line is `me.myogoo:ssec:26.1`.

## Source tree

Location:

```text
/mnt/f/IntelliJ/SteveValley/SSECLib
```

## Add the dependency

In a Loom-based mod, wire the library into your preferred dependency scope.

```groovy
dependencies {
    modImplementation "me.myogoo:ssec:26.1"
}
```

Use the repository source that matches how you publish or consume the artifact in your workspace.

## Register `ssec` entrypoints

Dependency setup alone is not enough. SSEC only discovers your handlers through a custom `ssec` Fabric entrypoint.

```json
{
  "entrypoints": {
    "ssec": [
      "com.example.mymod.command.MyCommandInitializer",
      "com.example.mymod.event.MyEventInitializer"
    ]
  }
}
```

## Implement `SSECInitializer`

Each entrypoint implements `SSECInitializer` and returns the packages that should be scanned.

```java
public class MyCommandInitializer implements SSECInitializer {
    @Override
    public void onInitializeSSEC() {
        // Register custom argument adapters or perform extra setup here.
    }

    @Override
    public String[] getPackagesToScan() {
        return new String[] { "com.example.mymod.command" };
    }
}
```

`onInitializeSSEC()` runs before the scan. Use it for adapter registration and any setup that annotated handlers depend on.

## Common failure modes

- No `ssec` entrypoint: nothing is scanned.
- Wrong package list: annotated classes are never discovered.
- Missing custom adapter: a command parameter type cannot be mapped.
- Wrong Java baseline: the library targets Java `25` for this line.

## Recommended next pages

- [API Overview](/ssec/26.1/developers/api-overview/)
- [Command System](/ssec/26.1/developers/command-system/)
- [Argument Types](/ssec/26.1/developers/argument-types/)
