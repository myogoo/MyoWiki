---
title: "아키텍처와 생명주기"
description: "Myotus의 빌드 경계, 초기화 순서, 로더별 차이, 클라이언트와 서버의 책임을 알아봅니다."
---

:::note[소스 스냅샷]
이 문서는 공개 Myotus 소스 [`e7cfa3a`](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51)를 기준으로 합니다. 터미널 모듈 API를 포함한 최신 로컬 변경 사항은 다루지 않습니다. [버전 범위 확인](/ko/about/).
:::

## 빌드 경계

| 소스/빌드 | 담당 기능 |
| --- | --- |
| [common](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common) | 공유 어노테이션, 통합 검색, DTO, 리플렉션 헬퍼, 순수 Java `ExperienceMath`, 리소스 및 테스트 |
| [forge-1-20-1](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/forge-1-20-1) | Java 17 / Forge API, AE2 훅, Forge 네트워킹, AE2WTLib 등록 브리지 |
| [neoforge-1-21-1](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1) | Java 21 / NeoForge API, AE2 훅, 코덱 및 페이로드 구현 |
| [neoforge-26-1-2](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-26-1-2) | 공유 소스와 26.1.2 API/리소스를 사용하는 독립 Java 25 빌드 |

[루트 설정](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/settings.gradle)에는 앞의 세 행만 포함됩니다. 루트 모듈은 공통 Java 소스를 생성된 빌드 디렉터리로 동기화합니다. 독립 26.1.2 빌드는 공통 Java와 공통 테스트를 소스 세트에 직접 추가합니다. 동기화된 `build/generated`의 Java 파일은 편집하지 마세요.

공유 리소스는 `common/src/main/resources`에 있습니다. 로더의 `src/main/resources` 또는 `src/generated/resources`에 있는 리소스는 **동일한 상대 경로**의 공통 파일보다 우선합니다. 로더 생성 리소스는 데이터 생성이 관리하는 출력물입니다. 두 로더 루트 간에 중복 파일이 우연히 생겼을 때 복사 순서로 해결하려 하지 마세요. 호환되는 공유 모델, 언어 파일, 텍스처, 가이드는 common에 두고, 26.1.2 아이템 정의(`assets/myotus/items`)는 버전별로 둡니다.

기준 설정은 IDE의 디렉터리 순서가 아니라 [루트 build.gradle](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/build.gradle)과 [26.1.2 빌드 스크립트](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-26-1-2/build.gradle)입니다.

<span id="bootstrap-and-registration-order"></span>

## 초기화 및 등록 순서

1. 각 로더의 `Myotus` 생성자가 `_setInstance`로 `MyotusAPIImpl.INSTANCE`를 설치합니다. 이는 내부에서 한 번만 사용하는 훅이며, 애드온은 호출하면 안 됩니다.
2. Myotus는 어노테이션 스캔 데이터와 로더 모드 목록을 통합 검색에 전달합니다. Forge의 `integrations()`도 보호된 초기화 로직을 통해 이를 초기화하며, NeoForge는 모드 생성자에서 초기화합니다.
3. 애드온은 Myotus 초기화 이후 크리에이티브 탭 항목을 등록하고, 클라이언트 설정 탭은 클라이언트 설정 단계에서 등록하며, 명령 어댑터는 로더의 명령 등록 이벤트 전에 등록합니다.
4. Myotus는 `RegisterCommandsEvent`에서 `@MyoCommand` 클래스를 검색합니다. 크리에이티브 탭 공급 함수는 탭이 채워질 때 실행됩니다. 터미널 카드 콜백은 서버 메뉴의 갱신/닫기 흐름에서 실행됩니다.

`get()`, `configTabs()`, `creativeTabs()`, Forge의 `network()`는 설치된 API 인스턴스가 있어야 사용할 수 있습니다. `isInitialized()`는 그 인스턴스의 존재 여부만 확인하며, 모든 애드온의 등록이 끝났다는 뜻은 아닙니다. `tryGet()`은 특정 시점의 스냅샷이지 생명주기 이벤트가 아닙니다. 정적 싱글턴에 접근할 수 있다는 사실만으로 로더 검색이 끝났다고 판단할 수 없습니다.

진입점: [Forge](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/forge-1-20-1/src/main/java/me/myogoo/myotus/Myotus.java), [NeoForge 1.21.1](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/Myotus.java), [NeoForge 26.1.2](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-26-1-2/src/main/java/me/myogoo/myotus/Myotus.java).

