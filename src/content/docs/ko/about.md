---
title: 문서 안내
description: Myotus 위키의 범위, 출처, 기여 방법을 안내합니다.
---

이 문서는 myogoo가 만든 Applied Energistics 2 확장 라이브러리 [Myotus](https://github.com/mc-myo-s-mod/Myotus)의 개발자 및 플레이어용 위키입니다.

## 출처 및 버전 범위

API, 빠른 시작, 아키텍처, 빌드 가이드는 공개 저장소의 `openwiki` 문서를 커밋 [`e7cfa3a`](https://github.com/mc-myo-s-mod/Myotus/tree/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51) 시점 기준으로 가져왔습니다. 출처 링크는 해당 리비전에 고정되어 있으므로 예제의 기반 코드가 조용히 바뀌지 않습니다.

이 문서는 릴리스된 각 JAR을 개별적으로 설명하는 버전별 매뉴얼이 아니라 **소스 참조 문서**입니다. 소스 스냅샷에 있는 메서드가 이전 릴리스에는 없을 수 있습니다. API를 사용하기 전에 해당 아티팩트를 확인하세요.

터미널 모듈 API와 이후 루트 Gradle 프록시 설정을 포함한 미커밋 개발 변경 사항은 이 스냅샷에 포함되지 않았습니다. 빌드 가이드는 위에 연결된 공개 리비전을 설명합니다. 다른 브랜치에 적용하기 전에는 최신 소스를 검토하세요.

## 다운로드 및 Maven

GitHub 릴리스 링크는 2026년 10월 4일에 확인했습니다. [버전 페이지](/ko/versions/)에서 공개 릴리스 태그와 소스 빌드용 좌표를 구분해 설명합니다. 원격 Maven 아티팩트의 이용 가능 여부는 확인하지 않았습니다. 로컬 배포만으로 Maven Central에 릴리스되었다고 볼 수는 없습니다.

## 문서 개선

문서 하단의 **페이지 편집**을 사용해 [위키 저장소](https://github.com/myogoo/MyoWiki)에 변경을 제안하세요. API 계약이나 예제를 바꾸는 경우 Minecraft 버전과 소스 참조를 함께 적어 주세요.

모드 버그는 [Myotus 이슈 트래커](https://github.com/mc-myo-s-mod/Myotus/issues)에, 문서 및 웹사이트 문제는 [위키 이슈 트래커](https://github.com/myogoo/MyoWiki/issues)에 신고해 주세요.

## 디자인 및 구현

[Astro](https://astro.build/)와 [Starlight](https://starlight.astro.build/)로 만들었으며, JRip 기반 팔레트, 둥근 표면 디자인, 자체 호스팅 글꼴, 라이트/다크 테마를 사용합니다. 검색은 빌드 중 생성되는 정적 Pagefind 색인을 사용하며 검색어를 원격 검색 서비스로 전송하지 않습니다.

Myotus 콘텐츠와 에셋에는 [LGPL-3.0 라이선스](https://github.com/mc-myo-s-mod/Myotus/blob/e7cfa3aaed345a351ab5d468f7d5f0f8b0e40b51/LICENSE)가 적용됩니다. 디자인 및 글꼴 출처는 위키의 [저작자 표시 파일](https://github.com/myogoo/MyoWiki/blob/main/NOTICE.md)을 참고하세요.
