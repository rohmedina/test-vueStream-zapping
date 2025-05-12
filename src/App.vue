<template>
  <router-view></router-view>
</template>

<script setup>
import { useLanguage } from '@/composables/useLanguage'

useLanguage()
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
