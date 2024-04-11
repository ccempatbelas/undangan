import { type Writable, writable } from 'svelte/store';

export const audio: Writable<null | HTMLAudioElement> = writable(null);
export const cover = writable(true);
export const muted = writable(false);
