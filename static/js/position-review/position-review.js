// 방향 버튼
const btnView = document.querySelector(".btn-view");

// 목록 상세 div
const viewCont = document.querySelector(".view-cont");
let isOpen = false; // 상태를 저장할 변수

// 버튼 클릭시 이벤트
btnView.addEventListener("click", () => {
    if (isOpen) {
        viewCont.style.display = "none";
        btnView.classList.remove("open");
    } else {
        viewCont.style.display = "block";
        btnView.classList.add("open");
    }
    // 상태 반전 -40 -> -80 (이미지 위치)
    isOpen = !isOpen;
});
