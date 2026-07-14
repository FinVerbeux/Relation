#!/usr/bin/env node
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('index.html', 'utf8');
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

assert(html.includes('<!DOCTYPE html>'), 'index.html doit rester un document HTML complet.');
assert(html.includes('id="btnSettings"'), 'Le bouton Paramètres doit être présent dans la topbar.');
assert(html.includes('const SHORTCUT_ACTIONS'), 'Le registre central des raccourcis doit être présent.');
assert(html.includes('function openSettingsModal'), 'La modale Paramètres doit être câblée.');
assert(html.includes('function createSmartEdge'), 'La création intelligente de liens doit être présente.');
assert(html.includes('function maybeAutoLinkTo'), 'La liaison automatique après création doit être présente.');
assert(html.includes('function openTimelineModal'), 'La vue chronologie doit être présente.');
assert(html.includes('function openTableViewModal'), 'La vue tableau doit être présente.');
assert(html.includes('function openAuditModal'), 'L’audit qualité doit être présent.');
assert(html.includes('function exportNodesCSV'), 'L’export CSV des éléments doit être présent.');
assert(html.includes('id="btnTimeline"'), 'Le bouton Chronologie doit être présent dans la topbar.');
assert(html.includes('id="btnTableView"'), 'Le bouton Vue tableau doit être présent dans la topbar.');
assert(html.includes('id="btnAudit"'), 'Le bouton Audit doit être présent dans la topbar.');
assert(fs.existsSync('_headers'), 'Le fichier _headers Cloudflare Pages doit exister.');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
assert(scripts.length > 0, 'index.html doit contenir au moins un script embarqué à vérifier.');

scripts.forEach((script, index) => {
  try {
    new vm.Script(script, { filename: `index.html<script#${index + 1}>` });
  } catch (error) {
    failures.push(`Erreur de syntaxe JS dans le script #${index + 1}: ${error.message}`);
  }
});

const requiredHeaderRules = [
  'X-Content-Type-Options: nosniff',
  'Referrer-Policy: no-referrer',
  'X-Frame-Options: DENY'
];
const headers = fs.readFileSync('_headers', 'utf8');
for (const rule of requiredHeaderRules) {
  assert(headers.includes(rule), `En-tête Cloudflare Pages manquant: ${rule}`);
}

if (failures.length) {
  console.error('Checks échoués :');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Checks locaux OK : HTML, script embarqué, paramètres, raccourcis, vues d'enquête, CSV, liaison intelligente et _headers.");
