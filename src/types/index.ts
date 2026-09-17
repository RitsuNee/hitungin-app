export interface Ingredient {
  id: string;
  name: string;
  purchasePrice: number;
  purchaseAmount: number;
  purchaseUnit: string;
  usedAmount: number;
  usedUnit: string;
  calculatedCost: number;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  portions: number;
  ingredients: Ingredient[];
  operationalCost: number;
  targetSellingPrice: number;
  createdAt: number;
  updatedAt: number;
}