// Chrome extension background script

// Runs when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome Extension installed');
  
  // Example of saving default settings
  chrome.storage.sync.set({
    settings: {
      theme: 'light',
      notifications: true
    }
  });
});

// Set up message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);
  
  // Handle different types of messages
  if (message.action === 'getData') {
    sendResponse({ success: true, data: 'Example data from background' });
  }
  
  // Return true for asynchronous response
  return true;
}); 