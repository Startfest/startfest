const eventForm = document.getElementById("eventForm");
const eventNameInput = document.getElementById("eventName");
const eventDateInput = document.getElementById("eventDate");
const eventTimeInput = document.getElementById("eventTime");
const eventColorInput = document.getElementById("eventColor");
const feedbackElement = document.getElementById("feedbackMessage");
const eventList = document.getElementById("eventList");

const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const monthYearElement = document.getElementById("monthYear");
const yearSelect = document.getElementById("yearSelect");
const calendarDates = document.getElementById("calendarDates");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let events = []; // Array para armazenar os eventos criados

// Função para formatar a data no formato "dia, mês e ano"
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
}

// Função para atualizar o calendário
function updateCalendar() {
    monthYearElement.textContent = `${new Date(currentYear, currentMonth).toLocaleString('pt-BR', { month: 'long' })} ${currentYear}`;
    yearSelect.value = currentYear;
    calendarDates.innerHTML = '';  // Limpar o conteúdo antes de renderizar

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    // Adicionar dias vazios no início do mês (para alinhar o primeiro dia corretamente)
    for (let i = 0; i < startDay; i++) {
        const emptyDiv = document.createElement('div');
        calendarDates.appendChild(emptyDiv);
    }

    // Adicionar os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = day;
        dateDiv.classList.add('date');
        const currentDate = new Date(currentYear, currentMonth, day);

        // Destacar o dia de hoje
        if (currentDate.toDateString() === new Date().toDateString()) {
            dateDiv.classList.add('today');
        }

        // Verificar se a data é passada e desabilitar a seleção
        if (currentDate < new Date()) {
            dateDiv.classList.add('past');
            dateDiv.style.pointerEvents = 'none';
        }

        // Adicionar evento de clique para selecionar a data
        dateDiv.addEventListener('click', () => {
            eventDateInput.value = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        });

        calendarDates.appendChild(dateDiv);
    }
}

// Função para exibir os eventos na lista
function displayEvents() {
    eventList.innerHTML = "";  // Limpar a lista de eventos

    events.forEach(event => {
        const li = document.createElement("li");
        li.classList.add("event-item");
        li.style.backgroundColor = event.color;

        li.innerHTML = `
            <span class="event-name">${event.name}</span>
            <span class="event-date">${event.date}</span>
        `;

        eventList.appendChild(li);
    });
}

// Adicionar funcionalidade de navegação de meses
prevMonthButton.addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    updateCalendar();
});

nextMonthButton.addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    updateCalendar();
});

// Adicionar opções de ano no seletor
function populateYearSelect() {
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

// Atualizar o calendário e o seletor de ano quando um ano for selecionado
yearSelect.addEventListener('change', (e) => {
    currentYear = parseInt(e.target.value);
    updateCalendar();
});

// Exibir feedback após criar evento
eventForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const eventName = eventNameInput.value;
    const eventDate = eventDateInput.value;
    const eventTime = eventTimeInput.value;
    const eventColor = eventColorInput.value;

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!eventName || !eventDate || !eventTime || !eventColor) {
        feedbackElement.className = "feedback error";
        feedbackElement.textContent = "Por favor, preencha todos os campos.";
        feedbackElement.classList.add("show");
        setTimeout(() => feedbackElement.classList.remove("show"), 3000);
        return;
    }

    // Criar evento
    const formattedDate = `${eventDate} ${eventTime}`;
    const newEvent = {
        name: eventName,
        date: formatDate(formattedDate), // Formatar a data no formato "dia, mês e ano"
        color: eventColor
    };

    // Adicionar evento ao array
    events.push(newEvent);

    // Exibir eventos
    displayEvents();

    // Mostrar feedback de sucesso
    feedbackElement.className = "feedback success";
    feedbackElement.textContent = "Evento criado com sucesso!";
    feedbackElement.classList.add("show");
    setTimeout(() => feedbackElement.classList.remove("show"), 3000);

    // Resetar formulário
    eventForm.reset();
    eventDateInput.value = "";
    eventTimeInput.value = "";
});

// Preencher o select de anos e inicializar o calendário
populateYearSelect();
updateCalendar();
