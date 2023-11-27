

const recuperarToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "/index.html";
        return;
    }

    // função requisiçao
    const perfil = () => {
        fetch('https://simple-porter-production.up.railway.app/users/perfil', {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
                'Accept': "application/json"
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
         
			document.getElementById('nome').textContent = data.nome;

		})
        .catch(erro => {
            console.error('Erro na requisição:', erro);
        })
        .finally(() => {
            // Agendar a próxima execução após 1 horas
            setTimeout(perfil,3600000);
        });
    };

    // Chamando a função de retornar dados de perfil
    perfil();
    
}

// Chamando a função principal

recuperarToken();