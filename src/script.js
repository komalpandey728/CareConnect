// src/script.js  -- a simple DOM script to show vanilla JS usage (// src/script.js 
//  -- a simple DOM script to show vanilla JS usage
document.addEventListener("DOMContentLoaded", function () {
const btn = document.getElementById("learnMoreBtn");
if (btn) {
    btn.addEventListener("click", function () {
alert("Learn more about CareConnect!");
    });
}
});

