import fs from 'fs';

const filePath = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\d033bf6e-fb44-4880-ba85-9342d3d99c63\\.system_generated\\steps\\712\\content.md';
const content = fs.readFileSync(filePath, 'utf8');

// Search for question arrays in JavaScript
const questionsRegex = /id:\s*(\d+|"[^"]+"),\s*text:\s*"([^"]+)"/g;
let m;
console.log('--- KYND.MN QUESTIONS ---');
let count = 0;
while ((m = questionsRegex.exec(content)) !== null) {
  count++;
  console.log(`${count}. [${m[1]}] ${m[2]}`);
}

// Search for pricing or paywall in kynd
const priceRegex = /(\d{1,3}[,\.]\d{3}\s*₮|\d+\s*₮)/g;
const prices = content.match(priceRegex) || [];
console.log('\n--- KYND.MN PRICES / AMOUNTS ---');
console.log([...new Set(prices)]);

// Search for result sections
console.log('\n--- KYND.MN RESULT KEYS / DESCRIPTIONS ---');
const descRegex = /description:\s*"([^"]+)"/g;
let d;
while ((d = descRegex.exec(content)) !== null) {
  console.log(`- ${d[1]}`);
}
