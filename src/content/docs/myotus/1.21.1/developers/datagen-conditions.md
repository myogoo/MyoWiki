---
slug: myotus/1.21.1/developers/datagen-conditions
title: Datagen Conditions
description: Using MyoModCondition to gate NeoForge data output on active Myotus integrations.
sidebar:
  order: 6
---

`MyoModCondition` is a `1.21.1`-only NeoForge data condition.

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
- Keep this feature scoped to `1.21.1`; the older Forge line does not expose `MyoModCondition`.

## Related pages

- [Optional Integrations](/myotus/1.21.1/developers/optional-integrations/)
- [API Overview](/myotus/1.21.1/developers/api-overview/)
