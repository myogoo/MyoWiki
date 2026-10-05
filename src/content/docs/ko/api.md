---
title: "API 레퍼런스"
description: "Myotus 통합, 터미널 업그레이드, 설정 탭, 경험치 및 명령어에 관한 소스 연결 계약 문서입니다."
---

:::note[소스 스냅샷]
이 레퍼런스는 [`e7cfa3a`](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51)의 공개 Myotus 소스를 따릅니다. 터미널 모듈 API를 포함한 이후의 로컬 변경 사항은 다루지 않습니다. [버전 범위 확인](/ko/about/).
:::

이 페이지는 이전 파사드 이름이 아니라 소스 코드를 따릅니다. `IntegrationsApi`, `TerminalUpgradesApi`, `CommandsApi`, `ExperienceApi`는 `MyotusAPI`의 중첩 클래스입니다. 이 체크아웃에는 공개 `TerminalUpgradeFacade` 또는 `ExperienceFacade`가 없습니다.

소스: [Forge MyotusAPI](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/forge-1-20-1/src/main/java/me/myogoo/myotus/api/MyotusAPI.java), [NeoForge 1.21.1 MyotusAPI](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/api/MyotusAPI.java), [NeoForge 26.1.2 MyotusAPI](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-26-1-2/src/main/java/me/myogoo/myotus/api/MyotusAPI.java).

## 런타임 접근

- `MyotusAPI.get()`은 `IMyotusAPI`를 반환하며, 런타임 인스턴스가 설치되지 않은 경우 예외를 던집니다.
- `tryGet()`은 `Optional<IMyotusAPI>`를 반환하고, `isInitialized()`는 같은 상태를 확인합니다.
- `configTabs()`와 `creativeTabs()`는 런타임 인스턴스에 위임합니다. Forge 전용 `network()`도 마찬가지입니다.
- `IMyotusAPI`는 메서드 체이닝을 위한 `registerConfigTab`, `registerCreativeTabItem`, `registerCreativeTabStack` 별칭도 제공합니다.
- `_setInstance(...)`는 내부 부트스트랩 메서드이지 애드온 등록 API가 아닙니다.

