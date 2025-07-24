import mTable from "../index.vue";
import { ref, h, type FunctionalComponent ,onMounted} from "vue";
import type { IMTable } from "../types/mTable.d.ts";
export function useTable() {
  // 直接使用 IMTable.IProps 作为 props 类型
  type TableProps = IMTable.IProps;

  // 通过proxyRef创建一个响应式的mTable实例

  // 定义一个函数式组件，用于渲染 MTable 组件
  const mTableRender: FunctionalComponent<TableProps> = (
    props,
    { attrs, slots }
  ) => {
    return h(
      mTable,
      {
        ...props,
        ...attrs,
      },
      slots
    );
  };

  mTableRender.displayName = "MTableRenderer";

  return [mTableRender];
}
