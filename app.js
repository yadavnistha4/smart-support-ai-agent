// app.js
// Simple Smart Support AI Agent - Single File Version

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve the HTML page at root
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Smart Support AI Agent</title>
        <meta charset="UTF-8" />
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; background: #f6f8fa; }
          #chatbox { width: 100%; max-width: 500px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 6px #ccc; }
          input, button { padding: 10px; margin-top: 10px; }
          .msg { margin: 10px 0; }
          .user { color: #374151; }
          .ai { color: #10b981; }
          #about { margin-top: 30px; color: #555; font-size: 0.95em; }
        </style>
      </head>
      <body>
        <div id="chatbox">
          <h2>Smart Support AI Agent</h2>
          <div id="messages"></div>
          <input id="query" type="text" style="width:80%;" placeholder="Ask your question..." />
          <button onclick="sendMsg()">Send</button>
          <div id="about">
            <hr>
            <b>About:</b> Demo smart support AI agent web app.<br>
            Made by Nistha Yadav.
          </div>
        </div>
        <script>
          async function sendMsg() {
            const query = document.getElementById('query').value;
            if (!query) return;
            addMsg('user', query);
            document.getElementById('query').value = '';
            const res = await fetch('/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ query })
            });
            const data = await res.json();
            addMsg('ai', data.response);
          }
          function addMsg(who, text) {
            const messages = document.getElementById('messages');
            const div = document.createElement('div');
            div.className = 'msg ' + who;
            div.innerHTML = '<b>' + (who === 'user' ? 'You' : 'AI') + ':</b> ' + text;
            messages.appendChild(div);
            messages.scrollTop = messages.scrollHeight;
          }
        </script>
      </body>
    </html>
  `);
});

// AI Chat Endpoint
app.post('/chat', (req, res) => {
  const { query } = req.body;
  // Dummy AI logic
  let response = "Sorry, I am a demo AI. I'll try to help: " + query;
  if (/project|support|ai/i.test(query)) {
    response = "This project is a demo Smart Support AI Agent. Ask any question and I'll try to assist!";
  }
  if (/hello|hi|hey/i.test(query)) {
    response = "Hello! How can I assist you today?";
  }
  if (/your name/i.test(query)) {
    response = "I am the Smart Support AI Agent created by Nistha Yadav.";
  }
  res.json({ response });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Smart Support AI Agent running on http://localhost:' + PORT);
});
