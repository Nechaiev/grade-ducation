<script setup>
import { ref, computed, onMounted, defineProps } from 'vue';
import Modal from "../plugins/modals/Modal.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  title: { type: String, default: "reviewsTitle" },
  apiUrl: { type: String, required: true }
});

const rating = ref(null);
const reviews = ref(null);
const isModalOpen = ref(false);
const message = ref("");
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    const response = await fetch(props.apiUrl);
    if (!response.ok) {
      error.value = "Дані не знайдено (404)";
      return;
    }

    const data = await response.json();
    rating.value = Math.min(5.0, Math.max(1.0, parseFloat(data.rating.toFixed(1))));
    reviews.value = data.reviews;
  } catch (err) {
    console.error("Помилка отримання даних:", err.message);
    error.value = "Не вдалося завантажити дані";
  } finally {
    loading.value = false;
  }
};

const redirectToGoogle = () => {
  window.open("https://www.google.com/maps/place/Grade+Education+Centre/@50.4508248,30.509576,17z/data=!3m1!4b1!4m6!3m5!1s0x40d4ce5eb49ca6cb:0x695a1601338efd48!8m2!3d50.4508248!4d30.509576!16s%2Fg%2F1vtqtm8f?entry=ttu&g_ep=EgoyMDI1MDEyNi4wIKXMDSoASAFQAw%3D%3D", "_blank");
};

const stars = computed(() => {
  const fullStars = Math.floor(rating.value);
  const halfStar = rating.value % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return { full: fullStars, half: halfStar, empty: emptyStars };
});

onMounted(fetchData);
</script>

<template>
  <div
    id="review-widget"
    class="w-full max-w-3xl mx-auto p-6 border rounded-lg shadow-lg bg-white flex flex-col sm:flex-row items-center justify-between"
  >
    <div class="flex items-center space-x-3 text-center sm:text-left">
      <img
        src="https://grade.ua/app/themes/sage/dist/images/icons/google-reviews-banner/google-logo.svg"
        alt="Google"
        class="w-8 h-8"
      />
      <span class="text-lg font-medium">{{ t(title) }}</span>
    </div>

    <div v-if="loading" class="text-gray-500">{{ t("loading") }}</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="flex items-center space-x-2 mt-3 sm:mt-0">
      <span class="text-xl font-bold">{{ rating }}</span>

      <div class="flex">
        <span v-for="n in stars.full" :key="'full' + n" class="text-yellow-400 text-lg">★</span>
        <span v-if="stars.half" class="text-yellow-400 text-lg">☆</span>
        <span v-for="n in stars.empty" :key="'empty' + n" class="text-gray-300 text-lg">★</span>
      </div>

      <span class="text-gray-500 text-sm sm:text-base">{{ reviews }} {{ t("reviews") }}</span>
    </div>

    <div class="mt-4 sm:mt-0 flex space-x-2">
      <button
        @click="redirectToGoogle"
        class="bg-gray-200 px-4 py-2 rounded-md text-sm sm:text-base hover:bg-gray-300 transition"
      >
        {{ t("view") }}
      </button>
      <button
        @click="isModalOpen = true"
        class="bg-teal-500 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-teal-600 transition"
      >
        {{ t("writeReview") }}
      </button>
    </div>
  </div>

  <Modal v-model="isModalOpen" :title="t('leaveReview')">
    <textarea
      v-model="message"
      class="w-full p-2 border rounded-md resize-none"
      rows="4"
      :placeholder="t('writeYourMessage')"
    ></textarea>
    <div class="flex justify-end space-x-2 mt-4">
      <button
        @click="isModalOpen = false"
        class="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
      >
        {{ t("cancel") }}
      </button>
      <button
        @click="isModalOpen = false"
        class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
      >
        {{ t("send") }}
      </button>
    </div>
  </Modal>
</template>
