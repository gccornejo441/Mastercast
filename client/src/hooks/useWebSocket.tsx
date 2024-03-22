import { useState, useEffect, useRef, useCallback } from 'react';

export interface MessageBody {
  message: string;
  sessionId: string;
}

const useWebSocket = (url: string) => {
  const [message, setMessage] = useState<MessageBody>({ message: '', sessionId: '' });
  const websocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    websocket.current = new WebSocket(url);

    websocket.current.onopen = () => {
      console.log('WebSocket connected');
    };

    websocket.current.onmessage = (event) => {
      const data: MessageBody = JSON.parse(event.data);
      setMessage(data);
    };

    websocket.current.onclose = () => {
      setMessage({ message: 'disconnected', sessionId: 'nil' });
    };

    return () => {
      websocket.current?.close();
    };
  }, [url]);

  
  const sendMessage = useCallback((message: MessageBody) => {
    if (websocket.current?.readyState === WebSocket.OPEN) {
      websocket.current.send(JSON.stringify(message));
    } else {
      console.log('WebSocket is not open.');
    }
  }, []);

  return [message, sendMessage, websocket];
};

export default useWebSocket;
