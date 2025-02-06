import { setup } from "xstate";

type ToggleEvent = { type: "toggle" };

export const toggleMachine = setup({
	types: {} as {
		events: ToggleEvent;
	},
}).createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCSAdgIYDGyAlgG5gDEaG2A2gAwC6ioADqrORagQ4gAHogCMAVgAcOACxjZzAGwAmCQBoQAT3EBmFQF8Dm+llwBBMlVqmmbId179BSEeOlyFytZp0IpYjgSRsYgBKgQcEK2YA48fOQCQqIIALRKvojpRiboZvjEVtRxTokuoCmyKpn+AOxBUrpNzS1NOSAxOJYUxa6OCUmuKSpK9bVizACcurUa2oiTzDjMja1rIQZAA */
	id: "toggle",
	initial: "Inactive",
	states: {
		Inactive: {
			on: {
				toggle: "Active",
			},
		},
		Active: {
			on: {
				toggle: "Inactive",
			},
		},
	},
});
