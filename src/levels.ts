import { Interval, Key, Scales } from "./music";

export interface Level {
	description: string;
	numRounds: number;
	key: Key;
	targetIntervals: Interval[];
	isMajor: boolean;
	// TODO: use this
	octaves: number;
}

const LEVELS: Level[] = [{
	description: 'First half of the C Major scale',
	numRounds: 5,
	key: Key.C,
	targetIntervals: Scales.MAJOR.firstHalf(),
	isMajor: Scales.MAJOR.isMajor(),
	octaves: 1
}, {
	description: 'Second half of the C Major scale',
	numRounds: 5,
	key: Key.C,
	targetIntervals: Scales.MAJOR.secondHalf(),
	isMajor: Scales.MAJOR.isMajor(),
	octaves: 1
}, {
	description: 'Full octave of the C Major scale',
	numRounds: 10,
	key: Key.C,
	targetIntervals: Scales.MAJOR.full(),
	isMajor: Scales.MAJOR.isMajor(),
	octaves: 1
} /* , {
        description: 'Multiple octaves of the C Major scale',
        numRounds: 5,
        key: Key.C,
        targetIntervals: Scales.MAJOR,
        octaves: 3 // TODO: implement multiple octaves
    } */,
{
	description: 'First half of the C Minor scale',
	numRounds: 5,
	key: Key.C,
	targetIntervals: Scales.MINOR.firstHalf(),
	isMajor: Scales.MINOR.isMajor(),
	octaves: 1
}, {
	description: 'Second half of the C Minor scale',
	numRounds: 5,
	key: Key.C,
	targetIntervals: Scales.MINOR.secondHalf(),
	isMajor: Scales.MINOR.isMajor(),
	octaves: 1
}, {
	description: 'Full octave of the C Minor scale',
	numRounds: 10,
	key: Key.C,
	targetIntervals: Scales.MINOR.full(),
	isMajor: Scales.MINOR.isMajor(),
	octaves: 1
}]

export const getLevelByNumber = (levelNumber: number): Level => LEVELS[levelNumber - 1]

export const getNumberOfLevels = () => LEVELS.length
