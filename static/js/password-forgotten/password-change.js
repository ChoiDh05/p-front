const passwordInput = document.querySelector("#new_password");
const confirmPasswordInput = document.querySelector("#confirm_password");
const passwordWarn = document.querySelector("#password_warn_msg");
const passwordRepWarn = document.querySelector("#password_rep_warn_msg");
const passwordSafe = document.querySelector("#password_safe_msg");
const passwordFocus = document.querySelector("#password_focus_msg");
const confirmPasswordWarn = document.querySelector(
    "#confirm_password_warn_msg"
);
const confirmPasswordSafe = document.querySelector(
    "#confirm_password_safe_msg"
);
const passwordEye = document.querySelector("#masking-password");
const passwordInputBox = document.querySelector(".pass-box");

// 비밀번호 입력 시 안내 메시지와 눈알 처리
passwordInput.addEventListener("focus", () => {
    passwordFocus.style.display = "block"; // 입력 안내 메시지
});

passwordInput.addEventListener("input", () => {
    validateUserPassword();
    if (passwordInput.value) {
        passwordEye.style.display = "block"; // 비밀번호가 있을 때 눈알 아이콘 표시
    } else {
        passwordEye.style.display = "none"; // 비밀번호가 없으면 눈알 아이콘 숨김
    }
});

// 눈알 아이콘 클릭 시 비밀번호 표시/숨기기
passwordEye.addEventListener("click", () => {
    const isPasswordVisible = passwordInput.type === "text";
    passwordInput.type = isPasswordVisible ? "password" : "text";
    passwordEye.classList.toggle("on", !isPasswordVisible); // 토글 버튼 스타일 변경
});

// 비밀번호 유효성 검사 함수
const validateUserPassword = () => {
    const password = passwordInput.value;
    const hasUpperCase = /[A-Z]/.test(password); // 대문자 포함 여부
    const hasLowerCase = /[a-z]/.test(password); // 소문자 포함 여부
    const hasNumber = /[0-9]/.test(password); // 숫자 포함 여부
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // 특수문자 포함 여부
    const isValidLength = password.length >= 8 && password.length <= 16;
    const hasRepeatedChars = /(.)\1\1/.test(password); // 연속된 문자 여부

    const validCount = [
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
    ].filter(Boolean).length;

    let isValid = isValidLength && validCount >= 3 && !hasRepeatedChars; // 유효성 검사

    if (hasRepeatedChars) {
        passwordRepWarn.style.display = "block"; // 반복 문자 경고 메시지
        passwordWarn.style.display = "none";
        passwordSafe.style.display = "none";
        passwordFocus.style.display = "none";
        passwordInputBox.classList.add("invalid"); // 유효하지 않은 입력
    } else if (isValid) {
        passwordRepWarn.style.display = "none";
        passwordWarn.style.display = "none";
        passwordSafe.style.display = "block"; // 사용 가능한 비밀번호 메시지
        passwordFocus.style.display = "none";
        passwordInputBox.classList.remove("invalid"); // 유효한 입력
    } else {
        passwordRepWarn.style.display = "none";
        passwordWarn.style.display = "block"; // 경고 메시지
        passwordSafe.style.display = "none";
        passwordFocus.style.display = "none";
        passwordInputBox.classList.add("invalid");
    }

    return isValid;
};

// 비밀번호 확인 유효성 검사 함수
const validateConfirmPassword = () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password === confirmPassword) {
        confirmPasswordWarn.style.display = "none";
        confirmPasswordSafe.style.display = "block"; // 비밀번호 일치 메시지
    } else {
        confirmPasswordWarn.style.display = "block"; // 비밀번호 불일치 경고
        confirmPasswordSafe.style.display = "none";
    }
};

// 비밀번호 확인 입력 시 유효성 검사
confirmPasswordInput.addEventListener("input", validateConfirmPassword);

// 비밀번호 변경 버튼 클릭 시 유효성 검사
document.getElementById("btn_password_reset").addEventListener("click", () => {
    if (
        validateUserPassword() &&
        passwordInput.value === confirmPasswordInput.value
    ) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        // 서버로 제출하는 로직 추가
    } else {
        alert("비밀번호 입력을 확인해주세요.");
    }
});
