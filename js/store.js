/**
 * Store class to manage the application state
 */
export class Store {
  constructor() {
    this.pairs = [];
    this.listeners = new Set();
  }

  /**
   * Add a new name/value pair
   * @param {string} name - The name
   * @param {string} value - The value
   */
  addPair(name, value) {
    this.pairs.push({
      id: crypto.randomUUID(),
      name,
      value,
      selected: false
    });
    this.notify();
  }

  /**
   * Toggle selection of a pair
   * @param {string} id - The pair ID
   */
  toggleSelect(id) {
    const pair = this.pairs.find(p => p.id === id);
    if (pair) {
      pair.selected = !pair.selected;
      this.notify();
    }
  }

  /**
   * Delete selected pairs
   */
  deleteSelected() {
    this.pairs = this.pairs.filter(pair => !pair.selected);
    this.notify();
  }

  /**
   * Sort pairs by key
   * @param {string} key - The key to sort by ('name' or 'value')
   */
  sort(key) {
    this.pairs.sort((a, b) => a[key].localeCompare(b[key]));
    this.notify();
  }

  /**
   * Get pairs as XML string
   * @returns {string} The XML representation
   */
  toXML() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<pairs>
  ${this.pairs.map(pair => `  <pair>
    <name>${pair.name}</name>
    <value>${pair.value}</value>
  </pair>`).join('\n  ')}
</pairs>`;
  }

  /**
   * Subscribe to store changes
   * @param {Function} listener - The callback function
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of changes
   */
  notify() {
    this.listeners.forEach(listener => listener());
  }
}