<script setup>
import {computed, onMounted, onUnmounted, warn, watch} from "vue";

/**
 * Emits
 */

const $emit = defineEmits([
  'close'
]);

/**
 * Props
 */

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'small',
    validator(value) {
      return ['small', 'medium', 'large', 'full-screen'].includes(value);
    }
  },
  title: {
    type: String,
    default: 'Modal',
  },
  headerClasses: {
    type: [String, Array, Object],
    default: null,
  },
  hideHeader: {
    type: Boolean,
    default: false,
  },
  bodyClasses: {
    type: [String, Array, Object],
    default: null,
  },
  footerClasses: {
    type: [String, Array, Object],
    default: null,
  },
  hideFooter: {
    type: Boolean,
    default: false,
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: false,
  },
  closeOnEscape: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: String,
    default: 'fade',
    validator(value) {
      return [
        'fade',
        'pop',
        'bounce',
        'slide-down',
        'slide-up',
        'slide-left',
        'slide-right',
        'rotate',
        'flip-x',
        'flip-y',
        'zoom-in',
        'zoom-out',
      ].includes(value);
    }
  },
  lockHtmlScroll: {
    type: Boolean,
    default: false,
  },
  modalClassName: {
    type: String,
    default: 'modal',
  },
});

/**
 * Computed
 */
const sizeClass = computed(() => {
  return `${props.modalClassName}__${props.size}`;
});

const headerClasses = computed(() => {
  return [
    `${props.modalClassName}__header`,
    props.headerClasses,
  ];
});

const bodyClasses = computed(() => {
  return [
    `${props.modalClassName}__body`,
    props.bodyClasses,
  ];
});

const footerClasses = computed(() => {
  return [
    `${props.modalClassName}__footer`,
    props.footerClasses,
  ];
});

/**
 * Methods
 */

function updateModalState(value) {
  $emit("close", value);
}

function onOverlayClick() {
  if (!props.closeOnOverlayClick) {
    return;
  }

  updateModalState(false);
}

function onEscapeClick(event) {
  if (!props.closeOnEscape) {
    return;
  }

  if (event.key !== "Escape" || event.keyCode !== 27) {
    return;
  }

  updateModalState(false);
}

/**
 * Watchers
 */
watch(() => props.show, (value) => {
  if(!value && props.lockHtmlScroll) {
    document.documentElement.classList.remove(`${props.modalClassName}-open-scroll-disabled`);

    return;
  }

  if(!props.lockHtmlScroll) {
    return;
  }

  document.documentElement.classList.add(`${props.modalClassName}-open-scroll-disabled`);
});

/**
 * Lifecycle hooks
 */

onMounted(() => {
  window.addEventListener("keydown", onEscapeClick);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onEscapeClick);
});
</script>

<template>
  <teleport to="body">
    <transition name="fade-overlay" appear>
      <div v-if="props.show"
           :class="`${props.modalClassName}__overlay`"
           @click="onOverlayClick"
      />
    </transition>

    <div v-if="props.show"
         :class="props.modalClassName"
         role="dialog"
    >
      <transition :name="props.transition" appear>
        <div :class="`${props.modalClassName}__dialog`, [sizeClass]">
          <template v-if="!hideHeader">
            <template v-if="!$slots.header">
              <div :class="headerClasses">
                <div :class="`${props.modalClassName}__title`">
                  {{ props.title }}
                </div>
                <div :class="`${props.modalClassName}__header-operations`">
                  <a href="#"
                     :class="`${props.modalClassName}__close`"
                     @click="updateModalState(false)"
                  />
                </div>
              </div>
            </template>
            <div v-else
                 :class="`${props.modalClassName}__header`"
            >
              <slot name="header"/>
            </div>
          </template>

          <div :class="bodyClasses">
            <slot/>
          </div>

          <template v-if="!props.hideFooter && $slots.footer">
            <div :class="footerClasses">
              <slot name="footer"/>
            </div>
          </template>
        </div>
      </transition>
    </div>
  </teleport>
</template>