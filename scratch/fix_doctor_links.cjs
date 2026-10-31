const fs = require('fs');

const files = [
  'src/features/doctor/DoctorConsultationPage.jsx',
  'src/features/doctor/DoctorDashboardPage.jsx',
  'src/features/doctor/DoctorPatientsPage.jsx',
  'src/features/doctor/DoctorPrescriptionsPage.jsx'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/\/doctor\/dashboard/g, '/clinic/dashboard');
  code = code.replace(/\/doctor\/schedule/g, '/clinic/schedules');
  code = code.replace(/\/doctor\/consultation\//g, '/clinic/consultations/');
  code = code.replace(/\/doctor\/consultation/g, '/clinic/consultations');
  code = code.replace(/\/doctor\/prescriptions/g, '/clinic/prescriptions');
  code = code.replace(/\/doctor\/patients/g, '/clinic/patients');
  fs.writeFileSync(file, code, 'utf8');
  console.log('Updated doctor links in', file);
}

