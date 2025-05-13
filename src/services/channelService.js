import { mockChannels } from './mocks/channel-mock'

class ChannelServices {
  constructor() {
    // En desarrollo usamos el proxy, en producción la URL completa
    this.baseUrl = import.meta.env.DEV ? '/api' : 'https://dev-alquinta.zappingtv.com/v1/web'
  }

  async getChannels() {
    try {
      const response = await fetch(`${this.baseUrl}/channels`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      console.log('Response:', response)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al obtener los canales')
      }

      const data = await response.json()
      return this.formatChannelData(data.data)
    } catch (error) {
      console.error('Error en el servicio de canales:', error)
      return this.formatChannelData(mockChannels)
    }
  }

  formatChannelData(channels) {
    return channels
      .map((channel) => ({
        id: channel.number,
        name: channel.name,
        number: channel.number,
        logo: channel.logo_color?.trim(),
        logoWhite: channel.logo_white?.trim(),
      }))
      .sort((a, b) => a.number - b.number);
  }
}

export default new ChannelServices()
