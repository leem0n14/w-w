<template>
    <div class="test" >
        <button @click="num++">增加</button>
        test {{ num }}</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const num = ref(1)
</script>
<style scoped>
</style>·