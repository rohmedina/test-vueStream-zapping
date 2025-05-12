import { mockChannels } from './mocks/channel-mock'

class ChannelServices {
  async getChannels() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockChannels)
      }, 200)
    })
  }
}

export default new ChannelServices()
