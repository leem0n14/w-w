// 必须导入 VNode 类型（否则 VNode 会被视为未定义）
import type { VNode } from "vue";

export declare namespace IMTable {
  // 定义表格列的类型
  interface Columns {
    name: string;
    index: string | number | symbol;
    width?: string | number;
    hideSearch?: boolean;
    fixed?: "left" | "right";
    searchProps?:
      | {
          component: "Input";
        }
      | {
          component: "Select";
          props: {
            options: {
              label: string | number;
              value: string | number;
            }[];
          };
        };
    // 修正：依赖 VNode 类型，已在顶部导入
    customRender?: ({ row }: { row: any }) => VNode;
    actions?: ({ row }: { row: any }) => {
      text: string;
      onClick?: () => void;
      popConfirm?: { title: string; onConfirm: () => void };
    }[];
  }

  // 数据请求方法类型
  type RequestMethod = () => Promise<any>;

  // 组件 Props 类型
  interface IProps {
    // 修正：列配置应为 Columns[] 类型（而非 any[]，保留类型约束）
    columnsConfig: Columns[];
    // 修正：title 应为可选（组件中设置了默认值）
    title?: string;
    tableData?: any[];
    autoFetch?: boolean;
    // 修正：接口中不能给属性设置默认值（默认值应在 withDefaults 中定义）
    methodConfig?: RequestInit;
    dataUrl?: string; // 通常数据接口地址也应为可选
    fetchMethod?: RequestMethod;
  }

  interface IExpose {
    outerTableData: ComputedRef<any[]>;
    fetchData: () => Promise<void>;
  }

  // 组件 emits 类型
  interface IEmits {}
}
