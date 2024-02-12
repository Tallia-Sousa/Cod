document.getElementById('esquecerSenhaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const formData = new FormData(this);

    fetch('http://localhost:8080/password-reset/esquecerSenha', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            mostrarMensagemErro("Verifique seu email, foi enviado um link de redefinição de senha");
        } else if (response.status === 400) {
            mostrarMensagemErro("Usuario inválido.");
        } else if (response.status === 422) {
            mostrarMensagemErro("O link de redefinição de senha já foi enviado, verifique seu email.");
        } else {
            mostrarMensagemErro('Ocorreu um erro ao processar sua solicitação de redefinição de senha.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        mensagemErro(error.message);
    });
});

const mensagemErro = document.getElementById("mensagemErro");

function mostrarMensagemErro(message) {
    mensagemErro.textContent = message;
    mensagemErro.style.display = "block";
    mensagemErro.style.fontSize = "1.8rem";  // Tamanho da fonte
    mensagemErro.style.textAlign = "center";  // Alinhamento no centro
    mensagemErro.style.color= "red";
    setTimeout(() => {
        mensagemErro.style.display = "none";
    }, 10000);
}
