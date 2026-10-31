const fs = require('fs');

// 1. Update InventoryDashboardPage.jsx
let invCode = fs.readFileSync('src/features/inventory/InventoryDashboardPage.jsx', 'utf8');
invCode = invCode.replace(/\/inventory\/catalog/g, '/clinic/inventory');
invCode = invCode.replace(/\/inventory\/requests/g, '/clinic/inventory/requests');
invCode = invCode.replace(/\/inventory\/movements/g, '/clinic/inventory/movements');
fs.writeFileSync('src/features/inventory/InventoryDashboardPage.jsx', invCode, 'utf8');
console.log('Updated InventoryDashboardPage.jsx');

// 2. Update App.jsx redirects for /inventory/*
let appCode = fs.readFileSync('src/App.jsx', 'utf8');
const target = `<Route path="/inventory" element={<Navigate to="/clinic/inventory" replace />} />
            <Route path="/inventory/*" element={<Navigate to="/clinic/inventory" replace />} />`;

const replacement = `<Route path="/inventory" element={<Navigate to="/clinic/inventory" replace />} />
            <Route path="/inventory/catalog" element={<Navigate to="/clinic/inventory" replace />} />
            <Route path="/inventory/requests" element={<Navigate to="/clinic/inventory/requests" replace />} />
            <Route path="/inventory/movements" element={<Navigate to="/clinic/inventory/movements" replace />} />
            <Route path="/inventory/expiry" element={<Navigate to="/clinic/inventory/expiry" replace />} />
            <Route path="/inventory/suppliers" element={<Navigate to="/clinic/inventory/suppliers" replace />} />
            <Route path="/inventory/*" element={<Navigate to="/clinic/inventory" replace />} />`;

appCode = appCode.replace(/\r\n/g, '\n');
appCode = appCode.replace(target, replacement);
fs.writeFileSync('src/App.jsx', appCode, 'utf8');
console.log('Updated App.jsx inventory redirects');

