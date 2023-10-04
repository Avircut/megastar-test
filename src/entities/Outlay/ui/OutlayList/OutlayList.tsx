import {
  FC, memo, useCallback, useState,
} from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
} from '@mui/material';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addRowReducer } from 'features/addRow';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { outlayApi } from '../../model/services/OutlayService';
import { Outlay } from '../../model/types/OutlaySchema';
import cls from './OutlayList.module.scss';
import { EditableOutlayRow } from '../EditableOutlayRow/EditableOutlayRow';
import { OutlayRowComposition } from '../OutlayRowComposition/OutlayRowComposition';

interface OutlayListProps {
  items: Outlay[];
}
const reducers: ReducersList = {
  addRow: addRowReducer,
};
const columns = [
  { field: 'parentId', headerName: 'Уровень', width: 110 },
  { field: 'title', headerName: 'Наименование работ', width: 757 },
  { field: 'salary', headerName: 'Основная з/п' },
  { field: 'equipmentCosts', headerName: 'Оборудование', width: 200 },
  { field: 'overheads', headerName: 'Накладные расходы', width: 200 },
  { field: 'estimatedProfit', headerName: 'Сметная прибыль', width: 200 },
];

export const OutlayList = memo(({ items }:OutlayListProps) => {
  const dispatch = useAppDispatch();
  const onTurnEditable = useCallback((row: Outlay) => {
    dispatch(outlayApi.util.updateQueryData('FetchList', undefined, (draft) => {
      const index = draft.findIndex((item) => item.id === row.id);
      if (index !== -1) {
        draft[index] = { ...row, isEditing: true };
      }
    }));
  }, [dispatch]);
  if (!items) return null;
  return (
    <DynamicModuleLoader reducers={reducers}>
      <Paper elevation={0} className={cls.listWrapper}>
        <Table size="medium" className={cls.table}>
          <TableHead className={cls.head}>
            <TableRow>
              {columns.map((header) => (
                <TableCell
                  color="secondary"
                  className={cls.cell}
                  key={header.field}
                  width={header.width}
                >
                  <Typography
                    fontWeight="400"
                    color="secondary"
                    variant="button"
                  >
                    {header.headerName}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <OutlayRowComposition
                onTurnEditable={() => onTurnEditable(row)}
                key={row.id}
                row={row}
                depth={0}
              />
            ))}
            <EditableOutlayRow />
          </TableBody>
        </Table>
      </Paper>
    </DynamicModuleLoader>
  );
});
