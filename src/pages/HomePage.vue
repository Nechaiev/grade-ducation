<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-50">
    <h1 class="text-3xl font-bold mb-4">{{ t("welcome") }}</h1>
    <p class="text-lg text-gray-600 mb-6">{{ t("choosePage") }}</p>
    <div class="flex space-x-4">
      <router-link to="/reviews" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
        {{ t("reviews") }}
      </router-link>
    </div>
  </div>
</template>
