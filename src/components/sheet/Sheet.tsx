'use client';
import React,{ useEffect } from 'react';
import Vex from 'vexflow';

const Sheet = () => {
    useEffect(() => {
        const { Renderer, Stave } = Vex.Flow;
        const div = document.getElementById("sheet-container") as HTMLDivElement;
        const renderer = new Renderer(div, Renderer.Backends.SVG);
        const context = renderer.getContext();
        const stave = new Stave(10, 40, 400);
        stave.addClef("treble").addTimeSignature("4/4");
        stave.setContext(context).draw();
    }, []);  
    return (
        <div>
          <div id="sheet-container"></div> 
        </div>
    );
};

export default Sheet;