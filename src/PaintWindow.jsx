import React, { useState, useRef, useEffect } from 'react';
import { FaPen, FaEraser, FaFillDrip } from 'react-icons/fa';

const COLORS = {
  Red: 'red', Blue: 'blue', Green: 'green', Yellow: 'yellow',
  Orange: 'orange', Black: 'black', White: 'white', Gray: '#c0c0c0',
};

const TOOLS = [
  { name: 'Pen', icon: <FaPen /> },
  { name: 'Eraser', icon: <FaEraser /> },
  { name: 'Bucket', icon: <FaFillDrip /> },
];

const PaintApp = ({ onClose, onMinimize, onMaximize }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [currentTool, setCurrentTool] = useState('Pen');
  const [currentColor, setCurrentColor] = useState(COLORS.Black);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      setCtx(context);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = 2;
      context.fillStyle = COLORS.White;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
      y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top,
    };
  };

  // --- Flood Fill for Bucket Tool ---
  const floodFill = (x, y, fillColor) => {
    if (!ctx) return;
    const canvas = canvasRef.current;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const color = hexToRgba(fillColor);
    const getIndex = (x, y) => (y * canvas.width + x) * 4;

    const startIdx = getIndex(Math.floor(x), Math.floor(y));
    const targetColor = [data[startIdx], data[startIdx + 1], data[startIdx + 2], data[startIdx + 3]];
    if (colorsMatch(targetColor, color)) return;

    const stack = [[Math.floor(x), Math.floor(y)]];
    while (stack.length) {
      const [cx, cy] = stack.pop();
      if (cx < 0 || cx >= canvas.width || cy < 0 || cy >= canvas.height) continue;
      const idx = getIndex(cx, cy);
      if (!colorsMatch([data[idx], data[idx + 1], data[idx + 2], data[idx + 3]], targetColor)) continue;

      data[idx] = color[0];
      data[idx + 1] = color[1];
      data[idx + 2] = color[2];
      data[idx + 3] = color[3];

      stack.push([cx + 1, cy]);
      stack.push([cx - 1, cy]);
      stack.push([cx, cy + 1]);
      stack.push([cx, cy - 1]);
    }

    ctx.putImageData(imgData, 0, 0);
  };

  const hexToRgba = (hex) => {
    let r, g, b;
    const c = document.createElement('div');
    c.style.color = hex;
    document.body.appendChild(c);
    const rgb = getComputedStyle(c).color;
    document.body.removeChild(c);
    [r, g, b] = rgb.match(/\d+/g).map(Number);
    return [r, g, b, 255];
  };

  const colorsMatch = (c1, c2) => c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2] && c1[3] === c2[3];

  const startDrawing = (e) => {
    if (!ctx) return;
    const pos = getPos(e);

    if (currentTool === 'Pen' || currentTool === 'Eraser') {
      setIsDrawing(true);
      setLastPos(pos);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    } else if (currentTool === 'Bucket') {
      floodFill(pos.x, pos.y, currentColor);
    }
  };

  const draw = (e) => {
    if (!isDrawing || !ctx) return;
    const pos = getPos(e);
    ctx.strokeStyle = currentTool === 'Pen' ? currentColor : COLORS.White;
    ctx.lineWidth = currentTool === 'Pen' ? 2 : 10;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setLastPos(pos);
  };

  const endDrawing = () => {
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };

  return (
    <div className="window" style={{ width: '600px', height: '500px', display: 'flex', flexDirection: 'column' }}>
      <div className="title-bar">
        <div className="title-bar-text">Paint - [Untitled]</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={onMinimize}></button>
          <button aria-label="Maximize" onClick={onMaximize}></button>
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>

      <div className="window-body" style={{ display: 'flex', flexGrow: 1 }}>
        {/* Toolbar */}
        <div style={{ width: '80px', padding: '4px', display: 'flex', flexDirection: 'column' }}>
          {TOOLS.map(tool => (
            <button
              key={tool.name}
              onClick={() => setCurrentTool(tool.name)}
              style={{ height: '40px', marginBottom: '4px', fontSize: '20px', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={tool.name}
            >
              {tool.icon}
            </button>
          ))}
          {/* Color Picker */}
          <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {Object.keys(COLORS).map(name => (
              <div
                key={name}
                onClick={() => setCurrentColor(COLORS[name])}
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: COLORS[name],
                  border: currentColor === COLORS[name] ? '2px solid black' : '1px solid gray',
                  cursor: 'pointer',
                }}
                title={name}
              />
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '4px' }}>
          <canvas
            ref={canvasRef}
            width={500}
            height={450}
            style={{
              border: '2px solid black',
              cursor: currentTool === 'Pen' ? 'crosshair' : currentTool === 'Eraser' ? 'cell' : 'pointer',
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseOut={endDrawing}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
};

export default PaintApp;
