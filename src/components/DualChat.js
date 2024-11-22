// src/App.js
import React,{useState} from 'react';
import './DualChat.css';
import Chatbot from './Chatbot/Chatbot';
import LLMEPHANT from "./LLMEPHANT/LLMEHPANT"

function DualChat({modal1, modal2,modal3}) {
    const [warnings, setWarnings] = useState("");
    const [entityType, setEntityType] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [processing, setProcessing] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! How can I assist you today?' },
    ]);
    return (
        <div className='dual-chat'>
        <Chatbot modal1={modal1} modal2={modal2} modal3={modal3} setWarnings={setWarnings} setEntityType={setEntityType} setSuggestion={setSuggestion} processing={processing} input={input} messages={messages} setProcessing={setProcessing} setInput={setInput} setMessages={setMessages}/>
        <LLMEPHANT modal1={modal1} modal2={modal2} modal3={modal3} warnings={warnings} entityType={entityType} suggestion={suggestion} setSuggestion={setSuggestion} setProcessing={setProcessing} setInput={setInput} setMessages={setMessages}/>
        </div>
    );
}

export default DualChat;