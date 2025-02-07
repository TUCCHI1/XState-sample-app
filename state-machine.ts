import { setup } from "xstate";

/* eslint-plugin-xstate-include */

type ToggleEvent = { type: "TOGGLE" };

type ToggleContext = {
	count: number;
};

export const toggleMachine = setup({
	types: {} as {
		context: ToggleContext;
		events: ToggleEvent;
	},
}).createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCSAdgIYDGyAlgG5gDEaG2A2gAwC6ioADqrORagQ4gAHogCMAVgAcOACxjZzAGwAmCQBoQAT3EBmFQF8Dm+llwBBMlVqmmbId179BSEeOlyFytZp0IpYjgSRsYgBKgQcEK2YA48fOQCQqIIALRKvojpRiboZvjEVtRxTokuoCmyKpn+AOxBUrpNzS1NOSAxOJYUxa6OCUmuKSpK9bVizACcurUa2oiTzDjMja1rIQZAA */
	id: "toggle",
	initial: "inactive",
	context: {
		count: 0,
	},
	states: {
		inactive: {
			on: {
				TOGGLE: "active",
			},
		},
		active: {
			on: {
				TOGGLE: "inactive",
			},
		},
	},
});
