// 글자 수 세기 관련 변수
const editor = document.getElementById("qust-detail"); // 글 내용 입력하는 곳
const charCountDisplay = document.querySelector(".post-count em"); // 글자수 표시할 곳

// 글자 수 세기 로직
editor.addEventListener("input", () => {
    const currentLength = editor.textContent.length; // innerText 대신 textContent로 변경
    charCountDisplay.textContent = currentLength; // 글자 수 업데이트
});

// 카테고리 관련 변수
const categoryButton = document.querySelector(".btn-category-select");
const categoryList = document.querySelector(".list-qna-category");
const categoryItems = document.querySelectorAll(".list-qna-category .category");

// 카테고리 버튼 클릭 시 리스트 보이거나 숨기기
categoryButton.addEventListener("click", () => {
    if (categoryButton.classList.contains("expend")) {
        categoryButton.classList.remove("expend"); // 리스트가 보이는 상태라면 숨김
        categoryList.style.display = "none";
    } else {
        categoryButton.classList.add("expend"); // 리스트가 숨겨진 상태라면 펼침
        categoryList.style.display = "block";
    }
});

// 카테고리 항목 클릭 시 동작
categoryItems.forEach((categoryItem) => {
    categoryItem.addEventListener("click", () => {
        const selectedCategory = categoryItem.getAttribute("data-name"); // 선택한 카테고리 이름 가져오기
        if (selectedCategory) {
            categoryButton.textContent = selectedCategory; // 선택한 카테고리 이름을 버튼에 반영
            categoryButton.classList.remove("expend"); // 버튼에서 expend 클래스 제거
            categoryList.style.display = "none"; // 카테고리 리스트를 숨김

            // 모든 카테고리에서 'selected' 클래스 제거 후, 선택한 항목에만 추가
            categoryItems.forEach((item) => {
                item.classList.remove("selected");
            });
            categoryItem.classList.add("selected");
        }
    });
});

// 모달 관련 변수
const submitButton = document.querySelector(".btn-qna-write"); // 게시글 등록 버튼
const modal = document.getElementById("layer-qna-alert"); // 모달창
const modalCloseButton = document.querySelector(".btn-layer-close"); // 모달 닫기 버튼
const confirmButton = document.querySelector(".btn-confirm"); // 확인 버튼
const alertText = document.getElementById("alert-text"); // 모달 내용
const titleInput = document.getElementById("qus-title"); // 제목 입력란
const dimmed = document.getElementById("dimmed"); // dimmed 배경

// 게시글 제출 버튼 클릭 시
submitButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const content = editor.textContent.trim(); // editor 대신 textContent 사용

    // 제목이 비어있을 때
    if (title === "") {
        alertText.textContent = "앗! 게시글 제목을 입력하고 작성 완료해주세요!";
        modal.style.display = "block";
        dimmed.style.display = "block"; // dimmed 배경 보이기
    }
    // 내용이 비어있을 때
    else if (content === "") {
        alertText.textContent = "앗! 게시글 내용을 입력하고 작성 완료해주세요!";
        modal.style.display = "block";
        dimmed.style.display = "block"; // dimmed 배경 보이기
    }
    // 제목과 내용이 모두 있을 때
    else {
        alert("게시글이 정상적으로 등록되었습니다.");
    }
});

// 모달창 닫기 기능 (닫기 버튼)
modalCloseButton.addEventListener("click", () => {
    modal.style.display = "none";
    dimmed.style.display = "none"; // dimmed 배경 숨기기
});

// 모달창 닫기 기능 (확인 버튼 클릭 시)
confirmButton.addEventListener("click", () => {
    modal.style.display = "none";
    dimmed.style.display = "none"; // dimmed 배경 숨기기
});
