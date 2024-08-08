import React from 'react';
import Key from './Key';
import Pitch, { comparePitches, generatePianoPitchesWithSharp } from '@/components/theory/Pitch';

const defaultLower: Pitch = { step: 'C', octave: 5 };
const defaultUpper: Pitch = { step: 'B', octave: 6 };

const Keyboard = ({ 
  lower = defaultLower,
  upper = defaultUpper
}: { lower?: Pitch, upper?: Pitch }) => {
  if(comparePitches(lower, upper) > 0) {
    throw new Error('Lower pitch must be lower than upper pitch');
  }
  const pitches = generatePianoPitchesWithSharp()
  .filter((pitch) => {
    return comparePitches(pitch, lower) >= 0 
    && comparePitches(pitch, upper) <= 0;
  });

  return (
    <div className="flex">
      {pitches.map((pitch, index) => (
        <Key key={index} pitch={pitch}/>
      ))}
    </div>
  );
};

export default Keyboard;
