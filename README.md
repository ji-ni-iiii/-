# 시공관리 AI 업무지원 시스템

한국원자력환경공단 시공관리팀의 계약 및 세무 업무를 지원하기 위한 프로토타입입니다.

## 주요 기능

- 계약 등록
- 계약금액 3자리 콤마 자동 표시
- 계약서/준공서류 업로드
- 계약 법적검토
- 법령 Rule DB
- 취득세 Rule Engine
- 취득일 기준 법령 Rule 검색
- 취득세 과세표준 후보 산출
- 법령 근거 표시
- 검토 결과 보고서
- 인쇄/PDF 출력

## 중요

현재 프로젝트의 법령 및 세율 데이터는 실제 업무에 바로 사용할 수 있는 확정 법률자문 DB가 아닙니다.

실제 운영 전에 반드시 다음 자료를 공식 자료로 검증해야 합니다.

1. 국가를 당사자로 하는 계약에 관한 법률
2. 관련 시행령 및 시행규칙
3. 공기업·준정부기관 계약 관련 규정
4. 한국원자력환경공단 내부 계약규정
5. 지방세법
6. 지방세법 시행령
7. 지방세법 시행규칙
8. 지방세특례제한법
9. 관련 판례
10. 관련 행정해석 및 결정례

법령은 국가법령정보센터를 기준으로 관리합니다.

https://www.law.go.kr/

## 향후 Firebase 연동

실제 업무용 버전에서는 다음 구조를 권장합니다.

Firebase Firestore

- laws
- cases
- internalRules
- taxRules
- contracts
- reviews
- users

Firebase Storage

- contracts/{contractId}/
- completion/{contractId}/
- reports/{reviewId}/

## AI 보안

OpenAI API Key 등 비밀키를 index.html 또는 app.js에 넣지 않습니다.

AI 호출은 Firebase Cloud Functions 또는 별도 백엔드를 사용합니다.

## 실제 운영 전 추가 필요

- Firebase Authentication
- 사용자 권한관리
- 공단 내부망 보안
- 개인정보 보호
- 파일 암호화
- 감사로그
- 법령 자동 업데이트
- HWP/HWPX 분석
- PDF OCR
- Excel 준공내역서 자동 분석
- 계약서 조항 자동 추출
- 판례 검색
- 기성률 자동 산출
- 기성금 자동 산출
- 취득세 항목별 과세표준 판단
- 최종 담당자 승인 기능
