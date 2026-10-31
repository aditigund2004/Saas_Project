const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const target = `<Route path="/doctor" element={<Navigate to="/clinic/consultations" replace />} />
            <Route path="/doctor/*" element={<Navigate to="/clinic/consultations" replace />} />`;

const replacement = `<Route path="/doctor" element={<Navigate to="/clinic/consultations" replace />} />
            <Route path="/doctor/dashboard" element={<Navigate to="/clinic/dashboard" replace />} />
            <Route path="/doctor/schedule" element={<Navigate to="/clinic/schedules" replace />} />
            <Route path="/doctor/consultation" element={<Navigate to="/clinic/consultations" replace />} />
            <Route path="/doctor/consultation/:appointmentId" element={<Navigate to="/clinic/consultations/:appointmentId" replace />} />
            <Route path="/doctor/prescriptions" element={<Navigate to="/clinic/prescriptions" replace />} />
            <Route path="/doctor/patients" element={<Navigate to="/clinic/patients" replace />} />
            <Route path="/doctor/*" element={<Navigate to="/clinic/consultations" replace />} />`;

// Normalize CRLF to LF for matching
code = code.replace(/\r\n/g, '\n');
code = code.replace(target, replacement);

fs.writeFileSync('src/App.jsx', code, 'utf8');
console.log('Successfully updated App.jsx redirects');

