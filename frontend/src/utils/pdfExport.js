export const exportResumeToPdf = async (elementId) => {
  const source = document.getElementById(elementId);
  if (!source) {
    throw new Error('Live preview sheet not found');
  }

  const placeholder = document.createComment('resume-print-slot');
  source.parentNode.insertBefore(placeholder, source);
  document.body.appendChild(source);
  source.setAttribute('data-print-active', 'true');
  document.documentElement.classList.add('is-printing-resume');

  const cleanup = () => {
    source.removeAttribute('data-print-active');
    document.documentElement.classList.remove('is-printing-resume');
    if (placeholder.parentNode) {
      placeholder.parentNode.insertBefore(source, placeholder);
      placeholder.remove();
    }
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);

  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
        resolve();
      });
    });
  });
};
