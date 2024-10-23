const modalCloseBtn = document.querySelector(".btn-close");
const modalWindow = document.querySelector("#p-member-nudge");
const ageBasisContent = document.querySelector(".collection-basis-contents");
const basisClose = document.querySelector(".btn-close-birth-date-msg");
const basisOpen = document.querySelector(".btn-birth-date-msg");
const idInput = document.querySelector("#id");
const idMessage = document.querySelector("#id-focus-msg"); // 아이디 입력창 클릭 시 나오는 검은 글씨
const idMessageWarn = document.querySelector("#id-check-msg1"); // 유효성 검사 빨간 글씨
const idMessageRep = document.querySelector("#id-check-msg2"); // 아이디 중복 빨간 글씨
const idMessageSafe = document.querySelector("#id-check-msg3"); // 사용 가능 아이디 문구
const idInputBox = document.querySelector(".typo-box"); // typo-box 선택

// 아이디 중복 모달창 닫기
modalCloseBtn.addEventListener("click", () => {
    modalWindow.style.display = "none";
});

// 만 15세 창 열기/닫기
basisOpen.addEventListener("click", () => {
    ageBasisContent.style.display = "block";
});

basisClose.addEventListener("click", () => {
    ageBasisContent.style.display = "none";
});

// 아이디 입력창 클릭 시 메시지 표시
idInput.addEventListener("focus", () => {
    idMessage.style.display = "block"; // 아이디 입력 안내 메시지 표시
    idInputBox.classList.remove("invalid"); // 입력창 포커스 시 invalid 제거
    hideIdValidationMessages(); // 다른 경고 메시지 숨기기
});

// 입력값이 변경될 때 유효성 검사 수행
idInput.addEventListener("input", () => validateUserId());

// 아이디 유효성 검사 함수
const validateUserId = () => {
    const idPattern = /^[a-zA-Z0-9-]{4,20}$/; // 4~20자 영문, 숫자, 밑줄 허용
    let isValid = idPattern.test(idInput.value); // 유효성 검사 결과

    if (isValid) {
        hideIdValidationMessages(); // 유효한 경우 모든 경고 메시지 숨기기
        idMessage.style.display = "none";
        idMessageSafe.style.display = "block"; // 사용 가능 메시지 표시
        idInputBox.classList.remove("invalid"); // invalid 제거
    } else {
        hideIdValidationMessages(); // 다른 메시지 숨기기
        idMessage.style.display = "none";
        idMessageWarn.style.display = "block"; // 경고 메시지 표시
        idInputBox.classList.add("invalid"); // typo-box에 invalid 추가
    }

    return isValid; // 유효성 검사 결과 반환
};

// 포커스 해제 시 유효성 검사 결과 유지
idInput.addEventListener("blur", () => {
    validateUserId(); // 값이 있으면 유효성 검사 수행
});

// 모든 유효성 검사 메시지 숨기기 함수
const hideIdValidationMessages = () => {
    idMessageWarn.style.display = "none";
    idMessageRep.style.display = "none";
    idMessageSafe.style.display = "none";
};
// ===========================================================================

const passwordInput = document.querySelector("#password1");
const passwordWarn = document.querySelector("#password1-warning-txt"); // 일반 경고
const passwordRepWarn = document.querySelector("#password1-warning-txt-rep"); // 반복 문자 경고
const passwordSafe = document.querySelector("#password1-good-txt"); // 유효한 메시지
const passwordEye = document.querySelector("#masking-password"); // 눈알 버튼
const passwordFocus = document.querySelectorAll(".focus-txt"); // 안내 문구
const passwordInputBox = document.querySelector(".pass-box"); // 부모 요소

// 비밀번호 입력 시 안내 메시지와 눈알 처리
passwordInput.addEventListener("focus", (e) => {
    // 경고 메시지가 표시 중이면 안내 문구를 숨김
    const isWarningVisible =
        passwordWarn.style.display === "block" ||
        passwordRepWarn.style.display === "block";

    if (!isWarningVisible) {
        passwordFocus[1].style.display = "block"; // 안내 문구 표시
    } else {
        passwordFocus[1].style.display = "none"; // 경고 시 안내 문구 숨김
    }
});

