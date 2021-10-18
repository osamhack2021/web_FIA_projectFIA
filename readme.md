
#  **Project FIA(Find it, Army!)**
<img src="https://github.com/osamhack2021/web_cloud_FIA_projectFIA/blob/master/logo.jpg"/>


## 프로잭트 소개

#### 프로젝트 명
- 군 장병 분실물 상태 공유 플랫폼인 FIA는 제공하는 서비스에 걸맞는 이름이 무엇이 있을까 생각을 해보다 “군 장병들이여, 그것을 찾아라!” 라는 표어를 생각해보게 되었고 이를 짧게 직역한 “Find It, Army!”라는 표어에서 앞 글자를 딴 FIA를 프로젝트 명으로 결정하게 되었습니다.

#### 프로젝트 목적
- 군 생활을 하다 보면 생활에 필수적인 보급품을 제한된 개수로 받아 사용하게 되는데 이를 분실하게 된다면 따로 보급품이 나오게 될 때까지 불편한 생활을 이어가야 하는 단점이 생기게 됩니다. 또한 군 보급품 뿐만이 아니라 최근에는 외부에서 택배 등을 통해 반입되는 개인 물품들이 많은 만큼 이러한 물품들이 분실되었을 때 따로 부대 내부에 분실물 보관함이 잘 운영되지 않고 있다면 물건을 잃어버린 사람은 찾기 힘들 것이고, 그 물건을 습득한 사람도 찾아주기가 매우 힘들 것입니다. 그리고 부대의 규모가 커지면 커질수록 분실물의 습득자는 주인을 찾아줄 수 있다는 가능성이 낮다고 생각하여 아예 분실물을 그대로 방치하게 될 수도 있습니다.

- 이러한 문제점들을 해결하고자 고안해낸 프로젝트가 바로 군 장병 분실물 상태 공유 플랫폼 FIA입니다.


## 기능 설명(이미지 추가 예정)
 - 홈페이지 메인
 
 - 로그인/로그아웃
 - 게시판 종류
   - 찾아주세요 게시판(분실 신고)
   - 찾아가세요 게시판(습득 신고)
   - 거래완료 게시판(거래 완료 로그 확인 게시판)
 - 게시판 이용 방법
   - 게시글 작성 방법
   - 댓글 작성 방법
   - 게시글 검색 방법


## 기대 효과
 -  수량이 제한되어 있는 보급품 혹은 소중한 개인 물품들을 군 생활이 끝날 때까지 잃어버리지 않고 잘 사용할 수 있을 것입니다.
 -  부대 단위에서 따로 실제 분실물 센터를 운영할 필요 없이 FIA 하나만 도입하여 곧바로 분실물 상태를 공유할 수 있는 플랫폼을 간편하게 도입할 수 있습니다.
 -  PC 웹 환경 혹은 모바일 환경 모두 쉽게 접근할 수 있기 때문에 부대 구성원들이 이용하기가 훨씬 더 용이할 것입니다.
 -  물건을 잃어버린 장병들이 분실물을 찾게 될 확률이 기하급수적으로 높아질 수 있을것이라 전망합니다.

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* Chrome 브라우저 사용 권장

## 기술 스택 (Technique Used) 
### Server(back-end)
 - Python Django 3.2.7
 - Python django rest framework 3.12.4
 - Swagger & Redoc (drf-yasg) 1.20.0
 
### Front-end
- Bootstrap 4
- JQuery 3.5.1 
- DataTables 1.11.2 
- DatePicker 1.9.0 
- TimePicki 2.0 




## 프로젝트 사용법 (Getting Started)
**마크다운 문법을 이용하여 자유롭게 기재**
- [서비스 링크 바로가기](http://20.196.209.235)
  - OSAM 측에서 제공하는 VM 특성상 서비스 이용시간이 아래와 같이 제한됩니다.
    - 평일 : 17시~23시
    - 주말 및 공휴일 : 09시~23시

- [Swagger](https://moonjewoong.pythonanywhere.com/swagger/)
- [Redoc](https://moonjewoong.pythonanywhere.com/redoc/)
- [Backend 개발자가 직접 작성한 API 사용 문서](https://github.com/osamhack2021/web_cloud_FIA_projectFIA/blob/master/Project_FIA%20Backend%20API%20%EC%82%AC%EC%9A%A9%20%EB%AC%B8%EC%84%9C(%EC%B5%9C%EC%A2%85).pdf)


 
 ## 회의록 및 개발일지
  * [회의록](https://github.com/osamhack2021/web_cloud_FIA_projectFIA/blob/master/%ED%9A%8C%EC%9D%98%EB%A1%9D.md)
 
 ## 추후 개발사항
 - 프론트 단에서 게시글 수정 기능 추가하기
 - 사용자 요구에 맞춘 태그 세분화
 - 회원관리 기능 추가(비밀번호 변경기능 등...)
 - 댓글 알림 기능 추가

## 팀 정보 (Team Information)
- Moon Je Woong (munjin0201@naver.com), Github Id: MoonJeWoong
- Jo Woo Sung   (imws_@naver.com),      Github Id: rickysbcws


## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [BSD](https://github.com/osamhack2021/web_cloud_FIA_projectFIA/blob/backend/LICENSE)
 * [Apache2.0](https://github.com/osamhack2021/web_cloud_FIA_projectFIA/blob/backend/LICENSE)