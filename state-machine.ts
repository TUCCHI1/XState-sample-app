import { assign, setup } from "xstate";

/* eslint-plugin-xstate-include */

type ToggleEvent = { type: "TOGGLE" };

type ToggleContext = {
	count: number;
};

type ToggleInput = {
	initialCount?: number;
};

export const toggleMachine = setup({
	types: {} as {
		context: ToggleContext;
		events: ToggleEvent;
		input: ToggleInput;
	},
	actions: {
		incrementCount: assign({
			count: ({ context }) => context.count + 1,
		}),
	},
}).createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCSAdgIYDGyAlgG5gDEaG2A2gAwC6ioADqrORagQ4gAHogCMAVgAcOACxjZzAGwAmCQBoQAT3EBmFQF8Dm+llwBBMlVqmmbId179BSEeOlyFytZp0IpYjgSRsYgBKgQcEK2YA48fOQCQqIIALRKvojpRiboZvjEVtRxTokuoCmyKpn+AOxBUrpNzS1NOSAxOJYUxa6OCUmuKSpK9bVizACcurUa2oiTzDjMja1rIQZAA */
	id: "toggle",
	initial: "inactive",
	context: ({ input }) => ({
		count: input.initialCount ?? 0,
	}),
	states: {
		inactive: {
			on: {
				TOGGLE: {
					target: "active",
				},
			},
		},
		active: {
			entry: [
				() => {
					console.log("entry's actions started");
				},
				"incrementCount",
				() => {
					console.log("entry's actions ended");
				},
			],
			on: {
				TOGGLE: "inactive",
			},
		},
	},
});
