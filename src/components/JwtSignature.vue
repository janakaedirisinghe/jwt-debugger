<template>
    <div class="card">
      <h3 class="text-lg font-bold mb-2 method-put">Signature</h3>
      <div class="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-600 mb-4 break-all">
        {{ signature }}
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Secret Key</label>
        <input 
          type="text" 
          :value="secretKey"
          @input="$emit('update:secretKey', $event.target.value)"
          class="input font-mono text-sm"
          placeholder="Enter your secret key..."
        />
      </div>
      
      <div v-if="isVerified !== null" class="flex items-center p-2 rounded" :class="statusClass">
        <div v-if="isVerified" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Signature verified</span>
        </div>
        <div v-else class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Invalid signature</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    signature: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: null
    },
    secretKey: {
      type: String,
      default: ''
    }
  });
  
  defineEmits(['update:secretKey']);
  
  const statusClass = computed(() => {
    if (props.isVerified === null) return '';
    return props.isVerified 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  });
  </script>