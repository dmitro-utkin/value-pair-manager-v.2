import { validateNameValuePair } from '../utils/validation.js';
import { showElement, hideElement } from '../utils/dom.js';

/**
 * Form component for input handling
 */
export class Form {
  constructor(store) {
    this.store = store;
    this.form = document.getElementById('input-form');
    this.input = document.getElementById('pair-input');
    this.errorMessage = document.getElementById('error-message');
    this.initEventListeners();
  }

  initEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  handleSubmit() {
    const result = validateNameValuePair(this.input.value, this.store.pairs);
    
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
    showElement(this.errorMessage);
  }

  hideError() {
    hideElement(this.errorMessage);
  }
}