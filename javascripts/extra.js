const { schema, primary, accent } = JSON.parse(
  localStorage.getItem('currentColor')
);
document.body.setAttribute('data-md-color-scheme', schema);
document.body.setAttribute('data-md-color-primary', primary);
document.body.setAttribute('data-md-color-accent', accent);

const buttons = document.querySelectorAll('button[data-md-color-scheme]');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const schema = button.getAttribute('data-md-color-scheme');
    const primary = button.getAttribute('data-md-color-primary');
    const accent = button.getAttribute('data-md-color-accent');
    document.body.setAttribute('data-md-color-scheme', schema);
    document.body.setAttribute('data-md-color-primary', primary);
    document.body.setAttribute('data-md-color-accent', accent);
    localStorage.setItem(
      'currentColor',
      JSON.stringify({ schema, primary, accent })
    );
  });
});
