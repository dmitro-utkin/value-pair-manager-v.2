/**
 * Table component for displaying and managing pairs
 */
export class Table {
  constructor(store) {
    this.store = store;
    this.tbody = document.querySelector('#pairs-table tbody');
    this.deleteButton = document.getElementById('delete-selected');
    this.initEventListeners();
  }

  initEventListeners() {
    this.tbody.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const id = e.target.closest('tr').dataset.id;
        this.store.toggleSelect(id);
      }
    });
  }

  render() {
    this.tbody.innerHTML = this.store.pairs.map(pair => `
      <tr class="${pair.selected ? 'selected' : ''}" data-id="${pair.id}">
        <td>
          <input type="checkbox" ${pair.selected ? 'checked' : ''}>
        </td>
        <td>${pair.name}</td>
        <td>${pair.value}</td>
      </tr>
    `).join('');

    this.deleteButton.disabled = !this.store.pairs.some(pair => pair.selected);
  }
}