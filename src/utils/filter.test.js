import { handlePopularList } from './filter';

describe('List Selector', () => {
  it('Non-equal collect number situation', () => {
    const data = [
      { collect: ['a', 'b', 'c'], authorId: '2' },
      { collect: ['a', 'b'], authorId: '3' },
      { collect: ['a', 'b', 'c', 'd'], authorId: '1' },
      { collect: ['a'], authorId: '4' },
    ];

    const allUser = [
      { uid: '1', name: 'A' },
      { uid: '2', name: 'B' },
      { uid: '3', name: 'C' },
      { uid: '4', name: 'D' },
    ];

    expect(handlePopularList(data, allUser)).toEqual([
      {
        collect: ['a', 'b', 'c', 'd'],
        authorId: '1',
        uid: '1',
        name: 'A',
      },
      { collect: ['a', 'b', 'c'], authorId: '2', uid: '2', name: 'B' },
      { collect: ['a', 'b'], authorId: '3', uid: '3', name: 'C' },
      { collect: ['a'], authorId: '4', uid: '4', name: 'D' },
    ]);
  });

  it('Equal collect number situation, should return by the reverse original array order', () => {
    const data = [
      { collect: ['a', 'b', 'c'], authorId: '1' },
      { collect: ['a', 'b', 'c'], authorId: '2' },
      { collect: ['a', 'b'], authorId: '3' },
      { collect: ['a'], authorId: '4' },
    ];

    const allUser = [
      { uid: '1', name: 'A' },
      { uid: '2', name: 'B' },
      { uid: '3', name: 'C' },
      { uid: '4', name: 'D' },
    ];

    expect(handlePopularList(data, allUser)).toEqual([
      { collect: ['a', 'b', 'c'], authorId: '2', uid: '2', name: 'B' },
      {
        collect: ['a', 'b', 'c'],
        authorId: '1',
        uid: '1',
        name: 'A',
      },
      { collect: ['a', 'b'], authorId: '3', uid: '3', name: 'C' },
      { collect: ['a'], authorId: '4', uid: '4', name: 'D' },
    ]);
  });

  it('Not enough for 4 list data, should still return result', () => {
    const data = [
      { collect: ['a', 'b', 'c'], authorId: '1' },
      { collect: ['a', 'b'], authorId: '2' },
      { collect: ['a'], authorId: '3' },
    ];

    const allUser = [
      { uid: '1', name: 'A' },
      { uid: '2', name: 'B' },
      { uid: '3', name: 'C' },
    ];

    expect(handlePopularList(data, allUser)).toEqual([
      {
        collect: ['a', 'b', 'c'],
        authorId: '1',
        uid: '1',
        name: 'A',
      },
      { collect: ['a', 'b'], authorId: '2', uid: '2', name: 'B' },
      { collect: ['a'], authorId: '3', uid: '3', name: 'C' },
    ]);
  });
});
