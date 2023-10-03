import {
  TableRow, TableCell, Stack, IconButton, Typography,
} from '@mui/material';
import { FC, Fragment, useCallback } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveRow } from '../../model/services/OutlayService';
import { Outlay } from '../../model/types/OutlaySchema';
import cls from './OutlayRow.module.scss';
import { getTotalChildAmount } from '../../model/services/getTotalChildAmount';

interface OutlayRowProps {
  row: Outlay;
  depth: number;
}
const rowHeight = 57;

export const OutlayRow: FC<OutlayRowProps> = ({ row, depth }) => {
  const childClass = depth ? cls.childCell : '';
  const [removeRow] = useRemoveRow();
  const totalChilds = getTotalChildAmount(row);

  const onDelete = useCallback(() => {
    removeRow(row);
  }, [removeRow, row]);
  return (
    <>
      <TableRow>
        <TableCell
          className={cls.cell}
          style={{ paddingLeft: `${depth * 20}px` }}
        >
          <Stack
            direction="row"
            alignItems="center"
            className={[childClass, cls.buttonGroup].join(' ')}
            sx={{
              '&::after': {
                height: rowHeight * totalChilds - 8,
              },
            }}
          >
            <IconButton className={cls.iconBtn} color="info">
              <ArticleIcon />
            </IconButton>
            <IconButton onClick={onDelete} className={cls.iconBtn} color="error">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </TableCell>
        <TableCell className={cls.cell}>
          <Typography variant="button">{row.rowName}</Typography>
        </TableCell>
        <TableCell className={cls.cell}>
          <Typography variant="button">{row.salary}</Typography>
        </TableCell>
        <TableCell className={cls.cell}>
          <Typography variant="button">{row.equipmentCosts}</Typography>
        </TableCell>
        <TableCell className={cls.cell}>
          <Typography variant="button">{row.overheads}</Typography>
        </TableCell>
        <TableCell className={cls.cell}>
          <Typography variant="button">{row.estimatedProfit}</Typography>
        </TableCell>
      </TableRow>
      {row.child.map((child) => <OutlayRow key={child.id} row={child} depth={depth + 1} />)}
    </>
  );
};
