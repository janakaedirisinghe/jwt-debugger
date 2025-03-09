<template>
    <div class="card">
        <h3 class="text-lg font-bold mb-2 method-get">Payload</h3>
        <div
            class="font-mono text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-600">
            <pre class="whitespace-pre-wrap">{{ prettyPayload }}</pre>
        </div>
        <div class="mt-4 text-xs text-gray-600 dark:text-gray-400">
            <div v-for="(value, key) in payload" :key="key"
                class="py-1 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div class="font-semibold">{{ key }}:</div>
                <div class="mt-1 break-all">{{ formatClaimValue(key, value) }}</div>
            </div>

            <div v-if="hasExpiration" class="mt-2 flex items-center"
                :class="isExpired ? 'text-method-delete' : 'text-method-get'">
                <span class="inline-flex h-2 w-2 rounded-full mr-2"
                    :class="isExpired ? 'bg-method-delete' : 'bg-method-get'"></span>
                <span>{{ isExpired ? 'Token Expired' : 'Token Valid' }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    payload: {
        type: Object,
        required: true
    }
});

const prettyPayload = computed(() => {
    return JSON.stringify(props.payload, null, 2);
});

const hasExpiration = computed(() => {
    return 'exp' in props.payload;
});

const isExpired = computed(() => {
    if (!hasExpiration.value) return false;
    const expTimestamp = props.payload.exp * 1000; // Convert to milliseconds
    return Date.now() > expTimestamp;
});

function formatClaimValue(key, value) {
    // Format timestamps
    if (['iat', 'exp', 'nbf'].includes(key) && typeof value === 'number') {
        const date = new Date(value * 1000);
        return `${value} (${date.toLocaleString()})`;
    }

    if (typeof value === 'object') {
        return JSON.stringify(value);
    }

    return value;
}
</script>