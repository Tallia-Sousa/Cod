
const sair = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');
  
    // Redireciona para a página de login
    window.location.href = "/index.html";
  };
  

  const botaoSair = document.querySelector('.option-btn');
botaoSair.addEventListener('click', sair);
