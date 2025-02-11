import { assign, fromPromise, setup } from "xstate";

/* eslint-plugin-xstate-include */

type ToggleEvent = { type: "TOGGLE" } | { type: "RESET" };

type ToggleContext = {
	count: number;
	maxCount: number;
};

type ToggleInput = {
	initialCount?: number;
	maxCount: number;
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
	guards: {
		isLessThanMaxCount: ({ context }) => context.count < context.maxCount,
	},
	actors: {
		resetCount: fromPromise(
			async ({ input }: { input: { maxCount: number } }) => {
				await new Promise((resolve) => setTimeout(resolve, 1000));

				if (Math.random() > 0.5) {
					throw new Error("リセットエラー");
				}

				return {
					count: input.maxCount / 2,
				};
			},
		),
	},
}).createMachine({
	/** @:xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCSAdgIYDGyAlgG5gDEaG2A2gAwC6ioADqrORagQ4gAHogCMAVgAcOACxjZzAGwAmCQBoQAT3EBmFQF8Dm+llwBBMlVqmmbId179BSEeOlyFytZp0IpYjgSRsYgBKgQcEK2YA48fOQCQqIIALRKvojpRiboZvjEVtRxTokuoCmyKpn+AOxBUrpNzS1NOSAxOJYUxa6OCUmuKSpK9bVizACcurUa2oiTzDjMja1rIQZAA */
	id: "toggle",
	initial: "inactive",
	context: ({ input }) => ({
		count: input.initialCount ?? 0,
		maxCount: input.maxCount,
	}),
	states: {
		inactive: {
			on: {
				TOGGLE: {
					guard: "isLessThanMaxCount",
					actions: "incrementCount",
					target: "active",
				},
				RESET: {
					target: "resetting",
				},
			},
		},
		active: {
			on: {
				TOGGLE: "inactive",
			},
			after: { 2000: 'inactive' }
		},
		resetting: {
			invoke: {
				src: "resetCount",
				input: ({ context: { maxCount } }) => ({ maxCount }),
				onDone: {
					target: "inactive",
					actions: assign({
						count: ({ event }) => event.output.count,
					}),
					onError: {
						target: "inactive",
					},
				},
			},
		},
	},
});
