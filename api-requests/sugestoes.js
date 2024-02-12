const autorPlaylist = document.getElementById("autor");
const areaPlaylist = document.getElementById("area");
const linkPlaylist = document.getElementById("link");
const formulario = document.querySelector("form");

const recuperar = () => {
  const token = localStorage.getItem('token');
  return token;
}


const sugestoes = () => {
  const token = recuperar();

  if (!token) {
    window.location.href = "/index.html";
    return;  
  }

  fetch("http://localhost:8080/users/sugestoes", {
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    method: 'POST',
    body: JSON.stringify({
      autorPlaylist: autorPlaylist.value,
      areaPlaylist: areaPlaylist.value,
      linkPlaylist: linkPlaylist.value,
    })
  })
  .then(function (response) {
    if (response.status == 401) {
      // Página de login
      window.location.href = "/index.html";
    }
    else if (response.status == 422) {
      mostrarMensagemErro("Sugestão Já Existe")
      limparCampos();
     
    }
    else if (response.status == 200) {
      mostrarMensagemErro("Sugestão Enviada")
      limparCampos();
    
    }
    else if(response.status == 400){
      mostrarMensagemErro("Precha Todos Os Campos Corretamente")
      limparCampos();
    }
  })
  .catch(function (error) {
    console.log(error);
  })

  .finally(() => {
    // Agendar a próxima execução após 1 hora
    setTimeout(() => cursosFrontend(), 3600000);
});
  
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  sugestoes();

});

function limparCampos() {
	autorPlaylist.value = "";
	areaPlaylist.value = "";
	linkPlaylist.value = "";
  }

  //mensagem

  
  const mensagemErro = document.getElementById("mensagemErro");
   function mostrarMensagemErro(message) {
	 mensagemErro.textContent = message;
	 mensagemErro.style.display = "block";
	 mensagemErro.style.fontSize = "1.8rem";  // Tamanho da fonte
	 mensagemErro.style.textAlign = "center";  // Alinhamento no centro
	 mensagemErro.style.color= "red"
	 setTimeout(() => {
	   mensagemErro.style.display = "none";
	 }, 10000)}
