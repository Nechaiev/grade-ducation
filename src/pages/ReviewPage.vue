<script setup>
import ReviewWidget from "../components/ReviewWidget.vue";
const API_URL = "https://679955c6be2191d708b2a655.mockapi.io/reviews/1";
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-50">
    <ReviewWidget :apiUrl="API_URL" />
  </div>
</template>

