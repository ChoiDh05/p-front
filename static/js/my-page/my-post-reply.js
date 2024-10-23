const selectAll = document.getElementById("selectAll");
const jobList = document.getElementById("jobList");
const tabBox = document.querySelector(".TabBox");
const replyTab = document.getElementById("replyTab");
const postTab = document.getElementById("postTab");
const pageBox = document.querySelector(".PageBox"); // 페이지 박스 요소 선택

// 서버에서 받을 데이터
const applyData = [
    {
        id: 1,
        company: "마린웍스㈜",
        position: "플랫폼 서비스 개발",
        description: "IoT, 제어, 빅데이터 및 C# 기반 어플리케이션 개발자 채용",
        status: "신입 · 경력",
        education: "대학교(4년)↑",
        employmentType: "정규직",
        location: "서울 종로구",
        deadline: "~ 10/21(월)",
    },
    {
        id: 2,
        company: "테크빌리지",
        position: "AI 연구 개발",
        description: "머신러닝 및 딥러닝 모델 개발",
        status: "경력",
        education: "대학교(4년)↑",
        employmentType: "계약직",
        location: "서울 강남구",
        deadline: "~ 10/21(월)",
    },
    {
        id: 3,
        company: "테크빌리지",
        position: "AI 연구 개발",
        description: "머신러닝 및 딥러닝 모델 개발",
        status: "경력",
        education: "대학교(4년)↑",
        employmentType: "계약직",
        location: "서울 강남구",
        deadline: "~10/24(수)",
    },
];

const replyData = [
    {
        id: 1,
        company: "댓글1",
        position: "플랫폼 서비스 개발",
        description: "댓글 데이터",
        status: "신입 · 경력",
        education: "대학교(4년)↑",
        employmentType: "정규직",
        location: "서울 종로구",
        deadline: "~ 10/24(월)",
    },
    {
        id: 2,
        company: "댓글2",
        position: "AI 연구 개발",
        description: "머신러닝 및 딥러닝 모델 개발",
        status: "경력",
        education: "대학교(4년)↑",
        employmentType: "계약직",
        location: "서울 강남구",
        deadline: "~ 10/25(월)",
    },
    {
        id: 3,
        company: "댓글3",
        position: "AI 연구 개발",
        description: "머신러닝 및 딥러닝 모델 개발",
        status: "경력",
        education: "대학교(4년)↑",
        employmentType: "계약직",
        location: "서울 강남구",
        deadline: "~10/26(수)",
    },
];

// 탭 활성화 함수
const setActiveTab = (selectedTab) => {
    const tabs = tabBox.querySelectorAll("li");

    // 모든 탭에서 .Select 클래스 제거
    tabs.forEach((tab) => tab.classList.remove("Select"));

    // 선택된 탭에 .Select 클래스 추가
    selectedTab.parentElement.classList.add("Select");
};

// 리스트 렌더링 함수
const renderList = (data) => {
    jobList.innerHTML = "";

    if (data.length > 0) {
        data.forEach((item) => {
            const li = document.createElement("li");
            li.className = "row recruit-summary-basic";
            li.innerHTML = `
                <div class="InpBox scrap-check">
                    <span class="Chk Hide">
                        <input type="checkbox" id="recruit-check-${item.id}" class="idx-chk checkbox-idx" value="${item.id}" />
                        <label class="Lbl" for="recruit-check-${item.id}">선택</label>
                    </span>
                </div>
                <div class="col-corp type02">
                    <a target="-blank" id="${item.id}" class="relay-recruit-view relay-recruit-data">
                        ${item.company}
                    </a>
                </div>
                <div class="col-informs">
                    <strong class="tit">
                        <a href="#" target="-blank">${item.description}</a>
                    </strong>
                    <button class="like-btn scrap-${item.id}" scraped="n" rec-idx="${item.id}">
                        <span class="blind">찜하기 버튼</span>
                    </button>
                    <ul class="inform">
                        <li>${item.status}</li>
                        <li>${item.education}</li>
                        <li>${item.employmentType}</li>
                        <li>${item.location}</li>
                    </ul>
                </div>
                <div class="col-relation">
                    <p class="reason">내 선호조건과 비슷</p>
                    <span class="data">
                        <strong class="point">${item.location} X IT개발·데이터</strong>
                    </span>
                </div>
                <div class="col-btns">
                    <button class="sri-btn-ml">
                        <span class="sri-btn-immediately">삭제하기</span>
                    </button>
                    <span class="date">
                        ${item.deadline}
                    </span>
                </div>
            `;
            jobList.appendChild(li);
        });
        pageBox.style.display = "flex"; // 페이지 박스 표시
    } else {
        // 데이터가 없을 때의 처리
        jobList.innerHTML = `
            <form name="list-form-no-row" id="list-form-no-row">
                <div class="list-status">
                    <div class="no-row">
                        <p class="txt">
                            <b>입사지원 내역이 없어요</b>
                            userName님에게 맞는 공고를 소개해줄게요!
                        </p>
                        <a href="" class="link-go">나에게 맞는 공고 보러가기</a>
                    </div>
                </div>
            </form>
        `;
        pageBox.style.display = "none"; // 페이지 박스 숨기기
    }
};

// 초기 렌더링
renderList(applyData);

// 탭 클릭 이벤트
replyTab.addEventListener("click", () => {
    renderList(replyData);
    setActiveTab(replyTab);
});

postTab.addEventListener("click", () => {
    renderList(applyData);
    setActiveTab(postTab);
});

// 찜하기 버튼(스크랩) 클릭 이벤트
jobList.addEventListener("click", (event) => {
    if (event.target.closest(".like-btn")) {
        const button = event.target.closest(".like-btn");
        const isScraped = button.getAttribute("scraped") === "y";
        button.setAttribute("scraped", isScraped ? "n" : "y");
        button.classList.toggle("active");
        console.log(`스크랩 상태: ${isScraped ? "해제" : "등록"}`);
    }
});

// 전체 선택 체크박스 로직
selectAll.addEventListener("change", () => {
    const isChecked = selectAll.checked;
    const individualCheckboxes = document.querySelectorAll(
        'input[type="checkbox"].checkbox-idx'
    );
    individualCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
    });
});

// 개별 체크박스 변경 시 전체 선택 체크박스 상태 업데이트
jobList.addEventListener("change", (event) => {
    if (event.target.classList.contains("checkbox-idx")) {
        const individualCheckboxes = document.querySelectorAll(
            'input[type="checkbox"].checkbox-idx'
        );
        const allChecked = Array.from(individualCheckboxes).every(
            (cb) => cb.checked
        );
        selectAll.checked = allChecked;
    }
});
