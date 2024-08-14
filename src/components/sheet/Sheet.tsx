'use client';
import React,{ Children, useEffect } from 'react';
import Vex from 'vexflow';

const Sheet = () => {
    useEffect(() => {
        const div = document.getElementById("sheet-container") as HTMLDivElement;
        div.innerHTML = '';
        const renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);
        renderer.resize(800, 500);
        const ctx = renderer.getContext();
       
        var trebleStave = new Vex.Flow.Stave(10, 40, 400);
        trebleStave.addClef("treble").addTimeSignature("4/4");
        trebleStave.setContext(ctx).draw();
       
        const bassStaveY = trebleStave.getYForLine(5);
       
        const bassStave = new Vex.Flow.Stave(10, bassStaveY, 400);
        bassStave.addClef("bass").addTimeSignature("4/4");
        bassStave.setContext(ctx).draw();

        renderer.resize(div.clientWidth, div.clientHeight)


        const note1 = new Vex.Flow.StaveNote({clef: "treble", keys: ["c/4", "e/4", "f#/4", "d#/5"], duration: "w" })
        const note2 = new Vex.Flow.StaveNote({clef: "bass", keys: ["ab/2", "d/3", "f/3", "bb/3"], duration: "w" })

        const voiceTreble = new Vex.Flow.Voice({num_beats: 4, beat_value: 4, resolution:Vex.Flow.RESOLUTION});
        const voiceBass   = new Vex.Flow.Voice({num_beats: 4, beat_value: 4, resolution:Vex.Flow.RESOLUTION});
 
        voiceTreble.addTickables([note1]);
        voiceBass.addTickables([note2]);
 
        var formatter = new Vex.Flow.Formatter();
 
        /*
        formatter.joinVoices is the method which invokes something 
        that renders the accidentals in the right way without colliding
        but enter only one voice at a time for aligning the accidentals.
        You don't want to really join the voices
        */
        formatter.joinVoices([voiceTreble]);
        formatter.joinVoices([voiceBass]);
 
        /*
        align the voices to fit the grand piano staff.
        They are put in the array all together, but they are not joined together. 
        In the second argument, you enter only the treble stave as stave here,
        assuming the bass stave and the treble stave have the same width as they are a grand piano staff
        */
        formatter.formatToStave([voiceTreble, voiceBass], trebleStave, {align_rests: true});
 
        var maxX = Math.max(trebleStave.getNoteStartX(), bassStave.getNoteStartX());
        trebleStave.setNoteStartX(maxX);
        bassStave.setNoteStartX(maxX);
 
        //draw voices
        voiceTreble.draw(ctx, trebleStave);
        voiceBass.draw(ctx, bassStave);
    }, []);  
    return (
        <div>
          <div id="sheet-container"></div> 
        </div>
    );
};


export default Sheet;