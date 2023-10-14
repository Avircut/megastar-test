import { memo } from 'react';

interface ListPagePaginationProps {
  page:number;
  totalPage:number;
}

export const ListPagePagination = memo(({ page, totalPage }: ListPagePaginationProps) => {
  return (
    <div>
      ListPagePagination
    </div>
  );
});
