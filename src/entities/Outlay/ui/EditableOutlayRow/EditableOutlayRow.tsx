import {
  TableRow,
  TableCell,
  TextField,
  IconButton,
  Stack,
} from '@mui/material';
import React, {
  memo, useCallback, useRef, useState,
} from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { recursiveSearch } from 'shared/lib/recursiveSearch/recursiveSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import {
  undoById,
  addChildById,
  removeById,
  getTotalChildAmount,
} from '../../model/services/Functions/Functions';
import {
  outlayApi,
  useAddRow,
  useUpdateRow,
} from '../../model/services/OutlayService';
import { Outlay } from '../../model/types/OutlaySchema';
import EditableCls from './EditableOutlayRow.module.scss';
import { OUTLAY_ROW_HEIGHT, OutlayRowProps } from '../OutlayRow/OutlayRow';
import { OutlayRowComposition } from '../OutlayRowComposition/OutlayRowComposition';
import cls from '../OutlayRow/OutlayRow.module.scss';

export const EditableOutlayRow = memo((props: OutlayRowProps) => {
  const {
    row = {
      rowName: '',
      salary: 0,
      equipmentCosts: 0,
      estimatedProfit: 0,
      overheads: 0,
      supportCosts: 0,
      child: [],
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      machineOperatorSalary: 0,
    },
    depth = 0,
    id = 'editableOutlayRow',
  } = props;
  const dispatch = useAppDispatch();
  // Inherited from Outlay Row
  const cellRef = useRef<HTMLTableCellElement>(null);
  const rowHeight = cellRef.current?.clientHeight || OUTLAY_ROW_HEIGHT;
  const totalChilds = getTotalChildAmount(row);
  const childClass = depth ? cls.childCell : '';
  const onAddChild = useCallback(() => {
    dispatch(
      outlayApi.util.updateQueryData('FetchList', undefined, (draft) => {
        recursiveSearch(draft, addChildById, 'child', row);
      }),
    );
  }, [dispatch, row]);
  // Extended from Outlay Row
  const [data, setData] = useState(row);
  const [addRow, { isLoading: isAdding }] = useAddRow();
  const [updateRow, { isLoading: isUpdating }] = useUpdateRow();
  const isLoading = isAdding || isUpdating;
  const [error, setError] = useState(false);

  const onValueChange = useCallback(
    (value: Partial<Outlay>) => {
      setData({ ...data, ...value });
    },
    [data],
  );

  const onAddRow = useCallback(async () => {
    if (data) {
      try {
        await addRow(data).unwrap();
      } catch (e) {
        setError(true);
      }
    }
  }, [addRow, data]);

  const onUpdateRow = useCallback(async () => {
    if (data) {
      try {
        await updateRow(data).unwrap();
      } catch (e) {
        setError(true);
      }
    }
  }, [data, updateRow]);

  const onEnterPressed = async (e: React.KeyboardEvent) => {
    setError(false);
    if (e.key === 'Enter') {
      if (!data?.id) onAddRow();
      else onUpdateRow();
    }
  };

  const onRemoveNotCreated = useCallback(() => {
    dispatch(
      outlayApi.util.updateQueryData('FetchList', undefined, (draft) => {
        recursiveSearch(draft, removeById, 'child', row);
      }),
    );
  }, [dispatch, row]);

  const onDelete = useCallback(() => {
    onRemoveNotCreated();
  }, [onRemoveNotCreated]);

  const onUndo = useCallback(() => {
    dispatch(
      outlayApi.util.updateQueryData('FetchList', undefined, (draft) => {
        recursiveSearch(draft, undoById, 'child', row);
      }),
    );
  }, [dispatch, row]);

  if (!data) return null;
  return (
    <>
      <TableRow id={id}>
        <TableCell
          className={EditableCls.editableCell}
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
              {/* Add new row btn available only for existing rows */}
              {row.id ? (
                <>
                  <IconButton
                    className={cls.iconBtn}
                    color="info"
                    onClick={onAddChild}
                  >
                    <ArticleIcon />
                  </IconButton>
                  <IconButton
                    className={cls.iconBtn}
                    color="error"
                    onClick={onUndo}
                  >
                    <ClearIcon />
                  </IconButton>
                </>
              ) : (
                row.parentId && (
                  <IconButton
                    onClick={onDelete}
                    className={[cls.iconBtn].join(' ')}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                )
              )}
            </Stack>
          </Stack>
        </TableCell>
        <TableCell className={EditableCls.editableCell}>
          <TextField
            id="rowNameInput"
            fullWidth
            onChange={(e) => onValueChange({ rowName: e.target.value })}
            value={data.rowName}
            disabled={isLoading}
            placeholder="Наименование"
            onKeyDown={onEnterPressed}
            size="small"
            error={error}
          />
        </TableCell>
        <TableCell className={EditableCls.editableCell}>
          <TextField
            type="number"
            fullWidth
            onChange={(e) => onValueChange({ salary: Number(e.target.value) })}
            value={data.salary}
            disabled={isLoading}
            placeholder="Основная з/п"
            onKeyDown={onEnterPressed}
            size="small"
          />
        </TableCell>
        <TableCell className={EditableCls.editableCell}>
          <TextField
            type="number"
            fullWidth
            onChange={(e) => onValueChange({ equipmentCosts: Number(e.target.value) })}
            value={data.equipmentCosts}
            disabled={isLoading}
            placeholder="Оборудование"
            onKeyDown={onEnterPressed}
            size="small"
          />
        </TableCell>
        <TableCell className={EditableCls.editableCell}>
          <TextField
            type="number"
            fullWidth
            onChange={(e) => onValueChange({ overheads: Number(e.target.value) })}
            value={data.overheads}
            disabled={isLoading}
            placeholder="Накладные расходы"
            onKeyDown={onEnterPressed}
            size="small"
          />
        </TableCell>
        <TableCell className={EditableCls.editableCell}>
          <TextField
            type="number"
            fullWidth
            onChange={(e) => onValueChange({ estimatedProfit: Number(e.target.value) })}
            value={data.estimatedProfit}
            disabled={isLoading}
            placeholder="Сметная прибыль"
            onKeyDown={onEnterPressed}
            size="small"
          />
        </TableCell>
      </TableRow>
      {row?.child?.map((child) => (
        <OutlayRowComposition key={child.id} row={child} depth={depth + 1} />
      ))}
    </>
  );
});
