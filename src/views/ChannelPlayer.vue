<script setup>
import { ref, onMounted } from 'vue'
import TopBar from '@/components/layout/TopBar.vue'
import ChannelList from '@/components/navigation/ChannelList.vue'
import VideoPlayer from '@/components/player/VideoPlayer.vue'
import { useChannelManagement } from '@/composables/useChannelManagement'
import { DEFAULT_CHANNEL } from '@/constants/defaults'
import { useChannelStore } from '@/stores/channelStore'

const showChannels = ref(false)
const isTopBarVisible = ref(false)
const channelStore = useChannelStore()
const isLoading = ref(true)

const { channels, selectedChannel, handleChannelSelect, handleChannelChange, loadChannels } =
  useChannelManagement(DEFAULT_CHANNEL)

onMounted(async () => {
  try {
    await channelStore.fetchChannels()
    await loadChannels()
  } finally {
    isLoading.value = false
  }
})

const handleChannelSelection = (channel) => {
  const wasChannelSelected = handleChannelSelect(channel)
  if (!wasChannelSelected || channel === null) {
    showChannels.value = false
    return
  }
  showChannels.value = false
}
</script>

<template>
  <div class="player">
    <TopBar
      v-show="!showChannels"
      @toggle-channels="showChannels = !showChannels"
      :selected-channel="selectedChannel"
      :class="{
        'show-topbar': isTopBarVisible && !showChannels,
        'mobile-topbar': isMobile,
      }"
    />

    <div class="background-container"></div>

    <transition :name="isMobile ? 'slide' : 'fade'" mode="out-in">
      <ChannelList
        v-if="showChannels"
        @channel-selected="handleChannelSelection"
        :current-channel="selectedChannel"
        :channels="channels"
        :class="{ 'mobile-list': isMobile }"
      />
    </transition>

    <main class="main-content" v-show="!showChannels" :class="{ 'mobile-content': isMobile }">
      <VideoPlayer
        :current-channel="selectedChannel"
        :is-channel-list-visible="showChannels"
        @show-topbar="isTopBarVisible = true"
        @hide-topbar="isTopBarVisible = false"
        @change-channel="handleChannelChange"
        @toggle-channels="showChannels = !showChannels"
      />
    </main>
  </div>
</template>

<style scoped lang="scss">
.player {
  background-color: #000;
  color: white;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.main-content {
  position: relative;
  flex: 1;
  width: 100%;
  height: calc(100vh - var(--topbar-height, 80px));
  z-index: 1;
  overflow: hidden;

  &.mobile-content {
    height: 100vh;
  }
}

// Transiciones
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Transición para móvil
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

// Estilos móviles
@media (max-width: 768px) {
  .mobile-topbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }

  .mobile-list {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 20;
  }

  .show-topbar {
    transform: translateY(0);
  }
}
</style>
