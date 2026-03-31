---
slug: myotus/1.21.1/getting-started/project-structure
title: Project Structure
description: High-level package and resource layout in the inspected Myotus 1.20.1 and 1.21.1 source trees.
sidebar:
  order: 3
---

## Source roots

```text
1.20.1 -> /mnt/f/IntelliJ/MyoCertus/Myotus_1_20_1
1.21.1 -> /mnt/f/IntelliJ/MyoCertus/MyoCertus_1_21_1
```

## Main packages

```text
me/myogoo/myotus/
├─ api/           Public interfaces, annotations, config-tab types, datagen helpers
├─ client/        Keybindings, translation keys, GUI screens, widgets, and config screens
├─ commands/      Annotation-driven command registration and built-in commands
├─ config/        Client config spec definitions
├─ impl/          Internal registrar and API implementations
├─ init/          Bootstrap wiring, config registration, item registration, and NeoForge condition codecs
├─ integration/   Optional integration helpers for item-list and GuideME paths
├─ item/          Upgrade-card sample item(s)
├─ menu/          Terminal menu helpers, storage keys, and slot semantics
├─ mixin/         Mixins
│  ├─ ae2/        AE2 menu/screen mixins
│  └─ guideme/    GuideME mixins
└─ util/mod       Optional dependency and version-range helpers
```

## API subpackages worth knowing

```text
api/
├─ annotation/    Marker annotations for optional integrations and item-list loaders
├─ command/       `@MyoCommand`, `@MyoExecute`, `@MyoArgument`
├─ config/        `MyoConfigTab`, visibility predicates, and tab-context helpers
├─ datagen/       `MyoModCondition`
├─ integration/   Runtime integration manager interface
├─ registrar/     Public registration interfaces
└─ util/          `SafeClass` reflection helper
```

## Resources worth knowing

- `src/main/templates/META-INF/neoforge.mods.toml` in `1.21.1`
- `src/main/resources/assets/ae2/screens/config/myotus.json`
- `src/main/resources/assets/ae2/screens/config/config.json`
- `src/main/resources/assets/myotus/lang/en_us.json`
- `src/main/resources/assets/myotus/textures/gui/myoicons.png`
- `src/main/resources/META-INF/accesstransformer.cfg`
- `src/main/resources/myotus.mixins.json`

## Structural differences between lines

### 1.20.1

- Uses Forge and Java `17`
- Keeps config in `ForgeConfigSpec`
- Exposes the core registrars and runtime integration manager
- Ships the terminal settings screen, command bootstrap, and item-list integration hooks

### 1.21.1

- Uses NeoForge and Java `21`
- Expands API documentation directly in source Javadocs
- Adds config-tab visibility/context helpers
- Adds `MyoModCondition` for NeoForge data conditions
- Adds terminal upgrade card interfaces and storage helpers
- Adds item registration, access transformers, mixins, and Maven publishing configuration

## Practical reading order

- Start at `Myotus.java` for bootstrap behavior.
- Move to `api/` to understand the public surface.
- Check `init/`, `integration/`, and `commands/` for user-visible extension hooks.
- Inspect `menu/` and `item/` when working on `1.21.1` upgrade card functionality.
- Inspect `mixin/ae2` when you need to understand how terminal storage and the floating side panel are injected into AE2.
