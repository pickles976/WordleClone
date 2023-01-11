import { writable } from 'svelte/store';

export const played = writable(0);
export const wins = writable(0);
export const currentStreak = writable(0);
export const maxStreak = writable(0);