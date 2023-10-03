import { Outlay } from '../types/OutlaySchema';

export const getTotalChildAmount = (row: Outlay, excludeLast: boolean = true): number => {
  const totalChilds = row.child
    .reduce(
      (amount, childRow) => amount + 1 + getTotalChildAmount(childRow, false),
      0,
    );
  if (row.child.length && excludeLast) {
    const lastGrandChild = getTotalChildAmount(row.child[row.child.length - 1], false);
    return totalChilds - lastGrandChild;
  }
  return totalChilds;
};
