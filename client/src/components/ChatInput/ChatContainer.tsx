import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './ChatContainer.module.css'
import ChatInput from './ChatInput';

const UPARROWSVG = () => (<span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white dark:text-black"><path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>)

const ChatContainer = ({ message, sendMessage, socket }: any) => {
    const [value, setValue] = useState<string>('');
    var log = document.getElementById("chat-log");

    function appendLog(item: HTMLElement) {
        if (log) {
            var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
            log.appendChild(item);
            if (doScroll) {
                log.scrollTop = log.scrollHeight - log.clientHeight;
            }
        }
    }

    useEffect(() => {
        console.log(socket)
        if (!socket.current)
        return;

        socket.current.onerror = (event: any) => {
            var item = document.createElement("div");
            item.innerHTML = "<b>Connection closed.</b>";
            appendLog(item);
        };  

        if (message.message !== 'connected' && message.message !== 'disconnected') {
            var item = document.createElement("div");
            item.innerHTML = `<b>${message.sessionId}</b>: ${message.message}`;
            appendLog(item);
        }

    }, [message]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    }

    const handleClick = () => {
        sendMessage({ message: value });
        setValue('');
    }

    return (
        <div>
            <div id="chat-log" className={styles.chatContainer}></div>
            <div className='chatContainer'>
                <ChatInput value={value} onChange={handleChange} />
                <Button onClick={handleClick}>
                    <UPARROWSVG />
                </Button>
            </div>
        </div>
    )
}

export default ChatContainer;