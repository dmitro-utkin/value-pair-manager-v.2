import { showElement, hideElement } from '../utils/dom.js';

/**
 * Modal component
 */
export class Modal {
  constructor() {
    this.modal = document.getElementById('modal');
    this.closeButton = document.getElementById('close-modal');
    this.xmlContent = document.getElementById('xml-content');
    this.initEventListeners();
  }

  initEventListeners() {
    this.closeButton.addEventListener('click', () => this.hide());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.hide();
    });
  }

  show(content) {
    this.xmlContent.textContent = content;
    showElement(this.modal);
  }

  hide() {
    hideElement(this.modal);
  }
}