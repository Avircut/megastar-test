export interface Outlay {
  parentId?: number;
  id?:number;
  rowName?: string;
  salary?: number;
  equipmentCosts?: number;
  overheads?: number;
  estimatedProfit?: number;
  machineOperatorSalary?:number;
  mainCosts?: number;
  materials?: number;
  mimExploitation?: number;
  supportCosts?: number;
  child?: Outlay[];
  isEditing?: boolean;
}
