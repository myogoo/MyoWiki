---
slug: myotus/1.20.1/developers/datagen-conditions
title: Datagen Conditions
description: Using MyoModCondition to gate Forge data output on active Myotus integrations.
sidebar:
  order: 6
---

`MyoModCondition` is available in the Forge `1.20.1` line.

It evaluates to `true` when a mod ID registered through Myotus integrations is currently active.

## What it is for

Use it when generated data or JSON should only exist if an optional integration is active.

That keeps your data layer aligned with the same integration registry used by runtime code.

## JSON shape

```json
{
  "type": "myotus:mod_condition",
  "active_mod": "ae2wtlib"
}
```

The `active_mod` value must be a mod ID registered through `IModRegistrar`. The Forge serializer is registered under `myotus:mod_condition` in `MyoCondition`.

## Runtime behavior

Internally, `MyoModCondition.test(...)` delegates to:

```java
MyotusAPI.modIntegrationManager().isLoaded(modId)
```

So the condition follows the same registration and version-check pipeline as the rest of the optional integration system.

## Version difference

The `1.20.1` implementation uses Forge's `ICondition` and `IConditionSerializer`.

The `1.21.1` line exposes the same JSON contract through NeoForge's condition codec path.

## Related pages

- [Optional Integrations](/myotus/1.20.1/developers/optional-integrations/)
- [API Overview](/myotus/1.20.1/developers/api-overview/)
