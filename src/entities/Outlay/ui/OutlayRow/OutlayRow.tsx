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
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { recursiveSearch } from 'shared/lib/recursiveSearch/recursiveSearch';
import { turnEditableById, addChildById, getTotalChildAmount } from '../../model/services/Functions/Functions';
import { outlayApi, useRemoveRow } from '../../model/services/OutlayService';
import { Outlay } from '../../model/types/OutlaySchema';
import cls from './OutlayRow.module.scss';
import { OutlayRowComposition } from '../OutlayRowComposition/OutlayRowComposition';

export interface OutlayRowProps {
  row?: Outlay;
  depth?: number;
  id?: string;
}
export const OUTLAY_ROW_HEIGHT = 56;

export const OutlayRow = memo((props: OutlayRowProps) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const rowHeight = cellRef.current?.clientHeight || OUTLAY_ROW_HEIGHT;
  const { row = {}, depth = 0, id = 'outlayRow' } = props;
  const childClass = depth ? cls.childCell : '';
  const [removeRow] = useRemoveRow();
  const totalChilds = getTotalChildAmount(row);
  const dispatch = useAppDispatch();

  const onTurnEditable = useCallback(() => {
    dispatch(outlayApi.util.updateQueryData('FetchList', undefined, (draft) => {
      recursiveSearch(draft, turnEditableById, 'child', row);
    }));
  }, [dispatch, row]);

  const onAddChild = useCallback(() => {
    dispatch(outlayApi.util.updateQueryData('FetchList', undefined, (draft) => {
      recursiveSearch(draft, addChildById, 'child', row);
    }));
  }, [dispatch, row]);

  const onDelete = useCallback(() => {
    removeRow(row);
  }, [removeRow, row]);
  return (
    <>
      <TableRow id={id}>
        <TableCell
          className={cls.cell}
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
                onClick={onAddChild}
                className={cls.iconBtn}
                color="info"
              >
                <ArticleIcon />
              </IconButton>
              <IconButton
                onClick={onDelete}
                id="deleteBtn"
                className={[cls.iconBtn, cls.trashIcon].join(' ')}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell id="rowName" onDoubleClick={onTurnEditable} className={cls.cell}>
          <Typography variant="button">{row.rowName}</Typography>
        </TableCell>
        <TableCell onDoubleClick={onTurnEditable} className={cls.cell}>
          <Typography variant="button">{row.salary}</Typography>
        </TableCell>
        <TableCell onDoubleClick={onTurnEditable} className={cls.cell}>
          <Typography variant="button">{row.equipmentCosts}</Typography>
        </TableCell>
        <TableCell onDoubleClick={onTurnEditable} className={cls.cell}>
          <Typography variant="button">{row.overheads}</Typography>
        </TableCell>
        <TableCell onDoubleClick={onTurnEditable} className={cls.cell}>
          <Typography variant="button">{row.estimatedProfit}</Typography>
        </TableCell>
      </TableRow>
      {row?.child?.map((child, index) => (
        <OutlayRowComposition
          key={child.id || `${row.id}-${index}`}
          row={child}
          depth={depth + 1}
          id={`outlayRow${child.id}`}
        />
      ))}
    </>
  );
});
