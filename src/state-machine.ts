import { setup } from "xstate";

const toggleMachine = setup({}).createMachine({
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
