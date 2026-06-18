let danhSachBienThe = [];

function renderBienTheOptions() {
    const datalist = document.getElementById('ds_bienthe');
    if (!datalist) return;
    datalist.innerHTML = danhSachBienThe.map((bt) => {
        return `<option value="${escapeHtml(bt.tenbienthe)}" data-id="${Number(bt.bienthe_id) || 0}"></option>`;
    }).join('');
}



document.addEventListener('DOMContentLoaded', init);

window.themDong = themDong;
window.xoaDong = xoaDong;
