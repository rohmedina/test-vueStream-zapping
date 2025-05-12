import { defineStore } from 'pinia'
import channelService from '@/services/channelService'

export const useChannelStore = defineStore('channel', {
  state: () => ({
    channels: [],
    currentChannel: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchChannels() {
      this.loading = true
      try {
        const data = await channelService.getChannels()
        this.channels = data
        if (!this.currentChannel && data.length > 0) {
          this.currentChannel = data[0]
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    setCurrentChannel(channel) {
      this.currentChannel = channel
    }
  },

  getters: {
    getChannelById: (state) => (id) => {
      return state.channels.find(channel => channel.id === id)
    }
  }
})