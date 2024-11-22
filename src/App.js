// src/App.js
import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot/Chatbot';
import LLMEPHANT from "./components/LLMEPHANT/LLMEHPANT"
import DualChat from "./components/DualChat"
import Header from "./components/Header.js"
import { useState, useEffect } from 'react';
import ModalPopup from './components/instructions-popup.js';
import StatsModal from './components/statistics-popup.js';

function App() {

  const [showModal, setShowModal] = useState(false);
  const [modal1, setModal1] = useState(true);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  useEffect(() => {
    setShowModal(true); // Show modal on initial load
  }, []);

  const handleCloseModal = () => {
    if (modal1){
      setModal1(false)
      setModal2(true)
    }
    if (modal2){
      setModal2(false)
      setModal3(true)
    }
    if(modal3){
      setModal3(false)
      setShowModal(false)
    }
  };

  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  const toggleStatsModal = () => setIsStatsModalOpen(!isStatsModalOpen);


  return (
    <>
    <div className='background'></div>
    <Header modal2={modal2 || modal3}/>
    <ModalPopup show={showModal} onClose={handleCloseModal} modal1={modal1} modal2={modal2} modal3={modal3}/>
      <StatsModal isOpen={isStatsModalOpen} onClose={toggleStatsModal}>
        <img 
            src="/stats-1.png" 
            alt="Long Vertical Content" 
            style={{ width: '100%', objectFit: 'cover', alignSelf:'center' }} 
          />
        <img 
            src="/stats-2.png" 
            alt="Long Vertical Content" 
            style={{ width: '100%', objectFit: 'cover', alignSelf:'center' }} 
          />
      </StatsModal>
      {<div className={modal1 || modal2 || modal3?'statsButtonContainer HIDDEN':'statsButtonContainer'}>
        <button onClick={toggleStatsModal} className="statsButton">Full Bias Statistics</button>
      </div>}
    <div className="App">
      <div className='content-area'>
       <div className={modal1 || modal2 || modal3?'title HIDDEN':'title'}>LMM-EPHANT</div>
          <DualChat modal1={modal1} modal2={modal2} modal3={modal3}/>
      </div>
    </div>
    </>
  );
}


export default App;