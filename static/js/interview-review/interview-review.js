document.querySelectorAll(".interview-box-review").forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("open");
    });
});
