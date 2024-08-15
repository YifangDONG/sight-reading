'use client'
import React from 'react'
import Pitch from '@/components/theory/Pitch'
import { toString } from '@/components/theory/Pitch'
import './keyboard.css'

const isWhiteKey = (pitch: Pitch): boolean => {
  if (pitch.alter === undefined) {
    return true
  }
  const note = `${pitch.step}${pitch.alter}`
  const whiteKeyWithAlters = ['B#', 'E#', 'Cb', 'Fb']
  if (whiteKeyWithAlters.includes(note)) {
    return true
  }
  return false
}

const Key = ({ pitch }: { pitch: Pitch }) => {
  const isWhite = isWhiteKey(pitch)
  const keyStyle = 'flex flex-col justify-end items-center flex-1 cursor-pointer key'
  const whiteKeyStyle = 'border bg-white mr-0.5'
  const blackKeyStyle = 'bg-black text-white z-1 black-key mx-[-1rem]'

  return (
    <button className={`${keyStyle} ${isWhite ? whiteKeyStyle : blackKeyStyle}`} onClick={() => {}}>
      <span>{toString(pitch)}</span>
    </button>
  )
}

export default Key
