let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
};

const disableDarkMode = () => {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
};

if (toggleBtn) {
    toggleBtn.onclick = (e) => {
        darkMode = localStorage.getItem('dark-mode');
        if (darkMode === 'disabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    };

    if (darkMode === 'enabled') {
        enableDarkMode();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let sideBar = document.querySelector('.side-bar');
    let body = document.body;

    if (!sideBar || !body) {
        console.error('Elemento não encontrado. Verifique se os seletores estão corretos.');
        return;
    }

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

    let userBtn = document.getElementById('user-btn');
    if (userBtn) {
        userBtn.onclick = () => {
            profile.classList.toggle('active');
            search.classList.remove('active');
        };
    }

    let notificationContainer = document.getElementById('notification-container');
    if (notificationContainer) {
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;

            notificationContainer.innerHTML = '';
            notificationContainer.appendChild(notification);

            setTimeout(() => {
                notificationContainer.innerHTML = '';
            }, 5000);
        }

        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                try {
                    const isSuccessful = true; // Altere para false para simular um erro

                    if (isSuccessful) {
                        showNotification('Ação realizada com sucesso!', 'success');
                        // window.location.href = 'pagina_sucesso.html';
                    } else {
                        showNotification('Erro ao realizar a ação. Verifique suas informações e tente novamente.', 'error');
                    }
                } catch (error) {
                    console.error('Erro ao processar formulário:', error);
                }
            });
        });
    }
});

