import mTable from "../index.vue";
import {
  ref,
  h,
  type FunctionalComponent,
  type Ref,
  unref,
  nextTick,
} from "vue";
import { isEmpty } from "lodash-es";
import type { IMTable } from "../types/mTable.d.ts";

export function useTable() {
  type TableProps = IMTable.IProps;
  type HTableInstance = InstanceType<typeof mTable>;
  const mTableRef = ref<HTableInstance>({} as HTableInstance);

  async function getTableInstance() {
    await nextTick();
    const table = unref(mTableRef);
    if (isEmpty(table)) {
      console.error("未获取表格实例!");
    }
    return table;
  }

  const mTableMethods = new Proxy<Ref<HTableInstance>>(mTableRef, {
    get(target, key: string) {
      if (Reflect.has(target, key)) {
        return unref(target);
      }
      if (target.value && Reflect.has(target.value, key)) {
        return Reflect.get(target.value, key);
      }
      return async (...rest: any) => {
        const table: any = await getTableInstance();
        return table?.[key]?.(...rest);
      };
    },
  });

  // 显式指定泛型参数，确保类型信息完整
  const mTableRender: FunctionalComponent<TableProps> = (
    props,
    { attrs, slots }
  ) => {
    return h(
      mTable,
      {
        ref: mTableRef,
        ...props,
        ...attrs,
      },
      slots
    );
  };

  mTableRender.displayName = "MTableRenderer";

  // 使用as const确保元组类型不被拓宽
  // 只有加上as const，使用组件时的类型推断才会正确
  return [mTableRender, unref(mTableMethods)] as const;
}
