import { Store } from './store.js';
import { Form } from './components/Form.js';
import { Table } from './components/Table.js';
import { Modal } from './components/Modal.js';

// Initialize store
const store = new Store();

// Initialize components
const form = new Form(store);
const table = new Table(store);
const modal = new Modal();

// Subscribe to store changes
store.subscribe(() => table.render());

// Initialize sort buttons
document.getElementById('sort-name').addEventListener('click', () => {
  store.sort('name');
});

document.getElementById('sort-value').addEventListener('click', () => {
  store.sort('value');
});

// Initialize delete button
document.getElementById('delete-selected').addEventListener('click', () => {
  store.deleteSelected();
});

// Initialize show XML button
document.getElementById('show-xml').addEventListener('click', () => {
  modal.show(store.toXML());
});