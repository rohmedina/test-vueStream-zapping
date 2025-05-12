<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="movie-info-view">
    <div class="left-panel">
      <img class="poster" src="../assets/image.png" alt="Video still or poster" />
    </div>

    <div class="right-panel">
      <h1 class="title">Independence Day</h1>
      <p class="meta">1996 • B • 2h 25min</p>

      <div class="tags">
        <span class="tag">{{ t('generos.ciencia_ficcion') }}</span>
        <span class="tag">{{ t('generos.accion') }}</span>
      </div>

      <p class="description">
        {{ t('descripcion_pelicula') }}
      </p>

      <img src="../assets/brand-logo.svg" alt="logo zapping" />
    </div>
  </div>
</template>

<style scoped>
.movie-info-view {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  color: white;
  min-height: 100vh;
  background-color: #1e1e1e;
}

.left-panel,
.right-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-panel {
  border-radius: 1rem;
  overflow: hidden;
}

.poster {
  max-width: 100%;
  border-radius: 1rem;
  object-fit: cover;
}

.right-panel {
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 2rem;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.8), transparent);
  border-radius: 1rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.meta {
  margin: 0.5rem 0;
  opacity: 0.7;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tag {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.2rem 0.7rem;
  font-size: 0.8rem;
}

.description {
  max-width: 400px;
  line-height: 1.5;
}

.brand {
  margin-top: 2rem;
  font-weight: bold;
  opacity: 0.3;
}

/* Mobile */
@media (max-width: 768px) {
  .movie-info-view {
    flex-direction: column;
    padding: 1rem;
  }

  .right-panel {
    padding: 1.5rem 1rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    align-items: center;
    text-align: center;
  }

  .description {
    max-width: 100%;
  }
}
</style>
