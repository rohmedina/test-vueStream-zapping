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
      :class="{ 'show-topbar': isTopBarVisible && !showChannels }"
    />

    <div class="background-container"></div>

    <transition name="fade">
      <ChannelList
        v-if="showChannels"
        @channel-selected="handleChannelSelection"
        :current-channel="selectedChannel"
        :channels="channels"
      />
    </transition>

    <main class="main-content" v-show="!showChannels">
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
  font-family: Arial, Helvetica, sans-serif;
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
  background-image: url('@/assets/image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.main-content {
  position: relative;
  flex: 1;
  width: 100%;
  height: calc(100vh - 200px);
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 1;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.show-topbar {
  transform: translateY(0) !important;
}
</style>
