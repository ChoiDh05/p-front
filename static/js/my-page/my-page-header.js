// btn_member 버튼 클릭 시 동작
document.querySelectorAll(".btn_member").forEach((button) => {
    button.addEventListener("click", () => {
        // 클릭된 버튼에 expanded 클래스 토글
        button.classList.toggle("expanded");

        // top_btn 또는 btn_alarm에서 on 클래스 모두 제거
        document
            .querySelectorAll(".top_btn.on, .btn_alarm.on")
            .forEach((btn) => {
                btn.classList.remove("on");
            });
    });
});

// top_btn 또는 btn_alarm 버튼 클릭 시 동작
document.querySelectorAll(".top_btn, .btn_alarm").forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("on")) {
            // 이미 on 클래스가 있을 경우 제거
            button.classList.remove("on");
        } else {
            // 다른 모든 버튼에서 on 클래스 제거 후 클릭된 버튼에 추가
            document
                .querySelectorAll(".top_btn.on, .btn_alarm.on")
                .forEach((btn) => {
                    btn.classList.remove("on");
                });
            button.classList.add("on");
        }

        // 모든 btn_member에서 expanded 클래스 제거
        document.querySelectorAll(".btn_member.expanded").forEach((btn) => {
            btn.classList.remove("expanded");
        });
    });
});

// 페이지의 다른 곳 클릭 시 모든 클래스 제거
document.addEventListener("click", (event) => {
    const expandedMember = document.querySelector(".btn_member.expanded");
    const activeButton = document.querySelector(".top_btn.on, .btn_alarm.on");

    // 모든 .top_layer_assist 요소를 가져옵니다.
    const assistLayers = document.querySelectorAll(".top_layer_assist");

    // 열린 영역 내부를 클릭한 경우 종료
    const isInsideExpanded =
        expandedMember && expandedMember.contains(event.target);
    const isInsideActiveButton =
        activeButton && activeButton.contains(event.target);

    // 클릭된 요소가 어떤 .top_layer_assist 내부에 있는지 확인
    const isInsideAssistLayer = Array.from(assistLayers).some((layer) =>
        layer.contains(event.target)
    );

    if (isInsideExpanded || isInsideActiveButton || isInsideAssistLayer) {
        return; // 열린 영역 내부 클릭 시 클래스 유지
    }

    // 열린 영역 외부 클릭 시 클래스 제거
    if (expandedMember) expandedMember.classList.remove("expanded");
    if (activeButton) activeButton.classList.remove("on");
});

document.querySelectorAll(".activity_name").forEach((element) => {
    element.addEventListener("click", () => {
        if (element.classList.contains("off")) {
            element.classList.remove("off");
        }
        element.classList.toggle("on");
    });
});

document.querySelectorAll(".tab_btns li").forEach((tab) => {
    tab.addEventListener("click", () => {
        // 모든 <li> 요소에서 'selected' 클래스 제거
        document.querySelectorAll(".tab_btns li").forEach((li) => {
            li.classList.remove("selected");
        });

        // 클릭한 <li> 요소에 'selected' 클래스 추가
        tab.classList.add("selected");
    });
});

document.querySelector(".btn_toggle_gnb").addEventListener("click", () => {
    const section = document.getElementById("sri_section");
    section.classList.toggle("closed");
});

document.querySelectorAll(".btn_expand").forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault(); // <a> 태그의 기본 동작 막기
        button.closest("li").classList.toggle("expanded");
    });
});

// ul.gnb 내부의 li 클릭 시 selected 클래스 추가
document.querySelectorAll(".gnb li").forEach((li) => {
    li.addEventListener("click", () => {
        // 기존 선택된 요소에서 selected 제거
        li.parentElement.querySelectorAll(".selected").forEach((selected) => {
            selected.classList.remove("selected");
        });
        // 클릭한 li에 selected 추가
        li.classList.add("selected");
    });
});