// 비밀번호 입력 중 눈알 아이콘 표시
passwordInput.addEventListener("input", () => {
    if (passwordInput.value) {
        passwordEye.style.display = "block"; // 값이 있으면 눈알 표시
    } else {
        passwordEye.style.display = "none"; // 값이 없으면 눈알 숨김
    }
    validateUserPassword(); // 유효성 검사 실행
});

// 눈알 아이콘 클릭 시 비밀번호 표시 토글
passwordEye.addEventListener("click", () => {
    const isPasswordVisible = passwordInput.type === "text";
    passwordInput.type = isPasswordVisible ? "password" : "text"; // 토글
    passwordEye.classList.toggle("on", !isPasswordVisible); // 클래스 추가/제거
});

// 비밀번호 유효성 검사 함수
const validateUserPassword = () => {
    const password = passwordInput.value;
    const hasUpperCase = /[A-Z]/.test(password); // 대문자 포함 여부
    const hasLowerCase = /[a-z]/.test(password); // 소문자 포함 여부
    const hasNumber = /[0-9]/.test(password); // 숫자 포함 여부
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // 특수문자 포함 여부
    const isValidLength = password.length >= 8 && password.length <= 16;
    const hasRepeatedChars = /(.)\1\1/.test(password); // 연속된 동일 문자 검사

    const validCount = [
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
    ].filter(Boolean).length;

    let isValid = isValidLength && validCount >= 3 && !hasRepeatedChars; // 유효성 검사 결과

    if (hasRepeatedChars) {
        // 연속된 동일 문자가 있을 때
        passwordRepWarn.style.display = "block"; // 반복 문자 경고 표시
        passwordWarn.style.display = "none"; // 기본 경고 숨김
        passwordSafe.style.display = "none"; // 유효 메시지 숨김
        passwordFocus[1].style.display = "none";
        passwordInputBox.classList.add("invalid"); // invalid 클래스 추가
    } else if (isValid) {
        // 유효한 비밀번호일 때
        passwordRepWarn.style.display = "none"; // 반복 문자 경고 숨김
        passwordWarn.style.display = "none"; // 기본 경고 숨김
        passwordSafe.style.display = "block"; // 유효 메시지 표시
        passwordFocus[1].style.display = "none";
        passwordInputBox.classList.remove("invalid"); // invalid 클래스 제거
    } else {
        // 유효하지 않은 비밀번호일 때
        passwordRepWarn.style.display = "none"; // 반복 문자 경고 숨김
        passwordWarn.style.display = "block"; // 기본 경고 표시
        passwordSafe.style.display = "none"; // 유효 메시지 숨김
        passwordFocus[1].style.display = "none";
        passwordInputBox.classList.add("invalid"); // invalid 클래스 추가
    }

    return isValid; // 유효성 검사 결과 반환
};

// 경고 메시지 숨기기/표시 함수
const togglePasswordMessages = (show) => {
    passwordWarn.style.display = show ? "block" : "none";
    passwordRepWarn.style.display = show ? "block" : "none";
    passwordSafe.style.display = show ? "none" : "none";

    if (show) {
        passwordInputBox.classList.add("invalid"); // 경고 시 invalid 클래스 추가
    } else {
        passwordInputBox.classList.remove("invalid"); // 숨길 때 클래스 제거
    }
};

// =========================================================================================
// 요소 선택
const descBtn = document.querySelector("#sms-sent-code"); // 인증 요청 버튼
const phoneComplete = document.querySelector("#name"); // 이름 섹션
const birthComplete = document.querySelector("#birth"); // 생년월일 섹션
const phoneArea = document.querySelector("#sms-cellnum-area"); // 휴대폰 번호 영역
const phoneInput = document.querySelector("#sms-cellnum"); // 휴대폰 번호 입력 필드
const completeMessage = document.querySelector("#sms-cellnum-desc"); // 인증 완료 메시지

// 테스트용 가짜 인증 데이터
const mockUserData = {
    phone: "01012345678",
    name: "안수진",
    birth: "20020730",
};

// 인증 요청 버튼 클릭 시 실행
descBtn.addEventListener("click", () => {
    sendAuthenticationRequest(); // 인증 요청 함수 호출
});

// 인증 요청 함수 (테스트용)
const sendAuthenticationRequest = () => {
    // 서버 응답 시뮬레이션 (2초 후 응답)
    setTimeout(() => {
        completeAuthentication(mockUserData); // 인증 완료 처리
    }, 2000);
};