## 사이드와 소유권 규칙

- `MyoConfigTab`, `MyoConfigTabScreen`, `MyotusAPI.Client`, 위젯 및 아이콘 타입은 클라이언트 전용입니다. 공통 초기화 코드에서 생성하면 전용 서버에서 클라이언트 클래스를 로드하려다 실패할 수 있습니다.
- `ITerminalUpgradeCard` 콜백은 서버 측에서 실행됩니다. 메뉴와 현재 카드 스택은 콜백이 실행되는 동안만 유효하다고 간주하세요. 이를 보관하거나 작업 스레드에서 변경하지 마세요.
- XP `consume`에는 서버 측 `ServerPlayer`가 필요합니다. 계획이 있다고 해서 나중에 결제할 권한이 생기는 것은 아닙니다. `consume`은 상태를 다시 확인하며, 호출 측에서도 메뉴/행동 요청을 검증해야 합니다.
- Forge 패킷 핸들러는 논리 메인 스레드에서 실행됩니다. 그래도 애드온은 발신자, 권한, 메뉴 소유권, 페이로드 크기를 확인해야 합니다.
- `@MyoMod`는 Myotus의 검색을 제어할 뿐, 임의의 애드온 코드에서 JVM 클래스 로딩을 제어하지 않습니다. 선택 모드의 import는 항상 로드되는 초기화 코드와 분리하세요.
- `ExperienceMath`에는 Minecraft나 선택 모드 의존성이 없으므로 일반 JVM 테스트에서 사용할 수 있습니다. 바깥쪽 `MyotusAPI`는 Minecraft/AE2 타입도 참조합니다.

## 애드온에 영향을 주는 버전 차이

<span id="version-differences-that-affect-addons"></span>

| 항목 | Forge 1.20.1 | NeoForge 1.21.1 | NeoForge 26.1.2 |
| --- | --- | --- | --- |
| 공개 리소스 ID 타입 | `ResourceLocation` | `ResourceLocation` | `Identifier` |
| 테이블 입력 경계 타입 | `Container` | `RecipeInput` | `RecipeInput` |
| `slotIngredients()` | `NonNullList<Ingredient>` | `NonNullList<Ingredient>` | `NonNullList<Optional<Ingredient>>` |
| 기본 `findRecipeId()` | 레시피의 ID | 비어 있음; holder ID 유지 | 비어 있음; holder ID 유지 |
| 조건 | Forge `IConditionSerializer` | NeoForge `MapCodec` | NeoForge `MapCodec` |
| 공개 `network()` / `api.network` | 있음 | 공개되지 않음 | 공개되지 않음 |
| 공개 `api.wt.AddTerminalEvent` | 있음 | 공개되지 않음 | 공개되지 않음 |

각 아티팩트는 서로 바꿔 쓸 수 있는 바이너리가 아니라 별도의 컴파일 대상입니다. 포팅할 때는 대상에 맞는 API JAR과 의존성을 사용하세요. 26.1.2에서는 `ResourceLocation.fromNamespaceAndPath(...)` 예제를 `Identifier.fromNamespaceAndPath(...)`로 바꾸고, 그 밖의 Minecraft/AE2 시그니처도 해당 소스에 맞춰야 합니다.

## API와 구현의 구분

`me.myogoo.myotus.api.*`는 애드온이 사용하는 공개 표면입니다. 공개 시그니처에서 노출되므로 API JAR에는 `MyoModDto`, `MyoModInfo`, `MyoIcon`, `CustomTabButton`, `MyoCycleButton`도 포함됩니다. 일반 Minecraft `Button`으로 충분하다면 `MyoConfigTab.createButton(...)`을 우선 사용하세요.

`MyotusAPIImpl`을 생성하거나 내부 매니저를 통해 등록하지 말고 `TerminalUpgradeStorageKey`/영속 NBT를 직접 조작하지 마세요. 이는 구현 세부사항이지 애드온 저장 스키마가 아닙니다. 공개 API는 임의의 Minecraft 객체에 대한 스레드 안전성, 자동 JEI/EMI/REI 플러그인 등록, 다중 저장소 XP 결제의 트랜잭션을 보장하지 않습니다. 이 한계는 [API 참조](/ko/api/)에 자세히 설명되어 있습니다.
