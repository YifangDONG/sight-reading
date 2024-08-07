import { comparePitches } from '../../src/components/theory/Pitch';

describe('comparePitches', () => {
    it('should return a positive number when pitch1 is higher than pitch2', () => {
        const pitch1 = { step: "C", octave: 5 };
        const pitch2 = { step: 'A', octave: 4 };
        expect(comparePitches(pitch1, pitch2)).toBeGreaterThan(0);
    });
    it('should return a negative number when pitch1 is lower than pitch2', () => {
        const pitch1 = { step: 'F', octave: 3 };
        const pitch2 = { step: 'G', octave: 3 };
        expect(comparePitches(pitch1, pitch2)).toBeLessThan(0);
    });
    it('should return 0 when pitches are equal', () => {
        const pitch1 = { step: 'B', octave: 2, alter: 'b' };
        const pitch2 = { step: 'B', octave: 2, alter: 'b' };
        expect(comparePitches(pitch1, pitch2)).toBe(0);
    });
    // Add more test cases to cover different scenarios 
    // (different octaves, steps, alterations, etc.)
});