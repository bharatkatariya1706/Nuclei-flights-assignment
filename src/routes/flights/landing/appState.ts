import { writable } from 'svelte/store';
// this is like a variable to let us know if default state is fetched once so that it dont 
// fallback to default state again and again on visiting the landing page
export const hasFetchedConfig = writable(false);
