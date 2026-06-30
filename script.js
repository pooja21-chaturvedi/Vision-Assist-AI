let currentPage = 'home';
let currentStream = null;

// Navigation
function navigateToPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  currentPage = pageId;
  console.log(`Navigated to ${pageId}`);
}

// Camera Handling
async function startCamera(type) {
  const video = document.getElementById(`${type}Camera`);
  try {
    currentStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = currentStream;
  } catch (err) {
    alert('Camera access denied.');
  }
}

function stopCamera(type) {
  const video = document.getElementById(`${type}Camera`);
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
    currentStream = null;
  }
  video.srcObject = null;
}

// Capture + Analysis Simulation
async function captureAndAnalyze(type) {
  const outputDiv = document.getElementById(`${type}Output`);
  const result = await performAnalysis(type);
  outputDiv.innerHTML = result.success ? result.text : result.error;
  speak(result.speech);
}

// File Handling
function processFile() {
  const output = document.getElementById('outputText');
  output.innerHTML = 'File uploaded successfully. Simulating AI reading...';
  speak('File uploaded successfully. AI reading in progress.');
  setTimeout(() => {
    output.innerHTML = 'Document contains readable text: "Vision Assist AI Demo File."';
  }, 2000);
}

// Text Editor
function saveText() {
  const content = document.getElementById('editor').value;
  localStorage.setItem('savedText', content);
  document.getElementById('saveStatus').innerText = 'Text saved successfully.';
}

function speakEditorText() {
  const content = document.getElementById('editor').value;
  speak(content);
}

// Speech Synthesis
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

// AI Analysis Simulation
async function performAnalysis(type) {
  const responses = {
    scene: {
      success: true,
      text: "<strong>Scene Analysis Complete:</strong><br>• Objects detected: Computer, keyboard, mouse<br>• Environment: Indoor office setting<br>• Lighting: Bright and clear",
      speech: "Scene analysis complete. A computer workspace with a keyboard and monitor detected."
    },
    document: {
      success: true,
      text: "<strong>Document Text Extracted:</strong><br>• Heading: Vision Assist AI<br>• Content: Menu with system control, file management, and text editing",
      speech: "Document recognized successfully. Text is clear and readable."
    },
    currency: {
      success: true,
      text: "<strong>Currency Detected:</strong><br>• Indian 500 Rupee Note identified<br>• Security features visible<br>• Appears genuine",
      speech: "Currency detected: Indian 500 rupee note appears genuine."
    }
  };
  return responses[type] || { success: false, error: 'Unknown analysis type' };
}

// Keyboard Shortcut
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') navigateToPage('home');
});
