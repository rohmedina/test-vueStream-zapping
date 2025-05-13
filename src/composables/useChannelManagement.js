import { ref } from 'vue'
import channelService from '@/services/channelService'

export function useChannelManagement(initialChannel) {
  const channels = ref([])
  const selectedChannel = ref(initialChannel)
  const currentChannelIndex = ref(0)

  const saveSelectedChannel = (channel) => {
    localStorage.setItem('selectedChannel', JSON.stringify(channel))
  }

  const handleChannelSelect = (channel) => {
    if (channel === null) {
      return false
    }
    selectedChannel.value = channel
    currentChannelIndex.value = channels.value.findIndex((c) => c.id === channel.id)
    saveSelectedChannel(channel)
    return true
  }

  const handleChannelChange = (direction) => {
    if (channels.value.length === 0) return

    if (currentChannelIndex.value === -1) {
      currentChannelIndex.value = channels.value.findIndex((c) => c.id === selectedChannel.value.id)
    }

    if (direction === 'up') {
      currentChannelIndex.value = (currentChannelIndex.value + 1) % channels.value.length
    } else if (direction === 'down') {
      currentChannelIndex.value =
        currentChannelIndex.value === 0 ? channels.value.length - 1 : currentChannelIndex.value - 1
    }
    selectedChannel.value = channels.value[currentChannelIndex.value]
    saveSelectedChannel(selectedChannel.value)
  }

  const loadChannels = async () => {
    try {
      channels.value = await channelService.getChannels()
      if (channels.value.length > 0) {
        const savedChannel = localStorage.getItem('selectedChannel')
        if (savedChannel) {
          const parsedChannel = JSON.parse(savedChannel)
          const channelExists = channels.value.some((c) => c.id === parsedChannel.id)
          if (channelExists) {
            handleChannelSelect(parsedChannel)
          } else {
            handleChannelSelect(channels.value[0])
          }
        } else {
          handleChannelSelect(channels.value[0])
        }
      }
    } catch (error) {
      console.error('Error al cargar los canales:', error)
    }
  }

  return {
    channels,
    selectedChannel,
    currentChannelIndex,
    handleChannelSelect,
    handleChannelChange,
    loadChannels,
  }
}
