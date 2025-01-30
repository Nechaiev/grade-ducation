<script setup>
import { ref, computed, onMounted } from 'vue';
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
    class="w-full max-w-[1458px] mx-auto p-8 rounded-md bg-white
         xl:max-w-[1286px] md:max-w-[912px] md:flex-row md:h-[142px]
         flex flex-col items-center justify-between sm:max-w-none max-[640px]:max-w-[328px]"
  >
    <div class=" grid lg:flex lg:mb-0 mb-4 w-full">
      <div class="flex items-center space-x-5 text-center sm:text-left w-full">
        <img
          src="https://grade.ua/app/themes/sage/dist/images/icons/google-reviews-banner/google-logo.svg"
          alt="Google"
          class="w-10 h-10"
        />
        <span class="font-formular font-medium text-left text-[18px] md:text-[20px]">
          {{ t(title) }}
        </span>
      </div>

      <div v-if="loading" class="text-gray-500 w-full text-center sm:text-left">{{ t("loading") }}</div>
      <div v-else-if="error" class="text-red-500 w-full text-center sm:text-left">{{ error }}</div>
      <div
        v-else
        class="flex items-center space-x-2 mt-3 sm:mt-0 lg:ms-16 w-full justify-center sm:justify-start max-[640px]:flex-col max-[640px]:items-start"
      >

        <div class="flex items-center lg:space-x-2 mb-2 lg:mb-0">
          <span class="font-greenwich font-medium text-[24px] md:text-[36px] leading-none me-5 lg:me-2 md:mt-[10px]">
            {{ rating }}
          </span>
          <div class="flex space-x-[6px] md:mt-[10px]">
            <span v-for="n in stars.full" :key="'full' + n" class="text-yellow-400 text-[24px] leading-none">★</span>
            <span v-if="stars.half" class="text-yellow-400 text-[24px] leading-none">☆</span>
            <span v-for="n in stars.empty" :key="'empty' + n" class="text-gray-300 text-[24px] leading-none">★</span>
          </div>
        </div>

        <span class="font-formular font-normal text-[14px] text-[#798595] ms-4 md:mt-[10px] max-[640px]:mt-1 max-[640px]:w-full max-[640px]:text-left max-[640px]:m-auto">
          {{ reviews }} {{ t("reviews") }}
        </span>
      </div>
    </div>

    <div class=" flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-5 md:space-x-3 md:ms-auto w-full sm:w-auto">
      <button
        @click="redirectToGoogle"
        class="bg-[linear-gradient(to_right,#E6F7F5,#F8FCFC)] px-5 py-3 rounded-md text-sm transition border-1 border-[#AACEDB] w-full sm:w-auto"
      >
        {{ t("view") }}
      </button>
      <button
        @click="isModalOpen = true"
        class="bg-[linear-gradient(to_right,#3CB9A0,#1786AC)] text-white px-5 py-3 rounded-md text-sm hover:bg-teal-600 transition w-full sm:w-auto"
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
