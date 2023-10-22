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
});

/**
 * Computed
 */
const sizeClass = computed(() => {
  return `modal__${props.size}`;
});

const headerClasses = computed(() => {
  return [
    "modal__header",
    props.headerClasses,
  ];
});

const bodyClasses = computed(() => {
  return [
    "modal__body",
    props.bodyClasses,
  ];
});

const footerClasses = computed(() => {
  return [
    "modal__footer",
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
    document.documentElement.classList.remove("modal-open-scroll-disabled");

    return;
  }

  if(!props.lockHtmlScroll) {
    return;
  }

  document.documentElement.classList.add("modal-open-scroll-disabled");
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
           class="modal__overlay"
           @click="onOverlayClick"
      />
    </transition>

    <div v-if="props.show"
         class="modal"
         role="dialog"
    >
      <transition :name="props.transition" appear>
        <div class="modal__dialog"
             :class="[sizeClass]"
        >
          <template v-if="!hideHeader">
            <template v-if="!$slots.header">
              <div :class="headerClasses">
                <div class="modal__title">
                  {{ props.title }}
                </div>
                <div class="modal__header-operations">
                  <a href="#"
                     class="modal__close"
                     @click="updateModalState(false)"
                  />
                </div>
              </div>
            </template>
            <div v-else
                 class="modal__header"
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