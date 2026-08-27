/*
==========================================================
Firebase Configuration
==========================================================

Firebase Console에서 프로젝트를 만든 후
아래 값을 본인의 값으로 교체하세요.

주의:
Firebase API Key 자체는 비밀번호가 아닙니다.
하지만 Firestore / Storage 보안규칙은 반드시 설정해야 합니다.
*/

const FIREBASE_CONFIG = {

  apiKey:
    "YOUR_FIREBASE_API_KEY",

  authDomain:
    "YOUR_PROJECT.firebaseapp.com",

  projectId:
    "YOUR_PROJECT_ID",

  storageBucket:
    "YOUR_PROJECT.firebasestorage.app",

  messagingSenderId:
    "YOUR_SENDER_ID",

  appId:
    "YOUR_APP_ID"

};


/*
실제 Firebase 연동은
다음 단계에서 Firebase SDK를 연결합니다.

현재 버전은 LocalStorage 기반으로
프로토타입이 작동하도록 구성합니다.
*/
