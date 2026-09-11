import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

import { environmentManifest } from './environment.manifest.mjs';

const toolsDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(toolsDir, '..');
const assetsDir = path.join(projectRoot, 'src', 'assets');
const schemaPath = path.join(projectRoot, 'src', 'app', 'shared', 'models', 'environment-config.ts');

/** Write UTF-8, LF line endings, no BOM, trailing newline. */
async function writeFileLf(filePath, content) {
  const normalized = content.replace(/\r\n/g, '\n').replace(/\n?$/, '\n');
  await writeFile(filePath, normalized, { encoding: 'utf-8' });
}

/** Minimal `.env` parser (no dependency). Returns {} when the file is absent. */
async function readDotEnv() {
  const dotEnvPath = path.join(projectRoot, '.env');
  if (!existsSync(dotEnvPath)) return {};
  const raw = await readFile(dotEnvPath, 'utf-8');
  const values = {};
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || line.trimStart().startsWith('#')) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[match[1]] = value;
  }
  return values;
}

/** Import the Zod schema that both the app and this generator share. */
async function loadSchema() {
  try {
    const { environmentConfigSchema } = await import(pathToFileURL(schemaPath).href);
    return environmentConfigSchema;
  } catch (error) {
    console.error(`No se pudo importar el esquema Zod desde ${schemaPath}: ${error.message}`);
    process.exit(1);
  }
}

/** Fail fast if the manifest and the Zod schema disagree on the set of keys. */
function assertSchemaParity(schema) {
  const schemaKeys = Object.keys(schema.shape).sort();
  const manifestKeys = environmentManifest.map(entry => entry.key).sort();

  const missingInManifest = schemaKeys.filter(key => !manifestKeys.includes(key));
  const missingInSchema = manifestKeys.filter(key => !schemaKeys.includes(key));

  if (missingInManifest.length || missingInSchema.length) {
    const details = [
      missingInManifest.length ? `  - claves en el esquema pero no en el manifiesto: ${missingInManifest.join(', ')}` : '',
      missingInSchema.length ? `  - claves en el manifiesto pero no en el esquema: ${missingInSchema.join(', ')}` : '',
    ].filter(Boolean).join('\n');
    console.error(`El manifiesto de environment y environment-config.ts (Zod) no coinciden:\n${details}`);
    process.exit(1);
  }
}

/** Fail fast if the resolved values break a schema rule (types, trailing slash, etc.). */
function assertValidValues(schema, environmentJson) {
  const result = schema.safeParse(environmentJson);
  if (!result.success) {
    console.error('El environment.json generado no cumple el esquema Zod:');
    for (const issue of result.error.issues) {
      console.error(`  - ${issue.path.join('.') || '(raiz)'}: ${issue.message}`);
    }
    process.exit(1);
  }
}

function assertManifestShape() {
  const seenKeys = new Set();
  const seenVars = new Set();
  for (const entry of environmentManifest) {
    for (const field of ['key', 'envVar', 'devDefault']) {
      if (typeof entry[field] !== 'string' || entry[field].length === 0) {
        console.error(`Entrada invalida en el manifiesto (${JSON.stringify(entry)}): falta "${field}".`);
        process.exit(1);
      }
    }
    if (seenKeys.has(entry.key)) {
      console.error(`Clave duplicada en el manifiesto: ${entry.key}`);
      process.exit(1);
    }
    if (seenVars.has(entry.envVar)) {
      console.error(`Variable de entorno duplicada en el manifiesto: ${entry.envVar}`);
      process.exit(1);
    }
    seenKeys.add(entry.key);
    seenVars.add(entry.envVar);
  }
}

async function main() {
  assertManifestShape();
  const schema = await loadSchema();
  assertSchemaParity(schema);

  const dotEnv = await readDotEnv();
  const resolve = envVar => process.env[envVar] ?? dotEnv[envVar];

  // environment.json — concrete values for `ng serve` / local build.
  const environmentJson = {};
  for (const { key, envVar, devDefault } of environmentManifest) {
    environmentJson[key] = resolve(envVar) ?? devDefault;
  }
  assertValidValues(schema, environmentJson);
  await writeFileLf(
    path.join(assetsDir, 'environment.json'),
    JSON.stringify(environmentJson, null, 2),
  );

  // environment.template.json — placeholders resolved by envsubst at container start.
  const templateJson = {};
  for (const { key, envVar } of environmentManifest) {
    templateJson[key] = `\${${envVar}}`;
  }
  await writeFileLf(
    path.join(assetsDir, 'environment.template.json'),
    JSON.stringify(templateJson, null, 2),
  );

  // environment.envsubst.vars — whitelist passed to `envsubst` in entrypoint.sh
  // so it only substitutes known variables and leaves everything else untouched.
  const varsList = environmentManifest.map(({ envVar }) => `\${${envVar}}`).join(' ');
  await writeFileLf(path.join(assetsDir, 'environment.envsubst.vars'), varsList);

  console.log(
    `Environment generado desde el manifiesto: ${environmentManifest.length} variables ` +
    `(${environmentManifest.map(e => e.key).join(', ')}).`,
  );
}

await main();
