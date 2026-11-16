// Fingerprint of the native part of the Android app: its project files (android/), the Capacitor config and the
// versions of the installed Capacitor plugins. Two releases with the same fingerprint run the same game files
// (live update, see .github/workflows/main.yml); a different one needs a new APK.
// Usage: node scripts/native-fingerprint.mjs  → prints 12 hex characters
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const hash = createHash('sha256');

const files = execSync('git ls-files android capacitor.config.ts', { encoding: 'utf8' })
  .split('\n').filter(Boolean).sort();
for (const file of files) {
  hash.update(file).update('\0').update(readFileSync(file)).update('\0');
}

for (const scope of ['@capacitor', '@capgo']) {
  const dir = join('node_modules', scope);
  if (!existsSync(dir)) {
    continue;
  }
  for (const name of readdirSync(dir).sort()) {
    const pkg = join(dir, name, 'package.json');
    if (existsSync(pkg)) {
      hash.update(`${scope}/${name}@${JSON.parse(readFileSync(pkg, 'utf8')).version}\0`);
    }
  }
}

console.log(hash.digest('hex').slice(0, 12));
