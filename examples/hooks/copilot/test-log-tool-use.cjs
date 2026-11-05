'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const scriptPath = path.join(__dirname, 'log-tool-use.cjs');
const valid = spawnSync(process.execPath, [scriptPath], {
  input: JSON.stringify({ toolName: 'bash', toolArgs: { command: 'echo private' } }),
  encoding: 'utf8'
});

assert.equal(valid.status, 0, valid.stderr);
assert.equal(valid.stdout.trim(), '{}');
assert.match(valid.stderr, /Copilot tool invoked: bash/);
assert.doesNotMatch(valid.stderr, /private|echo/);

const injectedName = spawnSync(process.execPath, [scriptPath], {
  input: JSON.stringify({ toolName: 'custom-tool\nforged entry' }),
  encoding: 'utf8'
});

assert.equal(injectedName.status, 0, injectedName.stderr);
assert.equal(injectedName.stderr, 'Copilot tool invoked: custom-toolforged entry\n');

const invalid = spawnSync(process.execPath, [scriptPath], {
  input: '{"toolName":42}',
  encoding: 'utf8'
});

assert.equal(invalid.status, 1);
assert.equal(invalid.stdout, '');
assert.match(invalid.stderr, /toolName/);

process.stdout.write('Hook tests passed.\n');
