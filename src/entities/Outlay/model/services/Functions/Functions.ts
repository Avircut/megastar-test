import {
  Outlay,
} from '../../types/OutlaySchema';

// Recursively undo all changes and turn off edit mode
export const undoById = (arr: Outlay[], patch: Outlay) => {
  const index = arr.findIndex((item) => item.id === patch.id);
  if (index !== -1) arr[index] = { ...patch, isEditing: false };
};

// Recursively turn edit mode
export const turnEditableById = (arr: Outlay[], patch: Outlay) => {
  arr.forEach((item, index) => {
    arr[index].isEditing = item.id === patch.id;
  });
};

// Recursively remove row from cache by Id
export const removeById = (arr: Outlay[], patch: Outlay) => {
  const index = arr.findIndex((item) => item.id === patch.id);
  if (index !== -1) arr.splice(index, 1);
};

// Recursively add child to row
export const addChildById = (arr: Outlay[], patch: Outlay) => {
  arr.forEach((item, index) => {
    arr[index].isEditing = !!item.parentId;
    if (item.id === patch.id) {
      arr[index].child?.push({
        parentId: patch.id,
        rowName: '',
        salary: 0,
        equipmentCosts: 0,
        estimatedProfit: 0,
        overheads: 0,
        supportCosts: 0,
        child: [],
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        machineOperatorSalary: 0,
        isEditing: true,
      });
    }
  });
};

// Calculate total amount of children, used to calculate hierarchy arrow height of parent
export const getTotalChildAmount = (row: Outlay, excludeLast: boolean = true): number => {
  const totalChilds = row?.child
    ?.reduce(
      (amount, childRow) => amount + 1 + getTotalChildAmount(childRow, false),
      0,
    ) || 0;
  if (row?.child?.length && excludeLast) {
    const lastGrandChild = getTotalChildAmount(row.child[row.child.length - 1], false);
    return totalChilds - lastGrandChild;
  }
  return totalChilds;
};
