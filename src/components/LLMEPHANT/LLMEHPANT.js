// https://freeanimalsounds.org/downloads/


// src/App.js
import React from 'react';
import './LLMEPHANT.css';
import elephant from '../../assets/walking-elephant-jow.png';
import elphantSound from '../../assets/Elephant.mp3';
import { useEffect } from 'react';

let playing = false;

function playSound() {
  if (playing == false) {
    const audio = new Audio(elphantSound);

    console.log("roar");
    playing = true;

    audio.addEventListener('loadedmetadata', () => {
      const halfDuration = audio.duration / 2.2;


      audio.play();

      // Set a timeout to stop the audio halfway through
      const stopHalfway = setTimeout(() => {
        audio.pause();
        // audio.currentTime = 0; // Reset playback to start
        // playing = false;
      }, halfDuration * 1000);

      audio.onended = function() {
        clearTimeout(stopHalfway); // Clear timeout if audio ends before halfway
        playing = false;
      };

    })

      
  
    



    
  }
}

async function callChatbot(input){
  // Send Data to Tagging LLM
  console.log(input)
  return await fetch('http://localhost:9999/callChatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: input }),
    }).then(data=>data.text())
}




function async_sendMessage_wrapper(setMessages,setInput,setProcessing,suggestion,setSuggestion){
  return async function sendMessage(){
    const response = await callChatbot(suggestion)
    const userMessage = { sender: 'user', text: suggestion };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response },
    ]);
    
    setProcessing(false)
    setInput('')
    setSuggestion('')
  }
}

function LLMEPHANT({warnings,entityType,setSuggestion,suggestion,setMessages,setInput,setProcessing,modal1, modal2,modal3}) {
  
  warnings = warnings.split("\n")
  entityType = warnings[0]
  warnings = warnings.slice(1)
  console.log(warnings)
  const entityDisplay = entityType == "celebrity"? "non-celebrities": "celebrities"
  const className = modal1 || modal2? "LLM-EFANT HIDDEN":"LLM-EFANT"
  const img_className = modal3? "elephant-img walk":"elephant-img"
  const bubble_className = modal3? "text-area bubble appear":"text-area bubble"
  useEffect(()=>{
    if (modal3){
      playSound()
    }
  })

  return (
    <div className={className}>
      <div className='buffer'></div>
      <div  className={bubble_className}>
        <p className=''>{warnings.length == 0?<h2 style={{display:"inline-block",paddingRight: "40px",paddingLeft:"40px"}}>I'm listening...</h2>:
          <div className='warning-area'>
            {/* <h1>You are searching for {entityType} entities. </h1> */}
            <h2>Searching for <u>{entityDisplay}</u> with your prompt has the following biases:</h2>
            <div className='warning'>
              {warnings.map((warning)=>
                <div dangerouslySetInnerHTML={{ __html: warning }}>{}</div>
              )}
            </div>
            
          </div>
          }</p>
      </div>
      <div className={img_className}>
        <img src={elephant} alt="description" />
        {suggestion != "" && <div className="suggestion-area">
        <div className='suggestion-prompt'>Wait! I have the following suggestion:</div>
        <div className="suggestion-input">
        <input
          type="text"
          disabled
          value={suggestion? `${suggestion}`:""}
          // onChange={(e) => setInput(e.target.value)}
          // placeholder="Type a message..."
        />
        <button className="btn accept-btn" onClick={async_sendMessage_wrapper(setMessages,setInput,setProcessing,suggestion,setSuggestion)}>✔</button>
        <button className="btn reject-btn">✘</button>
        </div>
      </div>}
      </div>
      
    </div>
  );
}

export default LLMEPHANT;