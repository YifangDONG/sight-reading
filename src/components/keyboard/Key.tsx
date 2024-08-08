'use client';
import React from 'react';
import Pitch from '@/components/theory/Pitch';
import { toString } from '@/components/theory/Pitch';
import "./keyboard.css";



const isWhiteKey = (pitch: Pitch): boolean => {
  if(pitch.alter === undefined) {
    return true;
  }
  const note = `${pitch.step}${pitch.alter}`;
  const whiteKeyWithAlters = ['B#', 'E#', 'Cb', 'Fb'];
  if(whiteKeyWithAlters.includes(note)) {
    return true;
  }
  return false;
}

const Key = ({ pitch }: { pitch: Pitch }) => {
  return (
    <button 
    className={isWhiteKey(pitch) ? 
      "flex-1 border border-black bg-white mr-0.5 cursor-pointer key-height" 
      : "flex-1 bg-black text-white cursor-pointer z-1 black-key" }
    onClick={()=>{}}>
      <span>
        {toString(pitch)}
      </span>
    </button>
  );
};

  export default Key;