// 인증 완료 처리 함수
const completeAuthentication = (data) => {
    // 휴대폰 번호, 이름, 생년월일 표시
    phoneInput.value = data.phone; // 휴대폰 번호 입력
    phoneArea.style.display = "block"; // 휴대폰 번호 영역 표시

    document.querySelector("#name .typo-box input").value = data.name; // 이름 표시
    phoneComplete.style.display = "block"; // 이름 영역 표시

    document.querySelector("#birth .typo-box input").value = data.birth; // 생년월일 표시
    birthComplete.style.display = "block"; // 생년월일 영역 표시

    completeMessage.style.display = "block"; // 인증 완료 메시지 표시

    // 인증 요청 버튼 숨기기
    descBtn.style.display = "none";
    validationStatus.isPhoneVerified = true; // 상태 업데이트
    refreshSubmitButtonState(); // 상태 업데이트 후 호출
};

//  =============================================================================================
const emailInput = document.querySelector("#sms-email-id");
const wrongEmail = document.querySelector("#sms-msg-email1");
const btnLink = document.querySelector("#email-msg");
const emailAutoList = document.querySelector(".email-list");
const submitBtn = document.querySelector("#btn-submit");
const emailDomains = document.querySelectorAll(".email-domain");
const txtInputs = document.querySelectorAll(".txt-input"); // strong 태그 안의 텍스트들

// 이메일 유효성 검사 정규표현식
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 이메일 입력 시 btn-link에 'on' 클래스 추가
emailInput.addEventListener("focus", () => {
    btnLink.classList.add("on");
});

// focus 해제 시 'on' 클래스 제거
emailInput.addEventListener("blur", () => {
    btnLink.classList.remove("on");
});

// 이메일 입력 시 자동완성 리스트 갱신
emailInput.addEventListener("input", () => {
    const emailValue = emailInput.value;

    // 입력된 부분을 자동완성 리스트의 strong 태그에 반영
    txtInputs.forEach((txtInput) => {
        txtInput.textContent = emailValue; // strong 태그 안에 입력값 반영
    });

    // 유효성 검사
    if (emailPattern.test(emailValue)) {
        wrongEmail.style.display = "none"; // 경고 메시지 숨기기
        emailAutoList.style.display = "none"; // 자동완성 숨기기
    } else {
        wrongEmail.style.display = "block"; // 경고 메시지 표시
        emailAutoList.style.display = emailValue ? "block" : "none"; // 값이 있을 때만 자동완성 표시
    }
});

// 자동완성 리스트에서 도메인 선택 시 처리
emailDomains.forEach((domainElement) => {
    domainElement.addEventListener("click", (event) => {
        const selectedDomain = event.target.textContent.split("@")[1]; // '@' 뒤 도메인만 가져옴
        const inputValue = emailInput.value; // 현재 입력된 값

        // 완성된 이메일 주소로 업데이트
        emailInput.value = `${inputValue}@${selectedDomain}`;

        wrongEmail.style.display = "none"; // 경고 메시지 숨기기
        emailAutoList.style.display = "none"; // 자동완성 숨기기
    });
});

emailInput.addEventListener("input", () => {
    const emailValue = emailInput.value.trim(); // 공백 제거
    const isValidEmail = emailPattern.test(emailValue); // 유효성 검사
    validationStatus.isEmailValid = isValidEmail; // 상태 업데이트
    refreshSubmitButtonState(); // 상태 업데이트 후 호출
});

// ==================================체크박스===================================
const agreeAllCheckbox = document.querySelector("#agree-all-personal");
const mandatoryCheckboxes = document.querySelectorAll(
    ".agree-article.depth2 input[type='checkbox'][id^='agree-']"
); // 필수 항목
const optionalCheckboxes = document.querySelectorAll(
    ".agree-article.depth2 input[type='checkbox']:not([id^='agree-'])"
); // 선택 항목
const submitBtn2 = document.querySelector(".btn-input-complete"); // 회원가입 버튼

// 전체 동의 클릭 시 모든 항목 체크
agreeAllCheckbox.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    mandatoryCheckboxes.forEach((checkbox) => (checkbox.checked = isChecked));
    optionalCheckboxes.forEach((checkbox) => (checkbox.checked = isChecked));
    refreshSubmitButtonState(); // 회원가입 버튼 상태 업데이트
});
// 전체 동의 상태 업데이트 함수
const updateAllAgreeStatus = () => {
    const allMandatoryChecked = [...mandatoryCheckboxes].every(
        (box) => box.checked
    );
    const allOptionalChecked = [...optionalCheckboxes].every(
        (box) => box.checked
    );
    agreeAllCheckbox.checked = allMandatoryChecked && allOptionalChecked;
};

