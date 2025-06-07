const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

//Kiểm tra chế độ đã lưu trong localStorage
if(localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode')
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    //Lưu trạng thái vào localstorage
    if(body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light')
    }
})