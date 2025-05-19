// Função para aplicar a máscara no telefone
function mascaraTelefone(event) {
  let input = event.target;
  let value = input.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  if (value.length <= 2) {
    input.value = `(${value}`;
  } else if (value.length <= 6) {
    input.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  } else {
    input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
  }
}

// Função para salvar os dados
document.getElementById("dadosForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Previne o envio do formulário

  // Captura os valores dos campos
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const dataNascimento = document.getElementById("data-nascimento").value;
  const telefone = document.getElementById("telefone").value;
  const endereco = document.getElementById("endereco").value;

  // Atualiza os dados no formulário (garante que estão refletidos no formulário)
  document.getElementById("nome").value = nome;
  document.getElementById("email").value = email;
  document.getElementById("data-nascimento").value = dataNascimento;
  document.getElementById("telefone").value = telefone;
  document.getElementById("endereco").value = endereco;

  // Exibe os dados atualizados no console (opcional, para depuração)
  console.log("Dados atualizados:");
  console.log("Nome: " + nome);
  console.log("E-mail: " + email);
  console.log("Data de Nascimento: " + dataNascimento);
  console.log("Telefone: " + telefone);
  console.log("Endereço: " + endereco);

  // Exibe uma mensagem de sucesso
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = "Seus dados foram atualizados com sucesso!";
  mensagem.style.color = "green"; // Cor verde para sucesso
  mensagem.style.display = "block"; // Garante que a mensagem será visível

  // Esconde a mensagem após 3 segundos
  setTimeout(() => {
    mensagem.style.display = "none";
  }, 3000);
});