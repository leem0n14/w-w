import type { ElTable, ElTableColumn } from "element-plus";

export type TableColumn = InstanceType<typeof ElTableColumn>["$props"] & {
  // 可选：添加自定义列属性
  width?: string | number;
  minWidth?: string | number;
  align?: "left" | "center" | "right";
};

// 定义表格数据类型
// Record<KeyType, ValueType>
export interface TableRow {
  [key: string]: any;
}

export interface IMTableProps {
  dataUrl?: string;
  tableColumns?: TableColumn[];
  autoData?: boolean;
}
