const recuperarToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "/index.html";
        return;
    }


    const cursosBackend = () => {
        fetch(`https://simple-porter-production.up.railway.app/cursos/backend`, {
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
                    return true;
                }
                if(response.status === 404){
                    // console.log(" nao ha cursos ainda para esta area")
                    return true;
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
                    img.src = `images/post-1-${index + 1}.png`;
                    link.appendChild(img);

                    const h3 = document.createElement('h3');
                    h3.textContent = curso.titulo;
                    link.appendChild(h3);

                    const autor = document.createElement('h3');
                    autor.textContent = curso.autorPlaylist;
                    link.appendChild(autor);

                    return link;
                });

                cursosContainer.append(...links);
            } 
        })
        .catch(erro => {
            console.error('Erro na requisição:', erro);
        })
        .finally(() => {
            // Agendar a próxima execução após 1 hora
            setTimeout(() => cursosBackend(), 3600000);
        });
    };

    

    // chama funçao de cursos
    cursosBackend();
}

// funçao de token
recuperarToken();



