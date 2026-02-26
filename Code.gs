// الكود ده بيستقبل الطلبات من صفحات الـ HTML اللي على GitHub

function doPost(e) {
  let data = JSON.parse(e.postData.contents);
  let action = data.action;
  let response = { status: 'error', message: 'إجراء غير معروف' };

  if (action === 'login') {
    // محاكاة سريعة لتسجيل الدخول (طبعاً هتربطها بجدول Users لاحقاً)
    if (data.email === 'admin@test.com' && data.password === '123') {
      response = { status: 'success', role: 'callcenter', url: 'callcenter.html' };
    } else if ((data.email === 'doc@test.com' || data.email === 'dre' || data.email === 'dre@test.com') && data.password === '123') {
      response = { status: 'success', role: 'doctor', url: 'doctor.html' };
    } else {
      response = { status: 'error', message: 'بيانات غير صحيحة' };
    }
  }

  if (action === 'checkInOut') {
    // هنا كود تسجيل الحضور في الشيت
    let statusText = data.type === 'in' ? '🟢 موجود' : '🔴 غير موجود';
    response = { status: 'success', message: `تم تسجيل الحالة: ${statusText}` };
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  let action = e.parameter.action;
  let response = [];

  if (action === 'getDoctors') {
    // داتا تجريبية، في التنفيذ الفعلي هتجيبها من شيت "Doctors"
    response = [
      { name: 'د. أحمد محمود', specialty: 'باطنة', branch: 'فرع الدقي', status: '🟢 موجود' },
      { name: 'د. سارة كمال', specialty: 'أطفال', branch: 'الفرع الرئيسي', status: '🔴 غير موجود' },
      { name: 'د. مصطفى علي', specialty: 'عظام', branch: 'فرع المعادي', status: '🟡 في إجازة' }
    ];
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
