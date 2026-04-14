let queue = [];
let currentServing = 0;
let ticketCounter = 100; // يبدأ الترقيم من 100

function joinQueue() {
    const name = document.getElementById('studentName').value;
    const service = document.getElementById('serviceType').value;

    if (name === "") {
        alert("يرجى إدخال الاسم");
        return;
    }

    ticketCounter++;
    const studentData = {
        name: name,
        ticket: ticketCounter,
        service: service
    };

    queue.push(studentData);
    document.getElementById('yourNumber').innerText = ticketCounter;
    
    // تحديث الشاشة إذا كان أول شخص
    if (currentServing === 0) {
        currentServing = queue[0].ticket;
        updateDisplay();
    }

    alert(`تم حجز دورك بنجاح! رقمك هو: ${ticketCounter}`);
}

function nextCustomer() {
    if (queue.length > 0) {
        queue.shift(); // إزالة الشخص الذي تم خدمته
        if (queue.length > 0) {
            currentServing = queue[0].ticket;
        } else {
            currentServing = "--";
        }
        updateDisplay();
    } else {
        alert("لا يوجد طلاب في الانتظار حالياً");
    }
}

function updateDisplay() {
    document.getElementById('currentNumber').innerText = currentServing;
}
