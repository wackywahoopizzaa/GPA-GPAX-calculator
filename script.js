function showSection(section) {
  document.querySelector('.container.text-center').style.display = 'none';
  document.getElementById(section + '-section').style.display = 'block';
}

function goBack() {
  document.querySelector('.container.text-center').style.display = 'block';
  document.getElementById('gpa-section').style.display = 'none';
  document.getElementById('gpax-section').style.display = 'none';
}

function addSubject(formId) {
  const form = document.getElementById(formId);
  const isGPA = formId === 'gpa-form';

  const row = document.createElement('div');
  row.className = 'row mb-3 g-2';

  const label1 = isGPA ? 'ชื่อวิชา' : 'เทอม';
  const label2 = isGPA ? 'เกรด' : 'GPA เทอมนั้น';

  row.innerHTML = `
    <div class="col-12 col-md-4"><input type="text" class="form-control" placeholder="${label1}" /></div>
    <div class="col-6 col-md-4"><input type="number" class="form-control grade" placeholder="${label2}" step="0.01" /></div>
    <div class="col-6 col-md-4"><input type="number" class="form-control credit" placeholder="หน่วยกิต" step="0.5" /></div>
  `;
  form.appendChild(row);
}

function calculateGPA() {
  const grades = document.querySelectorAll('#gpa-form .grade');
  const credits = document.querySelectorAll('#gpa-form .credit');
  let totalPoints = 0, totalCredits = 0;

  for (let i = 0; i < grades.length; i++) {
    const grade = parseFloat(grades[i].value);
    const credit = parseFloat(credits[i].value);
    if (!isNaN(grade) && !isNaN(credit)) {
      totalPoints += grade * credit;
      totalCredits += credit;
    }
  }

  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  document.getElementById('gpa-result').innerText = `GPA คือ: ${gpa}`;
}

function calculateGPAX() {
  const grades = document.querySelectorAll('#gpax-form .grade');
  const credits = document.querySelectorAll('#gpax-form .credit');
  let totalPoints = 0, totalCredits = 0;

  for (let i = 0; i < grades.length; i++) {
    const gpa = parseFloat(grades[i].value);
    const credit = parseFloat(credits[i].value);
    if (!isNaN(gpa) && !isNaN(credit)) {
      totalPoints += gpa * credit;
      totalCredits += credit;
    }
  }

  const gpax = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  document.getElementById('gpax-result').innerHTML = `GPAX คือ: <strong>${gpax}</strong>`;

  const selectedBranch = document.getElementById("subject-branch").value;
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "mt-3";

  if (selectedBranch && gpaxData[selectedBranch]) {
    buttonContainer.innerHTML = `
      <button class="btn btn-info" onclick="showComparison('${selectedBranch}', ${gpax})">
        ดูการเปรียบเทียบกับเกณฑ์ของมหาวิทยาลัย
      </button>
      <div class="mt-3" id="comparison-result"></div>
    `;
    document.getElementById('gpax-result').appendChild(buttonContainer);
  }
}

function clearForm(type) {
  const confirmClear = confirm("คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลทั้งหมด?");
  if (!confirmClear) return;

  const formId = type === 'gpa' ? 'gpa-form' : 'gpax-form';
  const form = document.getElementById(formId);
  const label1 = type === 'gpa' ? 'ชื่อวิชา' : 'เทอม';
  const label2 = type === 'gpa' ? 'เกรด' : 'GPA เทอมนั้น';

  form.innerHTML = `
    <div class="row mb-3 g-2">
      <div class="col-12 col-md-4"><input type="text" class="form-control" placeholder="${label1}" /></div>
      <div class="col-6 col-md-4"><input type="number" class="form-control grade" placeholder="${label2}" step="0.01" /></div>
      <div class="col-6 col-md-4"><input type="number" class="form-control credit" placeholder="หน่วยกิต" step="0.5" /></div>
    </div>
  `;
  document.getElementById(type + '-result').innerText = '';
}

