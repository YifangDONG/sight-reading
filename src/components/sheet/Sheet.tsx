'use client'
import React, { useState, useEffect } from 'react'
import Vex from 'vexflow'
const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow
const staveMargin = 10
const Sheet = () => {
  const [containerWidth, setContainerWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    drawMusic()
    return () => window.removeEventListener('resize', handleResize)
  }, [containerWidth])
  return <div id="sheet-container" className="w-full max-w-full mx-auto md:max-w-screen-md lg:max-w-screen-lg"></div>
}

export default Sheet
const drawMusic = () => {
  const container = document.getElementById('sheet-container') as HTMLDivElement
  container.innerHTML = '' // TODO if remove this line, the stave is repeat twice
  const renderer = new Renderer(container, Renderer.Backends.SVG)
  const width = container.offsetWidth
  const height = 500
  renderer.resize(width, height)
  const context = renderer.getContext()

  var staveTreble = new Stave(staveMargin, 40, width - 2 * staveMargin)
  staveTreble.addClef('treble').addTimeSignature('4/4')
  staveTreble.setContext(context).draw()

  const bassStaveY = staveTreble.getYForLine(5)

  const staveBass = new Stave(staveMargin, bassStaveY, width - 2 * staveMargin)
  staveBass.addClef('bass').addTimeSignature('4/4')

  staveBass.setContext(context).draw()
  console.log('width : ' + width)

  const notesTreble = new StaveNote({
    clef: 'treble',
    keys: ['c/4', 'e/4', 'f#/4', 'd#/5'],
    duration: 'w'
  })
  const notesBass = new StaveNote({
    clef: 'bass',
    keys: ['ab/2', 'd/3', 'f/3', 'bb/3'],
    duration: 'w'
  })
  var voiceTreble = new Vex.Flow.Voice({
    num_beats: 4,
    beat_value: 4,
    resolution: Vex.Flow.RESOLUTION
  })
  var voiceBass = new Vex.Flow.Voice({
    num_beats: 4,
    beat_value: 4,
    resolution: Vex.Flow.RESOLUTION
  })

  voiceTreble.addTickables([notesTreble]).setStave(staveTreble)
  voiceBass.addTickables([notesBass]).setStave(staveBass)

  var formatter = new Vex.Flow.Formatter()

  // Make sure the staves have the same starting point for notes
  var startX = Math.max(staveTreble.getNoteStartX(), staveBass.getNoteStartX())
  staveTreble.setNoteStartX(startX)
  staveBass.setNoteStartX(startX)

  // the treble and bass are joined independently but formatted together
  formatter.joinVoices([voiceTreble])
  formatter.joinVoices([voiceBass])
  formatter.format([voiceTreble, voiceBass], staveTreble.getWidth() - startX)

  voiceTreble.setContext(context).draw()
  voiceBass.setContext(context).draw()
}
