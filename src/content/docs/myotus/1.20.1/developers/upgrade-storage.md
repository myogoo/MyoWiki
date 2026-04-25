---
slug: myotus/1.20.1/developers/upgrade-storage
title: Upgrade Storage
description: How terminal upgrade slots are injected, filtered, persisted, and queried in Forge 1.20.1.
sidebar:
  order: 7
---

This page covers the **storage side** of terminal upgrade cards in Forge `1.20.1`. The public item hook lives in [Terminal Upgrade Cards](/myotus/1.20.1/developers/terminal-upgrade-cards/), but the persistence and slot lifecycle are handled elsewhere.

## Scope

The Forge `1.20.1` line has the same high-level upgrade-card storage model as the NeoForge line: fixed upgrade slots, item filtering, terminal-scoped persistent storage, and lifecycle dispatch from the AE2 menu mixins.

## Where the slots come from

`MEStorageMenuMixin` injects into the AE2 terminal menu constructor and ensures the terminal side panel and custom slot groups exist:

- extra view-cell slots
- Myotus upgrade slots

When the upgrade slot semantic is missing, Myotus adds `5` slots backed by an internal inventory and uses `Icon.BACKGROUND_UPGRADE` for the slot background.

## What can be inserted

Insertion is gated by `TerminalUpgradeSlotFilter`.

Only items whose `Item` implements `ITerminalUpgradeCard` are accepted:

```java
return stack.getItem() instanceof ITerminalUpgradeCard;
```

That keeps the slot contract simple for addon authors and automatically rejects unrelated items.

## Persistence model

On the server, the mixin creates:

```java
new PlayerUpgradeContainer(
    serverPlayer,
    TerminalUpgradeStorageKey.of(host)
)
```

`PlayerUpgradeContainer` stores contents in the player's persistent NBT, not in the terminal GUI session itself.

Important details:

- slot count is fixed at `5`
- writes happen through `saveChangedInventory()`
- contents persist after closing the GUI
- storage is scoped to a terminal-specific key, not one global upgrade inventory

## Storage key strategy

`TerminalUpgradeStorageKey` generates different stable keys depending on terminal host type.

### Part-based terminals

For `AEBasePart` hosts, the key includes:

- host class name
- dimension ID
- block position
- part side

That gives each placed terminal part its own upgrade inventory.

### Item-based terminals

For `ItemMenuHost` hosts, the key includes:

- host class name
- item ID
- a UUID stored on the `ItemStack`

The UUID is written into custom item data under `myotus_terminal_storage_uuid`. This is what keeps portable/item terminals from sharing one storage bucket.

## AE2WTLib merge behavior

When AE2WTLib merges a wireless terminal into a Wireless Universal Terminal, Myotus keeps track of the original terminal item's storage UUID.

The AE2WTLib recipe mixin records that UUID in `myotus_merged_terminal_storage`, so selecting the merged terminal inside the universal terminal can still resolve to the original terminal-specific storage key.

## Lifecycle dispatch

The same `MEStorageMenuMixin` also dispatches upgrade callbacks.

### Open

- when the terminal menu first opens
- when a new upgrade card is inserted into an upgrade slot

### Tick

- every `broadcastChanges()` cycle while the menu stays open

### Close

- when the menu is removed
- when an installed card is replaced or removed

This means card authors do not have to poll slot state themselves. The mixin tracks previous slot contents and translates those changes into `onTerminalOpen()`, `onTerminalTick()`, and `onTerminalClose()` calls.

## Query helpers

`TerminalUpgradeHelper` gives addon code a cleaner read API over the slot list.

It supports:

- `getInstalledUpgrades(menu)`
- `hasUpgrade(menu, Item)`
- `hasUpgrade(menu, ResourceLocation)`
- `countUpgrade(menu, Item)`
- `countUpgrade(menu, ResourceLocation)`

The `ResourceLocation` overloads return safe fallback values when the target item is not present in the registry, which is useful for optional cross-mod behavior.

## Practical implications for addon authors

- Upgrade cards are effectively **per terminal instance**, not global per player.
- Item-hosted terminals keep their own identity through stack UUIDs.
- Cards survive menu reopen because the server writes them into player persistent data.
- A dev-only sample item, `DiamondUpgradeCardItem`, exists in non-production builds as a reference implementation.
