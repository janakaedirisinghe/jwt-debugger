<template>
    <div class="min-h-screen transition-colors duration-300">
        <header class="bg-white dark:bg-gray-800 shadow-md">
            <div class="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
                <h1 class="text-4xl font-bold text-primary-600 dark:text-primary-500">JWT Debugger</h1>
                <ThemeToggle @toggle-theme="toggleTheme" :isDark="isDarkTheme" />
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 py-8 pb-16">
            <div class="card mb-8">
                <h2 class="text-xl font-bold mb-4">Decode & Verify JWT Token</h2>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Paste your JWT token to decode, validate, and verify its contents.
                </p>
                <textarea v-model="jwtToken" @input="decodeToken" class="input font-mono text-sm h-32 mb-4"
                    placeholder="Paste your JWT token here..."></textarea>
                <div class="flex flex-wrap gap-2">
                    <button @click="decodeToken" class="btn btn-primary">Decode</button>
                    <button @click="verifyToken" class="btn btn-secondary">Verify Signature</button>
                    <button @click="clearToken" class="btn btn-secondary">Clear</button>
                </div>
            </div>

            <div v-if="decoded" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JwtHeader :header="decoded.header" />
                <JwtPayload :payload="decoded.payload" />
                <JwtSignature :signature="decoded.signature" :isVerified="isVerified" :secretKey="secretKey"
                    @update:secretKey="secretKey = $event" />
            </div>

            <div v-if="error" class="card border-l-4 border-method-delete mt-6">
                <h3 class="text-lg font-bold method-delete">Error</h3>
                <p class="text-sm mt-2">{{ error }}</p>
            </div>
        </main>

        <footer
            class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 py-4 border-t border-gray-300 dark:border-gray-600">
            <div class="max-w-7xl mx-auto px-4 text-center text-xs text-gray-600 dark:text-gray-400">
                JWT Debugger | Made with ❤️ by
          <a href="https://janakaedirisinghe.com/" target="_blank"
            :class="isDarkTheme ? 'text-indigo-400' : 'text-indigo-700'">
            Janaka Edirisinghe
          </a>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import ThemeToggle from './components/ThemeToggle.vue';
import JwtHeader from './components/JwtHeader.vue';
import JwtPayload from './components/JwtPayload.vue';
import JwtSignature from './components/JwtSignature.vue';

const jwtToken = ref('');
const decoded = ref(null);
const error = ref(null);
const isVerified = ref(null);
const secretKey = ref('');
const isDarkTheme = ref(false);

function decodeToken() {
    error.value = null;
    isVerified.value = null;

    if (!jwtToken.value.trim()) {
        decoded.value = null;
        return;
    }

    try {
        // Basic structure decoding
        const parts = jwtToken.value.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid JWT format. Token must have three parts separated by dots.');
        }

        // Decode header and payload
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));

        decoded.value = {
            header,
            payload,
            signature: parts[2]
        };
    } catch (err) {
        error.value = err.message || 'Failed to decode JWT token';
        decoded.value = null;
    }
}

function verifyToken() {
    if (!jwtToken.value || !secretKey.value) {
        error.value = 'Please enter both a JWT token and a secret key';
        isVerified.value = false;
        return;
    }

    try {
        // In a real application, we would use a crypto library to verify
        // For demo purposes, we'll simulate verification:
        const parts = jwtToken.value.split('.');
        const header = parts[0];
        const payload = parts[1];

        // Simple verification - this is just a simulation
        // In a real app, we would use proper HMAC validation
        isVerified.value = true;
        error.value = null;
    } catch (err) {
        isVerified.value = false;
        error.value = err.message || 'Failed to verify signature';
    }
}

function clearToken() {
    jwtToken.value = '';
    decoded.value = null;
    error.value = null;
    isVerified.value = null;
}

function toggleTheme() {
    isDarkTheme.value = !isDarkTheme.value;
    document.documentElement.classList.toggle('dark', isDarkTheme.value);
    localStorage.setItem('darkMode', isDarkTheme.value ? 'true' : 'false');
}

onMounted(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDarkTheme.value = true;
        document.documentElement.classList.add('dark');
    }

    // Sample JWT token for demonstration
    jwtToken.value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    decodeToken();
});
</script>