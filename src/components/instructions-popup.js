// ModalPopup.js
import React from 'react';
import './instructions-popup.css'; // Optional: For styling the modal


const Message1 = ({ onClose }) => {
    return (
        <>
            <h2>Welcome to the LLM-EMPHANT</h2>
            <p><b>Large Language Models</b> (LLMs) like Chat-GPT can be difficult to navigate. Will the LLM answer correctly? </p>
            <p>We provide user oversight of QA accuracy via <b>Error Precedent Handling And Normality Transfiguration</b>  (EPHANT)</p>
            <p>This includes:</p>
            <ol>
            <li><b>Parsing your prompts to the LLM</b> for related contexts of grammar, demographics and knoweldge domains</li>
            <li><b>Providing statistics on biases</b> in your prompt that may reduce accuracy (from statistical samples)</li>
            <li><b>Transfiguring prompts</b> into more successful grammatical representations with better vocab.</li>
            </ol>
            <button className="dismiss" onClick={onClose}>Next</button>
        </>
    );
  };

const Message2 = ({ onClose }) => {
return (
    <>
        <h2>The Base LLM</h2>
        <p>To the left is the <b>chat interface</b> for asking questions to your LLM.</p>
        <p>Type in the chat box, click send and we will connect you with ChatGPT behind the scenes using <b>model GPT-4o-mini</b>.</p>
        <button className="dismiss" onClick={onClose}>Next</button>
    </>
);
};

const Message3 = ({ onClose }) => {
    return (
        <>
            <h2>The "LLM-EPHANT"</h2>
            <p>The <b>"Error Precedent Handling</b> And <b>Normality Transfiguration"</b> will be done by our little elephant friend here! You can call him "LLM-EPHANT". </p>
            <p>She will <b>listen in</b> on everything you say and <b>inform you</b> of any <b>issues</b> she sees or <b>suggestions</b> she has for your prompt.</p>
            <button className="dismiss" onClick={onClose}>Dismiss</button>
        </>
    );
    };

const ModalPopup = ({ show, onClose, modal1,modal2,modal3 }) => {
  if (!show) return null;

    const className = modal1? "modal1":modal2?"modal2":modal3?"modal3":""

    const Message = modal1?Message1:modal2?Message2:Message3

  return (
    <>
        <div className='modal-blur'></div>
        <div className={className+" modal-overlay"}>
        <div className="modal-border">
            <div className="modal-content">
                <Message onClose={onClose}/>
            </div>
        </div>
        </div>
    </>
  );
};

export default ModalPopup;