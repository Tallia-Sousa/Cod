const formulario = document.querySelector("form");
const email = document.getElementById('email');
const senha = document.getElementById('password');


function autenticarUsuario(){
     //passar a url do endpoint
	fetch("https://simple-porter-production.up.railway.app/users/login", {
		//passar o cabeçalho e informar o tipo de dado
		//que esta  sendo passado
		headers: {'Content-Type': 'application/json',
        Accept: 'application/json'	 
	},
	
	method: "POST",

     //dados que irao ser passados pelo usuario
	body: JSON.stringify({
		email: email.value,
		senha: senha.value,
	  }),
})     //parametro para receber a resposta
.then(function (response) {
	if (response.status === 401) {
	  console.log("Email ou senha inválidos")//implementar mensagem
	} else if (response.status === 200) {
	  response.json().then(function (data) {
		var token = data.token;
		console.log("Token recebido:", token);
		// Armazenando token gerado pro usuario no localStorage
		localStorage.setItem("token", token);

		window.location.href = "home.html";
	  });
	} else {
	  console.error("Erro ao tentar fazer login:", response.status);
	  // colocar outros tratamentos com mensagens
	}
  })
  .catch(erro => {
	console.error('Erro na requisição:', erro);
})
}

  
formulario.addEventListener("submit", function(event) {
	event.preventDefault();
	autenticarUsuario();
   });