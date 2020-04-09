import { canvasController } from './canvas-controller.js';
import { serialController } from './serial-controller.js';
const connect = document.getElementById('connect-to-serial-btn');
const clear = document.getElementById('clear-btn');
canvasController.drawGrid();
connect.addEventListener('pointerdown', () => {
    serialController.init();
});
clear.addEventListener('pointerdown', () => {
    canvasController.clear();
    serialController.write('cls');
});
