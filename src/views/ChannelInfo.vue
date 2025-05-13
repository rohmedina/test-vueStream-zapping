<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

const { t, locale } = useI18n()
const router = useRouter()

const handleExit = () => {
  router.back()
}

const handleKeyPress = (event) => {
  if (event.key === 'Escape') {
    handleExit()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div class="movie-info-view">
    <span class="exit-button" @click="handleExit"><kbd>[ESC]</kbd>{{ t('salir') }}</span>
    <div class="content-wrapper">
      <div class="left-panel">
        <div class="content-poster">
          <img class="poster" src="../assets/image.png" alt="Video still or poster" />
        </div>
      </div>

      <div class="right-panel">
        <h1 class="title">{{ t('titulo_pelicula') }}</h1>
        <div class="meta-content">
          <span class="meta" v-if="locale === 'es'"
            >{{ t('titulo_original') }}: Independence Day</span
          >
          <span class="meta">1996 • B • 2h 25min</span>
        </div>

        <div class="tags">
          <span class="tag">{{ t('generos.ciencia_ficcion') }}</span>
          <span class="tag">{{ t('generos.accion') }}</span>
        </div>

        <p class="description">
          {{ t('descripcion_pelicula') }}
        </p>

        <img class="brand-logo" src="../assets/brand-logo.svg" alt="logo zapping" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-info-view {
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.movie-info-view::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 910px;
  height: 512px;
  background-image: url('../assets/background-movie.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.6;
  z-index: 0;
}

.content-wrapper {
  display: flex;
  gap: 4rem;
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.left-panel {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 60%;
}

.right-panel {
  width: 358px;
  height: 358px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.content-poster {
  background-color: #000;
  border-radius: 1rem;
}
.poster {
  width: 100%;
  height: 437px;
}

.title {
  font-size: 31px;
  font-weight: bold;
  margin: 0;
}

.meta-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta {
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
}

.tags {
  display: flex;
  gap: 1rem;
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 12px;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  width: 328px;
}

.brand-logo {
  width: 108px;
  margin-top: 0.5rem;
  opacity: 0.2;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
  }

  .left-panel,
  .right-panel {
    flex: 1; /* En móvil, ambos paneles ocupan el 100% */
  }

  .title {
    font-size: 2rem;
  }

  .right-panel {
    text-align: center;
    align-items: center;
  }

  .tags {
    justify-content: center;
  }
}

.exit-button {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 12px;
  color: #444;
}

.exit-button kbd {
  background: #222;
  padding: 6px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 10px;
  color: white;
  border: 1px solid #444;
}
</style>
