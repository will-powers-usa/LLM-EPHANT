// src/App.js
import React from 'react';
import runningElephant from "../assets/animated-elephant-image-0027.gif"
import "./Header.css"

function getElephantLine(offset=0){
    return<>
        <img src={runningElephant} style={{height:30,width:700,position:"absolute",left:-1260+offset}}/>
        <img src={runningElephant} style={{height:30,width:700,position:"absolute",left:-630+offset}}/>
        <img src={runningElephant} style={{height:30,width:700,position:"absolute",left:0+offset}}/>
        <img src={runningElephant} style={{height:30,width:700,position:"absolute",left:630+offset}}/>
        <img src={runningElephant} style={{height:30,width:700,position:"absolute",left:1260+offset}}/>
    </>
}

function Header({modal2}) {
    const layers = [0]
  return (<div className={modal2?"elephants HIDDEN":'elephants'}>
    {layers.map((i)=>getElephantLine((Math.random()-.5)*5+100*(i)))}
    </div>
  );
}

export default Header;