---
title: 버전 및 다운로드
description: Minecraft 버전별 Myotus 릴리스 다운로드와 소스 빌드 좌표를 구분합니다.
---

먼저 **Minecraft 버전과 로더를 선택하세요**. Myotus 버전 번호가 다르다고 해서 Minecraft 버전 간에 JAR을 바꿔 사용할 수 있는 것은 아닙니다.

## Minecraft 1.20.1

**Forge · Java 17**

[Myotus 15.1.0 다운로드](https://github.com/mc-myo-s-mod/Myotus/releases/tag/v1.20.1-15.1.0)

릴리스 에셋에서 일반 런타임 JAR을 사용하세요. 15.x API는 Forge 버전이며 Forge 전용 네트워킹 및 AE2WTLib 등록 API도 제공합니다.

## Minecraft 1.21.1

**NeoForge · Java 21**

[Myotus 19.1.1 다운로드](https://github.com/mc-myo-s-mod/Myotus/releases/tag/v1.21.1-19.1.1)

이 Minecraft 버전에는 19.x 버전을 사용하세요. 터미널 모듈 개발 작업은 여기서 설명하는 공개 API 스냅샷과 별개입니다.

## Minecraft 26.1.2

**NeoForge · Java 25**

[26.1.2 릴리스 보기](https://github.com/mc-myo-s-mod/Myotus/releases/tag/v26.1.2-26.0.0)

:::caution[릴리스 태그와 소스 버전이 다릅니다]
공개 릴리스 태그는 `v26.1.2-26.0.0`이지만, 문서화된 소스에서는 Maven 좌표를 `26.1.0`으로 설정합니다. 두 값을 의도적으로 구분해 표시했습니다. 이 위키의 `26.1.0` 예제는 로컬/소스 빌드용이지, 원격 Maven 저장소에서 이 버전을 제공한다는 뜻이 아닙니다.
:::

<span id="source-build-matrix"></span>

## 소스 빌드 버전 표

아래 값은 [문서화된 소스 스냅샷](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51) 기준이며, 실시간 호환성 피드가 아닙니다.

| Minecraft | 소스의 로더 | 소스의 AE2 | Myotus 좌표 |
| --- | --- | --- | --- |
| 1.20.1 | Forge 47.4.17 | 15.4.10 | `me.myogoo:myotus:15.1.0` |
| 1.21.1 | NeoForge 21.1.219 | 19.2.17 | `me.myogoo:myotus:19.1.1` |
| 26.1.2 | NeoForge 26.1.2.97 | 26.1.10-beta | `me.myogoo:myotus:26.1.0` |

최신 공개 파일은 [GitHub 전체 릴리스](https://github.com/mc-myo-s-mod/Myotus/releases)에서 확인하세요. 릴리스 링크는 **2026년 10월 4일**에 확인했습니다. 원격 Maven 아티팩트의 이용 가능 여부는 이 위키에서 확인하지 않았습니다.

## 버전 간 포팅

[API 차이 표](/ko/architecture/#version-differences-that-affect-addons)를 확인하세요. Minecraft 타입, 레시피, 조건, 네트워킹은 로더 버전마다 다릅니다. 실제 대상 버전마다 컴파일하고 테스트하세요.
