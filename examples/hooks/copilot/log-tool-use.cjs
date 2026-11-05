'use strict';

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const event = JSON.parse(input);
    if (!event || typeof event.toolName !== 'string' || event.toolName.length === 0) {
      throw new Error('Expected a Copilot preToolUse event with a toolName.');
    }

    const toolName = event.toolName.replace(/[\r\n]/g, '').slice(0, 128);
    process.stderr.write(`Copilot tool invoked: ${toolName}\n`);
    process.stdout.write('{}\n');
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
});
