<template>
  <div>
    <div>
      <Sidebar/>
    </div>
    <div>
      welcome text
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()

console.log(route.query.id)
</script>