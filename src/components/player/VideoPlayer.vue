<template>
  <div class="video-player-container" @mouseenter="showTopBar" @mouseleave="hideTopBar">
    <video
      ref="videoRef"
      :src="src"
      class="video-element"
      @click="togglePlay"
      @timeupdate="onTimeUpdate"
      v-show="!isChannelListVisible"
    ></video>

    <VideoControls
      v-show="!isChannelListVisible"
      :current-channel="currentChannel"
      @togglePlay="togglePlay"
      @toggleMute="toggleMute"
      @volumeChange="changeVolume"
      @channel-up="handleChannelUp"
      @channel-down="handleChannelDown"
      @toggle-channels="() => emit('toggle-channels')"
      @show-info="() => $router.push(`/details/${currentChannel.id}`)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoControls from './VideoControls.vue'

const emit = defineEmits(['show-topbar', 'hide-topbar', 'change-channel', 'toggle-channels'])

defineProps({
  src: {
    type: String,
    required: true,
  },
  currentChannel: {
    type: Object,
    required: true,
  },
  isChannelListVisible: {
    type: Boolean,
    default: false,
  },
})

const videoRef = ref(null)

const showTopBar = () => {
  emit('show-topbar')
}

const hideTopBar = () => {
  emit('hide-topbar')
}

const togglePlay = () => {
  const video = videoRef.value
  if (!video) return

  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

const toggleMute = () => {
  const video = videoRef.value
  if (!video) return

  video.muted = !video.muted
}

const changeVolume = (value) => {
  const video = videoRef.value
  if (!video) return

  video.volume = value
}

const handleChannelUp = () => {
  emit('change-channel', 'up')
}

const handleChannelDown = () => {
  emit('change-channel', 'down')
}
</script>

<style scoped lang="scss">
.video-player-container {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .video-element {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background: transparent;
  }
}
</style>
