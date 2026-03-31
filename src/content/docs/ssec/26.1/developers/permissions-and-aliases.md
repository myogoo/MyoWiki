---
slug: ssec/26.1/developers/permissions-and-aliases
title: Permissions and Aliases
description: Alias path rules and command permission modes in SSEC.
sidebar:
  order: 4
---

## Permission modes

`@SSCPermission` supports one of three policy styles.

### Vanilla permission levels

```java
@SSCPermission(permission = PermissionLevel.GAME_MASTER)
```

Available levels in this line are:

- `NONE`
- `MODERATOR`
- `GAME_MASTER`
- `ADMIN`
- `OWNER`

### Permission nodes

```java
@SSCPermission("mymod.admin")
```

This mode is intended for permission-node based integrations such as LuckPerms or the Fabric permissions API.

### Custom checkers

```java
@SSCPermission(custom = MyPermissionChecker.class)
```

Use a custom `SSCPermissionChecker` when your rule depends on runtime state that cannot be expressed as a fixed node or vanilla level.

## Propagation

`propagate = true` pushes the permission requirement down to subcommands.

```java
@SSCPermission(permission = PermissionLevel.ADMIN, propagate = true)
```

If you omit propagation, the rule only applies to the current command scope.

## Alias path rules

`@SSCAlias` uses `/` as a path separator and supports both absolute and relative paths.

| Alias form | Example | Result |
| --- | --- | --- |
| Relative single segment | `@SSCAlias("alt")` | inherits the parent command path |
| Relative multi segment | `@SSCAlias("tools/reload")` | adds nested segments under the parent path |
| Absolute single segment | `@SSCAlias("/s")` | redirects from a root alias |
| Absolute multi segment | `@SSCAlias("/admin/reload")` | redirects from a root path that must already exist |

If an absolute alias points to a root command that does not exist, SSEC throws instead of silently inventing a new root.

## Practical guidance

- Put permanent root shorthands in absolute aliases.
- Put feature-local synonyms in relative aliases.
- Use propagated class-level permission when the whole branch is restricted.
- Use method-level permission only when sibling subcommands intentionally diverge.
