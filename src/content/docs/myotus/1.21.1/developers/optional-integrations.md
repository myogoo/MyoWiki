---
slug: myotus/1.21.1/developers/optional-integrations
title: Optional Integrations
description: Registering marker annotations, checking load state, and understanding the built-in integration list.
sidebar:
  order: 3
---

Myotus uses annotation markers plus a runtime integration manager to keep optional compatibility code organized.

## Built-in registrations

The constructor bootstrap in `Myotus.java` registers these integration markers in both inspected lines:

| Marker annotation | Mod ID |
| --- | --- |
| `JEI` | `jei` |
| `EMI` | `emi` |
| `REI` | `roughlyenoughitems` |
| `AE2WTLib` | `ae2wtlib` |
| `AE2FCT` | `ae2fct` |
| `AE2TB` | `ae2tb` |

GuideME-related addon code is also present in the repository, but it is not part of that exact registration list in `Myotus.java`.

## Registration flow

1. Declare a marker annotation for an optional dependency.
2. Register that marker against a mod ID.
3. Use the runtime integration manager to decide whether to activate integration-specific behavior.

On `1.21.1`, the bootstrap uses fluent aliases directly on `MyotusAPI.modRegistrar()`:

```java
MyotusAPI.modRegistrar()
        .registerLoadableMod(JEI.class, "jei")
        .registerLoadableMod(AE2WTLib.class, "ae2wtlib");
```

## Example

```java
MyotusAPI.modRegistrar()
        .registerLoadableMod(MyMarker.class, "examplemod", "[2.0.0,)");

if (MyotusAPI.modIntegrationManager().isLoaded(MyMarker.class)) {
    // Apply optional integration code.
}
```

## Runtime inspection

`IModIntegrationManager` exposes:

- `isLoaded(Class<? extends Annotation>)`
- `isLoaded(String modId)`
- `isRegistered(String modId)`
- `getAnnotationClass(String modId)`
- `getActiveIntegrations()`

Use it whenever integration-specific classes or mixins must be gated by loader state.

## Related helpers

- `SafeClass` wraps reflective class resolution so optional integrations can fail soft when a class is missing.
- `ItemListModLoadHelper` uses the same integration registry to gate JEI, EMI, and REI subscriber dispatch.
- `MyoModCondition` reuses the registered mod IDs at the NeoForge data-condition layer. See [Datagen Conditions](/myotus/1.21.1/developers/datagen-conditions/).
