import { OrderBy } from '@services/interfaces';

export function sortObjectTable(originalTable: any[], orderBy: OrderBy | null) {
  if (orderBy === null) {
    return originalTable;
  }

  const sortedTable = [...originalTable];

  sortedTable.sort((a, b) => {
    const aValue = a[orderBy.id];
    const bValue = b[orderBy.id];

    if (orderBy.direction === 'ASC') {
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    } else {
      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
      return 0;
    }
  });

  return sortedTable;
}
