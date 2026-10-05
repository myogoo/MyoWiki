---
title: Items & materials
description: Learn what charged Ender Pearls and Compat Processors are used for in Myotus addons.
---

Myotus supplies shared materials used by addons. Recipe availability depends on the Minecraft version, installed integrations, and any modpack overrides.

## Charged Ender Pearl

`myotus:charged_ender_pearl` is an Ender Pearl variant. The in-game guide describes it as flying **1.5 times farther** than a normal Ender Pearl.

Related items:

- `myotus:ender_pearl_block`
- `myotus:charged_ender_pearl_block`

Check your instance's recipe viewer for the active charging and block recipes. A recipe from another Minecraft version or addon combination is not necessarily available in your pack.

## Compat Processor

`myotus:compat_processor` is a base crafting material for addons that use Myotus.

Related items:

- `myotus:printed_compat_processor`
- `myotus:compat_press`
- `myotus:charged_ender_pearl`

## A recipe is missing

Some recipes are conditional on another integration being active. Check which mod supplies the recipe, whether that mod is installed for your Minecraft version, and whether your modpack replaces the recipe.

For addon developers, [resource conditions](/api/#resource-conditions) explain Myotus integration checks. They are not a generic query for every mod in the loader.

Sources: [Charged Ender Pearl guide](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/main/resources/assets/myotus/ae2guide/item/charged_ender_pearl.md), [Compat Processor guide](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/main/resources/assets/myotus/ae2guide/item/compat_processor.md).
