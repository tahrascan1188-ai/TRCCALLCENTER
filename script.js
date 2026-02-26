// ⚠️ هام جداً: حط اللينك اللي هيطلعلك من Apps Script هنا
const API_URL = 'https://script.google.com/macros/s/AKfycbwItGGtaIET4Bt7RQNLDqyBdlu-GgQoFjQG2N0zL2dYCLExPBuZ7R8gnX8qrdQ7gWvL/exec';

// 1. دالة تسجيل الدخول
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('msg');

    msg.innerText = "جاري التحقق...";

    try {
        let response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'login', email: email, password: password })
        });

        let result = await response.json();
        if (result.status === 'success') {
            window.location.href = result.url; // توجيه للشاشة المناسبة
        } else {
            msg.innerText = result.message;
        }
    } catch (error) {
        msg.innerText = "حدث خطأ في الاتصال بالسيرفر.";
    }
}

// 2. دالة جلب بيانات الدكاترة (للكول سنتر)
async function loadDoctors() {
    const tbody = document.getElementById('doctorsBody');
    tbody.innerHTML = "<tr><td colspan='5'>جاري تحميل البيانات...</td></tr>";

    try {
        let response = await fetch(API_URL + "?action=getDoctors");
        let doctors = await response.json();

        tbody.innerHTML = "";
        doctors.forEach(doc => {
            let row = `<tr>
                <td>${doc.name}</td>
                <td>${doc.specialty}</td>
                <td>${doc.branch}</td>
                <td>${doc.status}</td>
                <td><button onclick="alert('جاري التحويل لـ ${doc.name}')">تحويل حالة</button></td>
            </tr>`;
            tbody.innerHTML += row;
        });
    } catch (error) {
        tbody.innerHTML = "<tr><td colspan='5'>فشل تحميل البيانات.</td></tr>";
    }
}

// 3. دالة تسجيل الحضور والانصراف (للدكتور)
async function checkInOut(type) {
    const statusMsg = document.getElementById('statusMsg');
    statusMsg.innerText = "جاري التسجيل...";

    try {
        let response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'checkInOut', type: type })
        });

        let result = await response.json();
        statusMsg.innerText = result.message;
        statusMsg.style.color = type === 'in' ? 'green' : 'red';
    } catch (error) {
        statusMsg.innerText = "حدث خطأ أثناء التسجيل.";
    }
}
