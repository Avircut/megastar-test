import { memo } from 'react';
import { RouteObject, useMatches } from 'react-router-dom';

export const Breadcrumbs = memo(() => {
  const matches = useMatches();
  return (
    <ol />
  );
});
