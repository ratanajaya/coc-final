export interface BoardSetting {
  row: number;
  col: number;
  floorVal: number;
  ceilVal: number;
  bias: number; // (−1<x<1,x∈R)
}

export interface Target {
  value: number;
  direction: string | null;
  solutionPositions: { row: number; col: number }[];
}