'use strict';

const buildType = process.config.target_defaults.default_configuration;
const assert = require('assert');

test(require(`./build/${buildType}/binding.node`));
test(require(`./build/${buildType}/binding_noexcept.node`));

function test(binding) {
  const {
    setValue,
    getValue,
    deleteValue,
  } = binding.global;

  setValue('key1', 'value1');
  assert.strictEqual(global.key1, 'value1');

  const valueObject = {value: 'value'};
  setValue('key1', valueObject);
  assert.strictEqual(global.key1, valueObject);

  global.key2 = 123;
  assert.strictEqual(global.key2, getValue('key2'));

  global.key2 = 'vALUE2';
  assert.strictEqual(global.key2, getValue('key2'));

  setValue('key1', 'value1');
  assert.strictEqual(getValue('key1'), 'value1');

  const valueObject2 = {value: 'value'};
  setValue('key1', valueObject2);
  assert.strictEqual(getValue('key1'), valueObject2);

  deleteValue('key1');
  deleteValue('key2');
  assert.strictEqual(global.key1, undefined);
  assert.strictEqual(global.key2, undefined);
}
