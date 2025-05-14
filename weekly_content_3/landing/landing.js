const cursor = document.createElement('div');
cursor.className = 'glitch-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});