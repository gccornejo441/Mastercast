import React from 'react';
import styles from './ChatInput.module.css';

interface ChatInputProps {
  id?: string;
  tabIndex?: number;
  dataId?: string;
  rows?: number;
  placeholder?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; // Updated type for consistency
  value?: string;
}

const ChatInput = ({
  id = 'prompt-textarea',
  tabIndex = 0,
  dataId = 'root',
  rows = 1,
  placeholder = 'Type your message',
  style = {
    height: '44px',
  },
  onChange,
  value = '',
}: ChatInputProps) => {
  return (
    <textarea
      id={id}
      tabIndex={tabIndex}
      data-id={dataId}
      rows={rows}
      className={styles.textarea}
      placeholder={placeholder}
      style={style}
      spellCheck="false"
      value={value}
      onChange={onChange} 
    />
  )
};

export default ChatInput;