const shareButton = document.querySelector(".btn-share");
const shareList = document.querySelector(".list-share");

shareButton.addEventListener("mouseenter", () => {
    shareList.classList.add("visible");
});

shareList.addEventListener("mouseleave", () => {
    shareList.classList.remove("visible");
});

shareButton.addEventListener("mouseleave", (e) => {
    if (!shareList.contains(e.relatedTarget)) {
        shareList.classList.remove("visible");
    }
});

const tbody = document.getElementById("job-list");

for (let i = 0; i < 3; i++) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td class="notification-info">
                <div class="job-tit">
                    <a class="str-tit" title="재무회계 포지셔너"
                       href=""
                       target="-blank"
                       onmousedown="try{n-trackEvent('public', 'job-interview' , 'view-company', '');}catch(e){}">
                        <span>재무회계 포지셔너 채용</span>
                    </a>
                 <a 
                    title="스크랩" 
                    style="cursor: pointer" 
                    onmousedown="try{n-trackEvent('public', 'job-interview', 'scrap-company', '');}catch(e){}" 
                    rec-idx="49214578" 
                    imgtype="default" 
                    class="btn-scrap" 
                    scraped="n">
                    <img src="https://www.saraminimage.co.kr/common/bul_sri_star.png" alt="스크랩 버튼">
                </a>

                </div>
                <div class="job-sector">
                    <span>재무회계 </span>
                    <span>추가 1</span>
                    <span>추가 2</span>
                </div>
            </td>
            <td class="recruit-condition">
                <p class="career">만 19세↑</p>
                <p class="education">-</p>
            </td>
            <td class="company-info">
                <p class="employment-type">포지셔너</p>
                <p class="work-place">서울 강서구</p>
            </td>
            <td class="support-info">
                <p class="deadlines">채용시</p>
                <p class="support-type">
                    <button class="sri-btn-xs" title="클릭하면 입사지원할 수 있는 창이 뜹니다."
                        onclick="try{quickApplyForm('49214578','','t-category=pc-job-interview&t-content=company', ''); return false;} catch (e) {}; return false;"
                        onmousedown="try{n-trackEvent('apply','list','quick-apply');}catch(e){}">
                        <span class="sri-btn-immediately">입사지원</span>
                    </button>
                </p>
            </td>
        `;

    tbody.appendChild(tr);
}

tbody.addEventListener("click", (event) => {
    const target = event.target.closest(".btn-scrap");

    if (target) {
        const img = target.querySelector("img");
        const scraped = target.getAttribute("scraped");

        if (scraped === "n") {
            img.src =
                "https://www.saraminimage.co.kr/common/bul_sri_star_on.png";
            target.setAttribute("scraped", "y");
        } else {
            img.src = "https://www.saraminimage.co.kr/common/bul_sri_star.png";
            target.setAttribute("scraped", "n");
        }
    }
});
