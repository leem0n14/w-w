// src/hooks/useTable.ts
import mTable from "../index.vue";
import { ref, type FunctionalComponent, nextTick, h } from "vue";
import type { IMTableProps } from "../types/mTable";

export default function useTable() {
  type TableInstance = InstanceType<typeof mTable>;
  const tableRef = ref<TableInstance | null>(null);

  const getTableInstance = async () => {
    await nextTick();
    if (!tableRef.value) {
      throw new Error("表格实例未初始化");
    }
    return tableRef.value;
  };

  const tableMethods = new Proxy(
    {},
    {
      get(_, method: keyof TableInstance) {
        return async (...args: any[]) => {
          const instance = await getTableInstance();
          return instance[method]?.(...args);
        };
      },
    }
  );

  const TableComponent: FunctionalComponent<IMTableProps> = (
    props,
    { attrs, slots }
  ) => {
    return h(mTable, { ...props, ...attrs, ref: tableRef }, slots);
  };

  return [TableComponent, tableMethods] as const;
}
