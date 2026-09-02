import { 
  AssessmentResult, 
  ChildProfile, 
  DimensionId, 
  DimensionScore, 
  ArchetypeId 
} from '../types';
import { QUESTIONS } from '../data/questions';
import { ARCHETYPES } from '../data/archetypes';

export function calculateAssessmentResult(
  childProfile: ChildProfile,
  answers: Record<number, number>
): AssessmentResult {
  const rawScores: Record<DimensionId, { sum: number; count: number }> = {
    sensitivity: { sum: 0, count: 0 },
    regulation: { sum: 0, count: 0 },
    adaptability: { sum: 0, count: 0 },
    energy: { sum: 0, count: 0 },
  };

  QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 3;
    rawScores[q.dimension].sum += val;
    rawScores[q.dimension].count += 1;
  });

  const dimensionScores: Record<DimensionId, DimensionScore> = {} as any;

  (Object.keys(rawScores) as DimensionId[]).forEach((dim) => {
    const { sum, count } = rawScores[dim];
    const maxScore = count * 5;
    const minScore = count * 1;
    const percentage = Math.round(((sum - minScore) / (maxScore - minScore)) * 100);

    let level: 'low' | 'moderate' | 'high' = 'moderate';
    let levelDescription = '';

    if (percentage >= 68) {
      level = 'high';
      levelDescription = getLevelDescription(dim, 'high');
    } else if (percentage <= 36) {
      level = 'low';
      levelDescription = getLevelDescription(dim, 'low');
    } else {
      level = 'moderate';
      levelDescription = getLevelDescription(dim, 'moderate');
    }

    dimensionScores[dim] = {
      dimension: dim,
      rawScore: sum,
      maxScore,
      percentage,
      level,
      levelDescription,
    };
  });

  const primaryId = determineArchetype(dimensionScores);
  const primaryArchetype = ARCHETYPES[primaryId];

  const secondaryId = determineSecondaryArchetype(primaryId, dimensionScores);
  const secondaryArchetype = secondaryId ? ARCHETYPES[secondaryId] : undefined;

  const assessmentId = `ast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    id: assessmentId,
    childProfile,
    primaryArchetype,
    secondaryArchetype,
    dimensionScores,
    completedAt: new Date().toISOString(),
    isUnlocked: false,
  };
}

function determineArchetype(scores: Record<DimensionId, DimensionScore>): ArchetypeId {
  const sens = scores.sensitivity.percentage;
  const reg = scores.regulation.percentage;
  const adapt = scores.adaptability.percentage;
  const energy = scores.energy.percentage;

  const candidates: { id: ArchetypeId; score: number }[] = [
    {
      id: 'gentle_observer',
      score: sens * 1.5 + (100 - adapt) * 0.8 + (100 - energy) * 0.5,
    },
    {
      id: 'energetic_pioneer',
      score: energy * 1.6 + (100 - reg) * 0.7 + sens * 0.4,
    },
    {
      id: 'focused_inquirer',
      score: reg * 1.4 + (100 - adapt) * 0.6 + sens * 0.6,
    },
    {
      id: 'social_radiant',
      score: adapt * 1.5 + energy * 0.8 + sens * 0.5,
    },
    {
      id: 'calm_harmonizer',
      score: reg * 1.1 + adapt * 1.0 + (100 - energy) * 0.7 + (100 - sens) * 0.4,
    },
  ];

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0].id;
}

function determineSecondaryArchetype(
  primaryId: ArchetypeId, 
  scores: Record<DimensionId, DimensionScore>
): ArchetypeId | undefined {
  const sens = scores.sensitivity.percentage;
  const reg = scores.regulation.percentage;
  const adapt = scores.adaptability.percentage;
  const energy = scores.energy.percentage;

  const candidates: { id: ArchetypeId; score: number }[] = [
    {
      id: 'gentle_observer',
      score: sens * 1.5 + (100 - adapt) * 0.8 + (100 - energy) * 0.5,
    },
    {
      id: 'energetic_pioneer',
      score: energy * 1.6 + (100 - reg) * 0.7 + sens * 0.4,
    },
    {
      id: 'focused_inquirer',
      score: reg * 1.4 + (100 - adapt) * 0.6 + sens * 0.6,
    },
    {
      id: 'social_radiant',
      score: adapt * 1.5 + energy * 0.8 + sens * 0.5,
    },
    {
      id: 'calm_harmonizer',
      score: reg * 1.1 + adapt * 1.0 + (100 - energy) * 0.7 + (100 - sens) * 0.4,
    },
  ];

  const filtered = candidates.filter((c) => c.id !== primaryId);
  filtered.sort((a, b) => b.score - a.score);
  return filtered[0]?.id;
}

function getLevelDescription(dim: DimensionId, level: 'low' | 'moderate' | 'high'): string {
  switch (dim) {
    case 'sensitivity':
      if (level === 'high') return 'Өндөр мэдрэг: Дуу чимээ, сэтгэл хөдлөл, орчны өөрчлөлтийг гүн тусгаж авдаг.';
      if (level === 'low') return 'Тайван тогтвортой: Гадаад сөрөг сэрэл, дуу чимээнд бага цочрол авдаг.';
      return 'Тэнцвэртэй: Ердийн нөхцөлд тайван, гэхдээ хэт ачаалалтай үед мэдрэмтгий болдог.';

    case 'regulation':
      if (level === 'high') return 'Өндөр тэвчээртэй: Хүслээ хүлээж чаддаг, аливааг дуусгах төвлөрөл сайн.';
      if (level === 'low') return 'Хөгжиж буй: Сэтгэлийн хөдлөлөө барих, хүслээ хойшлуулахад дэмжлэг хэрэгтэй.';
      return 'Дунд зэргийн зохицуулалттай: Тайван үедээ өөрийгөө удирддаг, ядарсан үедээ сануулга шаардлагатай.';

    case 'adaptability':
      if (level === 'high') return 'Хурдан дасан зохицогч: Шинэ хүмүүс, өөрчлөгдсөн орчинд төвөггүй уусдаг.';
      if (level === 'low') return 'Болгоомжтой дасагч: Шинэ зүйлд орохын тулд урьдчилсан сануулга, цаг хугацаа хэрэгтэй.';
      return 'Аажмаар дасагч: Танил орчиндоо нээлттэй, танихгүй газарт эхэндээ ажигладаг.';

    case 'energy':
      if (level === 'high') return 'Өндөр эрч хүчтэй: Бие бялдрын идэвхтэй, өөрийн санаачилгаар урагшлах дуртай.';
      if (level === 'low') return 'Тайван амгалан: Хөдөлгөөний огцом хэрэгцээ бага, суурин үйл ажиллагаанд дуртай.';
      return 'Тохируулгатай эрч хүч: Тоглоомын үед идэвхтэй, гэртээ тайван амрах чадвартай.';
  }
}
