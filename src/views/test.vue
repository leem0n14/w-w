<template>
    <div class="page">
        <mTable title="My Table" :columnsConfig="tableColumns" :data-url="'http://localhost:3000/table'"></mTable>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useTable, type IMTable } from '@/components/mTable';
const tableColumns = ref<IMTable.Columns[]>([
    { name: 'id', index: 'id', width: 100 },
    { name: '姓名', index: 'name' },
]);
const [mTable, mMethods] = useTable();
onMounted(() => {
    mMethods.fetchData()
})
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
