---
slug: myotus/1.20.1/developers/optional-integrations
title: Optional Integrations
description: Registering marker annotations, checking load state, and understanding the built-in integration list in 1.20.1.
sidebar:
  order: 3
---

Myotus uses annotation markers plus a runtime integration manager to keep optional compatibility code organized.

## Built-in registrations

The constructor bootstrap in `Myotus.java` registers these integration markers in `1.20.1`:

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

On `1.20.1`, registration happens through the lower-level registrar methods:

```java
MyotusAPI.get().modRegistrar().loadableMod(MyMarker.class, "examplemod", "[2.0.0,)");
```

`loadableMod(...)` also has overloads that accept a display name and version range. Internally, Myotus stores the registration as a `SupportedMod` and checks the loaded mod version against a Maven-style range.
If the mod is present but the version is outside the requested range, `ModIntegrationManager.put(...)` throws a runtime exception during bootstrap, so the mismatch fails fast instead of staying half-enabled.

## Example

```java
MyotusAPI.get().modRegistrar().loadableMod(MyMarker.class, "examplemod", "[2.0.0,)");

if (MyotusAPI.get().modIntegrationManager().isLoaded(MyMarker.class)) {
    // Apply optional integration code.
}
```

## Runtime inspection

`IModIntegrationManager` exposes:

- `isLoaded(Class<? extends Annotation>)`
- `getAnnotationClass(String modId)`
- `getActiveIntegrations()`

Use it whenever integration-specific classes or mixins must be gated by loader state.

## Related helpers

- `SafeClass` wraps reflective class resolution so optional integrations can fail soft when a class is missing.
- `ItemListModLoadHelper` uses the same integration registry to gate JEI, EMI, and REI subscriber dispatch.
- GuideME addon code in the repository follows the same general pattern: only activate the integration path when the target mod is actually available.
