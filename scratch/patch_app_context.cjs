const fs = require('fs');

const filePath = 'src/context/AppContext.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Add markAllNotificationsAsRead
const targetFn = `  const clearAllNotifications = () => {`;
const newFn = `  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'success');
  };

  const clearAllNotifications = () => {`;

content = content.replace(targetFn, newFn);

const targetExport = `markNotificationAsRead,`;
const newExport = `markNotificationAsRead,
        markAllNotificationsAsRead,`;

content = content.replace(targetExport, newExport);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully added markAllNotificationsAsRead to AppContext.jsx!');

