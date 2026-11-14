/** Enums written by name (readable source) instead of their number: property name → [enum name, enum object]. */
export type SourceEnums = Record<string, [string, Record<number, string>]>;

export interface SourceOptions {
  enums?: SourceEnums;
  /** Objects whose one-line source fits in this many characters are written on one line (default: only small flat ones). */
  inlineMax?: number;
}

/** A value as TypeScript source, indented like the hand-written asset files. */
export function toSource(value: unknown, indent: string, key?: string, options: SourceOptions = {}): string {
  const inner = indent + '  ';
  const enums = options.enums ?? {};
  if (key && key in enums && (typeof value === 'number' || Array.isArray(value))) {
    const [enumName, values] = enums[key];
    const name = (n: unknown) => typeof n === 'number' && values[n] ? `${enumName}.${values[n]}` : JSON.stringify(n);
    return Array.isArray(value) ? `[${value.map(name).join(', ')}]` : name(value);
  }
  if (Array.isArray(value)) {
    if (!value.length) {
      return '[]';
    }
    return `[\n${value.map(v => inner + toSource(v, inner, undefined, options)).join(',\n')}\n${indent}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    const oneLine = () => `{ ${entries.map(([k, v]) => `${propName(k)}: ${toSource(v, inner, k, options)}`).join(', ')} }`;
    // Small flat objects (positions, sizes) on one line
    if (entries.every(([, v]) => typeof v !== 'object' || v === null) && entries.length <= 4) {
      return oneLine();
    }
    if (options.inlineMax) {
      const line = oneLine();
      if (!line.includes('\n') && line.length <= options.inlineMax) {
        return line;
      }
    }
    return `{\n${entries.map(([k, v]) => `${inner}${propName(k)}: ${toSource(v, inner, k, options)}`).join(',\n')}\n${indent}}`;
  }
  return typeof value === 'string' ? `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'` : JSON.stringify(value);
}

export function propName(key: string): string {
  return /^[A-Za-z_$][\w$]*$/.test(key) ? key : `'${key}'`;
}

/** Hands a file to the browser (download). */
export function downloadFile(name: string, content: Blob | string) {
  const blob = typeof content === 'string' ? new Blob([content], { type: 'text/plain' }) : content;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
