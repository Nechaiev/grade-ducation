<template>
  <div v-if="modelValue" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold">{{ title }}</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,  // Заголовок модального вікна
  modelValue: Boolean,  // Стан відкриття/закриття (v-model)
});
const emit = defineEmits(["update:modelValue"]); // Подія для закриття

// Функція закриття вікна
const closeModal = () => {
  emit("update:modelValue", false);
};
</script>

<style scoped>

</style>