// 필수 항목 변경 시 전체 동의 상태와 버튼 활성화 업데이트
mandatoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        updateAllAgreeStatus();
        refreshSubmitButtonState();
    });
});

// 선택 항목 변경 시 전체 동의 상태 업데이트
optionalCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateAllAgreeStatus);
});

mandatoryCheckboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", () => {
        const allChecked = [...mandatoryCheckboxes].every((box) => box.checked);
        validationStatus.allMandatoryChecked = allChecked; // 상태 업데이트
        refreshSubmitButtonState(); // 상태 업데이트 후 호출
    })
);

agreeAllCheckbox.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    mandatoryCheckboxes.forEach((checkbox) => (checkbox.checked = isChecked));
    validationStatus.allMandatoryChecked = isChecked; // 상태 업데이트
    refreshSubmitButtonState(); // 상태 업데이트 후 호출
});

// 유효성 검사 결과를 저장할 객체
const validationStatus = {
    isIdValid: false,
    isPasswordValid: false,
    isEmailValid: false,
    isPhoneVerified: false,
    allMandatoryChecked: false,
};

// 아이디 입력 시 유효성 검사 수행
idInput.addEventListener("input", () => {
    validationStatus.isIdValid = validateUserId();
    refreshSubmitButtonState(); // 버튼 활성화 상태 업데이트
});

// 비밀번호 입력 시 유효성 검사 수행
passwordInput.addEventListener("input", () => {
    validationStatus.isPasswordValid = validateUserPassword();
    refreshSubmitButtonState();
});

// 이메일 입력 시 유효성 검사 수행
emailInput.addEventListener("input", () => {
    validationStatus.isEmailValid = emailPattern.test(emailInput.value);
    refreshSubmitButtonState();
});

// 휴대폰 인증 완료 시 처리
descBtn.addEventListener("click", () => {
    requestAuthentication(); // 인증 요청 함수 호출
});

const requestAuthentication = () => {
    setTimeout(() => {
        completeAuthentication(mockUserData); // 인증 완료 처리
    }, 2000);
};

const processAuthenticationCompletion = (data) => {
    phoneInput.value = data.phone;
    phoneArea.style.display = "block";
    document.querySelector("#name .typo-box input").value = data.name;
    phoneComplete.style.display = "block";
    document.querySelector("#birth .typo-box input").value = data.birth;
    birthComplete.style.display = "block";
    completeMessage.style.display = "block";
    descBtn.style.display = "none";
    validationStatus.isPhoneVerified = true; // 인증 완료 상태 업데이트
    refreshSubmitButtonState(); // 버튼 상태 업데이트
};

// 필수 체크박스 변경 시 처리
mandatoryCheckboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", () => {
        validationStatus.allMandatoryChecked = [...mandatoryCheckboxes].every(
            (box) => box.checked
        );
        refreshSubmitButtonState();
    })
);

// 전체 동의 상태 업데이트 함수
const refreshAllAgreementStatus = () => {
    const allMandatoryChecked = [...mandatoryCheckboxes].every(
        (box) => box.checked
    );
    const allOptionalChecked = [...optionalCheckboxes].every(
        (box) => box.checked
    );
    agreeAllCheckbox.checked = allMandatoryChecked && allOptionalChecked;
};

// 버튼 활성화 상태를 업데이트하는 함수
const refreshSubmitButtonState = () => {
    const {
        isIdValid,
        isPasswordValid,
        isEmailValid,
        isPhoneVerified,
        allMandatoryChecked,
    } = validationStatus;

    console.log("----- refreshSubmitButtonState 실행됨 -----");
    console.log(`isIdValid: ${isIdValid}`);
    console.log(`isPasswordValid: ${isPasswordValid}`);
    console.log(`isEmailValid: ${isEmailValid}`);
    console.log(`isPhoneVerified: ${isPhoneVerified}`);
    console.log(`allMandatoryChecked: ${allMandatoryChecked}`);
    console.log("------------------------------------");

    if (
        isIdValid &&
        isPasswordValid &&
        isEmailValid &&
        isPhoneVerified &&
        allMandatoryChecked
    ) {
        submitBtn.classList.remove("is-disabled");
    } else {
        submitBtn.classList.add("is-disabled");
    }
};

