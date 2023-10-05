import {
  memo,
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

import { Outlay } from '../../model/types/OutlaySchema';
import cls from './OutlayList.module.scss';
import { EditableOutlayRow } from '../EditableOutlayRow/EditableOutlayRow';
import { OutlayRowComposition } from '../OutlayRowComposition/OutlayRowComposition';

interface OutlayListProps {
  items: Outlay[];
}
const columns = [
  { field: 'parentId', headerName: 'Уровень', width: 110 },
  { field: 'title', headerName: 'Наименование работ', width: 757 },
  { field: 'salary', headerName: 'Основная з/п' },
  { field: 'equipmentCosts', headerName: 'Оборудование', width: 200 },
  { field: 'overheads', headerName: 'Накладные расходы', width: 200 },
  { field: 'estimatedProfit', headerName: 'Сметная прибыль', width: 200 },
];

export const OutlayList = memo(({ items }:OutlayListProps) => {
  if (!items) return null;
  return (
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
              key={row.id}
              row={row}
              depth={0}
              id={`outlayRow${row.id}`}
            />
          ))}
          <EditableOutlayRow id="addRow" />
        </TableBody>
      </Table>
    </Paper>
  );
});
