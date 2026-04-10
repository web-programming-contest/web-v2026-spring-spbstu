// Константы стиля
const COLORS = {
    grid: "#e5e5e5",
    cross: "#232323",
    circle: "#dddddd",
};

export const gridStroke = (ctx: CanvasRenderingContext2D, gridSize: number, cellSize: number) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;

    for (let i = 0; i <= gridSize; i++) {

        let curPos = Math.floor(cellSize * i);

        ctx.moveTo(curPos, 0);
        ctx.lineTo(curPos, height);

        ctx.moveTo(0, curPos);
        ctx.lineTo(width, curPos);
    }
    ctx.stroke();
}

export const drawCross = (ctx: CanvasRenderingContext2D, cellX: number, cellY: number, cellSize: number, padding: number) => {
    const left = cellX * cellSize + padding;
    const right = (cellX + 1) * cellSize - padding;
    const top = cellY * cellSize + padding;
    const bottom = (cellY + 1) * cellSize - padding;

    ctx.beginPath();
    ctx.strokeStyle = COLORS.cross;

    ctx.lineWidth = Math.max(2, cellSize * 0.06);
    ctx.lineCap = "round";

    ctx.moveTo(left, top);
    ctx.lineTo(right, bottom);

    ctx.moveTo(right, top);
    ctx.lineTo(left, bottom);

    ctx.stroke();
}

export const drawCircle = (ctx: CanvasRenderingContext2D, cellX: number, cellY: number, cellSize: number, padding: number) => {
    const centerX = cellX * cellSize + cellSize / 2;
    const centerY = cellY * cellSize + cellSize / 2;
    const radius = cellSize / 2 - padding;

    ctx.beginPath();
    ctx.strokeStyle = COLORS.circle;

    ctx.lineWidth = Math.max(2, cellSize * 0.06);
    ctx.lineCap = "round";

    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
}