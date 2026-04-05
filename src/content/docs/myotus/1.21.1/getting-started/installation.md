---
slug: myotus/1.21.1/getting-started/installation
title: Installation
description: Runtime requirements for players and setup steps for developers on both supported Myotus lines.
sidebar:
  order: 2
---

## For players

Myotus is mostly infrastructure. In most cases you install it because another mod depends on it.

### Forge 1.20.1

- Minecraft `1.20.1`
- Java `17`
- Forge `47.4.17`
- Applied Energistics 2 `15.4.10`
- Current local Myotus version `15.0.1-SNAPSHOT`

### NeoForge 1.21.1

- Minecraft `1.21.1`
- Java `21`
- NeoForge `21.1.219`
- Applied Energistics 2 `19.2.17`
- Current local Myotus version `19.0.5`

Optional integrations only become relevant when the matching mods are installed.

## For developers

### 1.20.1 source tree

Location:

```text
/mnt/f/IntelliJ/MyoCertus/MyoCertus_1_20_1
```

Typical commands:

```bash
./gradlew build
./gradlew runClient
./gradlew runGameTestServer
```

### 1.21.1 source tree

Location:

```text
/mnt/f/IntelliJ/MyoCertus/MyoCertus_1_21_1
```

Typical commands:

```bash
./gradlew build
./gradlew runClient
./gradlew runServer
./gradlew runGameTestServer
./gradlew publishToMavenLocal
```

The NeoForge tree also generates `src/main/templates/META-INF/neoforge.mods.toml` into the build output and declares an `apiJar` task.

The source declares an `apiJar` task, but it is not wired into the published Maven publications in the inspected build script. Treat it as a local build artifact unless you add publication wiring yourself.

## Consuming Myotus as a dependency

The `1.21.1` line is explicitly prepared for normal dependency consumption and publishing.

```groovy
repositories {
    mavenLocal()
    mavenCentral()
    maven {
        url = "https://modmaven.dev"
        content {
            includeGroup "appeng"
            includeGroup "de.mari_023"
        }
    }
}

dependencies {
    implementation "me.myogoo:myotus:19.0.5"
}
```

## Notes

- The `1.20.1` codebase is a ForgeGradle mod project.
- The `1.21.1` codebase is a NeoForge moddev + Maven publishing project.
- Generated resources land under `src/generated/resources/` through the data-generation path.
- The `1.21.1` source currently declares Myotus `19.0.5`, Minecraft `1.21.1`, NeoForge `21.1.219`, Java `21`, AE2 `19.2.17`, and GuideME `21.1.6`.
- If you maintain both lines, treat them as separate targets rather than expecting drop-in compatibility.
