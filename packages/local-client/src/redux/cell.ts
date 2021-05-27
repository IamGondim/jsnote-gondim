export type CellTypes = 'code' | 'text';
export type MoveCellDirections = 'up' | 'down';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}