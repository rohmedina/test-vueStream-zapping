<script setup>
import { computed } from 'vue'
import LanguageSelector from '@/components/common/LanguageSelector.vue'
import { DEFAULT_CHANNEL } from '@/constants/defaults'

const props = defineProps({
  selectedChannel: {
    type: Object,
    default: () => DEFAULT_CHANNEL,
  },
})

const channelDisplay = computed(() => {
  return `${props.selectedChannel.number} | ${props.selectedChannel.name}`
})
</script>

<template>
  <header class="top-bar">
    <button class="menu-btn" @click="$emit('toggle-channels')">☰</button>

    <div class="channel-info">
      <img :src="props.selectedChannel.logo" alt="Logo Canal" class="channel-logo" />
      <span class="channel-name">{{ channelDisplay }}</span>
    </div>

    <div class="spacer"></div>

    <LanguageSelector />

    <img src="/logos/logo-zapping.png" alt="Zapping Logo" class="zapping-logo" />
  </header>
</template>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  align-items: center;
  background: #111;
  color: white;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .menu-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
  }

  .channel-info {
    display: flex;
    align-items: center;
    margin-left: 1rem;

    .channel-logo {
      width: 30px;
      margin-right: 0.5rem;
    }

    .channel-name {
      font-weight: bold;
    }
  }

  .spacer {
    flex-grow: 1;
  }

  .zapping-logo {
    height: 16px;
    margin-left: 1.5rem;
  }
}
</style>
