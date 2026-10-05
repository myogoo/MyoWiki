---
title: Myotus 설치
description: Minecraft 버전과 모드 로더에 맞는 Myotus 빌드를 선택합니다.
---

Myotus는 Applied Energistics 2 애드온용 라이브러리입니다. 다른 모드에서 Myotus를 요구하면 해당 애드온 및 AE2와 함께 버전에 맞는 런타임 모드를 설치하세요.

## Minecraft 버전 선택

| Minecraft | 로더 | Java |
| --- | --- | --- |
| 1.20.1 | Forge | 17 |
| 1.21.1 | NeoForge | 21 |
| 26.1.2 | NeoForge | 25 |

세 빌드는 서로 바꿔 사용할 수 없습니다. 해당 GitHub 릴리스 링크는 [버전 및 다운로드](/ko/versions/)를 참고하세요.

## 런타임 모드 추가

1. 기존 모드를 교체하기 전 Minecraft를 종료하고 인스턴스를 백업하세요.
2. Minecraft 버전에 맞는 **일반 Myotus JAR**을 다운로드하세요. `-sources.jar`, `-api.jar`, `-dev.jar`는 런타임 모드로 사용하지 마세요.
3. JAR을 인스턴스의 `mods` 폴더에 넣으세요. 한 인스턴스에는 Myotus 런타임 버전 하나만 두세요.
4. 버전에 맞는 AE2와 애드온이 요구하는 의존성을 설치하세요.
5. 인스턴스를 실행하고 모드 목록에서 Myotus가 표시되는지 확인하세요.

:::tip[모드팩을 사용하나요?]
업데이트를 의도적으로 시험하는 경우가 아니라면 모드팩이 지정한 버전을 유지하세요. 최신 Myotus 빌드가 모든 구버전 애드온과 자동으로 호환되는 것은 아닙니다.
:::

## 로딩에 실패하는 경우

`logs/latest.log` 또는 생성된 크래시 보고서에서 관련된 첫 오류를 확인하세요. [이슈 보고](https://github.com/mc-myo-s-mod/Myotus/issues)에는 Minecraft 버전, 로더 버전, Myotus 파일명, AE2 버전, 관련 애드온 버전을 포함하세요.

주요 확인 사항:

- NeoForge에 Forge 빌드를 설치했거나 다른 Minecraft 버전용 빌드를 설치하지 않았는지 확인합니다.
- 한 인스턴스에 Myotus 런타임 JAR이 두 개 들어 있지 않은지 확인합니다.
- API 전용 아티팩트를 모드로 설치하지 않았는지 확인합니다.
- 애드온이 현재와 다른 Myotus 또는 AE2 버전 범위를 요구하지 않는지 확인합니다.

## 애드온을 개발하나요?

[애드온 빠른 시작](/ko/quickstart/)에서 `compileOnly` API 분류자와 일반 런타임 의존성을 설명합니다.
