const contextSetting = (ctx: CanvasRenderingContext2D) => {
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
};

const getSize = () => {
  const min = Math.min.apply(null, [window.innerWidth, window.innerHeight]);

  if (min <= 700) {
    return min;
  }

  return min - 200;
};

const eventSetting = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  let mouseState = 0;

  window.addEventListener('resize', (e) => {
    const size = getSize();

    canvas.width = size;
    canvas.height = size;
  });

  canvas.addEventListener('mousedown', (e) => {
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

export const init = (canvas: HTMLCanvasElement) => {
  const size = getSize();

  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  contextSetting(ctx);
  eventSetting(canvas, ctx);
  console.log(canvas);
  console.log(ctx);
};
