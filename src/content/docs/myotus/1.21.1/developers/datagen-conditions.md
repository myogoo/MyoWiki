---
slug: myotus/1.21.1/developers/datagen-conditions
title: Datagen Conditions
description: Using MyoModCondition to gate data output on active Myotus integrations.
sidebar:
  order: 6
---

`MyoModCondition` is available in both maintained Myotus lines. This page describes the NeoForge `1.21.1` implementation.

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

The `active_mod` value must be a mod ID that Myotus has registered through `IModRegistrar`. The codec is registered under `myotus:mod_condition` in `MyoCondition`.

## Runtime behavior

Internally, `MyoModCondition.test(...)` delegates to:

```java
MyotusAPI.modIntegrationManager().isLoaded(modId)
```

So the condition follows the same registration and version-check pipeline as the rest of the optional integration system.

## Practical guidance

- Register the integration first in bootstrap code.
- Use the same mod ID in your condition JSON.
- Use `myotus:mod_condition` as the condition type.
- The Forge `1.20.1` line exposes the same JSON contract through an `IConditionSerializer`.

## Related pages

- [Optional Integrations](/myotus/1.21.1/developers/optional-integrations/)
- [API Overview](/myotus/1.21.1/developers/api-overview/)
