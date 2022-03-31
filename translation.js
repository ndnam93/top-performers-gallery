import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const {locale, translation: messages} = window.stfx;
export default new VueI18n({
  locale,
  messages,
});
