import { memo } from 'react';
import { PageHeader } from 'widgets/PageHeader/ui/PageHeader';

interface ListPageHeaderProps {
  title:string;
}

export const ListPageHeader = memo(({ title }: ListPageHeaderProps) => {
  return (
    <PageHeader title="Отделы" />
  );
});
