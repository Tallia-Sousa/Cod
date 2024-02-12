document.getElementById('esquecerSenhaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const formData = new FormData(this);

    fetch('http://localhost:8080/password-reset/esquecerSenha', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensagem').innerText = data.message;
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('mensagem').innerText = 'Ocorreu um erro ao processar sua solicitação.';
    });
});