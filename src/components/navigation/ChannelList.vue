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

onMounted(async () => {
  try {
    channels.value = await channelService.getChannels()
    document.addEventListener('click', handleClickOutside)
  } catch (error) {
    console.error('Error al obtener los canales:', error)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
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
  padding: 1rem;
  color: white;
  overflow-y: auto;

  @media (min-width: 768px) {
    height: 100vh;

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

  @media (max-width: 767px) {
    height: calc(100vh - 60px);

    ul {
      width: 60%;
      margin: 0.5rem;
      gap: 0.5rem;
    }

    li {
      padding: 16px;
      font-size: 14px;

      img {
        width: 32px;
      }
    }
  }

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  li {
    background: transparent;
    opacity: 0.6;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    transition: background 0.2s;

    &.active {
      background: #444;
      opacity: 1;
      border: 1px solid #fff;
    }

    &:hover {
      background: #333;
    }

    img {
      height: auto;
    }
  }
}
</style>
