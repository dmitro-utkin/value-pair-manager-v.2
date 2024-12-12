/**
 * Validates a name/value pair string input and checks for duplicates
 * @param {string} input - The input string to validate
 * @param {Array} existingPairs - Array of existing name/value pairs
 * @returns {Object|null} The parsed name and value if valid, null if invalid
 */
export function validateNameValuePair(input, existingPairs = []) {
  const trimmed = input.trim();
  const parts = trimmed.split('=').map(part => part.trim());
  
  if (parts.length !== 2) return null;
  
  const [name, value] = parts;
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  
  // Check for valid characters
  if (!alphanumericRegex.test(name) || !alphanumericRegex.test(value)) {
    return null;
  }
  
  // Check for duplicates
  const isDuplicate = existingPairs.some(pair => 
    pair.name.toLowerCase() === name.toLowerCase() && 
    pair.value.toLowerCase() === value.toLowerCase()
  );
  
  if (isDuplicate) {
    return { error: 'Duplicate pair' };
  }
  
  return { name, value };
}