// 필드와 체크박스에 이벤트 연결
[idInput, passwordInput, emailInput].forEach(
    (input) => input.addEventListener("input", refreshSubmitButtonState) // 함수명 일관성 유지
);

mandatoryCheckboxes.forEach(
    (checkbox) => checkbox.addEventListener("change", refreshSubmitButtonState) // 수정 완료
);
// =====================회원 정보 중복 모달=====================

const alreadyIdSpan = document.querySelector("#p-already-id");

// 중복 확인 테스트용 모의 데이터
const mockServerResponse = {
    isDuplicate: true, // 중복 여부 플래그
    duplicateId: "example123", // 중복된 아이디
};

// 서버 요청 시뮬레이션 (회원가입 버튼 클릭)
submitBtn.addEventListener("click", () => {
    checkForDuplicateInfo(); // 중복 검사 함수 호출
});

// 중복 검사 함수 (모의 서버 응답 사용)
const checkForDuplicateInfo = () => {
    setTimeout(() => {
        // 서버 응답 모의 처리
        if (mockServerResponse.isDuplicate) {
            showDuplicateModal(mockServerResponse.duplicateId);
        } else {
            alert("회원가입이 완료되었습니다.");
            // 이후 실제 회원가입 처리 로직 추가
        }
    }, 1000); // 1초 지연 후 응답 (서버 응답 시뮬레이션)
};

// 모달에 중복된 아이디 표시 후 열기
const showDuplicateModal = (duplicateId) => {
    alreadyIdSpan.textContent = duplicateId; // 중복된 아이디 표시
    modalWindow.style.display = "block"; // 모달 열기
};

// 인증번호 입력 필드와 메시지 관련 요소 가져오기
const smsCodeInput = document.getElementById("sms-code");
const smsCodeFocusMsg = document.getElementById("sms-code-focus-msg");
const smsCodeWarningTxt = document.getElementById("sms-code-warning-txt");
const smsCodeGoodTxt = document.getElementById("sms-code-good-txt");
const resendSmsButton = document.getElementById("resend-sms-code");

// 페이지 로드 시 기본적으로 메시지 숨김 처리
window.onload = function () {
    smsCodeFocusMsg.style.display = "none";
    smsCodeWarningTxt.style.display = "none";
    smsCodeGoodTxt.style.display = "none";
};

// 인증번호 유효성 검사를 위한 변수
const validCode = "123456"; // 실제 서비스에서는 서버로부터 받아온 값으로 대체해야 함

// 인증번호 입력 시 동작
smsCodeInput.addEventListener("input", function () {
    const enteredCode = smsCodeInput.value;

    // 입력 중에는 안내 문구 보여줌
    smsCodeFocusMsg.style.display = "block";
    smsCodeWarningTxt.style.display = "none";
    smsCodeGoodTxt.style.display = "none";

    // 인증번호가 6자리가 되면 확인
    if (enteredCode.length === 6) {
        // 유효한 인증번호인지 확인
        if (enteredCode === validCode) {
            smsCodeFocusMsg.style.display = "none";
            smsCodeWarningTxt.style.display = "none";
            smsCodeGoodTxt.style.display = "block"; // 성공 메시지 표시
        } else {
            smsCodeFocusMsg.style.display = "none";
            smsCodeGoodTxt.style.display = "none";
            smsCodeWarningTxt.style.display = "block"; // 경고 메시지 표시
        }
    } else {
        // 입력 중간에 6자리가 아닌 경우는 안내 메시지 유지
        smsCodeFocusMsg.style.display = "block";
        smsCodeWarningTxt.style.display = "none";
        smsCodeGoodTxt.style.display = "none";
    }
});

// 재발송 버튼 클릭 시 동작 (기능 추가 가능)
resendSmsButton.addEventListener("click", function () {
    // 여기서 인증번호 재발송 기능 구현 (서버와 통신하여 재발송 요청)
    alert("인증번호가 재발송되었습니다.");
    // 인증번호 재발송 후 초기화 처리
    smsCodeInput.value = "";
    smsCodeFocusMsg.style.display = "block";
    smsCodeWarningTxt.style.display = "none";
    smsCodeGoodTxt.style.display = "none";
});
