import React from 'react';
import Key from './Key';
import Pitch, { comparePitches } from '@/components/theory/Pitch';


const Keyboard = ({ 
  lower = { step: 'C', octave: 5 },
  upper = { step: 'B', octave: 6 } }:
  { lower: Pitch, upper: Pitch }) => {
    if(comparePitches(lower, upper) > 0) {
      throw new Error('Lower pitch must be lower than upper pitch');
    }
    const keys = [];
    const pitches = []; // generate pitches from lower pitch to upper pitches

  return (
    <div className="keyboard">
      {NOTES.map((note, index) => (
        <Key key = {index} note={note} isBlack={index % 2 !== 0}/>
      ))}
    </div>
  );
};

export default Keyboard;


