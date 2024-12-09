import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://*.shopee.co.id/*"],
  world: 'MAIN'
}

window.addEventListener("load", () => {
  console.log("content script loaded");
  const d = document.querySelector('#app')
  console.log('KOMPONEN', d);
})
