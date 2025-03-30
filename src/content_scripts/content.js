// Content script injected into all web pages
import './content.css';

// Execute when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Content script loaded');
  
  // Example of inserting a simple button into the page
  insertButton();
});

// Function to insert button
function insertButton() {
  // Check if button already exists
  if (document.getElementById('svelte-extension-button')) {
    return;
  }

  // Create button
  const button = document.createElement('div');
  button.id = 'svelte-extension-button';
  button.className = 'svelte-extension-button';
  button.innerHTML = 'S';
  
  // Add click event
  button.addEventListener('click', () => {
    // Example of sending message to background script
    chrome.runtime.sendMessage({ action: 'getData' }, (response) => {
      console.log('Response from background:', response);
      alert('Extension button clicked!');
    });
  });
  
  // Add to document
  document.body.appendChild(button);
} 