interface CanvasInterface {
  element?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  size: number;
  setElement: (canvas: HTMLCanvasElement) => void;
  setContext: (ctx: CanvasRenderingContext2D) => void;
  setSize: () => void;
  setCanvasSize: () => void;
  contextSetting: () => void;
  clear: () => void;
}

const Canvas: CanvasInterface = {
  element: undefined,
  context: undefined,
  size: 0,
  setElement(canvas: HTMLCanvasElement) {
    this.element = canvas;
  },
  setSize() {
    const min = Math.min.apply(null, [window.innerWidth, window.innerHeight]);
    this.size = min <= 700 ? min : min - 200;

    this.setCanvasSize();
  },
  setCanvasSize() {
    if (this.element) {
      this.element.width = this.size;
      this.element.height = this.size;
    }
  },
  setContext(ctx: CanvasRenderingContext2D) {
    this.context = ctx;
  },
  contextSetting() {
    if (this.context) {
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.font = '16px sans-serif';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
    }
  },
  clear() {
    this.context?.clearRect(0, 0, this.size, this.size);
  },
};
const textHeight = 11.583999633789062;

let mouseState = 0; // 0 = default, mouseup // 1 = mousedown // 2 = mousemove

const eventSetting = () => {
  window.addEventListener('resize', (e) => {
    Canvas.setSize();
  });

  Canvas.element?.addEventListener('mousedown', (e) => {
    console.log('mousedown', e);
    mouseState = 1;
  });

  window.addEventListener('mousemove', (e) => {
    if (mouseState === 0) return;

    console.log('mousemove', e);
    mouseState = 2;
  });

  window.addEventListener('mouseup', (e) => {
    if (mouseState === 0) return;

    console.log('mouseup', e);
    mouseState = 0;
  });
};

const draw = () => {
  Canvas.clear();
  Canvas.context?.beginPath();
  for (let i = 2; i < 8; i++) {
    Canvas.context?.moveTo((Canvas.size / 8) * i, 0);
    Canvas.context?.lineTo((Canvas.size / 8) * i, Canvas.size);
    Canvas.context?.moveTo(0, (Canvas.size / 8) * i);
    Canvas.context?.lineTo(Canvas.size, (Canvas.size / 8) * i);
  }
  Canvas.context?.stroke();
  Canvas.context?.closePath();

  Canvas.context?.fillText(`2`, (Canvas.size / 8) * 6.5, (Canvas.size / 8) * 0.5);
  Canvas.context?.fillText(`1`, (Canvas.size / 8) * 2.5, (Canvas.size / 8) * 1.5);
  Canvas.context?.fillText(`5`, (Canvas.size / 8) * 3.5, (Canvas.size / 8) * 1.5);
  Canvas.context?.fillText(`2`, (Canvas.size / 8) * 4.5, (Canvas.size / 8) * 1.5);
  Canvas.context?.fillText(`5`, (Canvas.size / 8) * 5.5, (Canvas.size / 8) * 1.5);
  Canvas.context?.fillText(`1`, (Canvas.size / 8) * 6.5, (Canvas.size / 8) * 1.5);
  Canvas.context?.fillText(`2`, (Canvas.size / 8) * 7.5, (Canvas.size / 8) * 1.5);

  Canvas.context?.fillText(`2`, (Canvas.size / 8) * 0.5, (Canvas.size / 8) * 2.5);
  Canvas.context?.fillText(`1`, (Canvas.size / 8) * 0.5, (Canvas.size / 8) * 3.5);
  Canvas.context?.fillText(`1`, (Canvas.size / 8) * 0.5, (Canvas.size / 8) * 4.5);

  Canvas.context?.fillText(`1`, (Canvas.size / 8) * 1.5, (Canvas.size / 8) * 2.5);
  Canvas.context?.fillText(`3`, (Canvas.size / 8) * 1.5, (Canvas.size / 8) * 3.5);
  Canvas.context?.fillText(`2`, (Canvas.size / 8) * 1.5, (Canvas.size / 8) * 4.5);
  Canvas.context?.fillText(`3`, (Canvas.size / 8) * 1.5, (Canvas.size / 8) * 5.5);
  Canvas.context?.fillText(`4`, (Canvas.size / 8) * 1.5, (Canvas.size / 8) * 6.5);
  Canvas.context?.fillText(`1`, (Canvas.size / 8) * 1.5, (Canvas.size / 8) * 7.5);
};

const requestAnimation = () => {
  let first = 0;
  let now = undefined;
  let count = 0;

  const callback = () => {
    draw();

    now = performance.now();

    if (now - first > 1000) {
      console.log(count);
      first = now;
      count = 0;
    } else {
      count++;
    }

    window.requestAnimationFrame(callback);
  };

  window.requestAnimationFrame(callback);
};

export const init = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  Canvas.setElement(canvas);
  Canvas.setContext(ctx);
  Canvas.setSize();
  Canvas.contextSetting();
  eventSetting();
  requestAnimation();
};
