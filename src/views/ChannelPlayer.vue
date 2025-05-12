<script setup>
import { ref, onMounted } from 'vue'
import TopBar from '@/components/layout/TopBar.vue'
import ChannelList from '@/components/navigation/ChannelList.vue'
import VideoPlayer from '@/components/player/VideoPlayer.vue'
import { useChannelManagement } from '@/composables/useChannelManagement'
import { DEFAULT_CHANNEL } from '@/constants/defaults'

const showChannels = ref(false)
const isTopBarVisible = ref(false)

const {
  channels,
  selectedChannel,
  handleChannelSelect,
  handleChannelChange,
  loadChannels
} = useChannelManagement(DEFAULT_CHANNEL)

onMounted(() => {
  loadChannels()
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
      @toggle-channels="showChannels = !showChannels"
      :selected-channel="selectedChannel"
      :class="{ 'show-topbar': isTopBarVisible && !showChannels }"
    />

    <transition name="fade">
      <ChannelList
        v-if="showChannels"
        @channel-selected="handleChannelSelection"
        :current-channel="selectedChannel"
        :channels="channels"
      />
    </transition>

    <main class="main-content" v-if="!showChannels">
      <VideoPlayer
        :src="selectedChannel.logo"
        :current-channel="selectedChannel"
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
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
  position: relative;
}

.main-content {
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
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
