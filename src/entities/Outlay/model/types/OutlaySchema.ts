export interface Outlay {
  parentId?: number;
  id?:string;
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
  child: Outlay[];
}
