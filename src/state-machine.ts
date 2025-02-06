import { setup } from "xstate";

const toggleMachine = setup({}).createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCSAdgIYDGyAlgG5gDEaG2A2gAwC6ioADqrORagQ4gAHogCMAVgDsOAMwBOZgDZZYsfIBMSqQBYNGgDQgAnuNU4xOgBw7ZGnRMVLJAXxdH6WXAEEyVWp5MbELcvPyCSCLi0nJOqupauvpGpghWYnL68mKyOvJWEpaqbu4gBKgQcEKBYCE8fOQCQqIIALRKKYjtbh7oXvjEftR1YY0RoC16nWkyzFL2UtlKGmIasjY9IDU4vhTDkaENTZEtWhJyBbZ6EhJWqh0miFbyONILSytrVkolLkA */
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
