---
slug: myotus/1.20.1/getting-started/project-structure
title: Project Structure
description: High-level package and resource layout in the inspected Myotus 1.20.1 source tree.
sidebar:
  order: 3
---

## Source roots

```text
/mnt/f/IntelliJ/MyoCertus/Myotus_1_20_1
```

## Main packages

```text
me/myogoo/myotus/
├─ api/           Public interfaces, annotations, config-tab types, utility helpers
├─ client/        Keybindings, translation keys, GUI screens, widgets, and config tab screens
├─ commands/      Annotation-driven command registration and built-in command classes
├─ config/        Forge client config spec
├─ impl/          Internal registrar and API implementations
├─ init/          Bootstrap wiring, config registration, keybinding registration, and config-tab setup
├─ integration/   Optional integration helpers for item-list and GuideME paths
├─ mixin/         AE2 and GuideME mixins
└─ util/          Annotation scanning and optional-mod version checks
```

## API subpackages worth knowing

```text
api/
├─ annotation/    Marker annotations for optional integrations and item-list loaders
├─ command/       `@MyoCommand`, `@MyoExecute`, `@MyoArgument`
├─ config/        `MyoConfigTab` and `MyoConfigTabScreen`
├─ integration/   Runtime integration manager interface
├─ registrar/     Public registration interfaces
└─ util/          `SafeClass` reflection helper
```

## Resources worth knowing

- `src/main/resources/META-INF/mods.toml`
- `src/main/resources/META-INF/accesstransformer.cfg`
- `src/main/resources/myotus.mixins.json`
- `src/main/resources/assets/ae2/screens/config/myotus.json`
- `src/main/resources/assets/myotus/lang/en_us.json`
- `src/main/resources/assets/myotus/textures/gui/myoicons.png`

## What each area does

- `api/` defines the public surface that addon code should use.
- `client/` holds UI widgets, keybindings, and terminal settings screens.
- `commands/` contains the reflection-driven Brigadier registrar and built-in commands such as `/myotus mods`.
- `config/` contains the Forge client config spec that persists `myotus-client.toml`.
- `init/` wires the Forge bootstrap events together.
- `integration/` contains the item-list dispatch bridge and GuideME addon hooks.
- `mixin/` patches AE2 screens and menu behavior to add the Myotus terminal UI.

## Practical reading order

1. Start at `Myotus.java` for bootstrap behavior.
2. Move to `api/` to understand the public surface.
3. Check `init/`, `integration/`, and `commands/` for user-visible extension hooks.
4. Inspect `client/` and `mixin/` for the AE2 terminal UI additions.
