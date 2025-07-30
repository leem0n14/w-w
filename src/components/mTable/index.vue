<template>
    <div>
        <div class="m-table-header">{{ $attrs.title }}</div>
        <div class="m-table-body">
            <el-table empty-text="暂无数据" border :data="outerTableData" class="h-custom-table w-full">
                <!-- 批量选择列 -->
                <!-- :size="tableSize" @sort-change="handleSortChange" @selection-change="handleSelectionChange" -->
                <!-- <el-table-column type="selection" width="55" v-if="showSelection" /> -->

                <!-- 动态生成表格列 -->
                <template v-for="item in columnsConfig" :key="item.index">
                    <el-table-column :fixed="item.fixed" :prop="item.index" :label="item.name" :width="item.width">


                    </el-table-column>
                </template>
            </el-table>
        </div>
        <div class="m-table-footer"></div>
    </div>
</template>

<script lang="ts" setup>
import type { IMTable } from './types/mTable.d.ts';
import { useTableData } from './hooks/useTableData.ts';
import { onMounted } from 'vue';

const props = withDefaults(defineProps<IMTable.IProps>(), {
    columnsConfig: () => [],
    title: '',
    autoFetch: true,
    fetchType: "GET",
    methodConfig: () => ({} as RequestInit),
    dataUrl: '',
})

const emits = defineEmits<IMTable.IEmits>()

// 修正参数顺序和类型
const { outerTableData, fetchData } = useTableData(
    props.columnsConfig,
    props.dataUrl,
    props.methodConfig,
    props.fetchMethod,
);

// 自动获取数据
if (props.autoFetch) {
    fetchData();
}

defineExpose<IMTable.IExpose>({
    outerTableData, fetchData
})

onMounted(() => {
    console.log(props.columnsConfig);
})
</script>