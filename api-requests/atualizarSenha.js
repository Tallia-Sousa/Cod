// Seleciona o formulário pelo ID
const formulario = document.getElementById("esquecerSenhaForm");

// Extrair o token e o email da URL
const token = getUrlParameter('token');
const email = getUrlParameter('email');
console.log("token: " + token);
console.log("email: " + email);

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
        if (response.ok) {
            console.log("Senha atualizada com sucesso.");
            // Implemente aqui o que deseja fazer após a senha ser atualizada com sucesso
        } else {
            console.log("Erro ao atualizar senha.");
            // Implemente aqui o que deseja fazer em caso de erro na atualização da senha
        }
    })
    .catch(function (error) {
        console.error("Erro ao se cadastrar:", error);
        // Implemente aqui o que deseja fazer em caso de erro
    });
}

// Adiciona um ouvinte de evento para o envio do formulário
formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário
    atualizarSenha(); // Chama a função atualizarSenha ao enviar o formulário
});












// const formulario = document.querySelector("form");
// const senha = document.getElementById("password");

// // Extrair o token e o email da URL
// const token = getUrlParameter('token');
// const email = getUrlParameter('email');
// console.log("token: " + token);
// console.log("email: " + email);

// // Função para obter parâmetros da URL
// function getUrlParameter(name) {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(name);
// }

// function atualizarSenha() {
//     // Criar objeto com os parâmetros token e email
//     const dados = {
//         token: token,
//         email: email
//     };

//     // Enviar solicitação PUT para a API com os dados
//     fetch('http://localhost:8080/password-reset/atualizar', {
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         method: "PUT",
//         body: JSON.stringify({
//             token: dados.token,
//             email: dados.email,
//             senha: senha.value
//         })
//     })
//     .then(function (response) {
//         if (response.ok) {
//             console.log("Senha atualizada com sucesso.");
//             // Implemente aqui o que deseja fazer após a senha ser atualizada com sucesso
//         } else {
//             console.log("Erro ao atualizar senha.");
//             // Implemente aqui o que deseja fazer em caso de erro na atualização da senha
//         }
//     })
//     .catch(function (error) {
//         console.error("Erro ao se cadastrar:", error);
//         // Implemente aqui o que deseja fazer em caso de erro
//     });
// }

// formulario.addEventListener("submit", function (event) {
//     event.preventDefault();
//     atualizarSenha();
// });
