// https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies
export enum Note {
	// TODO
	C4 = 60,
	'C#4',
	D4,
	Eb4,
	E4,
	F4,
	'F#4',
	G4,
	Ab4,
	A4,
	Bb4,
	B4,
	C5,
	// TODO
}

export enum Key {
	C = 0,
	'C#',
	D,
	Eb,
	E,
	F,
	'F#',
	G,
	Ab,
	A,
	Bb,
	B,
}

export enum Interval {
	ROOT = 0,
	MINOR_SECOND,
	MAJOR_SECOND,
	MINOR_THIRD,
	MAJOR_THIRD,
	PERFECT_FOURTH,
	TRITONE,
	PERFECT_FIFTH,
	MINOR_SIXTH,
	MAJOR_SIXTH,
	MINOR_SEVENTH,
	MAJOR_SEVENTH,
	OCTAVE
}

class Scale {
	constructor(private readonly intervals: Interval[]) { }
	isMajor = () => this.intervals.includes(Interval.MAJOR_THIRD)
	firstHalf = () => this.intervals.slice(0, this.intervals.indexOf(Interval.PERFECT_FIFTH))
	secondHalf = () => this.intervals.slice(this.intervals.indexOf(Interval.PERFECT_FIFTH))
	full = () => this.intervals
}

export const Scales = {
	MAJOR: new Scale([
		Interval.ROOT,
		Interval.MAJOR_SECOND,
		Interval.MAJOR_THIRD,
		Interval.PERFECT_FOURTH,
		Interval.PERFECT_FIFTH,
		Interval.MAJOR_SIXTH,
		Interval.MAJOR_SEVENTH,
		Interval.OCTAVE
	]),
	MINOR: new Scale([
		Interval.ROOT,
		Interval.MAJOR_SECOND,
		Interval.MINOR_THIRD,
		Interval.PERFECT_FOURTH,
		Interval.PERFECT_FIFTH,
		Interval.MINOR_SIXTH,
		Interval.MINOR_SEVENTH,
		Interval.OCTAVE
	]),
	CHROMATIC: new Scale([
		Interval.ROOT,
		Interval.MINOR_SECOND,
		Interval.MAJOR_SECOND,
		Interval.MINOR_THIRD,
		Interval.MAJOR_THIRD,
		Interval.PERFECT_FOURTH,
		Interval.TRITONE,
		Interval.PERFECT_FIFTH,
		Interval.MINOR_SIXTH,
		Interval.MAJOR_SIXTH,
		Interval.MINOR_SEVENTH,
		Interval.MAJOR_SEVENTH,
		Interval.OCTAVE,
	])
}

export const getNoteFromKeyAtInterval = (key: Key, interval: Interval): Note => {
	const note = (key + interval) + 60 // MIDI offset

	if (!Note[note]) {
		throw new Error(`Unsupported note: ${note}. Key was ${Key[key]} and Interval was ${Interval[interval]}`)
	}

	return note
}
