import { memo } from 'react';
import { OutlayRow, OutlayRowProps } from '../OutlayRow/OutlayRow';
import { EditableOutlayRow } from '../EditableOutlayRow/EditableOutlayRow';

export const OutlayRowComposition = memo((props:OutlayRowProps) => {
  const { row, depth, onTurnEditable } = props;
  if (row?.isEditing) return <EditableOutlayRow row={row} depth={depth} onTurnEditable={onTurnEditable} />;
  return <OutlayRow row={row} depth={depth} onTurnEditable={onTurnEditable} />;
});
