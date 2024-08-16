'use client'
import React, { useState, useEffect } from 'react'
import Vex, { StaveNote } from 'vexflow'
const { Renderer, Stave, Voice, Formatter } = Vex.Flow
const staveMargin = 10
const Sheet = () => {
  const [containerWidth, setContainerWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    drawMusic({
      beatNumbers: 4,
      beatValues: 4,
      trebleNotes: [
        new StaveNote({
          clef: 'treble',
          keys: ['c/4', 'e/4', 'f#/4', 'd#/5'],
          duration: 'w'
        })
      ],
      bassNotes: [
        new StaveNote({
          clef: 'bass',
          keys: ['ab/2', 'd/3', 'f/3', 'bb/3'],
          duration: 'w'
        })
      ]
    })
    return () => window.removeEventListener('resize', handleResize)
  }, [containerWidth])
  return <div id="sheet-container" className="w-full max-w-full mx-auto md:max-w-screen-md lg:max-w-screen-lg"></div>
}

export default Sheet

type SheetParams = {
  beatNumbers: number
  beatValues: number
  trebleNotes?: StaveNote[]
  bassNotes?: StaveNote[]
}

const drawMusic = (sheetParams: SheetParams) => {
  const container = document.getElementById('sheet-container') as HTMLDivElement
  container.innerHTML = ''
  const renderer = new Renderer(container, Renderer.Backends.SVG)
  const width = container.offsetWidth
  const height = 500
  renderer.resize(width, height)
  const context = renderer.getContext()

  const formatter = new Vex.Flow.Formatter()

  const timeSignature = `${sheetParams.beatNumbers}/${sheetParams.beatValues}`

  var staveTreble
  if (sheetParams.trebleNotes) {
    staveTreble = new Stave(staveMargin, 40, width - 2 * staveMargin)
    staveTreble.addClef('treble').addTimeSignature(timeSignature)
    staveTreble.setContext(context).draw()

    const voiceTreble = new Vex.Flow.Voice({
      num_beats: sheetParams.beatNumbers,
      beat_value: sheetParams.beatValues,
      resolution: Vex.Flow.RESOLUTION
    })
    voiceTreble.addTickables(sheetParams.trebleNotes).setStave(staveTreble)
    formatter.joinVoices([voiceTreble])
    formatter.format([voiceTreble], 4)
    voiceTreble.setContext(context).draw()
  }

  var staveBass
  if (sheetParams.bassNotes) {
    const bassStaveY = staveTreble ? staveTreble.getYForLine(5) : 40
    staveBass = new Stave(staveMargin, bassStaveY, width - 2 * staveMargin)
    staveBass.addClef('bass').addTimeSignature(timeSignature)
    staveBass.setContext(context).draw()

    var voiceBass = new Vex.Flow.Voice({
      num_beats: sheetParams.beatNumbers,
      beat_value: sheetParams.beatValues,
      resolution: Vex.Flow.RESOLUTION
    })
    voiceBass.addTickables(sheetParams.bassNotes).setStave(staveBass)
    formatter.joinVoices([voiceBass])
    formatter.format([voiceBass], 4)
    voiceBass.setContext(context).draw()
  }
}
