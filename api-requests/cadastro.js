
const formulario = document.querySelector("form");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("password");
function cadastrarUsuario() {
 

	fetch("https://coderisebackend-production.up.railway.app/users/cadastro", {
	  headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	   
  
	  },
	  method: "POST",
	  body: JSON.stringify({
		nome: nome.value,
		email: email.value,
		senha: senha.value
	  })//,
	})
	  .then(function (response) {
		if (response.status === 422) {
		//ainda vai ser implementado mostrarMensagem 
		  mostrarMensagemErro("Usuário existe, faça login");//
		  limparCampos();
		} else if (response.status === 201) {
		  window.location.href = "/index.html";
		  limparCampos();
		} 
		else if(response.status === 400){
			mostrarMensagemErro("Precha todos os campos corretamente")
		}
	  })
	  .catch(function (error) {
		console.error("Erro ao se cadastrar:", error);
		//implementar msg
		
  
	  });
  }
  
  function limparCampos() {
	nome.value = "";
	email.value = "";
	senha.value = "";
  }
  
  formulario.addEventListener("submit", function (event) {
	event.preventDefault();
	cadastrarUsuario();
  });
  
  const mensagemErro = document.getElementById("mensagemErro");
  function mostrarMensagemErro(message) {
    mensagemErro.textContent = message;
    mensagemErro.style.display = "block";
	mensagemErro.style.fontSize = "1.8rem";  // Tamanho da fonte
	mensagemErro.style.textAlign = "center";  // Alinhamento no centro
	mensagemErro.style.color= "red"
    setTimeout(() => {
      mensagemErro.style.display = "none";
    }, 10000);
  }
  
  