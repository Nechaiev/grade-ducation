<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { locale } = useI18n();

const switchLanguage = (lang) => {
  locale.value = lang;
};
</script>

<template>
  <div>
    <nav class="p-4 bg-white shadow-md flex justify-between items-center">
      <div class="space-x-4">
        <router-link to="/" class="text-blue-500 hover:underline">{{ t("home") }}</router-link>
        <router-link to="/reviews" class="text-blue-500 hover:underline">{{ t("feedback") }}</router-link>
      </div>

      <div>
        <button @click="switchLanguage('uk')" class="px-3 py-1 border rounded-md mx-1">🇺🇦 UA</button>
        <button @click="switchLanguage('en')" class="px-3 py-1 border rounded-md mx-1">🇬🇧 EN</button>
      </div>
    </nav>
    <router-view />
  </div>
</template>