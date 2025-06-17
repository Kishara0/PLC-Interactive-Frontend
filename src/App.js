import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const streamingLink = 'https://labs.heygen.com/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJhMDBkZmZkNDk2MjI0Yzk1OGI1MWFkYzI3NGY4NzhjMyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzL2EwMGRmZmQ0OTYyMjRjOTU4YjUxYWRjMjc0Zjg3OGMzL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0LndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjJhZWIzMWEyYzAxMDRhYTliNWFkNjVkY2VhY2FhZTEyIiwidXNlcm5hbWUiOiJkZmUzMmU4ZThkMmY0MDRjOTc0OTNiZmQ5MjhhMzBiYyJ9&inIFrame=1';
  const host = 'https://labs.heygen.com';

  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [clientWidth, setClientWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setClientWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.origin === host && e.data && e.data.type === 'streaming-embed') {
        if (e.data.action === 'init') {
          setIsVisible(true);
        } else if (e.data.action === 'show') {
          setIsExpanded(true);
        } else if (e.data.action === 'hide') {
          setIsExpanded(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const Header = () => (
    <header className="app-header">
      <div className="logo">
        <img src="/Assets/logo.png" alt="People's Leasing Logo" />
      </div>
      <div className="header-icons">
        <div className="chatbot">
          <img src="/Assets/AI_ChatBot.png" alt="AI Chatbot Logo" style={{ pointerEvents: 'none' }} />
        </div>
      </div>
    </header>
  );

  return (
    <div className="app-container">
      <Header />
      <div
        id="streaming-embed"
        className={`chat-embed ${isVisible ? 'visible' : 'hidden'} ${isExpanded ? 'expanded' : ''}`}
        style={{
          margin: '0 auto',
          ...(isExpanded
            ? clientWidth < 540
              ? { height: 'calc(100vh - 120px)', width: 'calc(100% - 20px)' }
              : { height: '600px', width: 'calc(600px * 16 / 9)' }
            : { height: '180px', width: '180px' }),
        }}
      >
        <div id="streaming-container" className="chat-container">
          <iframe
            src={streamingLink}
            title="Streaming Embed"
            className="chat-iframe"
            allow="microphone"
            allowFullScreen={false}
            role="dialog"
          ></iframe>
        </div>
      </div>
      <div className="sections-container">
        <div className="chat-description">
          <h2>You're now chatting with the AI Avatar of People's Leasing & Finance PLC.</h2>
          <p>Do you have a question about our current Annual Report? Get real-time answers instantly.</p>
        </div>
        <div className="analysis-section">
          <p className="analysis-text">To Get In-depth Analysis Use Our ChatBot</p>
          <button
            className="chatbot-button"
            onClick={() => window.open('https://finsightc.plc.lk', '_blank')}
          >
            Go to ChatBot
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;