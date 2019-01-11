#!/usr/bin/env node

if (process.env.NODE_ENV === 'development') {
  require('babel-register');
  require('../src/cli.js');
} else {
  require('../lib/cli.js');
}
