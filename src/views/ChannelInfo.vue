<template>
  <div class="info">
    <h1>{{ t('info_titulo') }}</h1>
    <p>ID del canal: {{ route.params.id }}</p>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
</script>

<style scoped lang="scss">
.info {
  padding: 2rem;
}
</style>
