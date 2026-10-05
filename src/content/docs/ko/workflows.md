---
title: "빌드 및 검증"
description: "Minecraft 및 Java 버전에 맞춰 Myotus를 빌드, 테스트하고 로컬에 배포합니다."
---

:::note[소스 스냅샷]
이 문서는 공개 Myotus 소스 [`e7cfa3a`](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51)를 기준으로 합니다. 터미널 모듈 API를 포함한 최신 로컬 변경 사항은 다루지 않습니다. [버전 범위 확인](/ko/about/).
:::

아래는 Windows 래퍼 명령입니다. Forge 1.20.1에는 Java 17, NeoForge 1.21.1에는 Java 21, NeoForge 26.1.2에는 Java 25를 사용하세요. `GRADLE_USER_HOME`은 기존 캐시를 유지하고, 매핑된 Minecraft/의존성 아티팩트가 준비되기 전에는 오프라인 모드로 실행하지 마세요.

## 루트 모듈

Myotus 루트에서 실행하세요. ForgeGradle 검사는 `--no-configuration-cache`를 사용합니다.

```powershell
cmd.exe /c "gradlew.bat :common:test --console=plain --no-configuration-cache"
cmd.exe /c "gradlew.bat :forge-1-20-1:compileJava :forge-1-20-1:test :forge-1-20-1:build --console=plain --no-configuration-cache"
cmd.exe /c "gradlew.bat :neoforge-1-21-1:compileJava :neoforge-1-21-1:test :neoforge-1-21-1:build --console=plain --no-configuration-cache"
```

영향을 받는 각 로더에 필요한 경우 런타임 및 데이터 작업을 실행하세요.

```powershell
cmd.exe /c "gradlew.bat :forge-1-20-1:runClient --console=plain --no-configuration-cache"
cmd.exe /c "gradlew.bat :forge-1-20-1:runServer --console=plain --no-configuration-cache"
cmd.exe /c "gradlew.bat :forge-1-20-1:runGameTestServer --console=plain --no-configuration-cache"
cmd.exe /c "gradlew.bat :forge-1-20-1:runData --console=plain --no-configuration-cache"
cmd.exe /c "gradlew.bat :neoforge-1-21-1:runClient --console=plain --no-configuration-cache"
cmd.exe /c "gradlew.bat :neoforge-1-21-1:runServer --console=plain --no-configuration-cache"
cmd.exe /c "gradlew.bat :neoforge-1-21-1:runGameTestServer --console=plain --no-configuration-cache"
cmd.exe /c "gradlew.bat :neoforge-1-21-1:runData --console=plain --no-configuration-cache"
```

## 독립 26.1.2 빌드

`neoforge-26-1-2`에서 해당 디렉터리의 래퍼와 Java 25를 사용해 실행하세요. 이 모듈은 루트의 `:neoforge-26-1-2` 하위 프로젝트가 아닙니다.

```powershell
cmd.exe /c "gradlew.bat compileJava test build --console=plain"
cmd.exe /c "gradlew.bat runClient --console=plain"
cmd.exe /c "gradlew.bat runServer --console=plain"
cmd.exe /c "gradlew.bat runGameTestServer --console=plain"
cmd.exe /c "gradlew.bat runData --console=plain"
```

이 빌드의 `test` 소스 세트에는 `common/src/test/java`가 포함됩니다. 루트 로더 모듈은 자체 테스트를 실행하며, `:common:test`는 루트 빌드에서 별도로 검사해야 합니다.

## CI 및 릴리스 배포

[`build.yml`](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/.github/workflows/build.yml)은 먼저 공통 테스트를 실행한 다음 세 Minecraft 버전 모두에 대해 `runData`, `build`, 아티팩트 업로드를 실행합니다. 26.1.2 매트릭스 항목은 Java 25와 자체 래퍼를 사용하고, 이전 버전은 루트 래퍼와 Java 17/21 툴체인을 사용합니다.

[`publish-release.yml`](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/.github/workflows/publish-release.yml)은 `<minecraft>-<mod-version>` 형식과 선택적 `-hotfix<N>` 접미사가 붙은 릴리스 태그를 받습니다. GitHub 릴리스를 게시하면 선택한 버전을 빌드하고 동일한 JAR을 GitHub Release, Maven Central, Modrinth, CurseForge에 게시합니다. 이 워크플로는 프로젝트 버전의 `-SNAPSHOT` 사용을 거부하므로 릴리스 태그를 만들기 전에 선택한 모듈의 버전을 릴리스 버전으로 변경하세요. 수동 실행은 Maven Central에만 누락분을 보충하는 경로입니다.

<span id="local-artifacts"></span>

