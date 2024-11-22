import React from 'react';

const StatsModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button style={closeButtonStyle} onClick={onClose}>X</button>
        <h2 style={{marginTop:0}}>Cross-Tabular Data on QA Task Accuracy</h2>
        <div style={contentStyle}>{children}</div>
      </div>
    </div>
  );
};

// Styles for modal
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
  zIndex: 100000000,
};

const modalStyle = {
  position: 'fixed',
  backgroundColor: 'rgb(248,236,221)',
  padding: '20px',
  width: '1000px',
  maxHeight: '90%',
  overflow: 'hidden',
  position: 'relative',
  paddingTop:"40px",
  marginLeft:"auto",
  marginRight:"auto",
  marginTop:"40px",
  marginBottom:"40px",
  height:"80%",
  border: "5px solid rgb(104, 74, 36)"
};

const contentStyle = {
  overflowY: 'scroll',
  paddingLeft:"20px",
  paddingRight:"20px",
  height: "90%"
};



const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  padding: '6px 9px 6px 9px',
  cursor: 'pointer',
  paddingLeft: "9.5px",
  paddingRight: "8.5px",
  paddingTop: "7.5px",
  paddingBottom: "8px",
  fontWeight: 900,
  backgroundColor: "#dbb47b"
};

export default StatsModal;
