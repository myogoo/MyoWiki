---
slug: ssec/26.1/developers/event-system
title: Event System
description: How SSEC maps annotated methods onto Fabric event listeners.
sidebar:
  order: 3
---

## Event annotation

Use `@SSEvent` on a method to register it against a Fabric callback interface.

```java
public class MyEvents {
    @SSEvent(ServerLifecycleEvents.ServerStarting.class)
    public static void onServerStart(MinecraftServer server) {
        // ...
    }
}
```

`@SSEvent` accepts:

- `value`: the Fabric listener interface to bind
- `priority`: lower numbers run first

## What `EventRegistrar` does

The registrar:

- collects methods annotated with `@SSEvent`
- sorts them by `priority`
- supports both static and instance methods
- skips `@SSECDebug` methods outside the Fabric development environment
- creates a proxy that implements the target callback interface
- registers that proxy into the matching Fabric `Event<?>`

## Event lookup strategy

When `EventRegistrar` resolves an event target, it looks for:

1. a static `Event<?>` field on the listener class itself
2. a generic `Event<?>` field in the enclosing class whose type parameter matches the listener
3. a fallback field-name match in the enclosing class

That mirrors common Fabric event declaration patterns and keeps the annotation side terse.

## Static vs instance registration

There are two main registration flows:

- `registerStatic(Class<?>)` for static-only handlers
- `register(Object)` for mixed static and instance methods on a target object

If you do not need instance state, static handlers are simpler and avoid lifecycle questions.

## Debug-only listeners

`@SSECDebug` can be layered on an event method to keep it active only in development environments.

That is useful for tracing, logging-heavy listeners, or temporary debug hooks that should never ship on production servers.
