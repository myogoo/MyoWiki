---
slug: myotus/1.20.1/getting-started/installation
title: Installation
description: Runtime requirements and developer setup for the Forge 1.20.1 Myotus line.
sidebar:
  order: 2
---

## For players

Myotus is mostly infrastructure. In most cases you install it because another mod depends on it.

### Forge 1.20.1 runtime

- Minecraft `1.20.1`
- Java `17`
- Forge `47.4.17`
- Applied Energistics 2 `15.4.10`
- GuideME `20.1.11` appears in the inspected source tree as a compile/runtime dependency

Optional integrations only become relevant when the matching mods are installed.

## For developers

### Source tree

Location:

```text
/mnt/f/IntelliJ/MyoCertus/Myotus_1_20_1
```

Typical commands:

```bash
./gradlew build
./gradlew runClient
./gradlew runGameTestServer
```

### Project shape

The `1.20.1` codebase is a ForgeGradle mod project that uses:

- `mods.toml`
- access transformers
- Sponge Mixin Gradle
- `myotus-client.toml` for client config state

If you are packaging or testing locally, treat this line as a normal Forge mod project rather than a published library artifact.
