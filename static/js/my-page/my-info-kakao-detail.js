const editButton = document.querySelector(".photo_edit_btn");
const photoButton = document.querySelector(".btn_photo");
const txtPhotoOriginal = document.querySelector(".txt_photo_original");

photoButton.addEventListener("click", () => {
    txtPhotoOriginal.style.display = "block";

    if (editButton.style.display === "block") {
        editButton.style.display = "none"; // 이미 열려있으면 닫기
    } else {
        editButton.style.display = "block"; // 닫혀있으면 열기
    }
});

document.addEventListener("click", (event) => {
    // 클릭한 영역이 photo_edit_btn이나 btn_photo가 아닌 경우
    if (
        !editButton.contains(event.target) &&
        !photoButton.contains(event.target)
    ) {
        editButton.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // 최상단에 모든 변수 선언
    const mailCertNumInput = document.getElementById("mailCertNum");
    const btnCertConfirmMail = document.getElementById("btnCertConfirmMail");
    const btnCertEmail = document.getElementById("btnCertEmail");
    const emailInput = document.getElementById("email");
    const fieldSubVerify = document.querySelector(".field_sub.field_verify");
    const btnEmail = document.getElementById("btnEmail");
    const btnEmailCancel = document.getElementById("btnEmailCancel");
    const fieldBody = document.getElementById("person_email_form");
    const fieldEdit = document.getElementById("edit_email");
    const privacyGuideEmail = document.getElementById("privacy_guide_email");
    const personEmail = document.getElementById("person_email");
    const personMaskingEmail = document.getElementById("person_masking_email");
    const btnMaskingEmail = document.getElementById("btnMaskingEmail");

    // 인증 번호 입력 이벤트
    mailCertNumInput?.addEventListener("input", () => {
        btnCertConfirmMail.disabled = mailCertNumInput.value.trim() === "";
    });

    // 인증 요청 버튼 클릭 시 이벤트
    btnCertEmail?.addEventListener("click", () => {
        emailInput.readOnly = true;
        fieldSubVerify?.classList.remove("inactive");
        btnCertEmail.disabled = true;
        btnCertConfirmMail.disabled = true;
    });

    // 이메일 수정 버튼 클릭 시 이벤트
    btnEmail?.addEventListener("click", () => {
        fieldBody.classList.add("privacy");
        btnEmail.disabled = true;
        btnEmailCancel.disabled = false;
        fieldEdit.classList.remove("inactive");
        privacyGuideEmail.classList.remove("inactive");
    });

    // 취소 버튼 클릭 시 이벤트
    btnEmailCancel?.addEventListener("click", () => {
        fieldBody.classList.remove("privacy");
        btnEmail.disabled = false;
        btnEmailCancel.disabled = true;
        fieldEdit.classList.add("inactive");
        privacyGuideEmail.classList.add("inactive");
        personEmail.style.display = "none";
        fieldSubVerify?.classList.add("inactive");
        personMaskingEmail.style.display = "block";
        emailInput.readOnly = false;
        btnCertEmail.disabled = false;
    });

    // 수정 버튼에 이벤트 리스너 등록
    document
        .querySelectorAll(".BtnType.SizeS.btn_modify")
        .forEach((modifyButton) => {
            modifyButton.addEventListener("click", (event) => {
                const fieldRow = event.target.closest("tr.field");
                const activeFieldBody = fieldRow.querySelector(
                    "div.field_body:not(.inactive)"
                );
                const inactiveFieldBody = fieldRow.querySelector(
                    "div.field_body.inactive"
                );
                const confirmButton = fieldRow.querySelector(
                    ".BtnType.SizeS.btn_confirm"
                );
                const cancelButton = fieldRow.querySelector(
                    ".BtnType.SizeS.btn_modify_cancel"
                );

                fieldRow.classList.add("active");
                activeFieldBody?.classList.add("inactive");
                inactiveFieldBody?.classList.remove("inactive");

                confirmButton.disabled = false;
                cancelButton.disabled = false;
                modifyButton.disabled = true;
            });
        });

    // 취소 버튼에 이벤트 리스너 등록
    document
        .querySelectorAll(".BtnType.SizeS.btn_modify_cancel")
        .forEach((cancelButton) => {
            cancelButton.addEventListener("click", (event) => {
                const fieldRow = event.target.closest("tr.field");
                const activeFieldBody = fieldRow.querySelector(
                    "div.field_body:not(.inactive)"
                );
                const inactiveFieldBody = fieldRow.querySelector(
                    "div.field_body.inactive"
                );
                const confirmButton = fieldRow.querySelector(
                    ".BtnType.SizeS.btn_confirm"
                );
                const modifyButton = fieldRow.querySelector(
                    ".BtnType.SizeS.btn_modify"
                );

                activeFieldBody?.classList.add("inactive");
                inactiveFieldBody?.classList.remove("inactive");

                fieldRow.classList.remove("active");
                confirmButton.disabled = true;
                cancelButton.disabled = true;
                modifyButton.disabled = false;
            });
        });

    // 마스킹 이메일 확인 버튼 클릭 시 이벤트
    btnMaskingEmail?.addEventListener("click", () => {
        personEmail.style.display = "block";
        personMaskingEmail.style.display = "none";
        privacyGuideEmail.classList.add("inactive");
    });
});

// 사진 업로드 버튼 클릭 시 팝업 열기
document.getElementById("btnPhotoEdit").addEventListener("click", () => {
    const popup = document.querySelector(
        ".layer_pop_manage.layer_photo.mypage"
    );
    popup.style.display = "block"; // 팝업 표시
    editButton.style.display = "none";
});

// 닫기 버튼 클릭 시 팝업 닫기
const closeButtons = document.querySelectorAll(".btn_close");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const popup = button.closest(".layer_pop_manage.layer_photo.mypage");
        popup.style.display = "none"; // 해당 팝업 숨기기
    });
});

