import { calculateAssessmentResult } from './src/lib/scoringEngine';
import { QUESTIONS } from './src/data/questions';

console.log('Testing Scoring Engine...');

// Test 1: Highly Sensitive Child
const answersSens = {};
QUESTIONS.forEach((q) => {
  if (q.dimension === 'sensitivity') answersSens[q.id] = 5;
  else if (q.dimension === 'regulation') answersSens[q.id] = 3;
  else if (q.dimension === 'adaptability') answersSens[q.id] = 1;
  else if (q.dimension === 'energy') answersSens[q.id] = 2;
});

const res1 = calculateAssessmentResult(
  { name: 'Ану', ageGroup: 'preschool', gender: 'girl' },
  answersSens
);

console.log('Test 1 (High Sensitivity):', {
  child: res1.childProfile.name,
  archetype: res1.primaryArchetype.id,
  archetypeTitle: res1.primaryArchetype.title,
  scores: Object.entries(res1.dimensionScores).map(([k, v]) => `${k}: ${v.percentage}% (${v.level})`)
});

if (res1.primaryArchetype.id !== 'gentle_observer') {
  throw new Error(`Expected gentle_observer but got ${res1.primaryArchetype.id}`);
}

// Test 2: High Energy Pioneer
const answersEnergy = {};
QUESTIONS.forEach((q) => {
  if (q.dimension === 'energy') answersEnergy[q.id] = 5;
  else if (q.dimension === 'sensitivity') answersEnergy[q.id] = 2;
  else if (q.dimension === 'regulation') answersEnergy[q.id] = 2;
  else if (q.dimension === 'adaptability') answersEnergy[q.id] = 4;
});

const res2 = calculateAssessmentResult(
  { name: 'Тэмүүлэн', ageGroup: 'school', gender: 'boy' },
  answersEnergy
);

console.log('Test 2 (High Energy):', {
  child: res2.childProfile.name,
  archetype: res2.primaryArchetype.id,
  archetypeTitle: res2.primaryArchetype.title,
  scores: Object.entries(res2.dimensionScores).map(([k, v]) => `${k}: ${v.percentage}% (${v.level})`)
});

if (res2.primaryArchetype.id !== 'energetic_pioneer') {
  throw new Error(`Expected energetic_pioneer but got ${res2.primaryArchetype.id}`);
}

console.log('All scoring engine tests PASSED successfully! ✅');
