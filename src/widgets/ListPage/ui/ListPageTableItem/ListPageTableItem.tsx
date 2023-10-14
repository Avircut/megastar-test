import { memo } from 'react';

interface ListPageTableItemProps {
 item: any;
}

export const ListPageTableItem = memo(({ item }: ListPageTableItemProps) => {
  return (
    <div>
      ListPageTableItem
    </div>
  );
});
