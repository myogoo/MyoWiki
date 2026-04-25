---
slug: myotus/1.21.1/developers/terminal-upgrade-cards
title: Terminal Upgrade Cards
description: The 1.21.1 terminal upgrade card system, lifecycle hooks, and persistent storage behavior.
sidebar:
  order: 7
---

`ITerminalUpgradeCard` is available in both maintained Myotus lines. This page describes the NeoForge `1.21.1` implementation.

## Purpose

It marks items that can be inserted into terminal upgrade slots and receive lifecycle callbacks while installed in an AE2 terminal.

## Lifecycle hooks

```java
public interface ITerminalUpgradeCard {
    default void onTerminalOpen(MEStorageMenu menu, ItemStack stack) {}
    default void onTerminalClose(MEStorageMenu menu, ItemStack stack) {}
    default void onTerminalTick(MEStorageMenu menu, ItemStack stack) {}
}
```

## Authoring expectations

- upgrade cards should be non-stackable
- open and close callbacks can run on both logical sides
- tick callbacks run from the server-side menu update flow
- only one copy of the same item type can be installed in a terminal at a time
- only override the hooks your card actually needs
- the menu mixin dispatches open/close/tick callbacks when cards are inserted, removed, or the menu updates

## Example

```java
public class MyUpgradeCardItem extends Item implements ITerminalUpgradeCard {
    @Override
    public void onTerminalOpen(MEStorageMenu menu, ItemStack stack) {
        // Apply one-time behavior when the terminal opens.
    }

    @Override
    public void onTerminalTick(MEStorageMenu menu, ItemStack stack) {
        // Run while the card is installed in an open terminal.
    }
}
```

## Persistent storage

`PlayerUpgradeContainer` stores upgrade slot contents in player persistent data.

Important details from the inspected implementation:

- slot count is fixed at `5`
- storage is keyed per terminal-specific storage key
- item-hosted terminals use the `myotus_terminal_storage_uuid` custom-data key to keep portable storage buckets distinct
- AE2WTLib wireless terminal merges preserve the original terminal storage identity when possible

See [Upgrade Storage](/myotus/1.21.1/developers/upgrade-storage/) for the full storage-key, merge, and menu-mixin flow.

## Built-in example item

The `1.21.1` tree contains a `DiamondUpgradeCardItem` test item. It is registered only outside production builds and grants a diamond when the terminal opens.

That makes it a dev example, not a production-facing gameplay feature.

## Related helpers

The same codebase also provides `TerminalUpgradeHelper` so addon code can inspect installed cards without manually walking the slot list.
