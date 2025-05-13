<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import channelService from '@/services/channelService'

const props = defineProps({
  currentChannel: {
    type: Object,
    default: () => null,
  },
})

const emit = defineEmits(['channel-selected'])
const channels = ref([])
const channelListRef = ref(null)

const handleClickOutside = (event) => {
  if (channelListRef.value && !channelListRef.value.contains(event.target)) {
    emit('channel-selected', props.currentChannel)
  }
}

const handleKeyPress = (event) => {
  if (event.key === 'Escape') {
    emit('channel-selected', props.currentChannel)
  }
}

onMounted(async () => {
  try {
    channels.value = await channelService.getChannels()
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeyPress)
  } catch (error) {
    console.error('Error al obtener los canales:', error)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyPress)
})

const selectChannel = (channel) => {
  emit('channel-selected', channel)
}
</script>

<template>
  <div class="channel-list">
    <ul ref="channelListRef">
      <li
        v-for="channel in channels"
        :key="channel.id"
        :class="{ active: props.currentChannel?.id === channel.id }"
        @click="selectChannel(channel)"
      >
        <span>{{ channel.number }}</span>
        <img :src="channel.logo" :alt="channel.name" />
        <span>{{ channel.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.channel-list {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  padding: 1rem;
  color: white;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 400px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    span:first-child {
      min-width: 30px;
      text-align: center;
    }

    img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }

    span:last-child {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.active {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: scale(1.01);
    }
  }
  @media (min-width: 768px) {
    ul {
      width: 270px;
      margin: 1rem 2rem;
    }

    li {
      padding: 24px 32px;
      margin-bottom: 8px;

      img {
        width: 48px;
      }
    }
  }
}
</style>
