// Função de navegação (apenas para demonstração)
function navigateTo(section) {
    alert("Navegando para " + section);
}

// Função para novo evento
function novoEvento() {
    alert("Criando um novo evento");
}

// Função para logout
function logout() {
    alert("Você saiu do sistema");
}

// Detecção de mudanças no tamanho da tela para ajustar o conteúdo
window.addEventListener('resize', function() {
    const width = window.innerWidth;
    const container = document.querySelector('.container');
    if (width < 1200) {
        container.style.width = "100%"; // Tornando o container responsivo
    } else {
        container.style.width = "1000px"; // Novo limite de largura
    }
});

// Efeito de fundo dinâmico dependendo da hora do dia
window.onload = function() {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
        document.body.style.backgroundColor = "#333"; // Fundo mais escuro à noite
    } else {
        document.body.style.backgroundColor = "#f8f9fa"; // Fundo claro durante o dia
    }
};