const gpaxData = {
  "Computer Science": {
    average: 2.8,
    universities: {
      "จุฬาลงกรณ์มหาวิทยาลัย": 3.2,
      "มหาวิทยาลัยธรรมศาสตร์": 3.0,
      "มหาวิทยาลัยเชียงใหม่": 2.7
    }
  },
  "Engineering": {
    average: 3.1,
    universities: {
      "จุฬาลงกรณ์มหาวิทยาลัย": 3.4,
      "มหาวิทยาลัยเกษตรศาสตร์": 3.0
    }
  },
  "Medicine": {
    average: 3.8,
    universities: {
      "จุฬาลงกรณ์มหาวิทยาลัย": 3.9,
      "มหาวิทยาลัยมหิดล": 3.85
    }
  },
  "Law": {
    average: 3.0,
    universities: {
      "จุฬาลงกรณ์มหาวิทยาลัย": 3.3,
      "มหาวิทยาลัยธรรมศาสตร์": 3.1
    }
  },
  "Business": {
    average: 2.9,
    universities: {
      "มหาวิทยาลัยธรรมศาสตร์": 3.0,
      "มหาวิทยาลัยรามคำแหง": 2.5
    }
  },
  "Education": {
    average: 2.7,
    universities: {
      "มหาวิทยาลัยศรีนครินทรวิโรฒ": 2.8,
      "มหาวิทยาลัยบูรพา": 2.6
    }
  },
  "Arts": {
    average: 2.8,
    universities: {
      "มหาวิทยาลัยศิลปากร": 2.9,
      "มหาวิทยาลัยเชียงใหม่": 2.7
    }
  },
  "Nursing": {
    average: 3.0,
    universities: {
      "มหาวิทยาลัยมหิดล": 3.1,
      "มหาวิทยาลัยเชียงใหม่": 2.9
    }
  }
};

function showRequiredGPAX() {
  const select = document.getElementById("subject-branch");
  const value = select.value;
  const infoBox = document.getElementById("required-gpax-text");
  const button = document.getElementById("university-details-button");
  const detailBox = document.getElementById("university-details");

  if (!value || !gpaxData[value]) {
    infoBox.innerHTML = "";
    button.style.display = "none";
    detailBox.style.display = "none";
    return;
  }

  infoBox.innerHTML = `GPAX โดยเฉลี่ยที่ต้องการสำหรับสาขา <strong>${value}</strong> คือ <strong>${gpaxData[value].average.toFixed(2)}</strong>`;
  button.style.display = "inline-block";
  detailBox.style.display = "none";
}

function toggleUniversityDetails() {
  const select = document.getElementById("subject-branch");
  const value = select.value;
  const detailBox = document.getElementById("university-details");

  if (!value || !gpaxData[value]) return;

  if (detailBox.style.display === "none") {
    const details = gpaxData[value].universities;
    let html = "<ul class='list-group'>";
    for (const uni in details) {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">${uni}<span class="badge bg-primary rounded-pill">${details[uni]}</span></li>`;
    }
    html += "</ul>";
    detailBox.innerHTML = html;
    detailBox.style.display = "block";
  } else {
    detailBox.style.display = "none";
  }
}

function showComparison(branch, userGpax) {
  const detail = gpaxData[branch];
  let html = `<p>GPAX ของคุณ: <strong>${userGpax}</strong><br/>GPAX เฉลี่ยที่ต้องการสำหรับ <strong>${branch}</strong>: <strong>${detail.average}</strong></p>`;
  html += "<ul class='list-group'>";
  for (const uni in detail.universities) {
    const required = detail.universities[uni];
    const match = parseFloat(userGpax) >= required;
    const status = match ? "ผ่าน" : "ไม่ผ่าน";
    const badgeClass = match ? "bg-success" : "bg-danger";
    html += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${uni}
        <span class="badge ${badgeClass} rounded-pill">${required} (${status})</span>
      </li>`;
  }
  html += "</ul>";
  document.getElementById("comparison-result").innerHTML = html;
}
// Function to share on Facebook
function shareOnFacebook() {
  const url = "https://wackywahoopizzaa.github.io/GPA-GPAX-calculator/";
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(fbShareUrl, '_blank');
}

// Function to copy the link to the clipboard
function copyLink() {
  const url = "https://wackywahoopizzaa.github.io/GPA-GPAX-calculator/";
  const textarea = document.createElement('textarea');
  textarea.value = url;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  alert("ลิงก์ได้ถูกคัดลอกไปยังคลิปบอร์ดแล้ว!");
}
