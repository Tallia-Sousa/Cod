let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
    enableDarkMode();
}
toggleBtn.onclick = (e) =>{
    darkMode =localStorage.getItem('dark-mode');
    if(darkMode === 'disabled'){
        enableDarkMode();
    }else{
        disableDarkMode();
    }
}
/*
document.addEventListener('DOMContentLoaded', function() {
    let sideBar = document.querySelector('.side-bar');
    let body = document.body;

    function updateSidebarVisibility() {
        if (window.innerWidth >= 1200) {
            sideBar.classList.add('active');
            body.classList.add('active');
        } else {
            sideBar.classList.remove('active');
            body.classList.remove('active');
        }
    }

    updateSidebarVisibility();

    window.addEventListener('resize', updateSidebarVisibility);

    let profile = document.querySelector('.header .flex .profile');
    let search = document.querySelector('.header .flex .search-form');
    let userBtn = document.querySelector('#user-btn');
    let menuBtn = document.querySelector('#menu-btn');
    let closeBtn = document.querySelector('#close-btn');

    userBtn.onclick = () => {
        profile.classList.toggle('active');
        search.classList.remove('active');
    };

    menuBtn.onclick = () => {
        sideBar.classList.toggle('active');
        body.classList.toggle('active');
    };

    closeBtn.onclick = () => {
        sideBar.classList.remove('active');
        body.classList.remove('active');
    };

    window.onscroll = () => {
        profile.classList.remove('active');
        search.classList.remove('active');
        if (window.innerWidth < 1200) {
            sideBar.classList.remove('active');
            body.classList.remove('active');
        }
    };
});*/


document.addEventListener('DOMContentLoaded', function() {
    let sideBar = document.querySelector('.side-bar');
    let body = document.body;

    function updateSidebarVisibility() {
        if (window.innerWidth >= 1200) {
            sideBar.classList.add('active');
            body.classList.add('active');
        } else {
            sideBar.classList.remove('active');
            body.classList.remove('active');
        }
    }

    updateSidebarVisibility();

    window.addEventListener('resize', updateSidebarVisibility);

    let profile = document.querySelector('.header .flex .profile');
    let search = document.querySelector('.header .flex .search-form');
    let menuBtn = document.querySelector('#menu-btn');
    let closeBtn = document.querySelector('#close-btn');

    menuBtn.onclick = () => {
        sideBar.classList.toggle('active');
        body.classList.toggle('active');
    };

    closeBtn.onclick = () => {
        sideBar.classList.remove('active');
        body.classList.remove('active');
    };

    window.onscroll = () => {
        profile.classList.remove('active');
        search.classList.remove('active');
        if (window.innerWidth < 1200) {
            sideBar.classList.remove('active');
            body.classList.remove('active');
        }
    };

    // Get the current page URL
    let currentPage = window.location.href;

    // Check if the current page is "sobreNos.html"
    if (currentPage.includes("sobreNos.html")) {
        // Remove the second div with id "user-btn"
        let userBtn = document.getElementById('user-btn');
        if (userBtn) {
            userBtn.remove();
        }
    } else {
        // Attach the event listener for userBtn if it exists
        let userBtn = document.getElementById('user-btn');
        if (userBtn) {
            userBtn.onclick = () => {
                profile.classList.toggle('active');
                search.classList.remove('active');
            };
        }
    }
});




 