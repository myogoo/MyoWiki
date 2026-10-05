---
title: 아이템 및 재료
description: Myotus 애드온에서 충전된 엔더 진주와 호환 프로세서를 어떻게 사용하는지 알아봅니다.
---

Myotus는 애드온에서 사용하는 공용 재료를 제공합니다. 레시피 이용 가능 여부는 Minecraft 버전, 설치된 통합 모드, 모드팩의 변경 사항에 따라 달라집니다.

## 충전된 엔더 진주

`myotus:charged_ender_pearl`은 엔더 진주의 변형입니다. 게임 내 가이드에 따르면 일반 엔더 진주보다 **1.5배 더 멀리** 날아갑니다.

관련 아이템:

- `myotus:ender_pearl_block`
- `myotus:charged_ender_pearl_block`

현재 인스턴스의 레시피 뷰어에서 활성화된 충전 및 블록 레시피를 확인하세요. 다른 Minecraft 버전이나 애드온 조합의 레시피가 현재 모드팩에서도 사용 가능하다는 보장은 없습니다.

## 호환 프로세서

`myotus:compat_processor`는 Myotus를 사용하는 애드온의 기본 제작 재료입니다.

관련 아이템:

- `myotus:printed_compat_processor`
- `myotus:compat_press`
- `myotus:charged_ender_pearl`

## 레시피가 보이지 않는 경우

일부 레시피는 다른 통합 모드가 활성화되어 있을 때만 사용할 수 있습니다. 어떤 모드가 레시피를 제공하는지, 해당 Minecraft 버전용 모드가 설치되어 있는지, 모드팩이 레시피를 대체했는지 확인하세요.

애드온 개발자는 Myotus의 통합 확인 방법을 [리소스 조건](/ko/api/#resource-conditions)에서 확인할 수 있습니다. 이 기능은 로더에 설치된 모든 모드를 조회하는 범용 API가 아닙니다.

출처: [충전된 엔더 진주 가이드](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/main/resources/assets/myotus/ae2guide/item/charged_ender_pearl.md), [호환 프로세서 가이드](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/main/resources/assets/myotus/ae2guide/item/compat_processor.md).
