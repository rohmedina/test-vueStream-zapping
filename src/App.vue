<template>
  <router-view></router-view>
</template>

<script setup>
import { useLanguage } from '@/composables/useLanguage'

// Inicializar el composable sin capturar el valor no utilizado
useLanguage()
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
