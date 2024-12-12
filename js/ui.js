/**
 * UI class to handle DOM interactions
 */
export class UI {
  constructor(store) {
    this.store = store;
    this.initElements();
    this.initEventListeners();
    this.render();

    // Subscribe to store changes
    store.subscribe(() => this.render());
  }

  initElements() {
    this.form = document.getElementById('input-form');
    this.input = document.getElementById('pair-input');
    this.errorMessage = document.getElementById('error-message');
    this.tableBody = document.querySelector('#pairs-table tbody');
    this.deleteButton = document.getElementById('delete-selected');
    this.modal = document.getElementById('modal');
    this.xmlContent = document.getElementById('xml-content');
  }

  initEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Sort buttons
    document.getElementById('sort-name').addEventListener('click', () => {
      this.store.sort('name');
    });

    document.getElementById('sort-value').addEventListener('click', () => {
      this.store.sort('value');
    });

    // Delete button
    this.deleteButton.addEventListener('click', () => {
      this.store.deleteSelected();
    });

    // Show XML button
    document.getElementById('show-xml').addEventListener('click', () => {
      this.showXML();
    });

    // Close modal button
    document.getElementById('close-modal').addEventListener('click', () => {
      this.hideModal();
    });

    // Close modal on outside click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.hideModal();
    });
  }

  handleSubmit() {
    const result = this.store.validateInput(this.input.value, this.store.pairs);
    
    if (result) {
      if (result.error) {
        this.showError('This name/value pair already exists');
      } else {
        this.store.addPair(result.name, result.value);
        this.input.value = '';
        this.hideError();
      }
    } else {
      this.showError('Invalid format. Use: name = value (alphanumeric only)');
    }
  }

  showError(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.classList.remove('hidden');
  }

  hideError() {
    this.errorMessage.classList.add('hidden');
  }

  showXML() {
    this.xmlContent.textContent = this.store.toXML();
    this.modal.classList.remove('hidden');
  }

  hideModal() {
    this.modal.classList.add('hidden');
  }

  render() {
    // Update table
    this.tableBody.innerHTML = this.store.pairs.map(pair => `
      <tr class="${pair.selected ? 'selected' : ''}" data-id="${pair.id}">
        <td>
          <input type="checkbox" ${pair.selected ? 'checked' : ''}>
        </td>
        <td>${pair.name}</td>
        <td>${pair.value}</td>
      </tr>
    `).join('');

    // Add click handlers to checkboxes
    this.tableBody.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const id = e.target.closest('tr').dataset.id;
        this.store.toggleSelect(id);
      });
    });

    // Update delete button state
    this.deleteButton.disabled = !this.store.pairs.some(pair => pair.selected);
  }
}