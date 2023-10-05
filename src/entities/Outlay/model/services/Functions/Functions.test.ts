import { mockData } from 'shared/config/jest/mockData';
import { recursiveSearch } from 'shared/lib/recursiveSearch/recursiveSearch';
import { Outlay } from '../../types/OutlaySchema';
import {
  addChildById, getTotalChildAmount, removeById, turnEditableById, undoById,
} from './Functions';

describe('Outlay Service Functions', () => {
  let data = JSON.parse(JSON.stringify(mockData));
  let amount = 0;

  beforeEach(() => {
    amount = 0;
    data = JSON.parse(JSON.stringify(mockData));
  });

  test('undoByID + turnEditableById', () => {
    const testObject = JSON.parse(JSON.stringify(data[0].child[1]));
    const findEditable = (arr: Outlay[]) => {
      arr.forEach((item) => {
        if (item.isEditing) amount += 1;
      });
    };
    recursiveSearch(data, findEditable, 'child', {});
    expect(amount).toEqual(0);
    recursiveSearch(data, turnEditableById, 'child', testObject);
    recursiveSearch(data, findEditable, 'child', {});
    expect(amount).toEqual(1);
    amount = 0;
    data[0].child[1].equipmentCosts = 111;
    const findByEquipmentCost = (arr:Outlay[], patch:Outlay) => {
      arr.forEach((item) => {
        if (item.equipmentCosts === patch.equipmentCosts) amount += 1;
      });
    };
    recursiveSearch(data, findByEquipmentCost, 'child', { equipmentCosts: 111 });
    expect(amount).toEqual(1);
    recursiveSearch(data, undoById, 'child', testObject);
    amount = 0;
    recursiveSearch(data, findByEquipmentCost, 'child', { equipmentCosts: 111 });
    expect(amount).toEqual(0);
  });

  test('removeById', () => {
    const findById = (arr:Outlay[], patch:Outlay) => {
      arr.forEach((item) => {
        if (item.id === patch.id) amount += 1;
      });
    };
    recursiveSearch(data, findById, 'child', { id: 64505 });
    expect(amount).toEqual(1);
    recursiveSearch(data, removeById, 'child', { id: 64505 });
    amount = 0;
    recursiveSearch(data, findById, 'child', { id: 64505 });
    expect(amount).toEqual(0);
  });

  test('addChildById', () => {
    const findByParentId = (arr:Outlay[], patch:Outlay) => {
      arr.forEach((item) => {
        if (item.parentId === patch.parentId) amount += 1;
      });
    };
    recursiveSearch(data, findByParentId, 'child', { parentId: 64505 });
    expect(amount).toEqual(0);
    amount = 0;
    recursiveSearch(data, addChildById, 'child', { id: 64505 });
    recursiveSearch(data, findByParentId, 'child', { parentId: 64505 });
    expect(amount).toEqual(1);
  });

  test('getTotalChildAmount', () => {
    const firstTotalChilds = getTotalChildAmount(data[0], false);
    expect(firstTotalChilds).toEqual(6);
    const totalChildWithoutLast = getTotalChildAmount(data[0]);
    expect(totalChildWithoutLast).toBe(2);
  });
});
