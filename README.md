# 로그인 개발 문서
이 문서는 로그인 프로젝트 개발 내용을 설명합니다.

## 목차
### 1. 소개하기
1. **프로젝트 소개**
2. **버전 관리**
3. **배포 및 운영계획**
### 2. 이해하기
1. **기능 소개**  
   - **로그인**
   - **로그아웃**
   - **회원가입**
   - **회원탈퇴**
   - **쿠키 위조 검사**
2. **기능 작동 예시**  
3. **JavaScript 활용 예시**  
### 3. 활용하기   
  - **Firebase Database 구조**
  - **Redis Database 구조**
  - **Redux 상태 구조**
  - **로그인**
  - **로그아웃**
  - **회원가입**
  - **회원탈퇴**
  - **쿠키 위조 검사**
### 4. 보완 사항
 - **에러 처리**
 - **테스트 및 디버깅 가이드**

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

- `Redux`   

  : `React` 모든 상태 리렌더링 없이 각 상태 관리 가능 

- `Nodejs`    

  : 언어 친숙성, 서버 생성 가능

- `vercel`    

  : 빠른 구축, 앱 무료 배포

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

## 2. 이해하기
이 섹션은 로그인 프로젝트 주요 기능과 작동 방식에 대해 설명합니다.   
### 2.1. 기능 소개
---
### 로그인 기능
---
로그인은 페이지 접근 권한을 부여하는 기능을 제공합니다. 사용자의 정보는 `Firebase Database`로부터 가져옵니다. `DB` 인증 이후 세션 아이디가 생성되어 `Redis`를 통해 관리됩니다. 사용자 정보는 쿠키를 사용하여 관리됩니다. 쿠키는 로그인 이후 사용자에게 부여되며 사용자의 아이디, 세션 아이디, 이름으로 구성되어 있습니다. 

### 로그아웃 기능
---
로그아웃은 페이지 접근 권한을 해제하는 기능을 제공합니다. 쿠키의 사용자 정보를 이용하여 `Redis`에서 해당 세션 아이디를 제거하고 사용자의 정보가 담긴 쿠키를 비웁니다. 사용자 정보가 담긴 쿠키가 없으면 브라우저는 초기 홈페이지로 이동합니다. 

### 회원가입 기능
---
회원가입은 페이지 접근 권한을 생성하는 기능을 제공합니다. 사용자가 입력한 정보는 `Firebase Database`에 저장됩니다. 중복 아이디 검사가 있어 `DB`에 동일한 아이디가 생성되는 것을 방지합니다. `회원가입` 기능은 `로그인` 기능과 연계되지 않습니다.

### 회원탈퇴 기능
---
회원탈퇴는 페이지 접근 권한을 제거하는 기능을 제공합니다. `Redis`에서 사용자의 세션 아이디를 제거하고 사용자 정보를 `Firebase Database`에서 제거합니다. 이후 브라우저에서 사용자의 정보가 담긴 쿠키를 비웁니다. 사용자 정보가 담긴 쿠키가 없으면 브라우저는 초기 홈페이지로 이동합니다. 

### 쿠키 위조 검사 기능
---
쿠키 위조 검사는 비정상적인 페이지 접근을 제한 기능을 제공합니다. `Next`의 미들웨어를 생성하여 검증이 필요한 페이지에 적용됩니다. 위조 검사는 `Redis`에서 관리되고 있는 사용자의 아이디, 세션 아이디와 현재 쿠키 정보와 일치하는지 비교합니다. 접근제한 페이지의 비정상적인 접근은 초기 홈페이지로 이동됩니다.   

### 2.2. 기능 작동 예시
---
<h3>로그인</h3>
<p>
  <b>정상동작</b>
</p>

![](./gif/login_0_1.gif)

<p>
  <b>입력 오류 처리</b>
</p>

![](./gif/login_1_1.gif)

<h3>로그아웃</h3>
<p>
  <b>정상동작</b>
</p>

![](./gif/logout_0_1.gif)


<h3>회원가입</h3>
<p>
  <b>정상동작</b>
</p>

![](./gif/signUp_0_1.gif)

<p>
  <b>아이디 중복 검사</b>
</p>

![](./gif/idCheck_0.gif)

<h3>회원탈퇴</h3>
<p>
  <b>정상동작</b>
</p>

![](./gif/deleteAccount_1.gif)

