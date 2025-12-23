const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const days = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

let leftMonth = new Date();
let rightMonth = new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1);
let startDate = null;
let endDate = null;

const modal = document.getElementById('pickerModal');
const overlay = document.getElementById('modalOverlay');
const openBtn = document.getElementById('openPickerBtn');
const cancelBtn = document.getElementById('cancelBtn');
const setDateBtn = document.getElementById('setDateBtn');
const dateDisplay = document.getElementById('openPickerBtn');

function openPicker() {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePicker() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

openBtn.onclick = (e) => {
    e.preventDefault();
    openPicker();
};
overlay.addEventListener('click', () => {
    closePicker();
    closePrintModal();
})
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closePicker();
        closePrintModal();
    }
});

function formatDate(date) {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
}

function isSameDay(d1, d2) {
    return d1 && d2 && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
}

function isInRange(date) {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
}

function renderCalendar(container, month) {
    container.innerHTML = '';
    
    days.forEach(day => {
        const span = document.createElement('div');
        span.className = 'day-header';
        span.textContent = day;
        container.appendChild(span);
    });

    const year = month.getFullYear();
    const monthNum = month.getMonth();
    const firstDay = new Date(year, monthNum, 1).getDay();
    const daysInMonth = new Date(year, monthNum + 1, 0).getDate();
    const prevMonthDays = new Date(year, monthNum, 0).getDate();
    
    const startDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = startDay - 1; i >= 0; i--) {
        const span = document.createElement('div');
        span.className = 'calendar-day other-month';
        span.textContent = prevMonthDays - i;
        container.appendChild(span);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, monthNum, day);
        const span = document.createElement('div');
        span.className = 'calendar-day';
        
        if (isSameDay(date, startDate) || isSameDay(date, endDate)) {
            span.className += ' selected';
        } else if (isInRange(date)) {
            span.className += ' in-range';
        }
        
        span.textContent = day;
        span.onclick = () => selectDate(date);
        container.appendChild(span);
    }

    const totalCells = container.children.length - 7;
    const remainingCells = 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
        const span = document.createElement('div');
        span.className = 'calendar-day other-month';
        span.textContent = i;
        container.appendChild(span);
    }
}

function selectDate(date) {
    if (!startDate || (startDate && endDate)) {
        startDate = date;
        endDate = null;
    } else {
        if (date < startDate) {
            endDate = startDate;
            startDate = date;
        } else {
            endDate = date;
        }
    }
    updateInputs();
    render();
}

function updateInputs() {
    document.getElementById('startDate').value = startDate ? formatDate(startDate) : '';
    document.getElementById('endDate').value = endDate ? formatDate(endDate) : '';
}

function render() {
    document.getElementById('monthLeft').textContent = `${months[leftMonth.getMonth()]} ${leftMonth.getFullYear()}`;
    document.getElementById('monthRight').textContent = `${months[rightMonth.getMonth()]} ${rightMonth.getFullYear()}`;
    
    renderCalendar(document.getElementById('calendarLeft'), leftMonth);
    renderCalendar(document.getElementById('calendarRight'), rightMonth);
}

document.getElementById('prevLeft').onclick = () => {
    leftMonth = new Date(leftMonth.getFullYear(), leftMonth.getMonth() - 1);
    rightMonth = new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1);
    render();
};

document.getElementById('nextLeft').onclick = () => {
    leftMonth = new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1);
    rightMonth = new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1);
    render();
};

document.getElementById('prevRight').onclick = () => {
    rightMonth = new Date(rightMonth.getFullYear(), rightMonth.getMonth() - 1);
    leftMonth = new Date(rightMonth.getFullYear(), rightMonth.getMonth() - 1);
    render();
};

document.getElementById('nextRight').onclick = () => {
    rightMonth = new Date(rightMonth.getFullYear(), rightMonth.getMonth() + 1);
    leftMonth = new Date(rightMonth.getFullYear(), rightMonth.getMonth() - 1);
    render();
};

cancelBtn.onclick = () => {
    startDate = null;
    endDate = null;
    updateInputs();
    /*render(); //clear selection */
    closePicker();
};
//valid button
setDateBtn.onclick = () => {
    dateDisplay.style.fontSize = '1rem';
    dateDisplay.style.fontWeight = 'bold';
    if (!startDate) {
        alert('Veuillez sélectionner une plage de dates complète');}
    else if (!endDate) {
        dateDisplay.textContent = `${formatDate(startDate)}`;
        dateInput.textContent = `${formatDate(startDate)}`;
        closePicker();}
    else {
        dateDisplay.textContent = `${formatDate(startDate)} - ${formatDate(endDate)}`;
        dateInput.textContent = `${formatDate(startDate)} - ${formatDate(endDate)}`;
        closePicker();
    }
};

render();

