export interface ISetOperations {
  intersection(arrA: any[], arrB: any[]): any[];
  difference(arrA: any[], arrB: any[]): any[];
  union(arrA: any[], arrB: any[]): any[];
}

export const setOperations = {
  intersection: (arrA: any[], arrB: any[]): any[] => {
    return arrA.filter((x) => arrB.includes(x));
  },

  difference: (arrA: any[], arrB: any[]): any[] => {
    return arrA.filter((x) => !arrB.includes(x));
  },

  union: (arrA: any[], arrB: any[]): any[] => {
    return [...new Set([...arrA, ...arrB])];
  },
};
