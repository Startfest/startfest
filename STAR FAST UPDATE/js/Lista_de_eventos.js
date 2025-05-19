let events = [
    {
        title: "Festival de Música",
        address: "Av. Paulista, 1000, São Paulo, SP",
        date: "2024-12-05",
        time: "18:00", // Adicionando horário
        category: "Music",
        color: "#f44336"
    },
    {
        title: "Conferência de Tecnologia",
        address: "Rua Rio de Janeiro, 250, Rio de Janeiro, RJ",
        date: "2024-11-20",
        time: "09:00", // Adicionando horário
        category: "Tech",
        color: "#2196F3"
    },
    {
        title: "Exposição de Arte Contemporânea",
        address: "Rua do Lavradio, 123, Rio de Janeiro, RJ",
        date: "2024-10-15",
        time: "14:00", // Adicionando horário
        category: "Art",
        color: "#9C27B0"
    },
    {
        title: "Show de Rock ao Vivo",
        address: "Av. Faria Lima, 1000, São Paulo, SP",
        date: "2024-12-10",
        time: "21:00", // Adicionando horário
        category: "Music",
        color: "#4CAF50"
    }
];

let currentEventIndex = null;

// Função para formatar a data no formato "DD/MM/YYYY"
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é indexado a partir de 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Função para renderizar os eventos
function renderEvents(filteredEvents) {
    const container = document.getElementById('eventsContainer');
    container.innerHTML = '';

    if (filteredEvents.length === 0) {
        container.innerHTML = '<p style="color: #333;">Nenhum evento encontrado.</p>';
    }

    filteredEvents.forEach((event, index) => {
        const card = document.createElement('div');
        card.classList.add('event-card');
        card.style.backgroundColor = event.color;

        // Formatando a data para "DD/MM/YYYY"
        const formattedDate = formatDate(event.date);

        card.innerHTML = `
            <div class="content">
                <h2>${event.title}</h2>
                <p class="date-time">${formattedDate} ${event.time}</p> <!-- Exibindo a data formatada -->
                <p class="address">${event.address}</p>
                <button onclick="editEvent(${index})">Editar</button>
                <button onclick="deleteEvent(${index})">Excluir</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Função para editar um evento
function editEvent(index) {
    const event = events[index];
    currentEventIndex = index;
    document.getElementById('editTitle').value = event.title;
    document.getElementById('editAddress').value = event.address;
    document.getElementById('editDate').value = event.date;
    document.getElementById('editTime').value = event.time;
    document.getElementById('editColor').value = event.color;
    document.getElementById('editForm').style.display = 'block';
}

// Função para salvar a edição de um evento
function saveEvent() {
    const title = document.getElementById('editTitle').value;
    const address = document.getElementById('editAddress').value;
    const date = document.getElementById('editDate').value;
    const time = document.getElementById('editTime').value;
    const color = document.getElementById('editColor').value;

    if (title && address && date && time) {
        events[currentEventIndex] = { title, address, date, time, color };
        document.getElementById('editForm').style.display = 'none';
        showMessage('Evento atualizado com sucesso!');
        renderEvents(events);
    } else {
        showMessage('Todos os campos são obrigatórios!', true);
    }
}

// Função para excluir um evento
function deleteEvent(index) {
    events.splice(index, 1);
    renderEvents(events);
    showMessage('Evento excluído com sucesso!');
}

// Função de busca por título de evento
function searchEvent() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const filteredEvents = events.filter(event => event.title.toLowerCase().includes(searchValue));
    renderEvents(filteredEvents);
}

// Função para mostrar mensagens de sucesso ou erro
function showMessage(message, isError = false) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = `message ${isError ? 'error' : ''}`;
    messageElement.style.display = 'block';
    setTimeout(() => messageElement.style.display = 'none', 3000);
}

// Função para cancelar a edição de evento
function cancelEdit() {
    document.getElementById('editForm').style.display = 'none';
}

// Função para salvar um novo evento
function saveNewEvent() {
    const title = document.getElementById('newTitle').value;
    const address = document.getElementById('newAddress').value;
    const date = document.getElementById('newDate').value;
    const time = document.getElementById('newTime').value;
    const color = document.getElementById('newColor').value;

    if (title && address && date && time) {
        const newEvent = { title, address, date, time, color };
        events.push(newEvent); // Adiciona o novo evento ao array
        localStorage.setItem('events', JSON.stringify(events)); // Atualiza no localStorage
        document.getElementById('createEventForm').style.display = 'none'; // Esconde o formulário
        renderEvents(events); // Atualiza a lista de eventos na página
        showMessage('Novo evento criado com sucesso!');
    } else {
        showMessage('Todos os campos são obrigatórios!', true);
    }
}

// Função para cancelar a criação de um evento
function cancelCreateEvent() {
    document.getElementById('createEventForm').style.display = 'none';
}

// Renderiza os eventos na primeira execução
renderEvents(events);