[라이프사이클 및 사이드 규칙](/ko/architecture/#bootstrap-and-registration-order)을 따르세요. 필수 등록을 너무 이른 `tryGet().ifPresent(...)` 콜백에 넣어 조용히 누락시키지 마세요.

<span id="optional-integrations"></span>
## 선택적 통합

`MyotusAPI.integrations()`는 **Myotus가 관리하는 통합**을 보고합니다. 로더에 설치된 모든 모드를 제한 없이 조회하는 API가 아닙니다.

| 메서드 | 의미 |
| --- | --- |
| `isRegistered(String)` / `isRegistered(Class<? extends Annotation>)` | Myotus가 일치하는 등록을 알고 있습니다. 선언된 ID/별칭이 활성 상태일 필요는 없습니다. 문자열 조회는 활성 통합의 네임스페이스/표시 이름도 인식합니다. |
| `isLoaded(String/Class/Type/MyoModDto)` | 모드 존재 여부, 버전, 사용자 지정 조건, 모드 검사를 통과한 일치 통합이 활성 상태입니다. |
| `find(String)` | 사용 가능한 경우 활성 `MyoModDto`를 반환합니다. |
| `findAnnotation(String)` | 고유한 일치 어노테이션을 반환하며, 활성 일치를 우선합니다. 모호하면 비어 있는 결과를 반환합니다. |
| `findAnnotation(MyoModDto)` | 해당 활성 등록의 어노테이션입니다. |
| `activeIntegrations()` | 활성 DTO를 어노테이션 클래스에 대응시키는 수정 불가 맵입니다. |

문자열 조회에는 안정적인 모드 ID 또는 명시적 별칭을 사용하세요. 여러 등록이 모드 ID를 공유한다면 어노테이션 클래스나 서로 다른 별칭으로 등록 하나를 식별하세요.

예를 들어 애드온에 런타임 유지 마커 어노테이션을 선언합니다.

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import me.myogoo.myotus.api.annotation.MyoMod;

@MyoMod(value = "examplemod", alias = "example_feature", versionRange = "[1.0,2.0)")
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
public @interface ExampleIntegration {}
```

로더 초기화가 끝난 뒤 조회합니다.

```java
boolean known = MyotusAPI.integrations().isRegistered(ExampleIntegration.class);
boolean active = MyotusAPI.integrations().isLoaded(ExampleIntegration.class);
```

`@MyoMod`의 기본값은 `versionRange = "*"`, `mode = DEFAULT`, 사용자 지정 조건 없음입니다. `customCondition`은 인자 없이 생성할 수 있는 `MyoCustomCondition.test(MyoModInfo)` 구현체를 지정합니다. 결과가 `false`이면 해당 등록이 비활성화되고, 조건 생성 또는 평가 실패는 로그에 기록한 뒤 `false`로 처리합니다.

같은 모드에 대한 사용자 지정 조건이 없는 등록은 별칭을 공유하고 버전 범위의 교집합을 사용합니다. 충돌하는 별칭/범위는 거부됩니다. 설치된 모드가 적용 가능한 범위를 벗어나면 단순히 `isLoaded(...) == false`가 되는 것이 아니라 로딩 오류가 발생합니다. 활성화 그룹 내에서는 활성 `OVERRIDE` 등록이 비-override 등록을 억제합니다. 사용자 지정 조건이 있는 등록은 `EXTENDED`로 표시하지 않는 한 일반적으로 별도 그룹을 구성합니다. 이는 Myotus 검색 정책이며, 로더 종속성 메타데이터나 안전한 선택적 클래스 격리를 대체하지 않습니다.

소스: [MyoMod](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/main/java/me/myogoo/myotus/api/annotation/MyoMod.java), [사용자 지정 조건](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/main/java/me/myogoo/myotus/api/integration/MyoCustomCondition.java), [통합 관리자](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/main/java/me/myogoo/myotus/util/mod/ModIntegrationManager.java).

### 아이템 목록 어노테이션

공유 API에는 `@JEI`, `@EMI`, `@REI`, `@RecipeAdd`, `@RecipeCategory`, `@RecipeTransfer`, `@JEIGuiHandler`, `@MyotusSubscriber`가 있습니다.

[구독자 헬퍼](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/integration/itemList/ItemListModLoadHelper.java)는 요청된 등록 유형을 정확히 하나의 매개변수로 받는 정적 구독자 메서드만 허용합니다. 비활성 통합 마커를 필터링하며, 잘못된 시그니처/호출 실패를 로그에 기록합니다.

하지만 이 체크아웃에는 해당 헬퍼를 배포된 JEI/EMI/REI 플러그인 등록 이벤트에 연결하는 **호출자가 없습니다**. 어노테이션만으로는 레시피, 카테고리 또는 전송 핸들러가 등록되지 않습니다. 실제 통합에는 대상 모드의 일반 플러그인 API를 사용하세요. 마커 이름이나 Javadoc만 보고 자동 등록 연결 기능이 있다고 추정하지 마세요.

<span id="shared-creative-tab"></span>
## 공유 크리에이티브 탭

`ICreativeTabRegistrar`는 다음 항목을 제공합니다.

- `creativeTabItem(Supplier<? extends ItemLike>)` 및 `creativeTabStack(Supplier<ItemStack>)`.
- 유창한 호출을 위한 `registerCreativeTabItem(...)` / `registerCreativeTabStack(...)` 별칭.
- 반복 가능한 `registerCreativeTabItems(...)` / `registerCreativeTabStacks(...)` 별칭.

Myotus 초기화 후 한 번 등록하세요. 탭을 채울 때 공급자가 평가되므로 null이 아닌 값을 반환해야 하며, 사용자 지정 상태를 담는 스택은 새로 생성해야 합니다. 아이템 공급자가 스택 공급자보다 먼저 처리됩니다. 이 API는 Minecraft의 아이템 레지스트리에 아이템을 등록하지 않습니다.

예시: [첫 런타임 기여](/ko/quickstart/#first-runtime-contribution). 소스: [ICreativeTabRegistrar](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/api/registrar/ICreativeTabRegistrar.java).

<span id="terminal-config-tabs"></span>
## 터미널 설정 탭

`MyoConfigTab`은 안정적인 ID, 제목, 아이콘, 스타일 경로, `MyoConfigTabScreen`, 표시 조건자를 갖는 클라이언트 전용 불변 정의입니다. 아이콘 오버로드는 AE2 `Icon`, `Blitter`, `MyoIcon` 또는 `ItemStack`을 받습니다. 스택 아이콘은 복사됩니다. ID는 고유해야 하며 스타일 경로는 공백이 아니어야 합니다.

1.20.1/1.21.1에서 클라이언트 전용 클래스에 사용할 수 있는 완전한 등록 메서드입니다.

```java
import me.myogoo.myotus.api.MyotusAPI;
import me.myogoo.myotus.api.config.MyoConfigTab;
import me.myogoo.myotus.api.config.MyoConfigTabScreen;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;

public static void registerTerminalTab(String stylePath, MyoConfigTabScreen contents) {
    MyotusAPI.configTabs().registerTerminalConfigTab(new MyoConfigTab(
            ResourceLocation.fromNamespaceAndPath("examplemod", "terminal_settings"),
            Component.literal("Example"), new ItemStack(Items.REDSTONE),
            stylePath, contents
    ).visibleWhen(context -> context.isItemHost()));
}
```

스타일과 빌더는 직접 제공해야 합니다. 이 메서드가 둘을 생성하지는 않습니다. `MyoConfigTabScreen.buildTab(WidgetContainer, AEBaseScreen<?>)`가 탭 내용을 추가합니다. 현재 화면은 AE2 화면 스타일 메커니즘을 통해 `"/screens/config/" + stylePath`를 불러오며, 탭 ID를 스타일 리소스로 해석하지 않습니다. 기존 공유 스타일은 [assets/ae2/screens/config](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/main/resources/assets/ae2/screens/config)에 있습니다.

`visibleWhen(...)`은 새 탭 정의를 반환합니다. 컨텍스트는 `menu()`, `host()`, `player()`, `isItemHost()`, `getHostItemStack()`, `isHostItem(Item/id)`, `isHostItemFrom(namespace)`를 제공합니다. 표시 조건자에서 호스트 스택을 보관하거나 변경하지 마세요. 표시 여부는 화면 표현을 제어할 뿐, 서버 권한을 부여하지 않습니다.

`IConfigRegistrar`는 `terminalConfigTab(...)` 및 반복 가능한 `registerTerminalConfigTabs(...)`도 제공합니다. 중복 ID는 기존 탭을 대체하지 않고 예외를 던집니다. `createButton(...)`은 Minecraft `Button`을 반환하고, `getTabButton(...)`은 이를 지원하는 `CustomTabButton` 유형을 노출합니다.

소스: [MyoConfigTab](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/api/config/MyoConfigTab.java), [컨텍스트](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/api/config/MyoConfigTabContext.java), [화면 빌더](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/api/config/MyoConfigTabScreen.java).

### 클라이언트 위젯

`MyotusAPI.Client.Widgets.keyBindingButton(label, changeListener)` 및 `initialKey`를 받는 오버로드는 `AbstractButton`을 반환합니다. 리스너는 `List<InputConstants.Key>`를 받습니다.

API 분류에는 `me.myogoo.myotus.client.gui.widgets.button`의 `MyoCycleButton`도 포함됩니다. 생성자는 `Consumer<MyoCycleButton.MouseButton>` (`LEFT`/`RIGHT`) 또는 좌/우 클릭별 `Runnable` 동작을 받고, 아이템/툴팁 공급자도 받습니다. 아이콘 공급자를 받는 오버로드도 있습니다. 키보드 활성화는 왼쪽 클릭 동작을 따릅니다. 이 유형은 모두 클라이언트 전용이며 기반 Minecraft 위젯 API는 버전마다 다릅니다.

<span id="terminal-upgrade-cards"></span>
## 터미널 업그레이드 카드

일반적으로 등록한 아이템에 [ITerminalUpgradeCard](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/api/ITerminalUpgradeCard.java)를 구현하세요. 1.20.1/1.21.1 예시입니다.

```java
import appeng.menu.me.common.MEStorageMenu;
import me.myogoo.myotus.api.ITerminalUpgradeCard;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;

public final class ExampleCard extends Item implements ITerminalUpgradeCard {
    public ExampleCard(Properties properties) {
        super(properties.stacksTo(1));
    }

    @Override
    public void onTerminalTick(MEStorageMenu menu, ItemStack stack) {
        // Your server-side behavior while this terminal is open.
    }
}
```

콜백 세 가지 모두 기본 구현은 아무 동작도 하지 않습니다.

| 콜백 | 실행 시점 |
| --- | --- |
| `onTerminalOpen(menu, stack)` | 구체적인 메뉴가 생성된 뒤 첫 서버 메뉴 업데이트 시점 또는 활성 메뉴에 카드가 삽입될 때 |
| `onTerminalTick(menu, stack)` | 열린 터미널에 설치되어 있는 동안 서버 틱마다 한 번 |
| `onTerminalClose(menu, stack)` | 메뉴가 닫히거나 카드가 제거될 때. 제거 시 마지막 스냅샷을 전달합니다. |

설치된 카드의 콜백 스택은 실제 스택이며 카드 자체 데이터를 담을 수 있습니다. 아이템/수량을 변경하거나 참조를 보관하지 마세요. 메뉴가 닫힌 뒤에는 카드가 백그라운드 틱을 받지 않습니다. 터미널에는 같은 아이템 유형을 하나만 설치할 수 있으므로 중첩 불가능한 아이템을 사용하세요.

`MyotusAPI.terminalUpgrades()`는 `installedUpgrades(menu)`, `installedUpgradeItems(menu)`, `availableUpgradeCards(menu)`, `availableUpgradeTooltip(menu)`, `hasUpgrade(menu, item/id)`, `countUpgrade(menu, item/id)`, `canInsertUpgrade(installedStacks, slot, stack)`를 제공합니다.

```java
boolean installed = MyotusAPI.terminalUpgrades().hasUpgrade(menu, cardItem);
var snapshots = MyotusAPI.terminalUpgrades().installedUpgrades(menu);
```

`installedUpgrades`는 복사한 스택을 반환하며, 이를 수정해도 터미널은 바뀌지 않습니다. 사용 가능한 카드는 설치된 아이템 유형을 제외하고 레지스트리에서 찾아낸 설치 가능 카드 아이템이지 플레이어 인벤토리가 아닙니다. 아이템 ID 조회는 아이템이 없으면 `false`/0을 반환합니다. 이 헬퍼는 Myotus 업그레이드 슬롯에 관한 것으로, AE2 기계 업그레이드를 설치하거나 해당 채널이 없는 버전에서 AE2 View Cell 필터링을 자동으로 연결하지 않습니다.

<span id="experience-api"></span>
## 경험치 API

### 순수 계산과 계획

모든 경험치 잔량/비용은 레벨, 유체 양, 인챈트 라이브러리 포인트가 아니라 **바닐라 원시 XP 포인트** 단위입니다. `ExperienceMath`는 공유 순수 Java API이며, `MyotusAPI.experience()`는 이를 위임 호출하면서 플레이어/ME 작업을 추가합니다.

```java
import me.myogoo.myotus.api.MyotusAPI;
import me.myogoo.myotus.api.experience.ExperienceMath;

var xp = MyotusAPI.experience();
long level30 = xp.totalForLevel(30); // 1395
int level = xp.levelForTotal(level30); // 30
var plan = xp.plan(75, new ExperienceMath.ExperienceAmounts(30, 40, 50));
assert plan.canPay() && plan.player() == 30 && plan.fluidXp() == 40
        && plan.appliedExperiencedAmount() == 5;
```

`plan(required, amounts[, priority])`는 어떤 값도 변경하지 않습니다. 기본 우선순위는 `PLAYER`, `FLUID_XP`, `APPLIED_EXPERIENCED_AMOUNT`입니다. 중복 우선순위 항목은 무시하고, 지정하지 않은 출처는 지불에 사용할 수 없습니다. `MyoExperience`는 `required`, (입력된 모든 잔액의 합인) `available`, (우선순위 출처에서 사용 가능한 양인) `spendable`, `missing`, 출처별 사용량, `used(source)`, `usedAmounts()`, `totalUsed()`, 그리고 `enough()`/`canPay()` 동등 확인 메서드를 제공합니다.

그 밖의 계산 메서드는 `total(...)`, `intoLevel(total)`, `toNextLevel(level)`, `vanillaAnvilCost(...)`, `apothicAnvilCost(levelCost)`, `apothicEnchantingTableCost(level, slot)`, `apothicLibraryPointsForLevel(level)`입니다. 마지막 메서드는 XP가 아니라 라이브러리 포인트를 반환합니다. 이는 다른 모드의 설정을 실시간으로 읽는 메서드가 아니라 계산 메서드입니다. 입력은 음이 아니어야 하며, 오버플로가 발생하면 검사된 산술 연산이 예외를 던질 수 있습니다.

안정적인 식별자: `appliedModId()` → `appex`, `appliedAeKeyId()` → `appex:experience`, `appliedAmountComponentId()` → `appex:experience_amount`, `fluidXpId()` → `fluid:xp`. 식별자가 보편적인 유체 변환 규칙을 의미하지는 않습니다.

### 저장소 어댑터

기본 네트워크 어댑터는 `appliedExperiencedStorage()`이며, Applied Experienced AE 키 유형과 키 ID가 모두 일치하고 원시 XP 1당 저장 단위 1을 사용합니다. 계산 API에서는 Applied Experienced 클래스를 가져오지 않습니다.

유체 저장소는 기본적으로 비활성화되어 있습니다. 소유 통합에서 정한 변환율을 사용해 `fluidStorage(Predicate<AEKey>, unitsPerXp)` 또는 `taggedFluidStorage(unitsPerXp)`를 사용하세요. 유체 매처는 `AEFluidKey`로 제한됩니다.

호출자가 제공한 유체 ID와 설정된 변환율을 사용하는 1.20.1/1.21.1 예시입니다.

```java
import java.util.List;
import me.myogoo.myotus.api.MyotusAPI;
import net.minecraft.resources.ResourceLocation;

ResourceLocation fluidId = ResourceLocation.fromNamespaceAndPath("examplemod", "liquid_xp");
long unitsPerXp = 250; // Example only: replace with the owning integration's configured rate.
var xp = MyotusAPI.experience();
var fluid = xp.fluidStorage(key -> key.getId().equals(fluidId), unitsPerXp);
var adapters = List.of(xp.appliedExperiencedStorage(), fluid);
var priority = xp.defaultAnvilSourcePriority();
```

`ExperienceStorageAdapter(source, matcher, unitsPerXp)`는 `PLAYER` 및 0 이하 변환율을 거부합니다. `toExperience(units)`는 완전한 XP 묶음 단위로 내림하고, `toStorageUnits(xp)`는 오버플로를 검사하는 곱셈을 사용합니다. 한 작업에서는 출처당 어댑터 하나만 허용되며, 매처가 서로 겹치면 안 됩니다.

### 읽기, 시뮬레이션, 변경 순서

| 메서드 | 계약 |
| --- | --- |
| `playerRaw(player)` | 레벨/진행도를 바탕으로 원시 XP를 재구성합니다. |
| `stored(storage, source/adapter)` / `hasNetworkSource(...)` | 확인 가능한 저장량만 반환합니다. 전력 또는 추출 권한은 보장하지 않습니다. |
| `extractable(energy, storage, actionSource, source/adapter)` | 전력이 공급된 추출을 시뮬레이션하고 원시 XP를 반환합니다. |
| `planPayment(energy, storage, actionSource, player/rawPlayerXp, required, priority[, adapters])` | 현재 추출 가능한 네트워크 XP를 기준으로 변경 없는 지불 계획을 만듭니다. |
| `canConsume(energy, storage, actionSource, player, required, priority[, adapters])` | 지불 가능 여부를 사전 검사하며 XP를 예약하지 않습니다. |
| `consume(energy, storage, actionSource, player, required, priority[, adapters])` | 다시 확인하고 지불합니다. 서버 측 `ServerPlayer`가 필요합니다. |
| `canExtract(...)`, `extractExact(...)`, `extract(..., source/adapter, Actionable)` | 출처 또는 어댑터를 사용해 원시 XP 단위로 시뮬레이션/추출하는 저수준 메서드입니다. |

`availableAnvilSourcePriority(...)`는 주어진 플레이어 선택, 전력, 저장소, 작업 출처, 선택적 어댑터를 기준으로 사용 가능한 네트워크 출처를 선택합니다. `anvilSourcePriority(...)`는 명시적인 유체 가용량 값/플래그로만 우선순위를 구성하며 네트워크를 살펴보지 않습니다.

실제 서버 작업에서는 `consume`을 호출하고 성공한 경우에만 비용을 지불한 작업을 수행하세요. UI 상태에는 별도의 `canConsume`이 유용하지만 `consume` 전에 반드시 호출할 필요는 없습니다.

```java
boolean paid = xp.consume(energy, storage, actionSource, player, 75, priority, adapters);
if (paid) {
    // Perform the operation whose cost was just paid.
}
```

여기서 변수는 기존 AE2 `IEnergySource`, `MEStorage`, `IActionSource`, 서버 플레이어, 그리고 위에서 설명한 어댑터/우선순위입니다. 적절한 서버 스레드에서 호출하세요. 크리에이티브 플레이어는 지불 없이 `canConsume`을 통과하지만, `consume`이 크리에이티브 성공을 반환하기 전에도 서버 측 플레이어를 요구합니다.

사전 검사가 실패하면 상태를 변경하지 않습니다. 실행 중에는 네트워크 XP를 먼저 추출하고 플레이어 XP를 마지막에 추출합니다. **여러 AE 저장소 어댑터를 아우르는 트랜잭션은 없습니다.** 시뮬레이션과 변조 사이에 저장소가 바뀌면 앞선 네트워크 차감 일부가 발생한 뒤 실패할 수 있습니다. 출처 간 롤백은 보장하지 않습니다. 네트워크 출처를 여러 개 사용할 때는 경쟁하는 변경 작업을 직렬화하세요. 지불 계획, 성공한 시뮬레이션 또는 작업별 저장소 스냅샷은 예약이 아닙니다.

소스: [ExperienceMath](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/main/java/me/myogoo/myotus/api/experience/ExperienceMath.java), [ExperienceStorageAdapter](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/api/experience/ExperienceStorageAdapter.java), 그리고 위에 링크된 로더 `MyotusAPI` 소스.

<span id="commands"></span>
## 명령어

Myotus는 로더의 `RegisterCommandsEvent` 중에 `@MyoCommand` 클래스를 검색합니다. `@MyoExecute` 메서드는 정적이어야 합니다. 컨텍스트 매개변수(`CommandSourceStack` 또는 `CommandContext<CommandSourceStack>`)는 삽입되며, 다른 매개변수에는 `@MyoArgument`가 필요합니다.

```java
import me.myogoo.myotus.api.annotation.commands.MyoCommand;
import me.myogoo.myotus.api.annotation.commands.MyoExecute;
import net.minecraft.commands.CommandSourceStack;
import net.minecraft.network.chat.Component;

@MyoCommand("example_status")
public final class ExampleStatusCommand {
    @MyoExecute
    public static int execute(CommandSourceStack source) {
        source.sendSuccess(() -> Component.literal("Example integration is ready"), false);
        return 1;
    }
}
```

`@MyoCommand(parent = ParentCommand.class)`는 하위 명령을 연결합니다. `@MyoExecute("path")`는 실행 경로를 추가하고 `@MyoAlias`는 별칭을 선언합니다. 클래스 수준 `@MyoDebug`는 개발 모드가 아닐 때 명령을 제외합니다. 어노테이션은 메서드에도 적용할 수 있지만, 현재 명령 등록자는 클래스만 필터링합니다. 변경 작업에는 고유한 리터럴과 명시적 권한을 사용하세요.

기본 어댑터는 `int`/`Integer`, `double`/`Double`, `float`/`Float`, `boolean`/`Boolean`, `String`, `Entity`, `ServerPlayer`를 처리합니다. 그 밖의 정확히 일치하는 매개변수 유형은 명령 트리가 만들어지기 전에 `MyotusAPI.commands().registerArgument(Value.class, adapter)`가 필요합니다. `MyoArgumentAdapter<T>`는 `ArgumentType<?> argumentType()`과 `T value(CommandContext<CommandSourceStack>, String) throws Exception`을 제공합니다. 유형을 중복 등록하면 예외가 발생하고, 하위 클래스 일치는 자동으로 처리되지 않습니다. 이 훅은 Minecraft에 사용자 지정 Brigadier 인수 직렬화기를 등록하지 않습니다.

`@MyoPermission(permission = MyoPermissionLevel.GAME_MASTER)`는 해당 명령 권한을 요구합니다. 권한 단계는 `MODERATOR` (1), `GAME_MASTER` (2), `ADMIN` (3), `OWNER` (4)입니다. 또는 공개 기본 생성자가 있는 검사자가 `MyoPermissionChecker`를 구현하도록 `custom = Checker.class`를 사용할 수 있습니다. 요구 조건은 정확히 하나만 설정해야 합니다. 비어 있거나 충돌하는 선언은 안전하게 거부됩니다. 클래스 수준 `propagate = true`는 하위 노드에 적용되고, 그렇지 않으면 해당 클래스의 실행자만 보호합니다.

소스: [어노테이션](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/common/src/main/java/me/myogoo/myotus/api/annotation/commands), [인수 API](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/api/command/argument/MyoArgumentAdapter.java), [명령 테스트](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/test/java/me/myogoo/myotus/api/CommandsApiTest.java).

## 테이블 레시피 어댑터

`IMyotusTableRecipe<I>`는 기존 `Recipe<?>`를 감싸며 레시피 유형이나 직렬화기를 등록하지 않습니다. `recipe()`와 `tier()`를 구현하세요. `sideLength()`의 기본값은 `tier * 2 + 1`이며 `gridSize()`는 그 제곱입니다. `IMyotusShapedTableRecipe`는 `width()`/`height()`를 추가하고, `IMyotusShapelessTableRecipe`는 마커입니다.

- `unwrap(Class<R>)`는 요청한 유형이 일치할 때만 기반 레시피를 반환합니다.
- `tableType()`은 개별 레시피 ID가 아니라 등록된 레시피 유형 ID를 반환합니다.
- `findRecipeId()`는 Forge 1.20.1에서 레시피 ID를 반환하고 최신 버전에서는 기본적으로 비어 있습니다. 이 경우 호출자가 홀더 정체성을 유지해야 합니다.
- `matches`, `assemble` 또는 `getRemainingItems`를 사용하기 전에 `createInput(List<ItemStack>)`을 재정의하세요. 기본 구현은 `UnsupportedOperationException`을 던집니다. 입력은 감싼 레시피가 기대하는 유형과 일치해야 합니다.
- `ensureFittedCraftingGrid()`의 기본값은 `slotIngredients()`입니다. 더 큰 티어 그리드에 맞게 정형 레시피를 자동으로 채우지 않습니다.

26.1.2에서 `slotIngredients()`는 배치 슬롯을 `Optional<Ingredient>` 항목으로 확장해 빈 슬롯을 유지합니다. 배치가 불가능하면 빈 목록을 반환합니다. `assemble`은 레지스트리 인수가 없는 최신 레시피 API를 따릅니다. 남은 아이템은 해당하는 경우 `CraftingRecipe`를 사용하고, 그렇지 않으면 각 입력 아이템의 제작 잔여물을 사용합니다. 어댑터 코드를 공유하기 전에 [버전 표](/ko/architecture/#version-differences-that-affect-addons)를 확인하세요.

소스: [Forge](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/forge-1-20-1/src/main/java/me/myogoo/myotus/api/recipe/IMyotusTableRecipe.java), [1.21.1](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/api/recipe/IMyotusTableRecipe.java), [26.1.2](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-26-1-2/src/main/java/me/myogoo/myotus/api/recipe/IMyotusTableRecipe.java).

<span id="resource-conditions"></span>
## 리소스 조건

`MyoModCondition`은 Myotus 통합이 활성 상태인지 확인합니다. 데이터 파일의 `active_mod`에는 안정적인 모드 ID 또는 명시적 별칭을 사용하세요.

활성 통합은 `isLoaded(String)`과 동일하게 정확한 네임스페이스 또는 표시 이름으로도 지정할 수 있습니다. 등록 가드도 이러한 활성 식별자를 인식하므로 레시피와 GuideME 조건에서 더는 이를 알 수 없는 값으로 거부하지 않습니다. 메타데이터 이름은 활성 상태일 때만 인식됩니다. 모드가 없을 때 예측 가능한 동작이 필요하면 안정적인 모드 ID/별칭을 사용하세요. 이름이 일치해도 고유하다는 보장은 없으며 `getClass(String)`가 클래스를 반환한다는 보장도 없습니다.

```json
{
  "type": "myotus:mod_condition",
  "active_mod": "ae2wtlib"
}
```

이는 조건 객체이지 완전한 레시피가 아닙니다. 로더/데이터 생성 API가 요구하는 조건 구조 안에 넣으세요. Java에서는 `new MyoModCondition("ae2wtlib")`가 이에 해당합니다. 알 수 없는 통합 식별자는 로그를 남기고 `false`로 처리됩니다. 알려진 통합이 없거나 비활성 상태인 경우도 `false`입니다. 일반적인 로더 `mod_loaded` 검사가 아닙니다.

`MyoDevModeCondition.INSTANCE`는 `{"type":"myotus:dev"}`로 직렬화되며 `Myotus.DEV_MODE`를 읽습니다. 이 플래그는 처음에는 개발 환경을 반영하지만 변경할 수 있으므로 영구적으로 고정된 프로덕션 빌드 검사값이 아닙니다.

Forge는 `IConditionSerializer` 구현을 제공하고 NeoForge는 `MapCodec` 구현을 제공합니다. Forge 조건 직렬화 코드를 NeoForge 애드온에 복사하지 마세요. 소스: [Forge 조건](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/forge-1-20-1/src/main/java/me/myogoo/myotus/api/datagen), [1.21.1 조건](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-1-21-1/src/main/java/me/myogoo/myotus/api/datagen), [26.1.2 조건](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/neoforge-26-1-2/src/main/java/me/myogoo/myotus/api/datagen).

## Forge 전용 API

### 공유 패킷 채널

Forge 1.20.1만 `MyotusAPI.network()`와 [api.network](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/forge-1-20-1/src/main/java/me/myogoo/myotus/api/network)를 제공합니다. `IMyotusPacket.write(FriendlyByteBuf)`를 구현하고, `registerServerbound` 또는 `registerClientbound`로 일치하는 디코더/핸들러를 등록하세요.

패킷 ID는 공유 채널에서 음이 아닌 정수입니다. 양쪽에서 ID/클래스가 겹치지 않도록 조정하고 동일한 등록을 해야 합니다. 네임스페이스 기반 할당 API는 없습니다. 전송 메서드는 `sendToServer`, `sendToPlayer`, `sendToAllClients`, `reply`이며, `getPacketId`는 등록된 유형을 조회합니다. 컨텍스트는 방향, nullable 송신자, 연결, 응답 기능, 메인 스레드 작업 예약을 제공합니다. 서버 핸들러는 클라이언트 페이로드를 신뢰하지 말고 송신자의 권한을 검증해야 합니다.

NeoForge에는 자체 내부 페이로드 구현이 있지만 이에 상응하는 공개 Myotus 네트워킹 파사드는 없습니다. 해당 NeoForge API를 사용하세요.

### AE2WTLib 터미널 등록

Forge 1.20.1만 [AddTerminalEvent](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/forge-1-20-1/src/main/java/me/myogoo/myotus/api/wt/AddTerminalEvent.java)를 제공합니다. AE2WTLib 초기화 전에 `AddTerminalEvent.register(...)`로 콜백을 등록하세요. Myotus는 AE2WTLib 초기화 훅에서 업그레이드 등록 전에 한 번 이를 호출합니다. 늦게 등록하면 예외가 발생합니다. 애드온은 직접 `run()`을 호출하면 안 됩니다.

콜백의 `addTerminal(...)` 오버로드는 터미널 이름, 호스트 팩토리, 메뉴 유형, `IUniversalWirelessTerminalItem`을 받으며, 선택적으로 단축키/번역 이름과 양자 브리지 카드 지원도 받습니다. 아이템은 `WirelessTerminalItem`이기도 해야 하며 이름은 고유해야 합니다. 훅은 충전되지 않은/충전된 크리에이티브 항목을 추가하고 기본적으로 양자 브리지 카드 지원도 추가합니다. 이 API는 선택적 AE2WTLib 클래스를 직접 참조하므로 해당 의존성 뒤에 격리하세요. NeoForge API 패키지에는 없습니다.
