const autorPlaylist = document.getElementById("autor");
const areaPlaylist = document.getElementById("area");
const linkPlaylist = document.getElementById("link");
const formulario = document.querySelector("form");

const recuperarToken = () => {
  const token = localStorage.getItem('token');
  return token;
}

const sugestoes = () => {
  const token = recuperarToken();

  if (!token) {
    window.location.href = "/index.html";
    return;  // Não continue se não houver token
  }

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
      // Página de login
      window.location.href = "/index.html";
    }
    else if (response.status == 422) {
      console.log("sugestao ja existe");
      // Mensagem avisando que a sugestão já existe e por isso não pode ser enviada
    }
    else if (response.status == 200) {
      console.log("sugestao enviada");
      // Sugestão enviada, obrigada pela sua contribuição
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
document.addEventListener("DOMContentLoaded", function () {
  sugestoes();
});

