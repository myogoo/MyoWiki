---
slug: ssec/26.1/developers/argument-types
title: Argument Types
description: Built-in Java-to-Brigadier argument mappings provided by SSEC.
sidebar:
  order: 5
---

`CommandRegistrar` ships with a built-in adapter registry for the following Java types.

| Java Type | Brigadier Mapping |
| --- | --- |
| `int` / `Integer` | `IntegerArgumentType` |
| `double` / `Double` | `DoubleArgumentType` |
| `float` / `Float` | `FloatArgumentType` |
| `boolean` / `Boolean` | `BoolArgumentType` |
| `String` | `StringArgumentType` |
| `UUID` | `UuidArgument` |
| `ChatFormatting` | `ColorArgument` |
| `Component` | `ComponentArgument` |
| `Style` | `StyleArgument` |
| `CompoundTag` | `CompoundTagArgument` |
| `NbtPathArgument.NbtPath` | `NbtPathArgument` |
| `BlockInput` | `BlockStateArgument` |
| `BlockPos` | `BlockPosArgument` |
| `ColumnPos` | `ColumnPosArgument` |
| `Vec2` | `Vec2Argument` |
| `Vec3` | `Vec3Argument` |
| `AngleArgument.SingleAngle` | `AngleArgument` |
| `EntityAnchorArgument.Anchor` | `EntityAnchorArgument` |
| `Entity` | `EntityArgument.entity()` |
| `Entity[]` | `EntityArgument.entities()` |
| `ServerPlayer` | `EntityArgument.player()` |
| `ServerPlayer[]` | `EntityArgument.players()` |
| `ServerLevel` | `DimensionArgument` |
| `GameType` | `GameModeArgument` |
| `Heightmap.Types` | `HeightmapTypeArgument` |
| `DisplaySlot` | `ScoreboardSlotArgument` |
| `ScoreHolder` | `ScoreHolderArgument` |
| `PlayerTeam` | `TeamArgument` |
| `SlotRange` | `SlotsArgument` |
| `Mirror` | `TemplateMirrorArgument` |
| `Rotation` | `TemplateRotationArgument` |

## Extending the registry

Register custom types before scanning begins.

```java
public class MyCommandInitializer implements SSECInitializer {
    @Override
    public void onInitializeSSEC() {
        CommandRegistrar.registerAdapter(MyType.class, new MyTypeAdapter());
    }

    @Override
    public String[] getPackagesToScan() {
        return new String[] { "com.example.mymod.command" };
    }
}
```

Use this when your commands need domain-specific value objects that Brigadier does not understand out of the box.
