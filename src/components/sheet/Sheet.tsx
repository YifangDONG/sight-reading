'use client'
import React, { useState, useEffect } from 'react'
import Vex, { StaveNote } from 'vexflow'
const { Renderer, Stave, Voice, Beam, Formatter } = Vex.Flow
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
        new StaveNote({ keys: ['c/4'], duration: '8' }),
        new StaveNote({ keys: ['c/4'], duration: '8' }),
        new StaveNote({ keys: ['c/4'], duration: '8' }),
        new StaveNote({ keys: ['c/4'], duration: '8' }),
        new StaveNote({ keys: ['c/4'], duration: '8' }),
        new StaveNote({ keys: ['d/4'], duration: '8' }),
        new StaveNote({ keys: ['b/4'], duration: '8' }),
        new StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: '8' })
      ],
      bassNotes: [
        new StaveNote({ clef: 'bass', keys: ['d/3'], duration: '8' }),
        new StaveNote({ clef: 'bass', keys: ['d/3'], duration: '8' }),
        new StaveNote({ clef: 'bass', keys: ['d/3'], duration: '8' }),
        new StaveNote({ clef: 'bass', keys: ['d/3'], duration: '8' }),
        new StaveNote({ clef: 'bass', keys: ['d/3'], duration: '8' }),
        new StaveNote({ clef: 'bass', keys: ['d/3'], duration: '8' }),
        new StaveNote({ clef: 'bass', keys: ['d/3'], duration: '8' }),
        new StaveNote({ clef: 'bass', keys: ['d/3'], duration: '8' })
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

  const formatter = new Formatter()

  const timeSignature = `${sheetParams.beatNumbers}/${sheetParams.beatValues}`

  var staveTreble
  if (sheetParams.trebleNotes) {
    staveTreble = new Stave(staveMargin, 40, width - 2 * staveMargin)
    staveTreble.addClef('treble').addTimeSignature(timeSignature)
    staveTreble.setContext(context).draw()

    const notes = sheetParams.trebleNotes
    const voice = new Voice({
      num_beats: sheetParams.beatNumbers,
      beat_value: sheetParams.beatValues
    })

    const beams = Beam.generateBeams(notes)
    voice.addTickables(notes).setStave(staveTreble)
    Formatter.FormatAndDraw(context, staveTreble, notes)
    beams.forEach((beam) => {
      beam.setContext(context).draw()
    })
    formatter.joinVoices([voice])
    formatter.format([voice], 4)
  }

  var staveBass
  if (sheetParams.bassNotes) {
    const bassStaveY = staveTreble ? staveTreble.getYForLine(5) : 40
    staveBass = new Stave(staveMargin, bassStaveY, width - 2 * staveMargin)
    staveBass.addClef('bass').addTimeSignature(timeSignature)
    staveBass.setContext(context).draw()

    const notes = sheetParams.bassNotes
    const voice = new Voice({
      num_beats: sheetParams.beatNumbers,
      beat_value: sheetParams.beatValues
    })

    const beams = Beam.generateBeams(notes)
    voice.addTickables(notes).setStave(staveBass)
    Formatter.FormatAndDraw(context, staveBass, notes)
    beams.forEach((beam) => {
      beam.setContext(context).draw()
    })
    formatter.joinVoices([voice])
    formatter.format([voice], 4)
  }
}
