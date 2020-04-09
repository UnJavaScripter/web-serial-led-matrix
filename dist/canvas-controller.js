import { serialController } from './serial-controller.js';
class CanvasController {
    constructor() {
        this.canvasElem = document.getElementById('canvas');
        this.ctx = this.canvasElem.getContext('2d');
        const width = window.innerWidth >= window.innerHeight ? window.innerHeight - 150 : window.innerWidth - 150; // ewww
        this.canvasElem.width = width;
        this.canvasElem.height = width;
        this.pixelSize = width / 8;
        this.canvasElem.addEventListener('pointerdown', (event) => {
            this.handlePointerDown(event);
        });
        this.canvasElem.addEventListener('pointermove', (event) => {
            this.handleDrag(event);
        });
    }
    handlePointerDown(event) {
        const canvas = event.target;
        this.handlePaint(event.clientX - canvas.getBoundingClientRect().x, event.clientY - canvas.getBoundingClientRect().y);
    }
    handleDrag(event) {
        if (event.buttons === 1) {
            const canvas = event.target;
            this.handlePaint(event.clientX - canvas.getBoundingClientRect().x, event.clientY - canvas.getBoundingClientRect().y);
        }
    }
    handlePaint(x, y) {
        const pixelXstart = (x - (x % this.pixelSize)) / this.pixelSize;
        const pixelYstart = (y - (y % this.pixelSize)) / this.pixelSize;
        this.drawPixel(pixelXstart, pixelYstart);
    }
    drawPixel(x, y, color = "#cd4433") {
        var _a, _b;
        if (((_a = this.lastDrawnPixel) === null || _a === void 0 ? void 0 : _a.x) === x && ((_b = this.lastDrawnPixel) === null || _b === void 0 ? void 0 : _b.y) === y) {
            return;
        }
        const pixelToDraw = { x, y, color };
        this.lastDrawnPixel = pixelToDraw;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
        serialController.write(`${Math.abs(x - 7)},${y}`);
    }
    drawGrid() {
        this.ctx.fillStyle = '#aaa';
        this.ctx.fillRect(0, 0, this.canvasElem.width, this.canvasElem.height);
        this.ctx.strokeStyle = '#777';
        this.ctx.beginPath();
        for (let i = 0; i <= this.canvasElem.width; i += this.pixelSize) {
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.canvasElem.height);
        }
        for (let i = 0; i <= this.canvasElem.height; i += this.pixelSize) {
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.canvasElem.width, i);
        }
        this.ctx.stroke();
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvasElem.width, this.canvasElem.height);
        this.drawGrid();
    }
}
export const canvasController = new CanvasController();
