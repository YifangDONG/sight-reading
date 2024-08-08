import { log } from 'console';
import { comparePitches, generatePianoPitchesWithFlat, generatePianoPitchesWithSharp, toString } from '../../src/components/theory/Pitch';
import Pitch from '../../src/components/theory/Pitch';
import 'jest-expect-message';

describe('comparePitches', () => {
    test('should return a positive number when pitch1 is higher than pitch2', () => {
        const pitch1: Pitch = { step: 'C', octave: 5 };
        const pitch2: Pitch = { step: 'A', octave: 4 };
        expect(comparePitches(pitch1, pitch2)).toBeGreaterThan(0);
    });
    test('should return a negative number when pitch1 is lower than pitch2', () => {
        const pitch1: Pitch = { step: 'F', octave: 3 };
        const pitch2: Pitch = { step: 'G', octave: 3 };
        expect(comparePitches(pitch1, pitch2)).toBeLessThan(0);
    });
    test('should return 0 when pitches are equal', () => {
        const pitch1: Pitch = { step: 'B', octave: 2, alter: 'b' };
        const pitch2: Pitch = { step: 'B', octave: 2, alter: 'b' };
        expect(comparePitches(pitch1, pitch2)).toBe(0);
    });
    // Add more test cases to cover different scenarios 
    // (different octaves, steps, alterations, etc.)
});

describe('generate piano pitches', () => {
    test('should generate piano pitches with sharp', () => {
        const pitches = generatePianoPitchesWithSharp();
        log(pitches.map(toString).join(' '));
        expect(pitches).toHaveLength(88);
    })
    test('should generate piano pitches with flat', () => {
        const pitches = generatePianoPitchesWithFlat();
        expect(pitches, "recieved: " + pitches.map(toString).join(' ')).toHaveLength(88);
    })
})