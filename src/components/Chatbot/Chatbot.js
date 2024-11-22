// src/Chatbot.js
import React, { useState } from 'react';
import './Chatbot.css'
import axios from 'axios';
import process_message from "./decision_tree"

// async function callAPI(input){
//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-4o-mini', // Use the appropriate model for chat
//         messages: [{ role: 'user', content: input }],
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
//         },
//       }
//     );
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error('Error calling the OpenAI API', error);
//     return
//   }
// }

// async function process_message(input){
//     const response = await callAPI(input)
//     if (response){
//       return response
//     }else{
//       return 'Oops! Something went wrong.'
//     }
// }

const Chatbot = ({setWarnings,setSuggestion,setEntityType,messages,setMessages,input,setInput,setProcessing,processing,modal1, modal2,modal3}) => {
  

  const sendMessage = async () => {
    if (input.trim() === '') {
      return
    };

    // Clear the input
    
    await new Promise((resolve)=>{setTimeout(()=>resolve(),1000)})
    const response = await process_message(input,setWarnings,setEntityType,setSuggestion,setInput,setMessages,setProcessing)
    
  };
  let className = modal2 ? "chatbot-container":"chatbot-container"
  if (modal1){
    className+=" HIDDEN"
  }
  if (modal2 || modal3){
    className+=" highlighted"
  }
  return (
    <div className={className}>
      <div className="chatbox">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === 'user' ? 'bubble-chat bubbleUser' : ' bubble-chat bubbleBot'}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className={processing? "processing send":"send"}>{processing? "":"Send"}</button>
      </div>
    </div>
  );
};

export default Chatbot;