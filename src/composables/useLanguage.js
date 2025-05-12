import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

export function useLanguage() {
  const { locale } = useI18n()
  const currentLanguage = ref(localStorage.getItem('preferredLanguage') || 'es')

  onMounted(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage')
    if (savedLanguage) {
      locale.value = savedLanguage
      currentLanguage.value = savedLanguage
    }
  })

  watch(currentLanguage, (newLang) => {
    locale.value = newLang
    localStorage.setItem('preferredLanguage', newLang)
  })

  const changeLanguage = (lang) => {
    currentLanguage.value = lang
  }

  const getCurrentFlag = () => {
    return currentLanguage.value === 'es' ? '🇪🇸' : '🇧🇷'
  }

  return {
    currentLanguage,
    changeLanguage,
    getCurrentFlag,
  }
}
