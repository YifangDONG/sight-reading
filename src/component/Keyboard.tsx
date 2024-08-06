import React from 'react';

const Key = ({ note, isBlack}) => {
  return (
    <button className={isBlack  ? "key black" : "key"}>{note}</button>
  );
};

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const Keyboard = () => {

  return (
    <div className="keyboard">
      {NOTES.map((note, index) => (
        <Key note={note} isBlack={index % 2 !== 0}/>
      ))}
    </div>
  );
};

export default Keyboard;
