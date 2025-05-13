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

const isLoading = ref(false)
const isFirstPlay = ref(true)

const togglePlay = async () => {
  const video = videoRef.value
  if (!video) return

  if (video.paused) {
    if (isFirstPlay.value) {
      isLoading.value = true
      showPoster.value = false

      await new Promise((resolve) => setTimeout(resolve, 2000))
      isFirstPlay.value = false
      isLoading.value = false
    } else {
      showPoster.value = false
    }

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
  <div class="video-player-wrapper">
    <div class="video-container" @mouseenter="showTopBar" @mouseleave="hideTopBar">
      <img
        v-if="showPoster"
        :src="posterImage"
        class="video-poster"
        @click="togglePlay"
        alt="Poster"
      />

      <div v-if="isLoading" class="loading-overlay">
        <div class="loader"></div>
      </div>

      <video
        ref="videoRef"
        :src="videoSrc"
        class="video-element"
        @click="togglePlay"
        @timeupdate="onTimeUpdate"
        v-show="!isChannelListVisible"
      ></video>
    </div>

    <div class="controls-overlay">
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
  </div>
</template>

<style scoped lang="scss">
.video-player-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.video-container {
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;

  .video-element {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background: black;
    z-index: 1;
  }

  .video-poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 2;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;

    .loader {
      width: 48px;
      height: 48px;
      border: 5px solid #fff;
      border-bottom-color: transparent;
      border-radius: 50%;
      animation: rotation 1s linear infinite;
    }
  }
}

.controls-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  padding-bottom: 20px;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
