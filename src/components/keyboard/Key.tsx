'use client';
import React from 'react';
import Pitch from '@/components/theory/Pitch';

const showPitch = (pitch: Pitch) => {
  return `${pitch.step}${pitch.alter === undefined ? '' : pitch.alter}${pitch.octave}`;
};

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
    <button className={isWhiteKey(pitch) ? "key" : "key black"} onClick={()=>{}}>
        {showPitch(pitch)}
    </button>
  );
};

  export default Key;
