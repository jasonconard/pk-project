/**
 * Is this key typed in a field (text, number, textarea, list, editable text)? Then it belongs to the field: the
 * game's shortcuts (weather, editor, moves, menus) must leave it alone. Checkboxes, radios and buttons are not fields.
 */
export function isTyping(ev: Event): boolean {
  const target = ev.target;
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  if (target instanceof HTMLInputElement) {
    return !['checkbox', 'radio', 'button', 'submit', 'reset', 'image', 'color', 'file'].includes(target.type);
  }
  return target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target.isContentEditable;
}
