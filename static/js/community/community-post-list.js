// 서버에서 받아올 게시글 데이터 예시 (나중에 실제 서버에서 데이터 받기)
const posts = [
    {
        id: 1,
        title: "만29세 경력 없는 신입..",
        desc: "지방 4년제 나오고 학점은 3~3.5사이, 토목전공에 토목기사자격증 하나 있습니다...",
        replyCount: 15,
        viewCount: 4657,
        author: "2ak6eeJme3dIVKy",
        date: "4일 전",
        isHot: true,
    },
    {
        id: 2,
        title: "퇴사사유... 어떻게 설명해야 할까요",
        desc: "의료직군인데 전 직장에서 환자에게 폭행당했습니다...",
        replyCount: 23,
        viewCount: 23,
        author: "mKjR0eteUizH8wZ",
        date: "오늘",
        isHot: false,
    },
    // 추가 게시글들...
];

// 게시글을 렌더링하는 함수
function renderPosts(posts) {
    const postList = document.getElementById("qst-and-ans-list");

    posts.forEach((post) => {
        const listItem = document.createElement("li");

        // 'HOT' 태그 처리
        const hotLabel = post.isHot ? `<em class="label hot">HOT</em>` : "";

        listItem.innerHTML = `
            <div class="qna-subject-wrap">
                ${hotLabel}
                <span class="qna-subject">${post.title}</span>
            </div>
            <span class="qna-desc">${post.desc}</span>
            <div class="qna-data-infos">
                <span class="qna-info qna-reply">댓글 <strong>${post.replyCount}</strong></span>
                <span class="qna-info qna-view">조회 <strong>${post.viewCount}</strong></span>
                <div class="qna-member-info">
                    <span class="qna-from">${post.author}님이 ${post.date}</span>
                   
                </div>
            </div>
            <a href="" class="go">자세히 보기</a>
        `;

        postList.appendChild(listItem);
    });
}

// 페이지 로드 시 게시글 렌더링
document.addEventListener("DOMContentLoaded", function () {
    renderPosts(posts); // 서버에서 받아온 데이터를 렌더링
});

// ================================================================================
const listCategory = document.querySelector(".list-category");
const prevButton = document.querySelector(".bx-prev");
const nextButton = document.querySelector(".bx-next");

// 슬라이드 목록의 너비를 가져옴
const listItems = document.querySelectorAll(".list-category li");
const totalItems = listItems.length;
const itemWidth = listItems[0].offsetWidth; // 각 슬라이드 항목의 너비
const marginRight = parseInt(window.getComputedStyle(listItems[0]).marginRight); // 마진값
const visibleItemsCount = Math.floor(
    listCategory.parentElement.offsetWidth / (itemWidth + marginRight)
); // 한 화면에 보이는 슬라이드 항목 수
const totalWidth = (itemWidth + marginRight) * totalItems; // 전체 슬라이드의 너비
let currentPosition = 0; // 현재 위치
const moveDistance = (itemWidth + marginRight) * Math.floor(totalItems / 4); // 슬라이드가 1/4만큼 이동

listCategory.style.width = totalWidth + "px";

// 이전 버튼 클릭 이벤트
prevButton.addEventListener("click", function () {
    if (currentPosition === 0) {
        return;
    }
    currentPosition += moveDistance;
    if (currentPosition > 0) {
        currentPosition = 0; // 처음으로 돌아가지 않도록 설정
    }
    listCategory.style.transition = "transform 0.5s ease";
    listCategory.style.transform = "translateX(" + currentPosition + "px)";

    // 버튼 활성화/비활성화 상태 업데이트
    updateButtonState();
});

// 다음 버튼 클릭 이벤트
nextButton.addEventListener("click", function () {
    if (
        currentPosition <=
        -totalWidth + (itemWidth + marginRight) * visibleItemsCount
    ) {
        return; // 마지막 슬라이드를 넘지 않도록 설정
    }
    currentPosition -= moveDistance;
    if (
        currentPosition <=
        -totalWidth + (itemWidth + marginRight) * visibleItemsCount
    ) {
        currentPosition =
            -totalWidth + (itemWidth + marginRight) * visibleItemsCount; // 마지막 슬라이드로 이동하고 더 이상 넘어가지 않도록 설정
    }
    listCategory.style.transition = "transform 0.5s ease";
    listCategory.style.transform = "translateX(" + currentPosition + "px)";

    // 버튼 활성화/비활성화 상태 업데이트
    updateButtonState();
});

// 버튼 활성화/비활성화 상태를 업데이트하는 함수
function updateButtonState() {
    if (currentPosition === 0) {
        prevButton.classList.add("disabled");
    } else {
        prevButton.classList.remove("disabled");
    }

    if (
        currentPosition <=
        -totalWidth + (itemWidth + marginRight) * visibleItemsCount
    ) {
        nextButton.classList.add("disabled");
    } else {
        nextButton.classList.remove("disabled");
    }
}

// 초기 버튼 상태 업데이트
updateButtonState();

// =================================================================================
const checkboxes = document.querySelectorAll(".btn-sort");

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
        // 모든 체크박스의 'on' 클래스 제거 및 체크 해제
        checkboxes.forEach((cb) => {
            cb.checked = false;
            cb.classList.remove("on");
        });

        // 현재 클릭된 체크박스만 체크하고 'on' 클래스 추가
        checkbox.checked = true;
        checkbox.classList.add("on");
    });
});

document
    .querySelectorAll(".btn-qna-bookmark.repute-scrap")
    .forEach((button) => {
        button.addEventListener("click", function () {
            // 'on' 클래스 토글
            this.classList.toggle("on");
        });
    });
