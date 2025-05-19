document.getElementById('problem-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const name = document.getElementById('name').value;
    const eventDetails = document.getElementById('event').value;
    const message = document.getElementById('message').value;
    
    // Envio do email usando EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        name: name,
        event: eventDetails,
        message: message
    })
    .then(function(response) {
        showMessage('Problema enviado com sucesso!', 'success');
        clearForm();
    }, function(error) {
        showMessage('Erro ao enviar o problema. Tente novamente.', 'error');
    });
});

// Função para mostrar mensagens de feedback
function showMessage(message, type) {
    const responseMessage = document.getElementById('response-message');
    responseMessage.className = type; // Adiciona a classe de estilo correspondente
    responseMessage.innerText = message; // Define o texto da mensagem
    responseMessage.style.display = 'block'; // Mostra a mensagem
    setTimeout(() => {
        responseMessage.style.display = 'none'; // Esconde após 3 segundos
    }, 3000);
}

// Função para limpar o formulário
function clearForm() {
    document.getElementById('problem-form').reset();
}