// ul.depth2 내부의 li 클릭 시 selected 클래스 추가
document.querySelectorAll(".depth2 li").forEach((li) => {
    li.addEventListener("click", () => {
        li.parentElement.querySelectorAll(".selected").forEach((selected) => {
            selected.classList.remove("selected");
        });
        li.classList.add("selected");
    });
});

// document.querySelectorAll(".tab_btns li button").forEach((button, index) => {
//     button.addEventListener("click", () => {
//         // 모든 li에서 selected 클래스 제거
//         document
//             .querySelectorAll(".tab_btns li")
//             .forEach((li) => li.classList.remove("selected"));

//         // 모든 a와 div 요소 숨기기
//         document
//             .querySelectorAll("a")
//             .forEach((a) => (a.style.display = "none"));
//         document
//             .querySelectorAll(".save_list_area")
//             .forEach((div) => (div.style.display = "none"));

//         // 클릭한 버튼의 부모 li에 selected 추가
//         button.closest("li").classList.add("selected");

//         // 해당 인덱스에 맞는 a와 div 표시
//         const selectedA = document.querySelectorAll("a")[index + 1];
//         const selectedDiv = document.querySelectorAll(".save_list_area")[index];

//         // 첫 번째 a는 block, 나머지는 inline-flex
//         selectedA.style.display = index === 0 ? "block" : "inline-flex";
//         selectedDiv.style.display = "block";
//     });
// });
// document.querySelectorAll(".tab_btns li button").forEach((button, index) => {
//     button.addEventListener("click", () => {
//         // 모든 li에서 selected 클래스 제거
//         document
//             .querySelectorAll(".tab_btns li")
//             .forEach((li) => li.classList.remove("selected"));

//         // 버튼의 부모 li와 같은 부모를 가진 a와 div 요소 숨기기
//         const parentContainer = button.closest(".tab_btns"); // .tab_btns 컨테이너 찾기
//         const links = parentContainer.querySelectorAll("a");
//         const divs = parentContainer.querySelectorAll(".save_list_area");

//         links.forEach((a) => (a.style.display = "none"));
//         divs.forEach((div) => (div.style.display = "none"));

//         // 클릭한 버튼의 부모 li에 selected 추가
//         button.closest("li").classList.add("selected");

//         // 해당 인덱스에 맞는 a와 div 표시
//         const selectedA = links[index + 1]; // 인덱스를 1 증가
//         const selectedDiv = divs[index];

//         // 첫 번째 a는 block, 나머지는 inline-flex
//         if (selectedA) {
//             selectedA.style.display = index === 0 ? "block" : "inline-flex";
//         }
//         if (selectedDiv) {
//             selectedDiv.style.display = "block";
//         }
//     });
// });

// 모든 버튼에 대한 이벤트 리스너 추가
document.querySelectorAll(".more_btn, .layer_more_btn").forEach((button) => {
    button.addEventListener("click", () => {
        // toggleable-content에 on 클래스 토글
        button.classList.toggle("on");
    });
});

function showTab(type) {
    // 모든 영역을 숨기기
    document.getElementById("scrap_list_area").style.display = "none";
    document.getElementById("suited_list_area").style.display = "none";
    document.getElementById("favor_list_area").style.display = "none";

    // 클래스 요소도 모두 숨기기
    document.querySelectorAll(".BtnType.SizeM.page_link").forEach((element) => {
        element.style.display = "none";
    });

    // 선택된 영역 및 관련 클래스 요소 표시
    if (type === "scrap") {
        document.getElementById("scrap_list_area").style.display = "block";
        document.querySelector(".scrap_recruit_view").style.display = "block";
    } else if (type === "suited") {
        document.getElementById("suited_list_area").style.display = "block";
        document.querySelector(".suited_recruit_view").style.display = "block";
    } else if (type === "favor_company") {
        document.getElementById("favor_list_area").style.display = "block";
        document.querySelector(".favor_recruit_view").style.display = "block";
    }
}
