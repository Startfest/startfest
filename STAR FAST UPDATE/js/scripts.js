
const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");

// Seleciona o contêiner principal
const container = document.getElementById("container");

// Quando o botão "Criar Conta" for clicado, adiciona a classe "active" para mostrar o formulário de cadastro
registerBtn.addEventListener("click", () => {
    container.classList.add("active");  // Adiciona a classe "active"
});

// Quando o botão "Entrar" for clicado, remove a classe "active" para mostrar o formulário de login
loginBtn.addEventListener("click", () => {
    container.classList.remove("active");  // Remove a classe "active"
});
