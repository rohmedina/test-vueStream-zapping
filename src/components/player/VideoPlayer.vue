<script setup>
import { ref, computed } from 'vue'
import VideoControls from './VideoControls.vue'
import independenceDay from '@/assets/video/independence-Day.mp4'
import independencePoster from '@/assets/image.png'

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

const showPoster = ref(true)
const videoRef = ref(null)
const posterImage = independencePoster

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
    showPoster.value = false
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

const toggleFullscreen = () => {
  const video = videoRef.value
  if (!video) return

  if (!document.fullscreenElement) {
    video.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const videoSrc = computed(() => {
  return independenceDay
})
</script>

<template>
  <div class="video-player-container" @mouseenter="showTopBar" @mouseleave="hideTopBar">
    <img
      v-if="showPoster"
      :src="posterImage"
      class="video-poster"
      @click="togglePlay"
      alt="Poster"
    />

    <video
      ref="videoRef"
      :src="videoSrc"
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
      @toggle-fullscreen="toggleFullscreen"
    />
  </div>
</template>

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
    height: 80%;
    object-fit: cover;
    display: block;
    background: transparent;
  }

  .video-poster {
    position: absolute;
    width: 100%;
    height: 90%;
    object-fit: cover;
    z-index: 2;
    cursor: pointer;
  }
}
</style>
