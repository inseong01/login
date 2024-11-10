# 로그인 개발 문서
이 문서는 로그인 프로젝트 개발 내용을 설명합니다.

## 목차
### 1. 소개하기
1. **프로젝트 소개**
2. **버전 관리**
3. **배포 및 운영계획**


## 1. 소개하기
이 섹션은 로그인 프로젝트를 소개합니다.

### 1.1 프로젝트 소개
---
### 개발 배경
추후 배포할 웹 페이지에서 사용자의 권한을 관리자와 방문자로 구분하는 기능이 필요했습니다. 웹 사이트 사용자의 권한을 구분하기 이번 프로젝트 개발을 기획했습니다.   

소규모 프로젝트이고 로그인이 짧은 수명으로 예상되어 `세션 인증` 방식으로 이루어집니다. `세션ID`는 `UUID`로 발급되고 `Redis`를 통해 관리됩니다.  

### 개발 목표
개발자와 사용자의 입장에서 달성해야 할 목표를 가지고 있습니다. 

- **개발자**  
  비용 지불 없이 유지 가능한 프로젝트가 되어야 합니다. 프로젝트 배포를 유지하기 위해 서비스의 무료 요금제를 활용합니다.

- **사용자**  
  쾌적한 UX를 제공하는 프로젝트가 되어야 합니다. UX는 사용자의 프로젝트 경험에 관한 중요한 지표로 사용자의 부정적인 경험을 최소화 하고자 합니다.

### 개발 스택
- `Firebase Database`   
: `Supabase`와 달리 일주일 마다 요청을 보내지 않아도 제한된 요청 리소스 내에서 지속적으로 사용 가능

- `Redis`   
: 캐시 저장소를 활용하여 빠른 DB 처리, `Firebase Database` 요청 리소스 최소화

- `Nextjs`    
: 서버 `Redis` 요청 로직 간편화, 프로젝트 확장성

- `Nodejs`    
: 언어 친숙성, 서버 생성 가능

- `vercel`    
: `Redis` 서버 빠른 구축, 앱 무료 배포

### 기대 효과
- **보안성 강화**   
: 인증된 사용자만 접근할 수 있도록 합니다.

- **사용자 경험 향상**    
: 간편한 로그인 프로세스를 제공하여 사용자 만족도를 높일 수 있습니다.

- **관리 효율성**   
: 데이터베이스를 인/아웃 메모리로 구분하여 `세션ID`와 `회원ID`를 효율적으로 관리할 수 있습니다.

### 팀 구성
1인 개발로 UI 디자인-설계-구축-배포를 담당합니다.

### 1.2. 버전 관리
---
### 버전 관리 시스템
- **사용 VCS**: Git
- **레포지토리**: GitHub

### 브랜치 전략
- **메인 브랜치**: main
- **개발 브랜치**: develop

### 커밋 메시지 규칙
- **형식**: [타입] 간단한 설명
- **타입**: feat(기능 추가), fix(버그 수정), docs(문서 변경), style(코드 포맷팅), refactor(코드 리팩토링), chore(코드 작성 및 기타 작업), test(테스트 작성)

### 1.3. 배포 및 운영계획
---
### 배포 환경
- **프로덕션**: vercel (추후 변경 가능)
- **개발 서버**: localhost

