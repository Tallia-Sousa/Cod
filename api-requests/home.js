


const recuperarToken = () => {
  // Recuperar o token do localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = "/index.html"; 
  }
  verificarToken(token);
};

const verificarToken = (token) => {
  fetch("http://localhost:8080/users/verificarToken", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ token }), // Envia o token no corpo da requisição
  })
  .then(response => {
    if (response.status === 200) {
     
      //colocar uma mensagem seja bem vindo para os estudantes
    } else if (response.status === 401) {
      
      window.location.href = "/index.html"; 
    }
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  })
  .finally(() => {
    // Agendar a próxima execução após 1 horas
    setTimeout(verificarToken, 3600000);
});
};


// Chama a função recuperarToken
recuperarToken();


