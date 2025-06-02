import React from 'react';

function App() {
  // Replace with your HeyGen streaming link
  const streamingLink = 'https://youtu.be/QJTAzq1Ap1g?si=j55aI_jOE1OwVfxF';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">HeyGen Interactive Avatar</h1>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={streamingLink}
            title="HeyGen Interactive Avatar"
            className="w-full h-full"
            allow="camera; microphone; autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default App;