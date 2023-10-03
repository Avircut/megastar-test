import { FC } from 'react';
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
import { OutlayRow } from '../OutlayRow/OutlayRow';

interface OutlayListProps {
  items?: Outlay[];
}

const columns = [
  { field: 'parentId', headerName: 'Уровень', width: 110 },
  { field: 'title', headerName: 'Наименование работ', width: 757 },
  { field: 'salary', headerName: 'Основная з/п' },
  { field: 'equipmentCosts', headerName: 'Оборудование', width: 200 },
  { field: 'overheads', headerName: 'Накладные расходы', width: 200 },
  { field: 'estimatedProfit', headerName: 'Сметная прибыль', width: 200 },
];

export const OutlayList: FC<OutlayListProps> = ({ items }) => {
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
              >
                <Typography fontWeight="400" color="secondary" variant="button">
                  {header.headerName}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{items.map((row) => <OutlayRow key={row.id} row={row} depth={0} />)}</TableBody>
      </Table>
    </Paper>
  );
};
