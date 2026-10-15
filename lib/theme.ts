export const THEME_KEY = "theme";
export const THEME_EVENT = "themechange";

/** Runs before first paint (inlined in <head>) so a saved light theme never flashes dark. */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
