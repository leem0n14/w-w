<template>
    <div class="m_table">
        <div class="m_table_header"></div>
        <div class="m_table_body">
            <el-table :data="tableData">
                <el-table-column v-for="column in tableColumns" :key="column.prop" :prop="column.prop"
                    :label="column.label"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import type { ElTable, ElTableColumn } from 'element-plus';
import type { IMTableProps, TableRow } from './types/mTable';


const props = defineProps({
    autoData: {
        type: Boolean,
        default: false
    },
    dataUrl: {
        type: String,
        default: ''
    },
    tableColumns: {
        type: Array as () => IMTableProps['tableColumns'],
        default: () => []
    }
});
const tableData = ref<TableRow[]>([]);
const fetchData = async () => {
    if (props.autoData && props.dataUrl) {
        // 自动获取数据
        const response = await fetch(props.dataUrl);
        const data = await response.json();
        console.log(data);

        tableData.value = data;
    }
};

onMounted(() => {
    fetchData();
});

defineExpose({
    tableData,
    fetchData
});

</script>