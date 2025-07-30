import type { IMTable } from "../types/mTable";
import { onMounted, reactive, ref, watch, computed } from "vue";

export const useTableData = (
  column: IMTable.Columns[],
  dataUrl: IMTable.IProps["dataUrl"] = "",
  fetchConfig: IMTable.IProps["methodConfig"],
  fetchMethod: IMTable.RequestMethod | undefined
) => {
  const isLoadingData = ref(false);
  const innerTableData = ref<[]>();
  const outerTableData = computed(() => {
    return innerTableData.value || [];
  });
  const innerFetchMethod = async () => {
    return new Promise(async (resolve) => {
      try {
        const data = await fetch(dataUrl, fetchConfig);
        resolve(await data.json());
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    });
  };
  const fetchData = async () => {
    isLoadingData.value = true;
    try {
      // 如果fetchMethod存在，则调用它获取数据
      let data = null;
      if (fetchMethod) {
        data = await fetchMethod();
      } else {
        data = await innerFetchMethod();
      }
      innerTableData.value = data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isLoadingData.value = false;
    }
  };

  return {
    fetchData,
    isLoadingData,
    outerTableData,
  };
};
