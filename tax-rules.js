/*
==========================================================
취득세 Rule Engine
==========================================================

중요:
세율을 임의로 고정하지 않습니다.

실제 운영에서는
- 취득일
- 취득물건
- 취득원인
- 건축물 여부
- 시설물 성격
- 감면 여부
- 중과 여부

등을 종합하여
공식 법령 데이터에서 세율을 결정하도록 해야 합니다.
*/

const TAX_RULES = [

  {
    id: "TAX-001",

    tax: "취득세",

    category:
      "일반 취득",

    propertyType:
      "건축물",

    effectiveFrom:
      "2026-01-01",

    effectiveTo:
      null,

    rate:
      null,

    rateText:
      "공식 법령 데이터 입력 필요",

    law:
      "지방세법",

    article:
      "실제 적용 조문 입력 필요",

    source:
      "국가법령정보센터",

    sourceUrl:
      "https://www.law.go.kr/",

    keywords: [
      "취득세",
      "건축물",
      "취득",
      "과세표준"
    ]
  },


  {
    id: "TAX-002",

    tax: "취득세",

    category:
      "과세표준",

    propertyType:
      "건축물",

    effectiveFrom:
      "2026-01-01",

    effectiveTo:
      null,

    rate:
      null,

    rateText:
      "과세표준 관련 규정",

    law:
      "지방세법 시행령",

    article:
      "실제 적용 조문 입력 필요",

    source:
      "국가법령정보센터",

    sourceUrl:
      "https://www.law.go.kr/",

    keywords: [
      "취득가격",
      "과세표준",
      "공사비",
      "건축물"
    ]
  },


  {
    id: "TAX-003",

    tax: "취득세",

    category:
      "감면",

    propertyType:
      "해당 여부 검토",

    effectiveFrom:
      "2026-01-01",

    effectiveTo:
      null,

    rate:
      null,

    rateText:
      "감면 여부 별도 검토",

    law:
      "지방세특례제한법",

    article:
      "실제 적용 조문 입력 필요",

    source:
      "국가법령정보센터",

    sourceUrl:
      "https://www.law.go.kr/",

    keywords: [
      "취득세",
      "감면",
      "면제"
    ]
  }

];
