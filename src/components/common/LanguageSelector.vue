<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import arrowDown from '@/assets/arrowDown.svg'
import arrowUp from '@/assets/arrowUp.svg'

const { currentLanguage, changeLanguage, getCurrentFlag } = useLanguage()
const dropdownOpen = ref(false)
const languageSelector = ref(null)

const closeDropdown = (event) => {
  if (languageSelector.value && !languageSelector.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleLanguageChange = (lang) => {
  changeLanguage(lang)
  dropdownOpen.value = false
}
</script>

<template>
  <div 
    class="language-selector" 
    ref="languageSelector"
    role="navigation"
    aria-label="Selector de idioma"
  >
    <button 
      class="lang-btn"
      @click="toggleDropdown"
      aria-expanded="dropdownOpen"
      aria-haspopup="listbox"
      aria-controls="language-list"
    >
      <span aria-hidden="true">{{ getCurrentFlag() }}</span>
      <span>{{ currentLanguage.toUpperCase() }}</span>
      <img 
        :src="dropdownOpen ? arrowUp : arrowDown" 
        :alt="dropdownOpen ? 'Cerrar menú' : 'Abrir menú'"
        aria-hidden="true"
      />
    </button>

    <ul 
      v-if="dropdownOpen" 
      class="lang-dropdown"
      role="listbox"
      id="language-list"
      aria-label="Idiomas disponibles"
      tabindex="-1"
    >
      <li 
        role="option"
        @click="handleLanguageChange('es')"
        :aria-selected="currentLanguage === 'es'"
        tabindex="0"
        @keyup.enter="handleLanguageChange('es')"
      >
        <span aria-hidden="true">🇪🇸</span> Español
      </li>
      <li 
        role="option"
        @click="handleLanguageChange('pt')"
        :aria-selected="currentLanguage === 'pt'"
        tabindex="0"
        @keyup.enter="handleLanguageChange('pt')"
      >
        <span aria-hidden="true">🇧🇷</span> Português
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.language-selector {
  position: relative;

  .lang-btn {
    background: #444;
    color: white;
    width: 80px;
    height: 32px;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border: none;
    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 2px;
    }
  }

  &:has(.lang-dropdown) .lang-btn {
    background: #fff;
    color: #000;
  }

  .lang-dropdown {
    position: absolute;
    top: 120%;
    right: 0;
    background: #333;
    border: 1px solid #333;
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 12px;
    width: 105px;
    height: 86px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    li {
      font-size: 12px;
      width: 100%;
      text-align: center;
      padding: 0.5rem;
      cursor: pointer;
      box-sizing: border-box;
      &:hover {
        background: #444;
      }
      &:focus-visible {
        outline: 2px solid white;
        outline-offset: -2px;
        background: #444;
      }
    }
  }
}
</style>
