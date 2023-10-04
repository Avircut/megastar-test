import {
  TableRow,
  TableCell,
  Stack,
  IconButton,
  Typography,
} from '@mui/material';
import {
  memo, useCallback, useRef,
} from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveRow } from '../../model/services/OutlayService';
import { Outlay } from '../../model/types/OutlaySchema';
import cls from './OutlayRow.module.scss';
import { getTotalChildAmount } from '../../model/services/getTotalChildAmount';
import { OutlayRowComposition } from '../OutlayRowComposition/OutlayRowComposition';

export interface OutlayRowProps {
  row?: Outlay;
  depth?: number;
  onTurnEditable?: () => void;
}
const ROW_HEIGHT = 56;

export const OutlayRow = memo((props: OutlayRowProps) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const rowHeight = cellRef.current?.clientHeight || ROW_HEIGHT;
  const { row = {}, depth = 0, onTurnEditable } = props;
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
          onClick={onTurnEditable}
          style={{ paddingLeft: `${depth * 20}px` }}
          ref={cellRef}
        >
          <Stack
            direction="row"
            alignItems="center"
            className={[childClass, cls.buttonGroup].join(' ')}
            sx={{
              '&::after': {
                height: (rowHeight + 1) * totalChilds - 9,
              },
            }}
          >
            <Stack direction="row" className={cls.buttonBackground}>
              <IconButton
                className={cls.iconBtn}
                color="info"
              >
                <ArticleIcon />
              </IconButton>
              <IconButton
                onClick={onDelete}
                className={[cls.iconBtn, cls.trashIcon].join(' ')}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell onClick={onTurnEditable} className={cls.cell}>
          <Typography variant="button">
            {row.rowName}
          </Typography>
        </TableCell>
        <TableCell onClick={onTurnEditable} className={cls.cell}>
          <Typography variant="button">{row.salary}</Typography>
        </TableCell>
        <TableCell onClick={onTurnEditable} className={cls.cell}>
          <Typography variant="button">{row.equipmentCosts}</Typography>
        </TableCell>
        <TableCell onClick={onTurnEditable} className={cls.cell}>
          <Typography variant="button">{row.overheads}</Typography>
        </TableCell>
        <TableCell onClick={onTurnEditable} className={cls.cell}>
          <Typography variant="button">{row.estimatedProfit}</Typography>
        </TableCell>
      </TableRow>
      {row?.child?.map((child) => (
        <OutlayRowComposition
          key={child.id}
          row={child}
          depth={depth + 1}
          onTurnEditable={onTurnEditable}
        />
      ))}
    </>
  );
});
