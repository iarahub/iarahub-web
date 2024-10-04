import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageCircle } from 'lucide-react';

const IaraBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://cdn.jsdelivr.net/npm/@chatvolt/embeds@latest/dist/chatbox/index.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setIsScriptLoaded(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isScriptLoaded && isOpen && window.Chatbox) {
      window.Chatbox.initStandard({
        agentId: 'cm1tyfnu0004rj1kg8x0hwxin',
        container: '#chatvolt-chatbox-container',
        height: '500px',
        width: '100%',
      });
    }
  }, [isScriptLoaded, isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button onClick={handleToggle} className="rounded-full w-12 h-12 flex items-center justify-center">
          <MessageCircle />
        </Button>
      )}
      {isOpen && (
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              IaraBot
              <Button onClick={handleToggle} variant="ghost" className="h-8 w-8 p-0">
                &times;
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div id="chatvolt-chatbox-container" style={{ width: '100%', height: '500px' }}></div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IaraBot;