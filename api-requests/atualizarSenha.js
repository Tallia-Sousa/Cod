// Seleciona o formulário pelo ID
const formulario = document.getElementById("esquecerSenhaForm");

// Extrair o token e o email da URL
const token = getUrlParameter('token');
const email = getUrlParameter('email');


// Função para obter parâmetros da URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function atualizarSenha() {
    // Seleciona o campo de nova senha e confirmação de senha pelo ID
    const novaSenha = document.getElementById("new_password").value;
    const confirmarSenha = document.getElementById("confirm_password").value;

    // Verifica se a senha e a confirmação de senha coincidem
    if (novaSenha !== confirmarSenha) {
        console.log("As senhas não coincidem.");
        return; // Aborta a função se as senhas não coincidirem
    }

    // Cria o objeto com os parâmetros token, email e senha
    const dados = {
        token: token,
        email: email,
        senha: novaSenha
    };

    // Envia a solicitação PUT para a API com os dados
    fetch('http://localhost:8080/password-reset/atualizar', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: "PUT",
        body: JSON.stringify(dados)
    })
    .then(function (response) {
		if (response.status === 200) {
		
		  mostrarMensagemErro("Senha atualizada com sucesso!");
		  limparCampos();
		} 
		else if(response.status === 400){
			mostrarMensagemErro("Erro na tentativa de atualizar senha!");
		}
	  })
	  .catch(function (error) {
		console.error("Error:", error);
		//implementar msg
		
  
	  });
}

//  ouvinte de evento para o envio do formulário
formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário
    atualizarSenha(); // Chama a função atualizarSenha ao enviar o formulário
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


