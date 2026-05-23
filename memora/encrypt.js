#!/usr/bin/env node
/**
 * Encrypt a JSON file with AES-256-GCM using PBKDF2 key derivation.
 * Usage: node encrypt.js <password> [input.json] [output.enc]
 */
const crypto = require('crypto');
const fs = require('fs');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node encrypt.js <password> [input.json] [output.enc]');
  process.exit(1);
}

const inputFile  = process.argv[3] || 'kh1-5.json';
const outputFile = process.argv[4] || 'kh1-5.enc';

const plaintext = fs.readFileSync(inputFile, 'utf8');

const salt = crypto.randomBytes(16);
const iv   = crypto.randomBytes(12);
const key  = crypto.pbkdf2Sync(password, salt, 200000, 32, 'sha256');

const cipher    = crypto.createCipheriv('aes-256-gcm', key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
const tag       = cipher.getAuthTag();

const payload = JSON.stringify({
  s: salt.toString('base64'),      // salt
  i: iv.toString('base64'),        // IV
  t: tag.toString('base64'),       // GCM auth tag
  d: encrypted.toString('base64')  // ciphertext
});

fs.writeFileSync(outputFile, payload, 'utf8');
console.log(`✅ Done: ${inputFile} → ${outputFile}`);
console.log(`   Salt: ${salt.toString('hex')}`);
console.log(`   Size: ${Buffer.byteLength(payload)} bytes`);
