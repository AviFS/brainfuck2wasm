const bfInput = document.getElementById('brainfuck-input');
const bfStrOutput = document.getElementById('brainfuck-string-output');
const bfIntOutput = document.getElementById('brainfuck-int-output');
const runButton = document.getElementById('run');

const loadingClass = 'is-loading';

const worker = new Worker('worker.js');
worker.onmessage = function(e) {
    const buffer = e.data;
    const intView = new Int32Array(buffer.slice(0, 65536));
    bfStrOutput.value = intView.reduce((str, i) => str += String.fromCharCode(i), '');
    bfIntOutput.value = intView.toString().replace(/,/g, ' ');
    runButton.classList.remove(loadingClass);
}

function toHexString(byteArray) {
    return Array.from(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join(' ')
}

function run() {
    runButton.classList.add(loadingClass);
    const bf = bfInput.value;
    worker.postMessage(bf);
}