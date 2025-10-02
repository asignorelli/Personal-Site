//makes sure the clicked window is on the tippy top
let zTop = 100;
const bringToFront = (win) => (win.style.zIndex = ++zTop);

//allows for windows to be dragged around
function makeDraggable(win) {
  if (!win) 
    return;
  //find the top tab
  const header = win.querySelector('.window-titlebar') || win;
  let dragging = false, startX = 0, startY = 0;

  header.addEventListener('mousedown', (e) => {

    //dont drag when clicking control buttons
    if (e.target.closest('.control-btn')) return;

    //enable the drag mode
    dragging = true;
    win.style.right = 'auto';
    win.style.bottom = 'auto';
    startX = e.clientX;
    startY = e.clientY;
    bringToFront(win);

    //move with the mouse
    const onMove = (e2) => {
      if (!dragging) return;
      const dx = e2.clientX - startX;
      const dy = e2.clientY - startY;
      startX = e2.clientX;
      startY = e2.clientY;

      let left = win.offsetLeft + dx;
      let top  = win.offsetTop  + dy;

      //make sure the windows cannot leave the screen
      //or else they will be unreachable </3
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w  = win.offsetWidth;
      const h  = win.offsetHeight;

      left = Math.min(Math.max(left, 0), vw - w);
      top  = Math.min(Math.max(top,  0), vh - h);

      win.style.left = left + 'px';
      win.style.top  = top  + 'px';
    };

    //stop dragging
    const onUp = () => {
      dragging = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });

  //bring to front on click
  win.addEventListener('mousedown', () => bringToFront(win));
}

//makes all the windows draggable
document.querySelectorAll('.window').forEach(makeDraggable);

//makes the X button work
document.querySelectorAll('.control-btn.close').forEach((btn) => {
  btn.addEventListener('click', () => {
    const win = btn.closest('.window');
    if (win) win.style.display = 'none';
  });
});

