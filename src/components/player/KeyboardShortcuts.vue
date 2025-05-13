<script setup>
import { onMounted, onUnmounted, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import arrow from '@/assets/arrow.svg'

const { t } = useI18n()
const router = useRouter()
const emit = defineEmits([
  'channel-up',
  'channel-down',
  'toggle-channels',
  'show-info',
  'toggle-mute',
  'toggle-fullscreen',
])

const props = defineProps({
  currentChannel: {
    type: Object,
    required: true,
  },
})

const handleChannelAction = (action) => {
  emit(action, props.currentChannel)
}

const handleShowInfo = () => {
  if (props.currentChannel?.number) {
    router.push(`/details/${props.currentChannel.number}`)
  }
}

const handleKeyPress = (event) => {
  const keyActions = {
    ArrowUp: 'channel-up',
    ArrowDown: 'channel-down',
    ArrowRight: 'toggle-channels',
    ArrowLeft: () => handleShowInfo(),
    m: 'toggle-mute',
    M: 'toggle-mute',
    f: 'toggle-fullscreen',
    F: 'toggle-fullscreen',
    Escape: '!toggle-fullscreen',
  }

  const action = keyActions[event.key]
  if (action) {
    if (typeof action === 'function') {
      action()
    } else {
      handleChannelAction(action)
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div class="shortcuts">
    <div class="left-shortcuts">
      <span>
        <kbd @click="handleChannelAction('channel-up')">
          <img :src="arrow" alt="arriba" class="arrow up" />
        </kbd>
        <kbd @click="handleChannelAction('channel-down')">
          <img :src="arrow" alt="abajo" class="arrow down" />
        </kbd>
        {{ t('cambiar_canal') }}
      </span>
      <span>
        <kbd @click="handleChannelAction('toggle-channels')">
          <img :src="arrow" alt="derecha" class="arrow right" />
        </kbd>
        {{ t('ver_canales') }}
      </span>
      <span>
        <kbd @click="handleShowInfo">
          <img :src="arrow" alt="izquierda" class="arrow left" />
        </kbd>
        {{ t('info_descripcion') }}
      </span>
      <span
        ><kbd @click="handleChannelAction('toggle-fullscreen')">F</kbd>
        {{ t('pantalla_completa') }}</span
      >
      <span><kbd @click="handleChannelAction('toggle-mute')">M</kbd> {{ t('silento') }}</span>
    </div>
    <div class="right-shortcuts">
      <span
        ><kbd @click="handleChannelAction('!toggle-fullscreen')">[ESC]</kbd>{{ t('salir') }}</span
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.shortcuts {
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #444;

  @media (max-width: 768px) {
    display: none;
  }

  .left-shortcuts {
    display: flex;
    gap: 1rem;
  }

  .right-shortcuts {
    margin-right: 1rem;
  }

  kbd {
    background: #222;
    padding: 6px 8px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 10px;
    color: white;
    border: 1px solid #444;
    margin: 2px;
  }

  .arrow {
    &.up {
      transform: rotate(0deg);
    }

    &.down {
      transform: rotate(-180deg);
    }

    &.right {
      transform: rotate(90deg);
    }

    &.left {
      transform: rotate(-90deg);
    }
  }
}
</style>
