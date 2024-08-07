interface Pitch {
    step: 'C' | 'D' | 'E' | 'F' | 'G'| 'A' | 'B'; // Enum for steps
    alter?: '#' | 'b' // Optional alteration, defaults to 'natural'
    octave: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // Possible octave values
}

const generatePianoPitchesWithSharp = (): Pitch[] => {
    const pitches: Pitch[] = [];
    const steps: Pitch["step"][] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const octaves: Pitch["octave"][] = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    octaves.forEach(octave => {
        steps.forEach(step => {
            pitches.push({ step, octave });
            if (step !== 'E' && step !== 'B') {
                pitches.push({ step, alter: '#', octave });
            }
        });
    })
    return pitches.filter(pitch => {
        if (pitch.octave === 0 && pitch.step < 'A') return false;
        if (pitch.octave === 8 && pitch.step > 'C') return false;
        return true;
    });
}
const generatePianoPitchesWithFlat = (): Pitch[] => {
    const pitches: Pitch[] = [];
    const steps: Pitch["step"][] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const octaves: Pitch["octave"][] = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    octaves.forEach(octave => {
        steps.forEach(step => {
            pitches.push({ step, octave });
            if (step !== 'C' && step !== 'F') {
                pitches.push({ step, alter: 'b', octave });
            }
        });
    })
    return pitches.filter(pitch => {
        if (pitch.octave === 0 && pitch.step < 'A') return false;
        if (pitch.octave === 8 && pitch.step > 'C') return false;
        return true;
    });
}

// Comparator function for Pitch objects
const comparePitches = (pitch1: Pitch, pitch2: Pitch): number => {
    // Compare octaves first
    if (pitch1.octave !== pitch2.octave) {
        return pitch1.octave - pitch2.octave;
    }

    // If octaves are the same, compare steps
    const stepOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
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


export { comparePitches, generatePianoPitchesWithFlat, generatePianoPitchesWithSharp };

export default Pitch;


