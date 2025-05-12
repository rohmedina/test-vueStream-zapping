import { createRouter, createWebHistory } from 'vue-router'

import Player from '@/views/ChannelPlayer.vue'
import Details from '@/views/ChannelInfo.vue'

const routes = [
  {
    path: '/',
    name: 'Player',
    component: Player,
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: Details,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
