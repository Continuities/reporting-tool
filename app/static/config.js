(() => {

  const resources = document.querySelector('#resources');
  const rowTemplate = document.querySelector('#resource-row-tmpl');
  function addResourceRow() {
    const index = document.querySelectorAll('.resource-row').length;
    const row = rowTemplate.content.cloneNode(true);
    const container = row.querySelector('.container');
    container.innerHTML = container.innerHTML.replace(/{INDEX}/g, index);
    resources.appendChild(row);
  }

  document
    .querySelector('#add-resource')
    .addEventListener('click', addResourceRow);

  // Prevent form re-submission on reload
  window.history.replaceState( null, null, window.location.href );
})();
