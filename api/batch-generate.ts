import { generateUniqueProceduralPuzzle } from "../src/utils/proceduralPuzzles";
import { PuzzleCategory, PuzzleDifficulty } from "../src/types";

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const count = Math.min(10, Math.max(1, parseInt(req.query?.count || req.body?.count || '5', 10)));
  const categories: PuzzleCategory[] = ['visual', 'logic', 'mystery', 'riddle', 'math', 'wisdom', 'science'];
  const difficulty = (req.query?.difficulty || req.body?.difficulty || 'medium') as PuzzleDifficulty;

  const puzzles = [];
  for (let i = 0; i < count; i++) {
    const cat = categories[i % categories.length];
    const puzzle = generateUniqueProceduralPuzzle(cat, difficulty);
    puzzles.push(puzzle);
  }

  return res.status(200).json({
    success: true,
    total: puzzles.length,
    puzzles
  });
}
