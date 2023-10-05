import { mockData } from 'shared/config/jest/mockData';
import { Outlay } from 'entities/Outlay';
import { recursiveSearch } from './recursiveSearch';

const testObject = mockData;
describe('recursiveSearch.test', () => {
  let amount = 0;
  const findById = (arr: Outlay[], patch:Outlay) => {
    arr.forEach((item) => {
      if (item.id === patch.id) amount += 1;
    });
  };
  beforeEach(() => {
    amount = 0;
  });

  test('find existing row', () => {
    recursiveSearch(testObject, findById, 'child', { id: 64506 });
    expect(amount).toEqual(1);
  });
  test('Not find non-existing row', () => {
    recursiveSearch(testObject, findById, 'child', { id: 0 });
    expect(amount).toEqual(0);
  });
});
