const calendarMonth = document.getElementById("calendar-month");
const calendarDates = document.getElementById("calendar-dates");
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    calendarMonth.textContent = `${monthNames[month]} ${year}`;
    calendarDates.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
        const emptySpan = document.createElement("span");
        calendarDates.appendChild(emptySpan);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const daySpan = document.createElement("span");
        daySpan.textContent = day;

        // Marcar o dia de hoje
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            daySpan.classList.add("today");
        }

        calendarDates.appendChild(daySpan);
    }
}

function changeMonth(step) {
    currentMonth += step;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar(currentMonth, currentYear);
}


renderCalendar(currentMonth, currentYear);
