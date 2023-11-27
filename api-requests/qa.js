const recuperarToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "/index.html";
        return;
    }

    const search = (titulo) => {
        const cursosContainer = document.getElementById('cursos-container');
        const cursos = cursosContainer.getElementsByClassName('box');

        Array.from(cursos).forEach(curso => {//intera ocada elemento cursos e pega
            const tituloCurso = curso.querySelector('h3').textContent.toLowerCase();
            const shouldShow = tituloCurso.includes(titulo);
            curso.style.display = shouldShow ? 'block' : 'none';
        })
    }


    const cursosQA = () => {
        fetch(`https://simple-porter-production.up.railway.app/cursos/qa`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/index.html";
                }
                throw new Error(`${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const cursosContainer = document.getElementById('cursos-container');
         
            if (data.length > 0) {
                const links = data.map((curso, index) => {
                    const link = document.createElement('a');
                    link.href = curso.playlist;
                    link.classList.add('box');

                    const playIcon = document.createElement('i');
                    playIcon.classList.add('fas', 'fa-play');
                    link.appendChild(playIcon);

                    const img = document.createElement('img');
                    img.src = `images/post-1-${index + 2}.png`;
                    link.appendChild(img);

                    const h3 = document.createElement('h3');
                    h3.textContent = curso.titulo;
                    link.appendChild(h3);

                    return link;
                });

                cursosContainer.append(...links);
            } else {
                console.log('Nenhum curso encontrado para esta área.');
            }
        })
        .catch(erro => {
            console.error('Erro na requisição:', erro);
        })
        .finally(() => {
            // Agendar a próxima execução após 1 hora
            setTimeout(() => cursosQA, 3600000);
        });
    };

    // ouvinte pesquisa
    document.getElementById('searchButton').addEventListener('click', function (event) {
        event.preventDefault();
        const titulo = document.getElementById('search').value.trim().toLowerCase();
        search(titulo);
    });
    
    document.getElementById('search').addEventListener('input', function () {
        const titulo = document.getElementById('search').value.trim().toLowerCase();
        search(titulo);
    });
    
    // funçao de cursos
    cursosQA();
}

// funçao de token
recuperarToken();

