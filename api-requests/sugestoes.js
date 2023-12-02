const autorPlaylist = document.getElementById("autor");
const areaPlaylist = document.getElementById("area");
const linkPlaylist = document.getElementById("link");
const formulario = document.querySelector("form");

const recuperarToken = () => {
  const token = localStorage.getItem('token');
  return token;
}

const verificarTokenExpirado = (token) => {
 
  fetch('https://simple-porter-production.up.railway.app/users/verificarTokenExpirado', {
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    method: 'POST'
  })
  .then(function (response) {
    if(!response.ok){
    if (response.status == 401) {
      window.location.href = "/index.html";
    
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  }
    
  })
  .catch(function (error) {
    //mensagens de erro
    console.log(error);
    
  });
}

const sugestoes = (token) => {
  fetch('https://simple-porter-production.up.railway.app/users/sugestoes', {
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
      // página de login
      window.location.href = "/index.html";
      
    }
  
    else if (response.status == 422) {
      console.log("sugestao ja existe");
      // mensagem avisando que a sugestao ja existe e por isso nao pode ser enviada
    }
    else if (response.status == 200) {
      console.log(" sugestao enviada");
      // sugestao enviada, obrigada pela sua contribuição
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

formulario.addEventListener("submit", function (event) {
	event.preventDefault();
	const token = recuperarToken();
  
	if (!token) {
	  window.location.href = "/index.html";
	} else {
	  sugestoes(token);
}})

document.addEventListener("DOMContentLoaded", function () {
  const token = recuperarToken();
  verificarTokenExpirado(token);

 
  setTimeout(function () {
    const token = recuperarToken();
    verificarTokenExpirado(token);
  }, 3600000); // 1 min
});
