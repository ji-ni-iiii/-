/*
==========================================================
법령 Rule DB
==========================================================

주의:
아래 내용은 시스템 구조를 보여주기 위한 초기 데이터입니다.

실제 공단 업무에 사용하기 전에 반드시
국가법령정보센터의 최신 법령 및
한국원자력환경공단 내부 규정을 확인하여
정식 데이터로 교체해야 합니다.
*/

const LEGAL_RULES = [

  {
    id: "CONTRACT-001",

    category: "계약",

    lawName:
      "국가를 당사자로 하는 계약에 관한 법률",

    article:
      "실제 적용 조문을 공식 법령 데이터로 입력",

    keywords: [
      "계약",
      "공사",
      "입찰",
      "계약방법"
    ],

    source:
      "국가법령정보센터",

    sourceUrl:
      "https://www.law.go.kr/",

    description:
      "공공계약 관련 검토에 사용되는 법령입니다."
  },


  {
    id: "CONTRACT-002",

    category: "계약",

    lawName:
      "공기업·준정부기관 계약사무 관련 규정",

    article:
      "실제 적용 규정을 공식 자료로 입력",

    keywords: [
      "공기업",
      "준정부기관",
      "계약",
      "수의계약"
    ],

    source:
      "국가법령정보센터",

    sourceUrl:
      "https://www.law.go.kr/",

    description:
      "공기업·준정부기관 계약 관련 검토에 사용합니다."
  },


  {
    id: "CONSTRUCTION-001",

    category: "건설",

    lawName:
      "건설 관련 법령",

    article:
      "실제 적용 조문을 공식 법령 데이터로 입력",

    keywords: [
      "공사",
      "건설",
      "준공",
      "시공"
    ],

    source:
      "국가법령정보센터",

    sourceUrl:
      "https://www.law.go.kr/",

    description:
      "공사 및 시공 관련 법령 검토용입니다."
  }

];
