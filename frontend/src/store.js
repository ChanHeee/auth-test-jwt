import { writable } from 'svelte/store';
import { getCookie } from 'svelte-cookie';

export const id = writable();
export const eamil = writable();
export const nick = writable();
export const loggedin = writable(false);
export const token = '';
