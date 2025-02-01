# GPS Drawing App 🗺️


<img src="https://github.com/user-attachments/assets/8104484b-5f0b-4d38-bc00-7a615eeb5eae" width="300">

**GPS Drawing App**은 지도 위에 그림을 그리고 이를 이미지로 저장할 수 있는 웹 애플리케이션입니다.  
링크: https://gps-drawing-app.vercel.app/ 

> [!NOTE]
> 1. 이 서비스는 제공되는 모바일 앱 독립 실행형 뷰에 최적화되어 있습니다.   
     주소표시줄 우측의 앱 다운로드를 클릭해주세요.
>    - 데스크탑  
>      <img width="360" alt="image" src="https://github.com/user-attachments/assets/4eef52ec-1659-4084-bd2f-74cdb9acd3e1" />
>    - 모바일  
>      <img width="400" alt="image" src="https://github.com/user-attachments/assets/1d52a4c8-8282-4e01-8052-10477ab57c2d" />
> 2. 앱을 원활하게 사용하시려면 **위치 권한**을 허용해 주세요.

---

## 🚀 소개

<img src="https://github.com/user-attachments/assets/a451d1c7-b2f0-44b0-9b80-aa51215cd7b5" width="250">
<img src="https://github.com/user-attachments/assets/7c93e8cd-d58d-42c3-9c44-83e9d2beff74" width="250">

### 주요 기능
- 🖍️ 구글 지도 위에 GPS를 기반으로 그림 그리기
- 📷 그린 그림을 이미지로 저장
- 🌍 다른 사용자의 GPS 그림 목록 보기
- 📏 거리 및 시간 안내
- ✏️ 제목과 설명 설정

---

## 작업
- 작업 기간: 1월 30일~2월 1일


### 🛠 기술 스택
- **Frontend**: React, Next.js 15, Tailwind CSS 4.0, Google Maps API 
- **Backend**: Firestore, AWS S3
- **이미지 최적화**: sharp

### 📂 폴더 구조
```bash
src
├── app
│   ├── api
│   │   └── save-image
│   └── drawing-list
├── components
│   └── ui
├── hooks
├── lib
│   ├── database
│   ├── shadcn
│   └── storage
├── types
└── utils
```

### ⚡️ 설치 및 실행 방법

#### 1️⃣ 환경 변수 설정
`.env.local` 파일을 프로젝트 루트에 생성하고 필요한 환경 변수를 추가하세요.
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET_NAME=your_s3_bucket_name
```

#### 2️⃣ 프로젝트 설치
```bash
git clone https://github.com/dusunax/gps-drawing-app.git
cd gps-drawing-app
npm install
```

#### 3️⃣ 로컬 서버 실행
```bash
npm run dev
```

### 📜 API 엔드포인트
- `POST /api/save-image` → GPS 그림을 S3에 저장하기
