export interface SelectedWord {
  value: string;
  indexStart: number;
  indexEnd: number;
  remove(): void;
}
