<script setup>
import { ref } from 'vue'
import speakerHigh from '@/assets/speakerHigh.svg'

const volume = ref(0.5)
const isMuted = ref(false)
const isChangingVolume = ref(false)

const emit = defineEmits(['volume-change'])

const handleVolumeChange = () => {
  if (volume.value > 0) {
    isMuted.value = false
  }
  emit('volume-change', volume.value)
}

const startVolumeChange = () => {
  isChangingVolume.value = true
}

const endVolumeChange = () => {
  isChangingVolume.value = false
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
  if (isMuted.value) {
    volume.value = 0
  } else {
    volume.value = 0.5
  }
  emit('volume-change', volume.value)
}
</script>

<template>
  <div class="volume-control">
    <button @click="toggleMute" class="circle-btn" aria-label="Silenciar o activar sonido">
      <img :src="speakerHigh" alt="" aria-hidden="true" />
    </button>

    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      v-model="volume"
      class="volume-bar"
      @input="handleVolumeChange"
      :style="{ '--value': volume }"
      @mousedown="startVolumeChange"
      @mouseup="endVolumeChange"
      @mouseleave="endVolumeChange"
      aria-label="Control de volumen"
      :aria-valuenow="volume"
      :aria-valuemin="0"
      :aria-valuemax="1"
    />
  </div>
</template>

<style scoped lang="scss">
.volume-control {
  display: flex;
  align-items: center;
  gap: 1rem;

  .volume-bar {
    width: 150px;
    height: 6px;
    border-radius: 4px;
    background-color: #444;
    appearance: none;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: white;
      cursor: pointer;
    }

    &:active::-webkit-slider-thumb {
      background-color: red;
    }

    &:focus {
      outline: none;
    }

    &::-webkit-slider-runnable-track {
      background: linear-gradient(
        to right,
        white 0%,
        white calc(100% * var(--value)),
        #444 calc(100% * var(--value))
      );
      height: 6px;
      border-radius: 4px;
    }

    &:active::-webkit-slider-runnable-track {
      background: linear-gradient(
        to right,
        red 0%,
        red calc(100% * var(--value)),
        #444 calc(100% * var(--value))
      );
    }
  }
}
</style>
