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

On `1.20.1`, registration can use either the original registrar methods or the fluent aliases:

```java
MyotusAPI.modRegistrar()
        .registerLoadableMod(MyMarker.class, "examplemod", "[2.0.0,)");
```

`loadableMod(...)` also has overloads that accept a display name and version range. Internally, Myotus stores the registration as a `SupportedMod` and checks the loaded mod version against a Maven-style range.
If the mod is present but the version is outside the requested range, `ModIntegrationManager.put(...)` throws a runtime exception during bootstrap, so the mismatch fails fast instead of staying half-enabled.

## Example

```java
MyotusAPI.modRegistrar()
        .registerLoadableMod(MyMarker.class, "examplemod", "[2.0.0,)");

if (MyotusAPI.modIntegrationManager().isLoaded(MyMarker.class)) {
    // Apply optional integration code.
}
```

## AE2WTLib terminal registration

The `1.20.1` line also ships an AE2WTLib compatibility facade for the `1.21.1` terminal-registration API:

```java
AddTerminalEvent.register(event -> event
        .builder("example", ExampleMenuHost::new, ExampleMenu.TYPE, EXAMPLE_TERMINAL.get(), Icon.CRAFTING)
        .hotkeyName("wireless_example_terminal")
        .addTerminal());
```

This facade exists under the same package names used by AE2WTLib `1.21.1`, such as `de.mari_023.ae2wtlib.api.registration.AddTerminalEvent`.

On Forge `1.20.1`, Myotus runs the event from an optional AE2WTLib mixin and delegates registration into AE2WTLib `1.20.1`'s existing wireless terminal handler. `WTDefinitionBuilder.upgradeCount(...)` and `noUpgrades()` are accepted so shared source can compile, but that AE2WTLib line does not store per-terminal upgrade counts.

## Runtime inspection

`IModIntegrationManager` exposes:

- `isLoaded(Class<? extends Annotation>)`
- `getAnnotationClass(String modId)`
- `getActiveIntegrations()`

Use it whenever integration-specific classes or mixins must be gated by loader state.

## Related helpers

- `SafeClass` wraps reflective class resolution so optional integrations can fail soft when a class is missing.
- `ItemListModLoadHelper` uses the same integration registry to gate JEI, EMI, and REI subscriber dispatch.
- `MyoModCondition` uses the same registry for Forge data and recipe conditions.
- GuideME addon code in the repository follows the same general pattern: only activate the integration path when the target mod is actually available.
