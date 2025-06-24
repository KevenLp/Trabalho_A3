document.addEventListener('DOMContentLoaded', () => {
  const botao = document.getElementById('btnAbrirModal');
  if (botao) {
    botao.addEventListener('click', async () => {
      const container = document.getElementById('modalContainer');
      if (!document.getElementById('meuModal')) {
        const response = await fetch('modal-cadastro.html');
        const html = await response.text();
        container.innerHTML = html;
      }
      const modalEl = document.getElementById('meuModal');
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    });
  }
});
