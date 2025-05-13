<script setup>
import VolumeControl from '@/components/player/VolumeControl.vue'
import KeyboardShortcuts from '@/components/player/KeyboardShortcuts.vue'
import detail from '@/assets/detail.svg'
import play from '@/assets/play.svg'

const emit = defineEmits([
  'togglePlay',
  'toggleMute',
  'volumeChange',
  'channel-up',
  'channel-down',
  'toggle-channels',
  'show-info',
  'toggle-fullscreen',
])

defineProps({
  currentChannel: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="video-controls">
    <div class="main-buttons">
      <button @click="$emit('togglePlay')" class="circle-btn">
        <img :src="play" alt="play" />
      </button>

      <VolumeControl @volume-change="(volume) => $emit('volumeChange', volume)" />
    </div>

    <KeyboardShortcuts
      :current-channel="currentChannel"
      @channel-up="(channel) => emit('channel-up', channel)"
      @channel-down="(channel) => emit('channel-down', channel)"
      @toggle-channels="(channel) => emit('toggle-channels', channel)"
      @toggle-mute="() => emit('toggleMute')"
      @toggle-fullscreen="() => emit('toggle-fullscreen')"
    />

    <button class="menu-button" @click="$emit('show-info', currentChannel?.id)">
      <img :src="detail" alt="resumen" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.video-controls {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #000;
  color: white;
  padding: 1rem 1rem 3rem 1rem;

  .main-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .menu-button {
    position: absolute;
    right: 2rem;
    background-color: #222;
    border-radius: 50%;
    padding: 1rem;
    border: none;
    color: white;
    cursor: pointer;
  }
}
</style>
