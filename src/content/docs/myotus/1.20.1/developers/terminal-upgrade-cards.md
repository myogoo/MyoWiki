---
slug: myotus/1.20.1/developers/terminal-upgrade-cards
title: Terminal Upgrade Cards
description: The terminal upgrade card system, lifecycle hooks, and persistent storage behavior in Forge 1.20.1.
sidebar:
  order: 6
---

`ITerminalUpgradeCard` is available in the Forge `1.20.1` line.

Myotus injects terminal UI scaffolding through `MEStorageMenuMixin` and `MyoSlotSemantics`, including the floating side panel, upgrade slot semantics, card lifecycle callbacks, and persistent upgrade storage.

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
- item-hosted terminals use the `myotus_terminal_storage_uuid` tag to keep portable storage buckets distinct
- AE2WTLib wireless terminal merges preserve the original terminal storage identity when possible

See [Upgrade Storage](/myotus/1.20.1/developers/upgrade-storage/) for the full storage-key, merge, and menu-mixin flow.

## Built-in example item

The source tree contains a `DiamondUpgradeCardItem` test item. It is registered only outside production builds and grants a diamond when the terminal opens.

That makes it a dev example, not a production-facing gameplay feature.

## Related helpers

The same codebase also provides `TerminalUpgradeHelper` so addon code can inspect installed cards without manually walking the slot list.
