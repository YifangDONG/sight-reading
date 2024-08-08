type Pitch =  {
    step: 'C' | 'D' | 'E' | 'F' | 'G'| 'A' | 'B'; // Enum for steps
    alter?: '#' | 'b' // Optional alteration, defaults to 'natural'
    octave: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // Possible octave values
}
const stepOrder:Pitch["step"][] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const generatePianoPitchesWithSharp = (): Pitch[] => {
    const pitches: Pitch[] = [];
    const octaves: Pitch["octave"][] = [0, 1, 2, 3, 4, 5, 6, 7]; 
    octaves.forEach(octave => {
        stepOrder.forEach(step => {
            pitches.push({ step, octave });
            if (step !== 'E' && step !== 'B') {
                pitches.push({ step, alter: '#', octave });
            }
        });
    })
    pitches.push({ step: 'C', octave: 8 });
    
    return pitches.filter(pitch => {
        if (pitch.octave === 0 && stepOrder.indexOf(pitch.step) < stepOrder.indexOf('A')) return false;
        return true;
    });
}
const generatePianoPitchesWithFlat = (): Pitch[] => {
    const pitches: Pitch[] = [];
    const octaves: Pitch["octave"][] = [ 1, 2, 3, 4, 5, 6, 7]; 
    pitches.push({ step: 'A', octave: 0 });
    pitches.push({ step: 'B', alter: 'b', octave: 0 });
    pitches.push({ step: 'B', octave: 0 });

    octaves.forEach(octave => {
        stepOrder.forEach(step => {
            if (step !== 'C' && step !== 'F') {
                pitches.push({ step, alter: 'b', octave });
            }
            pitches.push({ step, octave });
        });
    })
    pitches.push({ step: 'C', octave: 8 });
    return pitches;
}

// Comparator function for Pitch objects
const comparePitches = (pitch1: Pitch, pitch2: Pitch): number => {
    // Compare octaves first
    if (pitch1.octave !== pitch2.octave) {
        return pitch1.octave - pitch2.octave;
    }

    // If octaves are the same, compare steps
    const stepIndex1 = stepOrder.indexOf(pitch1.step);
    const stepIndex2 = stepOrder.indexOf(pitch2.step);
    if (stepIndex1 !== stepIndex2) {
        return stepIndex1 - stepIndex2;
    }
    // If steps are the same, compare alterations
    if (pitch1.alter === pitch2.alter) {
        return 0; 
    } else if (pitch1.alter === '#') {
        return 1; // Sharp is higher than natural or flat
    } else if (pitch2.alter === '#') {
        return -1; 
    } else if (pitch1.alter === 'b') {
        return -1; // Flat is lower than natural
    } else if (pitch2.alter === 'b') {
        return 1; 
    } else {
        return 0;
    }
}
const toString = (pitch: Pitch) => {
    return `${pitch.step}${pitch.alter === undefined ? '' : pitch.alter}${pitch.octave}`;
  };

export { comparePitches, generatePianoPitchesWithFlat, generatePianoPitchesWithSharp, toString };

export default Pitch;


