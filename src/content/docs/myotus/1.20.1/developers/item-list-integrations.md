---
slug: myotus/1.20.1/developers/item-list-integrations
title: Item List Integrations
description: How Myotus organizes JEI, EMI, and REI registration classes with marker annotations and static subscribers.
sidebar:
  order: 4
---

Myotus exposes a small annotation set for item-list integrations in `1.20.1`.

The goal is not to hide JEI, EMI, or REI completely. The goal is to keep loader-gated registration code discoverable and safe when optional dependencies are absent.

## Public markers

Loader markers:

- `@JEI`
- `@EMI`
- `@REI`

Additional item-list markers:

- `@RecipeAdd`
- `@RecipeCategory`
- `@RecipeTransfer`
- `@JEIGuiHandler`

Subscriber marker:

- `@MyotusSubscriber`

## Dispatch flow

`ItemListModLoadHelper.invokeItemListMod(...)` is the bridge that runs integration subscribers.

At runtime it:

1. reads mod annotation metadata through `AnnotationScanner.getModAnnotations()`
2. filters to classes carrying the requested loader marker
3. wraps the class reference with `SafeClass`
4. skips classes whose extra load-gate annotations are not currently active
5. invokes static methods marked with `@MyotusSubscriber`
6. requires the subscriber method to declare exactly one parameter of the requested registration type

That keeps optional item-list code out of the common bootstrap path while still allowing automatic discovery.

## Authoring shape

```java
@JEI
@RecipeCategory
public final class ExampleJeiCategoryRegistration {
    @MyotusSubscriber
    public static void register(IRecipeCategoryRegistration registration) {
        // Register JEI categories or catalysts here.
    }
}
```

The important rule is not the extra category marker. The important rule is that the class carries the loader marker and the method carries `@MyotusSubscriber`.

## Practical rules

- Subscriber methods must be `static`.
- Subscriber methods must declare exactly one parameter.
- The parameter type must match the registration type requested by the loader bridge.
- `SafeClass` is used on the class boundary so missing optional classes fail soft instead of crashing discovery.

## Relationship to optional integrations

These item-list hooks still depend on the same integration registry described in [Optional Integrations](/myotus/1.20.1/developers/optional-integrations/).

Use the integration registry for mod availability and the item-list subscriber flow for registration callbacks.
