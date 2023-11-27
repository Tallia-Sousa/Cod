const recuperarToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "/index.html";
        return;
    }

    // Função de requisição
    const perfil = async () => {
        try {
            const response = await fetch('https://simple-porter-production.up.railway.app/users/perfil', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                    'Accept': "application/json"
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Não faz redirecionamento manual, deixa o servidor enviar status 401
                    throw new Error('Não autenticado');
                }
                throw new Error(`${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            document.getElementById('nome').textContent = data.nome;
        } catch (erro) {
            console.error('Erro na requisição:', erro);
        } finally {
            // Agendar a próxima execução após 15 minutos (900000 milissegundos)
            setTimeout(recuperarToken, 900000);
        }
    };

    // Chamar a função uma vez imediatamente
    perfil();
};

// Chamando a função principal
recuperarToken();
