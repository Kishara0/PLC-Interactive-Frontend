import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const streamingLink = 'https://labs.heygen.com/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJBbGVzc2FuZHJhX0NoYWlyX1NpdHRpbmdf%0D%0AcHVibGljIiwicHJldmlld0ltZyI6Imh0dHBzOi8vZmlsZXMyLmhleWdlbi5haS9hdmF0YXIvdjMv%0D%0AODllMDdiODI2ZjFjNGNiMWE1NTQ5MjAxY2RkOGY0ZDZfNTUzMDAvcHJldmlld190YXJnZXQud2Vi%0D%0AcCIsIm5lZWRSZW1vdmVCYWNrZ3JvdW5kIjpmYWxzZSwia25vd2xlZGdlQmFzZUlkIjoiNjA0MmQw%0D%0AODU3ODVkNGFkY2JmZGY4ZTE5NjlhOWQ0MjgiLCJ1c2VybmFtZSI6IjExYmNmN2NiODI2YjRmN2E4%0D%0AMmZhM2JmNGRhOTVjOTFhIn0%3D&inIFrame=1';
  const host = 'https://labs.heygen.com';

  // State to control visibility and expansion
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [clientWidth, setClientWidth] = useState(window.innerWidth);

  // Update clientWidth on window resize
  useEffect(() => {
    const handleResize = () => setClientWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle messages from the iframe
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

  // Header component
  const Header = () => (
    <header className="app-header">
      <div className="logo">
        <img src="/Assets/logo.png" alt="People's Leasing Logo" />
      </div>
      <div className="header-icons">
        <div className="chatbot">
          <img src="/Assets/AI_ChatBot.png" alt="AI Chatbot" />
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
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          ...(isExpanded
            ? clientWidth < 540
              ? { height: 'calc(100vh - 120px)', width: 'calc(100% - 20px)', top: 'calc(50% + 30px)' }
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
    </div>
  );
}

export default App;