## 로컬 아티팩트

루트 모듈의 좌표와 아티팩트는 [build.gradle](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/build.gradle)에서 설정합니다. 로컬 Maven 캐시에 넣으려면 루트에서 다음을 실행하세요.

```powershell
cmd.exe /c "gradlew.bat :forge-1-20-1:publishToMavenLocal --console=plain --no-configuration-cache"
cmd.exe /c "gradlew.bat :neoforge-1-21-1:publishToMavenLocal --console=plain --no-configuration-cache"
```

빌드는 배포 서명을 사용하므로 로컬 서명 설정이 없으면 배포가 막힐 수 있습니다. 그래도 각 모듈의 `build/libs`에는 JAR이 생성됩니다. 애드온에 좌표를 전달하기 전에 실제 아티팩트를 확인하세요. Maven Central 배포가 설정되어 있다는 사실만으로 릴리스가 게시되었다고 볼 수는 없습니다.

26.1.2의 경우 Java 25를 사용해 `neoforge-26-1-2`에서 실행하세요.

```powershell
cmd.exe /c "gradlew.bat publishToMavenLocal --console=plain"
```

생성된 Maven POM에는 `me.myogoo:myotus:26.1.0`이 표시됩니다. 독립 빌드에는 `api` 분류자가 추가되며 루트 모듈과 동일한 서명 및 Maven Central 배포 계약이 설정됩니다. Maven 및 직접 JAR 예제는 [26.1.2 설정](/ko/quickstart/#neoforge-2612)을 참고하세요.

일반 Forge 아티팩트는 분류자가 없는 jar-in-jar/reobfuscated 모드이며 `-dev.jar`가 아닙니다. 모든 로더에서 `-api.jar`는 컴파일 전용입니다. 로컬 배포는 원격 릴리스 배포가 아닙니다.

## 각 검사가 확인하는 항목

재사용 가능한 [리소스 오버라이드 검사](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/scripts/Test-ResourceOverrides.ps1)는 임시 충돌 픽스처를 만들고, 실제 리소스 작업을 실행하며, 로더 `main`/`generated` 우선순위와 공통 리소스로의 증분 대체 동작을 확인한 다음 자신이 만든 픽스처를 제거합니다. 빌드에서 설정한 JDK로 실행하세요.

```powershell
.\scripts\Test-ResourceOverrides.ps1 -ProjectRoot . -Modules forge-1-20-1,neoforge-1-21-1
# With Java 25, from the same repository root:
.\scripts\Test-ResourceOverrides.ps1 -ProjectRoot .\neoforge-26-1-2 -Modules . -CommonRoot ../common/src/main/resources
```

- `compileJava`: 컴파일 시점의 Java 시그니처 및 의존성 호환성.
- `test`: 설정된 JVM 테스트. [공유 XP 계산](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/test/java/me/myogoo/myotus/api/experience/ExperienceMathTest.java), [통합 상태](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/test/java/me/myogoo/myotus/util/mod/ModIntegrationManagerTest.java), 로더별 `CommandsApiTest`/`ExperienceApiExtractionTest` 클래스가 포함됩니다.
- `build`: 컴파일, 설정된 테스트, 리소스 처리 및 패키징을 확인하지만 게임 내 테스트는 아닙니다.
- `runGameTestServer`: 등록된 게임 내 검사를 실행합니다. 예를 들어 [Forge XP/터미널 테스트](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/forge-1-20-1/src/main/java/me/myogoo/myotus/gametest/MyoExperienceGameTests.java), [1.21.1 테스트](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/gametest/MyoExperienceGameTests.java), [26.1.2 테스트](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-26-1-2/src/main/java/me/myogoo/myotus/gametest/MyoExperienceGameTests.java) 등이 있습니다.
- `runClient` / `runServer`: 시작 및 사이드별 로딩을 확인합니다. 타이틀 화면이나 서버 시작에 도달해도 카드 동작, 레시피 전송, 렌더링, 실제 작업 부하에서의 성능까지 확인된 것은 아닙니다.
- `runData`: 생성 리소스를 확인합니다. 의도한 `src/generated/resources` 변경 사항을 검토하고, 공통/로더 오버라이드 후 패키징된 리소스를 확인하세요.

터미널을 변경했다면 실제 터미널을 열어 변경된 UI/카드 경로를 사용하고, 닫았다가 다시 열어 관련된 사망/재접속 동작을 테스트하세요. XP를 변경했다면 전력/XP 부족, 시뮬레이션과 실행 사이의 저장소 변경, 의도한 유체 변환을 시험하세요. 각 실행에서 어디까지 확인했는지 기록하세요. 시작 성공은 기능 성공이 아닙니다.