const deleteButton = document.getElementById("btnPhotoDelete");

deleteButton.addEventListener("click", () => {
    editButton.style.display = "none";
    const isConfirmed = confirm("삭제하실건가요?");
    if (isConfirmed) {
        alert("삭제되었습니다."); // 여기서 실제 삭제 로직 추가
    } else {
        alert("삭제가 취소되었습니다.");
    }
});

const withdraw = document.querySelector(".btn_withdraw");

withdraw.addEventListener("click", () => {
    const isConfirmed = confirm("탈퇴하실건가요?");
    if (isConfirmed) {
        alert("탈퇴되었습니다."); // 여기서 실제 삭제 로직 추가
    } else {
        alert("탈퇴가 취소되었습니다.");
    }
});

let intervalId; // Interval 저장 변수
const totalTime = 180 * 1000; // 3분 = 180,000ms

function startTimer() {
    const endTime = Date.now() + totalTime; // 현재 시간 + 180초

    // 매 1초마다 실행
    intervalId = setInterval(() => {
        const remaining = Math.max(0, endTime - Date.now()); // 남은 시간 계산
        const seconds = Math.floor(remaining / 1000); // 밀리초를 초로 변환

        // 화면에 남은 시간 표시 (mm:ss 형식)
        document.getElementById("remain_time_mail").textContent = `${String(
            Math.floor(seconds / 60)
        ).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

        // 시간이 0초가 되면 타이머 종료
        if (remaining <= 0) {
            clearInterval(intervalId); // 타이머 종료
            alert("시간이 지났습니다."); // Alert 표시
            document.getElementById("btnEmailCancel").click(); // 버튼 자동 클릭
        }
    }, 1000); // 1초마다 실행
}

function resetTimer() {
    clearInterval(intervalId); // 타이머 정지
    document.getElementById("remain_time_mail").textContent = "3:00"; // 초기화된 시간 표시
}

// 버튼 클릭 이벤트에 startTimer 및 resetTimer 연결
window.onload = () => {
    document
        .getElementById("btnCertEmail")
        .addEventListener("click", startTimer);
    document
        .getElementById("btnEmailCancel")
        .addEventListener("click", resetTimer);
};

let uploadedImageSrc = ""; // 이미지 소스를 저장할 변수

// 미리보기 이미지를 표시하는 함수
function previewImage(event) {
    const file = event.target.files[0]; // 사용자가 업로드한 파일
    if (file) {
        const reader = new FileReader(); // FileReader 인스턴스 생성
        reader.onload = function (e) {
            const originalWrap = document.getElementById("originalWrap"); // ID로 요소 선택
            originalWrap.innerHTML = `<img src="${e.target.result}" 
                style="max-width: 100%; max-height: 100%;" />`; // 이미지 태그 추가

            // 클래스명으로 선택
            if (txtPhotoOriginal) {
                txtPhotoOriginal.style.display = "none"; // display: none으로 숨김
            }

            uploadedImageSrc = e.target.result; // 이미지 소스를 저장
        };
        reader.readAsDataURL(file); // 이미지 파일을 읽어 데이터 URL로 변환
    }
}

// 사진을 등록하는 함수
function savePhoto() {
    const profilePhotoSpan = document.getElementById("myhome_profile_photo"); // ID로 요소 선택
    profilePhotoSpan.innerHTML = `<img src="${uploadedImageSrc}" 
        style="max-width: 100%; max-height: 100%;" />`; // 사진을 span 안에 추가
}
