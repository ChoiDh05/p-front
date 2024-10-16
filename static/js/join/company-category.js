const categories = {
    서비스업: {
        "호텔·여행·항공": [
            { name: "호텔", code: "10803" },
            { name: "콘도", code: "10804" },
            { name: "카지노", code: "10805" },
            { name: "여행사", code: "10806" },
            { name: "항공사", code: "10807" },
            { name: "관광", code: "10813" },
            { name: "관광통역", code: "10814" },
            { name: "면세점", code: "10818" },
            { name: "유학·이민", code: "10819" },
        ],
        "외식업·식음료": [
            { name: "레스토랑", code: "20801" },
            { name: "패스트푸드", code: "20802" },
            { name: "카페", code: "20803" },
        ],
        "레저·스포츠·여가": [
            { name: "골프장", code: "30801" },
            { name: "테니스장", code: "30802" },
            { name: "수영장", code: "30803" },
        ],
    },
};

const createHTMLStructure = () => {
    const listJobsCategory = document.querySelector(".list-jobs-category");

    Object.keys(categories).forEach((mainCategory, index) => {
        // 대분류 생성
        let mainCategoryHTML = `
        <li class="item-jobs-category">
            <div class="sub-depth">
                <strong class="title-sub-depth">
                    <input type="hidden" id="mcode_${index}" name="mcode" value="${mainCategory}" data-mcode="${index}" />
                    ${mainCategory}
                </strong>
                <div class="sub-depth2">
                    <ul class="list-depth2">`;

        Object.keys(categories[mainCategory]).forEach(
            (subCategory, subIndex) => {
                // 중분류 생성 (화면에 표시)
                mainCategoryHTML += `
                <li class="item-depth2">
                    <label class="sri-check small sri-radio" for="bcode_${subIndex}">
                        <input type="checkbox" id="bcode_${subIndex}" name="bcode" class="inp-check" value="${subCategory}" data-mcode="${index}" data-bcode="${subIndex}">
                        <span class="txt-check txt-point">${subCategory}</span>
                    </label>
                </li>`;
            }
        );

        mainCategoryHTML += `</ul></div><div class="sub-depth3" style="display: none;">`;

        Object.keys(categories[mainCategory]).forEach(
            (subCategory, subIndex) => {
                // 소분류 생성 (처음에는 숨김 상태)
                mainCategoryHTML += `
            <div class="sub_code_${subIndex}" style="display: none;">
                <strong class="title-sub-depth3">${mainCategory} &gt; ${subCategory}</strong>
                <ul class="list-depth3">`;

                categories[mainCategory][subCategory].forEach((item) => {
                    mainCategoryHTML += `
                <li class="item-depth3">
                    <label class="sri-check small" for="code_${item.code}">
                        <input type="checkbox" id="code_${item.code}" name="code" class="inp-check" value="${item.name}" data-bcode="${subIndex}" data-code="${item.code}">
                        <span class="txt-check txt-point">${item.name}</span>
                    </label>
                </li>`;
                });

                mainCategoryHTML += `</ul></div>`;
            }
        );

        mainCategoryHTML += `</div></div></li>`;

        listJobsCategory.innerHTML += mainCategoryHTML;
    });

    // 중분류 클릭 시 소분류 표시 및 check-on 클래스 추가/제거
    document.querySelectorAll('input[name="bcode"]').forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
            const label = e.target.closest(".sri-check");
            const subCodeClass = `.sub_code_${e.target.getAttribute(
                "data-bcode"
            )}`;
            const subDepthElement = label
                .closest(".sub-depth")
                .querySelector(".sub-depth3");

            // 소분류 엘리먼트 찾기
            const subCodeElement = document.querySelector(subCodeClass);

            // check-on 클래스 토글 및 display 속성 토글
            if (subDepthElement.style.display === "block") {
                label.classList.remove("check-on");
                subDepthElement.style.display = "none"; // depth3 전체 숨기기
                subCodeElement.style.display = "none"; // 소분류 숨기기
            } else {
                label.classList.add("check-on");
                subDepthElement.style.display = "block"; // depth3 전체 보이기
                subCodeElement.style.display = "block"; // 해당 소분류 보이기
            }
        });
    });

    // 소분류 클릭 시 check-on 추가/제거
    document.querySelectorAll('input[name="code"]').forEach((subCheckbox) => {
        subCheckbox.addEventListener("change", (e) => {
            const subLabel = e.target.closest(".sri-check");
            if (e.target.checked) {
                subLabel.classList.add("check-on");
            } else {
                subLabel.classList.remove("check-on");
            }
        });
    });
};

// 처음 로드 시 카테고리 생성
createHTMLStructure();

// =========================버튼 동작===========================
// 닫기 버튼 클릭 시 레이어 숨기기
document.querySelectorAll(".btn-layer-close, .btn-close").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.getElementById("layer-desire-industry").style.display = "none";
    });
});

// 선택 버튼 클릭 시 레이어 보여주기
document.querySelector(".btn-job-category").addEventListener("click", () => {
    document.getElementById("layer-desire-industry").style.display = "block";
});
