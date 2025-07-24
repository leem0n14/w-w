<template>
    <div>
        <div class="m-table-header">{{ $attrs.title }}</div>
        <div class="m-table-body">
            <el-table>

            </el-table>
        </div>
        <div class="m-table-footer"></div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, defineExpose, withDefaults } from 'vue'
import type { IMTable } from './types/mTable.d.ts'


const props = withDefaults(defineProps<IMTable.IProps>(), {
    columnsConfig: () => [],
    title: '',
})
const emits = defineEmits<IMTable.IEmits>()

const fetchData = () => {
    console.log('fetch')
}

defineExpose(<IMTable.IExpose>{
    fetchData
})
</script>