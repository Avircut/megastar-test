import { memo } from 'react';
import { OutlayRow, OutlayRowProps } from '../OutlayRow/OutlayRow';
import { EditableOutlayRow } from '../EditableOutlayRow/EditableOutlayRow';

export const OutlayRowComposition = memo((props:OutlayRowProps) => {
  const { row, depth, id } = props;
  if (row?.isEditing) return <EditableOutlayRow row={row} depth={depth} id={id} />;
  return <OutlayRow row={row} depth={depth} id={id} />;
});
