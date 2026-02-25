const $ = (selector) => document.querySelector(selector);
const elWrite = (elemen, text) => (elemen.textContent = text);
const elFill = (elemen, content) => (elemen.innerHTML = content);
const data = {
    set : (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get : (key) => JSON.parse(localStorage.getItem(key)),
    delete : (key) => localStorage.removeItem(key)
}

export {$, elFill, elWrite, data}