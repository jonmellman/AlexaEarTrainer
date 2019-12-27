// https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies
export enum Note {
	// TODO
	C4 = 60,
	D4 = 62,
	E4 = 64,
	F4 = 65,
	G4 = 67,
	A4 = 69,
	B4 = 71,
	C5 = 72
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

export const Quality = {
	MAJOR: [
		Interval.ROOT,
		Interval.MAJOR_SECOND,
		Interval.MAJOR_THIRD,
		Interval.PERFECT_FOURTH,
		Interval.PERFECT_FIFTH,
		Interval.MAJOR_SIXTH,
		Interval.MAJOR_SEVENTH,
		Interval.OCTAVE
	]
}

export const getNoteFromKeyAtInterval = (key: Key, interval: Interval): Note => {
	const note = (key + interval) + 60 // MIDI offset

	if (!Note[note]) {
		throw new Error(`Unsupported note: ${note}. Key was ${Key[key]} and Interval was ${Interval[interval]}`)
	}

	return note
}
