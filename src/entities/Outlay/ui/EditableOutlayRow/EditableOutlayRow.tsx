import { TableRow, TableCell, TextField } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';
import { useAddRow, useUpdateRow } from '../../model/services/OutlayService';
import { Outlay } from '../../model/types/OutlaySchema';
import cls from './EditableOutlayRow.module.scss';
import { OutlayRowProps } from '../OutlayRow/OutlayRow';
import { OutlayRowComposition } from '../OutlayRowComposition/OutlayRowComposition';

export const EditableOutlayRow = memo((props: OutlayRowProps) => {
  const { row, depth = 0, onTurnEditable } = props;
  const [data, setData] = useState(row || {
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
  });
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
  if (!data) return null;
  return (
    <>
      <TableRow>
        <TableCell
          className={cls.editableCell}
          style={{ paddingLeft: `${depth * 20}px` }}
        />
        <TableCell className={cls.editableCell}>
          <TextField
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
        <TableCell className={cls.editableCell}>
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
        <TableCell className={cls.editableCell}>
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
        <TableCell className={cls.editableCell}>
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
        <TableCell className={cls.editableCell}>
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
