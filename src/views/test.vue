<template>
    <div class="page">
        <mTable autoData dataUrl="http://localhost:3000/table" :tableColumns="tableColumns"></mTable>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useTable } from '@/components/mTable';
const tableColumns = ref([
    { prop: 'id', label: 'ID', width: 100, align: 'center' },
    { prop: 'name', label: 'Name', minWidth: 150, align: 'left' },
]);
const [mTable, mTableMethod] = useTable();
</script>

<style lang="scss" scoped>
.page {
    height: 100vh;
    width: 100vw;
    overflow: scroll;
    background-color: #f5f5f5;
    padding: 20px;
    box-sizing: border-box;
}
</style>