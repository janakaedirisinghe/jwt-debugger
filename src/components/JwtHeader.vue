<template>
    <div class="card">
      <h3 class="text-lg font-bold mb-2 method-post">Header</h3>
      <div class="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-600">
        <pre class="whitespace-pre-wrap">{{ prettyHeader }}</pre>
      </div>
      <div class="mt-4 text-xs text-gray-600 dark:text-gray-400">
        <p><span class="font-semibold">Algorithm:</span> {{ header.alg }}</p>
        <p><span class="font-semibold">Type:</span> {{ header.typ }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    header: {
      type: Object,
      required: true
    }
  });
  
  const prettyHeader = computed(() => {
    return JSON.stringify(props.header, null, 2);
  });
  </script>