### 2.3. JavaScript 활용 예시
---
| 개발 플랫폼  |  기능  |           참고           |
| :---------: | :----: | :----------------------: |
|    Firebase    |   데이터베이스       |       [ 예제 ](#31-firebase-database-구조)     |
|    Redis       |   데이터베이스       |       [ 예제 ](#32-redis-database-구조)        |
|    Redux       |   상태관리          |       [ 예제 ](#33-redux-상태관리-구조)          |
|    javascript  |   로그인            |       [ 예제 ](#34-로그인)                      |
|       -        |   로그아웃          |       [ 예제 ](#35-로그아웃)                    |
|       -        |   회원가입          |       [ 예제 ](#36-회원가입)                    |
|       -        |   회원탈퇴          |       [ 예제 ](#37-회원탈퇴)                    |
|       -        |   쿠키 위조 검사    |       [ 예제 ](#38-쿠키-위조-검사)               |

## 3. 활용하기  
이 섹션은 JavaScript를 사용한 로그인 프로젝트 기능 구현 방법을 안내합니다.   
## 3.1. Firebase Database 구조
```
{
  users: {
    [id]: {
      name: '',
      id: '',
      password: ''
    },
    ...
  }
}
```
`Firebase Database`의 사용자 정보 관리 구조입니다. 사용자 정보를 개별로 관리하기 위해 사용자의 아이디를 `key`로 사용합니다. 사용자 입력 정보는 `value`로 관리합니다.    

사용자 정보가 추가되면 `users/[id]` 구조로 등록됩니다.

## 3.2. Redis Database 구조    
```
{
  [id]: [sessionID],
  ...
}
```
`Redis Database`의 세션 아이디 관리 구조입니다. 사용자 접근권한 상태를 개별로 관리하기 위해 사용자의 아이디를 `key`로 사용합니다. 세션 아이디는 `value`로 관리합니다.

## 3.3. Redux 상태관리 구조
```
store: {
  reducer: {
    formState: formSliceReducer,
    loginError: loginSliceReducer,
    signUpError: signUpSliceReducer,
    submitState: submitSliceReducer,
    idCheckState: idCheckSliceReducer,
  }
}
```
`Redux`의 상태관리 구조입니다.    

**구조 설명**
- **formState**: 폼 형식 제출 상태 관리,
- **loginError**: 로그인 에러 상태 관리,
- **signUpError**: 회원가입 에러 상태 관리,
- **submitState**: 폼 제출 상태 관리,
- **idCheckState**: 아이디 중복 확인 상태 관리,

## 3.4. 로그인
**상태관리**    
로그인 에러상태는 `loginSlice.js`에서 관리됩니다.     
> lib/features/errorState/        

**액션 목록**   
- 로그인 입력: **getTypingLoginError**    
- 로그인 빈 형식 제출: **getSubmitLoginEmptyError**    
- 로그인 제출 서버: **getSumbitLoginError**    
- 로그인 에러 상태 초기화: **resetLoginError**    

### 3.4.1. 아이디, 비밀번호 입력
이번 차례는 아이디, 비밀번호 입력을 안내합니다.

- 코드  

	```js   
  // loginInput.jsx
  function LoginInputs() {    
    const loginErrorState = useSelector((state) => state.loginError);
    const formState = useSelector((state) => state.formState);
    const submitState = useSelector((state) => state.submitState);
    const dispatch = useDispatch();

    // 입력 함수
    function getTypingValue(e) {
      // 폼 구분
      if (formState.type === 'login') {
        dispatch(getTypingLoginError({
          value: e.target.value, 
          name: e.target.name 
        }));
        // 제출 상태 초기화
        if (submitState.isSubmit) dispatch(resetSubmitState());
      } else if (formState.type === 'signUp') {
        if (e.target.name === 'id') dispatch(resetIdCheckState());
        dispatch(getTypingSignUpError({ 
          value: e.target.value, 
          name: e.target.name 
        }));
      }
    }

    switch (formState.type) {
      case 'login': {
        const { isError, id, password, msg } = loginErrorState;
        return (
          <>
            <div className={`
              ${styles[formState.type]} 
              ${styles.inputBox}
            `}>
              {msg.current && (
                <div className={`
                  ${styles.msgBox} 
                  ${isError ? styles.error : ''}
                `}>
                  {msg.current}
                </div>
              )}
              <input
                required
                maxLength={12}
                id="loginID"
                type="text"
                name="id"
                className={`
                  ${styles.input} 
                  ${id ? styles.wrong : ''}
                `}
                placeholder={`아이디를 입력하세요`}
                onChange={getTypingValue}
              />
            </div>
            <div className={`
              ${styles[formState.type]} 
              ${styles.inputBox}
            `}>
              <input
                required
                maxLength={16}
                id="loginPassword"
                type="password"
                name="password"
                className={`
                  ${styles.input} 
                  ${password ? styles.wrong : ''}
                `}
                placeholder={`비밀번호를 입력하세요`}
                onChange={getTypingValue}
              />
            </div>
            <ForgetLinkButton />
          </>
        );
      }
    }
    ...
  }
	```
- 설명  
	  **컴포넌트 동작**    
    `로그인` UI는 2개의 `input`을 가지고 있습니다. **formState.type**에 따라 입력하고 있는 `input`의 값을 검증합니다. 로그인 입력 값 검증은 `getTypingLoginError` 리덕스의 액션에서 이뤄집니다.     
    
    에러가 활성화 되면 조건 부로 스타일링을 부여합니다. **'login'** 화면은 로그인 입력 상단 우측에서 에러 메시지가 출력됩니다.      

    검증을 통과하여 제출된 이후 `resetSubmitState` 액션을 실행하여 제출 여부를 초기화 합니다.

    **태그 속성 적용**   
    `form` 제출 형식은 태그 속성으로 일관하게 유지됩니다. 각 `input` 태그에 **required**, **maxLength**, **placeholder** 속성을 활용하여 빈 형식 제출/초과입력 방지, 사용자 경험을 개선합니다.    

### 3.4.2. 아이디, 비밀번호 제출
이번 차례는 아이디, 비밀번호 제출을 안내합니다.

- 초기 설정
  ```js
  // SubmitButton.jsx
  function SubmitButton() {
    const formState = useSelector((state) => state.formState);
    const loginErrorState = useSelector((state) => state.loginError);
    const submitState = useSelector((state) => state.submitState);
    const dispatch = useDispatch();

    function onSubmitForm(e) {
      // 제출된 다음 클릭 방지
      if (submitState.isSubmit) return e.preventDefault();

      // 제출 유형
      switch (formState.type) {
        case 'login': {
          const id = 
            document.getElementById('loginID').value;
          const password = 
            document.getElementById('loginPassword').value;
          dispatch(getSubmitLoginEmptyError({ id, password }));
          // 오류 있으면 전송 제한
          if (loginErrorState.isError) return e.preventDefault();
          return;
        }
        ...
      }
    }

    return (
      <input
        type="submit"
        className={`
          ${styles.btn} 
          ${styles[submitState.submitStatus]}
        `}
        value={
          submitState.isSubmit 
          ? submitState.submitStatus : 'SUBMIT'
        }
        onClick={onSubmitForm}
      />
    );
  }
  ```

- 코드  

	```js   
  // LoginBox.jsx
  function LoginBox() {
    // 상태
    const formState = useSelector((state) => state.formState);
    const dispatch = useDispatch();

    // 라우터
    const router = useRouter();

    async function onSubmitForm(e) {
      e.preventDefault();
      const form = new FormData(e.target);
      const data = {};
      for (let value of form) {
        data[value[0]] = value[1];
      }
      // async dispatch, Promise 반환
      const fetchResult = await dispatch(
      asyncSubmitFetch({ 
        type: formState.type, 
        data 
      })
      );
      const { result } = fetchResult.payload;
      switch (formState.type) {
        case 'login': {
          // 에러 처리
          dispatch(getSumbitLoginError({ result }));
          // 화면 이동, 상태 초기화(연속 클릭 방지)
          if (result !== 'OK') return;
          await new Promise((res) => setTimeout(() => res(), 500));
          return await router.push('/user');
        }
        ...
      }
    }

    return (
      <form 
        id="loginForm" 
        method="post" 
        onSubmit={onSubmitForm}
      >
      ...
      </form>
    );
  }
	```
- 설명  
	  **컴포넌트 동작**    
    아이디, 비밀번호 제출은 `SubmitButton` 컴포넌트 클릭에서 시작됩니다. 이미 제출된 상태면 형식 제출 동작을 제한합니다. 제출되지 않았다면 `getSubmitLoginEmptyError` 액션을 통해 아이디, 비밀번호의 입력 값이 비어있는지 확인합니다. 로그인 형식 에러가 있다면 제출을 제한합니다.    

    문제가 없으면 `LoginBox` 컴포넌트에서 제출 형식 값을 객체화 하여 서버로 전달합니다. 서버가 **'OK'** 응답을 반환하면 0.5초 후에 `/user` 페이지로 이동시킵니다.  
    
    **리덕스 비동기 액션**        
    `asyncSubmitFetch` 액션은 리덕스의 비동기 처리 액션입니다. 비동기는 **pending**, **fulfilled**, **rejected** 상태로 나뉩니다. 각 상태에 따라 `SubmitButton` 컴포넌트의 **value**가 변경되어 사용자에게 처리 상태를 알립니다.     

## 3.5. 로그아웃
이번 차례는 로그아웃을 안내합니다.    
로그아웃 기능은 `Redis`, `Cookie` 순으로 동작합니다.    

- 클라이언트 코드  

  ```js   
  // LogoutButton.jsx
  function LogoutButton() {
    const router = useRouter();

    async function onClickLogout() {
      // 서버 요청
      const response = await fetch('api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.text();
      // 서버 응답
      if (result === 'OK') return router.push('/');
    }

    return <input type="button" value={'logout'} onClick={onClickLogout} />;
  }
  ```
- 서버 코드   

  ```js   
  // server/index.jsx   
  app.post('/logout', async (req, res) => {
    // 정보 받음
    const loginCookie = JSON.parse(req.cookies?.login);
    const id = loginCookie.id
    // 로그아웃 실패 결과 전달
    if (!id) res.send('FAIL');
    // 세션ID 삭제
    await client.del(id);
    // 로그아웃 성공 결과 전달
    res.clearCookie('login').send('OK');
  })
  ```
- 설명  
	  **컴포넌트 동작**    
    사용자가 `LogoutButton` 컴포넌트를 클릭하면 서버로 로그아웃을 요청합니다. 클라이언트 측에서 `credentials: 'include'`를 설정하여 사용자의 쿠키를 서버로 전달합니다. 서버가 **'OK'** 응답을 반환하면 브라우저는 홈페이지로 이동됩니다.

    **서버 동작**   
    서버는 사용자의 쿠키에서 **id** 가져와 사용합니다. `Redis` 목록에서 해당 **id**의 세션 아이디를 삭제합니다. 서버는 사용자의 정보가 담긴 쿠키를 비우고 **'OK'** 응답을 클라이언트에게 전달합니다.

## 3.6. 회원가입
**상태관리**    
회원가입 에러상태는 `signUpSlice.js`에서 관리됩니다.     
> lib/features/errorState/        

**액션 목록**   
- 회원가입 입력: **getTypingSignUpError**    
- 회원가입 아이디 검사: **isCheckID**    
- 회원가입 빈 형식 제출: **getSubmitSignUpEmptyError**    
- 회원가입 제출 서버: **getSumbitSignUpError**    
- 회원가입 에러 상태 초기화: **resetSignUpError**    

### 3.6.1. 이름, 아이디, 비밀번호 입력
이번 차례는 이름, 아이디, 비밀번호 입력을 안내합니다.

- 코드  

	```js   
  // loginInput.jsx
  function LoginInputs() {
    const signUpErrorState = useSelector((state) => state.signUpError);
    const formState = useSelector((state) => state.formState);
    const submitState = useSelector((state) => state.submitState);
    const dispatch = useDispatch();

    // 입력 함수
    function getTypingValue(e) {
      // 폼 구분
      if (formState.type === 'login') {
        ...
      } else if (formState.type === 'signUp') {
        if (e.target.name === 'id') dispatch(resetIdCheckState());
        dispatch(getTypingSignUpError({ 
          value: e.target.value, 
          name: e.target.name 
        }));
      }
    }
    ...

    switch (formState.type) {
      ...
      case 'signUp': {
        const { name, id, password, msg } = signUpErrorState;
        return (
          <>
            <div className={`
              ${styles[formState.type]} 
              ${styles.inputBox}
            `}>
              <div className={styles.category}>이름</div>
              {msg.name &&
               <div className={`
                ${styles.msgBox} 
                ${name ? styles.error : ''}
              `}>
                {msg.name}
              </div>}
              <input
                required
                minLength={2}
                maxLength={8}
                id="signUpName"
                type="text"
                name="name"
                className={`
                  ${styles.input} 
                  ${name ? styles.wrong : ''}
                `}
                placeholder={`이름을 입력하세요`}
                onChange={getTypingValue}
                disabled={submitState.isSubmit}
              />
            </div>
            <div className={`
              ${styles[formState.type]} 
              ${styles.inputBox}
            `}>
              <div className={styles.category}>ID</div>
              {msg.id && <div className={`
                ${styles.msgBox} 
                ${id ? styles.error : ''}
              `}>
                {msg.id}
              </div>}
              <div className={styles.inputWrap}>
                <input
                  required
                  minLength={6}
                  maxLength={12}
                  id="signUpID"
                  type="text"
                  name="id"
                    className={`
                    ${styles.input} 
                    ${id ? styles.wrong : ''}
                  `}
                  placeholder={`아이디를 입력하세요`}
                  onChange={getTypingValue}
                  disabled={submitState.isSubmit}
                />
                ...
              </div>
            </div>
            <div className={`
              ${styles[formState.type]} 
              ${styles.inputBox}
            `}>
              <div className={styles.category}>비밀번호</div>
              {msg.password && (
                <div className={`
                  ${styles.msgBox} 
                  ${password ? styles.error : ''}
                `}>
                  {msg.password}
                </div>
              )}
              <input
                required
                minLength={8}
                maxLength={16}
                id="signUpPassword"
                type="password"
                name="password"
                className={`
                  ${styles.input} 
                  ${password ? styles.wrong : ''}
                `}
                placeholder={`비밀번호를 입력하세요`}
                onChange={getTypingValue}
                disabled={submitState.isSubmit}
              />
            </div>
          </>
        );
      }
    }
  }
	```

- 설명  
	  **컴포넌트 동작**    
    `회원가입` UI는 3개의 `input`을 가지고 있습니다. **formState.type**에 따라 입력하고 있는 `input`의 값을 검증합니다. 회원가입 입력 값 검증은 `getTypingSignUpError` 리덕스의 액션에서 이뤄집니다.    
    
    에러가 활성화 되면 조건 부로 스타일링을 부여합니다. **'signUp'** 화면은 각 태그 우측 상단 위치에서 에러 메시지가 출력됩니다.     

    **태그 속성 적용**   
    `form` 제출 형식은 태그 속성으로 일관하게 유지됩니다. 각 `input` 태그에 **required**, **minLength**, **maxLength**, **placeholder** 속성을 활용하여 빈 형식 제출/초과/미만입력 방지, 사용자 경험을 개선합니다.    

    검증을 통과하여 제출된 상태, **submitState.isSubmit** 상태를 이용하여 각 `input` 태그의 **disabled** 속성을 활성화 합니다. 현재 화면에서 회원가입 입력 및 수정을 제한합니다.

### 3.6.2. 아이디 중복 검사
이번 차례는 아이디 중복 검사를 안내합니다.

- 코드  

	```js   
  // loginInput.jsx
  function LoginInputs() {
    const formState = useSelector((state) => state.formState);
    const submitState = useSelector((state) => state.submitState);
    const idCheckState = useSelector((state) => state.idCheckState);
    const dispatch = useDispatch();

    useEffect(function updateIdCheckState() {}, [idCheckState]);

    // ID 중복 검사
    async function onClickCheckDuplicatedID() {
      const signUpIDTag = document.getElementById('signUpID');
      // 제출 이후 클릭 방지
      if (submitState.isSubmit || idCheckState.isSubmit) return;
      // 빈 값 에러
      if (!signUpIDTag.value) {
        // 에러 검사
        dispatch(getTypingSignUpError({
          value: signUpIDTag.value, 
          name: signUpIDTag.name 
        }));
        return;
      }
      // 검사 요청
      const response = await dispatch(
        asyncDuplicatedIdFetch({ id: signUpIDTag.value })
      );
      const { result } = response?.payload;
      dispatch(isCheckID({ result }));
    }

    switch (formState.type) {
      ...
      case 'signUp': {
        ...
        return (
          <>
            ...
              <div className={styles.inputWrap}>
                <input
                  required
                  id="signUpID"
                  type="text"
                  name="id"
                  ...
                />
                <input
                  type="button"
                  className={styles.input}
                  value="Check"
                  onClick={onClickCheckDuplicatedID}
                />
              </div>
            ...
          </>
        );
      }
    }
  }
	```

- 설명  
	  **컴포넌트 동작**    
    `onClickCheckDuplicatedID` 함수는 아이디 중복 검사를 합니다. **'signUpID'** 태그의 입력값을 가져와 입력값을 검증합니다. 에러가 있다면 입력값 전달을 제한합니다. 통과한 입력값은 서버로 전달됩니다. 서버 응답은 반환값에 따라 사용자에게 결과를 다르게 보여줍니다. 
   
    **리덕스 비동기 액션**        
    `asyncDuplicatedIdFetch` 액션은 리덕스의 비동기 처리 액션입니다. 비동기는 **pending**, **fulfilled**, **rejected** 상태로 나뉩니다. 각 상태에 따라 **idCheckState** 상태가 변경됩니다.    
    
    **리덕스 비동기 상태 갱신**        
    비동기 처리에서 `Redux`의 상태를 갱신하기 위해 **idCheckState**를 `useEffect` 의존성으로 적용합니다. 

    **태그 속성 적용**   
    `form` 제출 형식은 태그 속성으로 일관하게 유지됩니다. 각 `input` 태그에 **required**, **minLength**, **maxLength**, **placeholder** 속성을 활용하여 빈 형식 제출/초과/미만입력 방지, 사용자 경험을 개선합니다.    

    검증을 통과하여 제출된 상태, **submitState.isSubmit** 상태를 활용하여 각 `input` 태그의 **disabled** 속성을 활성화합니다. 현재 화면에서 회원가입 입력 및 수정을 제한합니다.

### 3.6.3. 이름, 아이디, 비밀번호 제출
이번 차례는 이름, 아이디, 비밀번호 제출을 안내합니다.

- 초기 설정
  ```js
  // SubmitButton.jsx
  function SubmitButton() {
    const formState = useSelector((state) => state.formState);
    const signUpErrorState = useSelector((state) => state.signUpError);
    const submitState = useSelector((state) => state.submitState);
    const dispatch = useDispatch();

    function onSubmitForm(e) {
      // 제출된 다음 클릭 방지
      if (submitState.isSubmit) return e.preventDefault();
      // 제출 유형
      switch (formState.type) {
        case 'login': {
          ...
        }
        case 'signUp': {
          const id = 
            document.getElementById('signUpID').value;
          const password = 
            document.getElementById('signUpPassword').value;
          const name = 
            document.getElementById('signUpName').value;
          dispatch(
            getSubmitSignUpEmptyError({ id, password, name })
          );
          // 오류 있으면 전송 제한
          if (
            signUpErrorState.isError ||
            !signUpErrorState.isCheckedID
          ) return e.preventDefault();
          return;
        }
      }
    }

    return (
      <input
        type="submit"
        className={`
          ${styles.btn} 
          ${styles[submitState.submitStatus]}
        `}
        value={
          submitState.isSubmit ? 
          submitState.submitStatus : 'SUBMIT'
        }
        onClick={onSubmitForm}
      />
    );
  }
  ```

- 코드  

	```js   
  // LoginBox.jsx
  function LoginBox() {
    // 상태
    const formState = useSelector((state) => state.formState);
    const dispatch = useDispatch();

    // 라우터
    const router = useRouter();

    async function onSubmitForm(e) {
      e.preventDefault();
      const form = new FormData(e.target);
      const data = {};
      for (let value of form) {
        data[value[0]] = value[1];
      }
      // async dispatch, Promise 반환
      const fetchResult = await dispatch(
        asyncSubmitFetch({ 
          type: formState.type, 
          data 
        })
      );
      const { result } = fetchResult.payload;
      switch (formState.type) {
        case 'signUp': {
          // 에러 처리
          dispatch(getSumbitSignUpError({ result }));
          return;
        }
        ...
      }
    }

    return (
      <form 
        id="loginForm" 
        method="post" 
        onSubmit={onSubmitForm}
      >
        ...
      </form>
    );
  }
	```
- 설명  
	  **컴포넌트 동작**    
    이름, 아이디, 비밀번호 제출은 `SubmitButton` 컴포넌트 클릭에서 시작됩니다. 이미 제출된 상태면 형식 제출 동작을 제한합니다. 제출되지 않았다면 `getSubmitSignUpEmptyError` 액션을 통해 이름, 아이디, 비밀번호의 입력 값이 비어있는지 확인합니다. 회원가입 형식 에러가 있다면 제출을 제한합니다.    

    문제가 없으면 `LoginBox` 컴포넌트에서 제출 형식 값을 객체화 하여 서버로 전달합니다. 제출 이후 `input` 입력을 제한합니다.
    
    `asyncSubmitFetch` 액션은 리덕스의 비동기 처리 액션입니다. 비동기는 **pending**, **fulfilled**, **rejected** 상태로 나뉩니다. 각 상태에 따라 `SubmitButton` 컴포넌트의 **value**가 변경되어 사용자에게 처리 상태를 알립니다.     

## 3.7. 회원탈퇴
이번 차례는 회원탈퇴를 안내합니다.    
회원탈퇴 기능은 `Redis`, `Firebase`, `Cookie` 순으로 동작합니다.    

- 클라이언트 코드  

  ```js   
  // DeleteAccountButton.jsx
  function DeleteAccountButton() {
    const router = useRouter();

    async function onClickDeleteAccount() {
      // 서버 요청
      const response = await fetch('api/delete/account', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      });
      // 서버 응답
      const result = await response.text();
      if (result === 'OK') return router.push('/');
    }
    return (
      <input 
        type="button" 
        value={'delete account'} 
        onClick={onClickDeleteAccount} 
      />
    );
  }
  ```

- 서버 코드   

  ```js   
  // server/index.jsx   
  app.post('/delete/account', async (req, res) => {
    try {
      // 쿠키 가져오기
      const loginCookie = JSON.parse(req.cookies.login);
      const loginID = loginCookie.id
      // Redis 삭제
      await client.del(loginID);
      // Redis 확인
      const isDeletedOnRedis = await client.get(loginID);
      if (isDeletedOnRedis) throw new Error(`
        ${isDeletedOnRedis} is not deleted on Redis
      `);
      // DB 삭제
      await remove(ref(db, `users/${loginID}`));
      // DB 확인
      await get(child(ref(db), `users/${loginID}`))
        .then((snapshot) => {
          if (snapshot.val()) throw new Error(`
            ${loginID} is not deleted on Firebase
          `);
        });
      // 정상 응답
      res.clearCookie().send('OK');
    } catch (err) {
      // 실패 응답, 서버 오류
      console.error('Delete account server error : ', err);
      res.send('SERVER ERROR')
    }
  })
  ```
- 설명  
	  **컴포넌트 동작**    
    사용자가 `LogoutButton` 컴포넌트를 클릭하면 서버로 회원탈퇴 요청합니다. 클라이언트 측에서 `credentials: 'include'`를 설정하여 사용자의 쿠키를 서버로 전달합니다. 서버가 **'OK'** 응답을 반환하면 브라우저는 홈페이지로 이동됩니다.

    **서버 동작**    
    서버는 사용자의 쿠키에서 **id** 가져와 사용합니다. `Redis` 목록에서 해당 **id**의 세션 아이디를 삭제합니다. 그리고 `Firebase`에서 해당 **id**의 사용자의 정보를 삭제하고 삭제 되었는지 확인합니다. **id**의 정보가 `null`인지 확인합니다. 서버는 사용자의 정보가 담긴 쿠키를 비우고 **'OK'** 응답을 클라이언트에게 전달합니다.  

## 3.8. 쿠키 위조 검사
이번 차례는 쿠키 위조 검사 미들웨어를 안내합니다.    
쿠키 위조 검사는 `Next` 미들웨어를 사용합니다.

- 클라이언트 코드  

  ```js   
  // middleware.jsx
  export async function middleware(req, res) {
    try {
      // 로그인 쿠키 불러오기
      const cookieStore = await cookies();
      const loginCookie = cookieStore.get('login');
      // 로그인 쿠키 전달하기
      const response = await fetch(
        'http://localhost:3000/api/redis/exist', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `login=${loginCookie.value}`
          },
        }
      );
      // 로그인 쿠키 검증
      const result = await response.text();
      return result === 'OK'
        ? NextResponse.next() 
        : NextResponse.redirect(new URL('/', req.url));
    } catch (err) {
      // 에러 발생 시 홈으로 이동
      console.error('Middleware error', err);
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  export const config = {
    // 검증할 경로 배열 요소로 추가
    matcher: '/user',
  };
  ```
- 설명  
	  **미들웨어 동작**    
    `/user` 페이지 경로로 접근했을 때 실행됩니다. 사용자의 정보가 담긴 쿠키를 `Next API`를 사용해 가져옵니다. 미들웨어는 서버 컴포넌트로 브라우저가 실행되기 전에 동작해, 쿠키를 직접 할당해야 합니다. 서버 응답에 따라 페이지 접근 진행이 결정됩니다. 

    **검증 페이지 설정**    
    검증할 페이지 주소를 **config.matcher**에 배열요소로 추가 할당할 수 있습니다. 페이지 주소가 하나일 경우 문자열로 작성해야 합니다.

## 4. 보완 사항 
이 섹션은 로그인 프로젝트 보완 사항에 대해 설명합니다.   
## 4.1. 에러 처리
이번 차례는 에러 처리를 안내합니다.   

### Nextjs 커스텀 서버 설정 시
`vercel` 배포 할 수 없습니다. 또한 `Nextjs`의 자체 서버를 사용하지 않아 최적화를 진행 할 수 없습니다.

### fetch 전송 후, 서버 `request.body` 빈 값일 경우
전송한 데이터가 형식이 맞지 않을 때 발생합니다. 데이터를 `body`에 담아 전달할 때 `JSON.stringfy()`로 감싸야 합니다. 또한 `fetch` 헤더를 `{ 'content-type': 'application/json' }`으로 설정해야 합니다.

서버는 데이터가 `json` 형식으로 오는 것으로 인식합니다.
```js
fetch('...', {
  method: 'POST',
  header: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(data);
})
```

### Error, A non-serializable value was detected in an action, in the path
비직렬화 오류입니다. 이벤트 객체 자체를 전달하지 않고 필요한 값만 추출해야 합니다.

```js
<div onClick={(event) => {
  dispatch(sendTargetValue({ event: event })) // error
}}>
```
```js
<div onClick={(event) => {
  dispatch(sendTargetValue({ target: event.target })) // error
}}>
```
```js
<div onClick={(event) => {
  dispatch(sendTargetData({ value: event.target.value })) // correct
}}>
```

### 서버 컴포넌트에서 쿠키 전달 오류
서버 컴포넌트는 브라우저 환경에서 동작하지 않습니다. `fetch`는 브라우저 쿠키를 포함 할 수 있지만 서버 컴포넌트에서는 자동으로 포함되지 않습니다. 서버 컴포넌트는 `fetch` 헤더의 `Cookie`를 직접 할당해야 합니다. 

`Nextjs`는 서버 컴포넌트에서 브라우저 쿠키를 접근할 수 있는 `API`를 제공합니다.    

서버 컴포넌트에서 `fetch` 헤더에 `credentials='include'`를 설정하여 브라우저 쿠키를 포함할 수 없습니다. 

```js
// server component
fetch('...', {
  header: {
    'Cookie': 'name=Anne' // name='Anne'
  }
})

fetch('...', {
  header: {
    credentials='include' // null
  }
})
```

### Nextjs 미들웨어 테스트
`ReferenceError: Request is not defined`, 미들웨어는 노드 환경에서 테스트 할 수 있습니다. 

현재 설정된 환경은 `testEnvironment='jsdom'`입니다. `jsdom`은 브라우저 환경입니다. 미들웨어를 테스트 하려면 테스트 환경을 `testEnvironment='node'`로 설정해야 합니다.

### 쿠키 전달 시 변환 오류
`TypeError, Cannot convert argument to a ByteString...`, 유니코드 `255`를 초과하는 문자를 포함한 쿠키는 `fetch`로 전달 할 때 오류가 발생합니다. 쿠키는 영어 외 다른 문자를 포함할 수 없습니다.

영어 외 다른 언어 문자를 인코드하여 쿠키로 전달할 수 있습니다.

```js
fetch('...', (
  {
    header: {
      'Cookie': encodeURIComponent('name="홍길동"');
    }
  }
))
```

## 4.2. 테스트 가이드
이번 차례는 테스트 및 디버깅 가이드를 안내합니다.   
테스트 도구로 `Jest`를 사용합니다.

### 테스트 파일 구조
테스트 하고자 하는 파일이 존재하는 디렉터리에 `test` 디렉터리를 생성합니다.   
`test` 디렉터리에서 테스트 파일을 생성합니다.   

- **test 디렉터리 생성 전**

  ```
  ㄴsrc
    ㄴcomponents
        ㄴ0.jsx
        ㄴ1.jsx
  ```
- **test 디렉터리 생성 후**

  ```
  ㄴsrc
    ㄴcomponents
        ㄴtest
            ㄴ0.test.js
            ㄴ1.test.js
        ㄴ0.jsx
        ㄴ1.jsx
  ```

### 테스트 파일 명명 규칙
- **단위 테스트**: `*.unit.test.js`  
  개별 컴포넌트나 함수의 단일 기능을 테스트합니다.

- **리덕스 테스트** :`*.slice.test.js`    
  리덕스 파일을 테스트합니다.

- **테스트 파일 작성 틀**
  ```js
  // import 선언 부분
  import '@testing-library/jest-dom';
  import { render, screen } from '@testing-library/react';
  import 컴포넌트명 from '../컴포넌트명';

  // mock 선언 부분
  jest.mock('', () => {})

  // 변수 선언 부분

  describe('(컴포넌트명) (테스트유형) test : ', () => {
    beforeEach(() => {})
    afterEach(() => {})

    test('(테스트명)', () => {})
  })
  ```

### 테스트 실행 방법
- **테스트 실행**

  ```
  npm run test // 모든 테스트 파일 실행
  ```
- **특정 파일 테스트 실행**

  ```
  npm run test 0 // '0' 문자 가지고 있는 테스트 파일 모두 실행
  ```
- **유닛 테스트 실행**

  ```
  npm run test:unit
  ```
- **리덕스 테스트 실행**

  ```
  npm run test:slice
  ```

### 테스트 유형
#### 단위 테스트 (unit)  
- 목적: 각 개별 모듈 또는 함수가 의도된 대로 동작하는지 확인      
- 항목: 태그 존재, 클래스명 일치, 함수 동작 정상 여부   
#### 리덕스 테스트 (slice)  
- 목적: 다른 패키지와 분리 테스트 하여 개별 관리 용이       
- 항목: 디스패치/액션 작동, 상태 처리/관리 확인    