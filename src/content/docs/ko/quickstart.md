---
title: "애드온 빠른 시작"
description: "Myotus 애드온에 맞는 로더, API 아티팩트, 초기화 생명주기를 설정합니다."
---

:::note[소스 스냅샷]
이 문서는 공개 Myotus 소스 [`e7cfa3a`](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51)를 기준으로 합니다. 터미널 모듈 API를 포함한 최신 로컬 변경 사항은 다루지 않습니다. [버전 범위 확인](/ko/about/).
:::

[버전 표](/ko/versions/#source-build-matrix)에서 Minecraft/로더 조합을 선택하세요. 아래 예제는 이 체크아웃을 설명하며, 원격 아티팩트의 이용 가능 여부는 확인하지 않았습니다.

## Forge 1.20.1 및 NeoForge 1.21.1

먼저 [해당 루트 모듈을 로컬에 배포](/ko/workflows/#local-artifacts)하세요. 애드온에 이미 필요한 저장소 설정과 함께 `mavenLocal()`을 추가합니다.

Forge 1.20.1:

```groovy
dependencies {
    compileOnly "me.myogoo:myotus:15.1.0:api"
    runtimeOnly fg.deobf("me.myogoo:myotus:15.1.0")
}
```

NeoForge 1.21.1:

```groovy
dependencies {
    compileOnly "me.myogoo:myotus:19.1.1:api"
    runtimeOnly "me.myogoo:myotus:19.1.1"
}
```

`api` 분류자는 매핑된 컴파일용 아티팩트이지 런타임 모드가 아닙니다. 개발 런타임에는 분류자가 붙지 않은 일반 JAR을 유지하세요. AE2 타입을 사용하는 경우 애드온에 버전이 맞는 AE2 의존성을 설정하세요. 이 코드 조각은 완전한 로더 빌드 스크립트가 아닙니다.

## NeoForge 26.1.2

독립 빌드에는 별도의 [설정](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-26-1-2/settings.gradle)과 [빌드 스크립트](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-26-1-2/build.gradle)가 있습니다. 생성되는 Maven 배포 좌표는 설정된 그룹, 프로젝트 이름, 버전을 바탕으로 `me.myogoo:myotus:26.1.0`입니다. 해당 디렉터리에서 자체 래퍼와 Java 25를 사용해 `publishToMavenLocal`을 실행한 뒤 다음과 같이 사용합니다.

```groovy
dependencies {
    compileOnly "me.myogoo:myotus:26.1.0:api"
    runtimeOnly "me.myogoo:myotus:26.1.0"
}
```

로컬 빌드의 다른 방법으로 `build/libs`의 일반 JAR과 `-api.jar`를 애드온의 `libs` 디렉터리에 복사할 수 있습니다.

```groovy
dependencies {
    compileOnly files("libs/Myotus-26.1.2-26.1.0-api.jar")
    runtimeOnly files("libs/Myotus-26.1.2-26.1.0.jar")
}
```

파일 의존성에는 전이 의존성 메타데이터가 없습니다. AE2와 통합 의존성은 별도로 설정하세요. `mod_version`을 바꾼 경우 생성된 파일명을 확인하세요. 생성/로컬 Maven 배포만으로 원격에서 사용할 수 있다고 볼 수는 없습니다.

## 런타임 메타데이터

`examplemod`를 애드온 ID로 바꾸세요. 아래 범위는 해당 Myotus 메이저 버전에 맞춘 예시입니다. 애드온이 사용하는 API를 실제로 제공하는 최소 버전을 사용하세요.

Forge `META-INF/mods.toml`:

```toml
[[dependencies.examplemod]]
modId = "myotus"
mandatory = true
versionRange = "[15.1.0,16)"
ordering = "AFTER"
side = "BOTH"
```

NeoForge `META-INF/neoforge.mods.toml`:

```toml
[[dependencies.examplemod]]
modId = "myotus"
type = "required"
versionRange = "[19.1.1,20)"
ordering = "AFTER"
side = "BOTH"
```

현재 26.1.2 소스에는 `[26.1.0,27)`을 사용하세요. Myotus 통합 어노테이션이 로더 의존성 선언을 대신하지 않습니다.

<span id="first-runtime-contribution"></span>

## 첫 런타임 기여

정적 초기화 블록이 아니라 Myotus 초기화 이후 애드온의 일반 설정 단계에서 다음을 호출하세요.

```java
import me.myogoo.myotus.api.MyotusAPI;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;

MyotusAPI.creativeTabs()
        .registerCreativeTabItem(() -> Items.REDSTONE)
        .registerCreativeTabStack(() -> new ItemStack(Items.DIAMOND));
```

실제 애드온에서는 직접 등록한 아이템 공급 함수를 사용하세요. 공급 함수는 크리에이티브 탭이 채워질 때 평가되며 `null`을 반환하면 안 됩니다. 각 기여 항목은 한 번씩 등록하세요.

필수 의존성에서는 올바른 생명주기 시점 뒤에 `get()`을 호출하면 초기화 실수를 드러낼 수 있습니다. 선택적 접근에서는 `tryGet()`이 `Optional<IMyotusAPI>`를 반환합니다. 결과가 비어 있어도 재시도가 예약되지 않으며, 존재하지 않는 Myotus 클래스를 참조해도 안전해지는 것은 아닙니다.

## 다음 통합 기능

- [선택적 통합](/ko/api/#optional-integrations): 활성 상태를 조회하기 전에 마커를 선언합니다.
- [터미널 설정 탭](/ko/api/#terminal-config-tabs): 클라이언트 전용 빌더와 스타일 리소스입니다.
- [터미널 업그레이드 카드](/ko/api/#terminal-upgrade-cards): 서버의 열기/틱/닫기 콜백입니다.
- [Experience API](/ko/api/#experience-api): 포인트, 저장 장치, 시뮬레이션 및 변경 기능입니다.
- [명령](/ko/api/#commands): 내부 등록기 대신 선언과 어댑터를 사용합니다.
