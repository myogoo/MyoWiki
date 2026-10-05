---
title: About these docs
description: Documentation scope, source provenance, and how to contribute to the Myotus wiki.
---

This is the developer and player wiki for [Myotus](https://github.com/mc-myo-s-mod/Myotus), an Applied Energistics 2 extension library by myogoo.

## Source and version scope

The API, quickstart, architecture, and build guides were migrated from the public repository's `openwiki` documents at commit [`e7cfa3a`](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51). Source links are pinned to that revision, so the code behind an example does not silently change.

These are **source-reference docs**, not individually versioned manuals for every released JAR. A method in the source snapshot may not exist in an older release. Check the matching artifact before using an API.

Uncommitted development changes, including the new terminal module API and the later root Gradle proxy setup, are not included in this snapshot. The build guide describes the public revision linked above. Review newer source before applying it to another branch.

## Downloads and Maven

GitHub release links were checked on October 4, 2026. The [version page](/versions/) distinguishes published release tags from source-build coordinates. Remote Maven availability has not been verified; a local publication does not establish a Maven Central release.

## Improve a page

Use **Edit page** at the bottom of a document to propose a change in the [wiki repository](https://github.com/myogoo/MyoWiki). Include the Minecraft version and a source reference when changing an API contract or example.

Report mod bugs in the [Myotus issue tracker](https://github.com/mc-myo-s-mod/Myotus/issues). Report documentation and website issues in the [wiki issue tracker](https://github.com/myogoo/MyoWiki/issues).

## Design and implementation

Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/), with a JRip-based palette, rounded surfaces, self-hosted fonts, and light/dark themes. Search is a static Pagefind index generated during the build; it does not send your queries to a remote search service.

Myotus content and assets retain their [LGPL-3.0 license](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/LICENSE). See the wiki's [attribution file](https://github.com/myogoo/MyoWiki/blob/main/NOTICE.md) for design and font provenance.
