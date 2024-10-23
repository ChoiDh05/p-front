// 파일 업로드시 파일 이름 나오는 이벤트
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("help-upload");
    const fileNameDisplay = document.querySelector(".txt-upload");
    const deleteButton = document.querySelector(".btn-delete");

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            fileNameDisplay.style.display = "inline-block";
            deleteButton.style.display = "inline-block";
        }
    });

    deleteButton.addEventListener("click", () => {
        fileInput.value = "";
        fileNameDisplay.textContent = "";
        fileNameDisplay.style.display = "none";
        deleteButton.style.display = "none";
    });
});
// 체크박스 누를시 이미지 왔다갔다하는 이벤트
document.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(
        '.position-input3 > input[type="checkbox"]'
    );

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("click", () => {
            const label = checkbox.nextElementSibling;
            if (checkbox.checked) {
                // 체크되었을 때 label에 스타일 추가
                label.style.backgroundPosition = "0 -48px";
            } else {
                // 체크 해제되었을 때 원래대로 되돌림
                label.style.backgroundPosition = "";
            }
        });
    });
});
