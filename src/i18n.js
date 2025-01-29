import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    feedback: "Feedback",
    home: "Home",
    welcome: "Welcome!",
    choosePage: "Choose a page:",
    reviewsTitle: "Customer reviews on Google",
    reviews: "reviews",
    loading: "Loading...",
    writeReview: "Write a review",
    view: "View",
    leaveReview: "Leave a review",
    writeYourMessage: "Write your message...",
    cancel: "Cancel",
    send: "Send"
  },
  uk: {
    feedback: "Відгуки",
    home: "Головна",
    welcome: "Ласкаво просимо!",
    choosePage: "Оберіть сторінку:",
    reviewsTitle: "Відгуки наших клієнтів у Google",
    reviews: "відгуки",
    loading: "Завантаження...",
    writeReview: "Написати відгук",
    view: "Переглянути",
    leaveReview: "Залиште повідомлення",
    writeYourMessage: "Напишіть ваше повідомлення...",
    cancel: "Скасувати",
    send: "Надіслати"
  }
};

const i18n = createI18n({
  locale: 'uk',
  messages
});

export default i18n;