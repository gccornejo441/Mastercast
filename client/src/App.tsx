import './App.css';
import ChatContainer from './components/ChatInput/ChatContainer';
import useWebSocket from './hooks/useWebSocket';
import useSessionEngine from './hooks/useSessionEngine';

function App() {
  const apiPort = process.env.REACT_APP_API_PORT || '8080'; // Fallback to 8080 if undefined
  const apiUrl = process.env.REACT_APP_API_HOST || 'localhost'; // Fallback to localhost if undefined
  console.log(apiUrl);
  const [message, sendMessage, socket] = useWebSocket(`ws://${apiUrl}:${apiPort}/ws`);
  useSessionEngine(`http://${apiUrl}:${apiPort}/session`);

  return (
    <div className="App">
      <header className="App-header">
          {/* <ChatContainer
          socket={socket}
          message={message}
          sendMessage={sendMessage}
          /> */}
      </header>
    </div>
  );
}

export default App;
