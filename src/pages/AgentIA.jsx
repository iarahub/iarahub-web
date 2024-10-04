import React, { useEffect } from 'react';

const ChatVoltChatbox = () => {
  useEffect(() => {
    // Carrega o script externo para inicializar o Chatbox
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://cdn.jsdelivr.net/npm/@chatvolt/embeds@latest/dist/chatbox/index.js';
    
    script.onload = () => {
      // Inicializa o Chatbox depois que o script for carregado
      if (window.Chatbox) {
        window.Chatbox.initStandard({
          agentId: 'cm1tyfnu0004rj1kg8x0hwxin',
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup para remover o script quando o componente for desmontado
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <chatvolt-chatbox-standard style={{ width: '100%', height: '650px' }} />
    </div>
  );
};

export default ChatVoltChatbox;
