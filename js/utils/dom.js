/**
 * DOM utility functions
 */

/**
 * Creates an element with given properties
 * @param {string} tag - HTML tag name
 * @param {Object} props - Properties to set on the element
 * @returns {HTMLElement}
 */
export function createElement(tag, props = {}) {
  const element = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'textContent') {
      element.textContent = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  return element;
}

/**
 * Shows an element by removing the 'hidden' class
 * @param {HTMLElement} element 
 */
export function showElement(element) {
  element.classList.remove('hidden');
}

/**
 * Hides an element by adding the 'hidden' class
 * @param {HTMLElement} element 
 */
export function hideElement(element) {
  element.classList.add('hidden');
}