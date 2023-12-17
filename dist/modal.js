import { computed as n, watch as N, onMounted as g, onUnmounted as w, openBlock as o, createBlock as S, Teleport as b, createVNode as f, Transition as p, withCtx as y, createElementBlock as t, normalizeClass as a, createCommentVNode as r, createElementVNode as d, Fragment as E, toDisplayString as O, renderSlot as c } from "vue";
const B = {
  __name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "small",
      validator(s) {
        return ["small", "medium", "large", "full-screen"].includes(s);
      }
    },
    title: {
      type: String,
      default: "Modal"
    },
    headerClasses: {
      type: [String, Array, Object],
      default: null
    },
    hideHeader: {
      type: Boolean,
      default: !1
    },
    bodyClasses: {
      type: [String, Array, Object],
      default: null
    },
    footerClasses: {
      type: [String, Array, Object],
      default: null
    },
    hideFooter: {
      type: Boolean,
      default: !1
    },
    closeOnOverlayClick: {
      type: Boolean,
      default: !1
    },
    closeOnEscape: {
      type: Boolean,
      default: !1
    },
    transition: {
      type: String,
      default: "fade",
      validator(s) {
        return [
          "fade",
          "pop",
          "bounce",
          "slide-down",
          "slide-up",
          "slide-left",
          "slide-right",
          "rotate",
          "flip-x",
          "flip-y",
          "zoom-in",
          "zoom-out"
        ].includes(s);
      }
    },
    lockHtmlScroll: {
      type: Boolean,
      default: !1
    },
    modalClassName: {
      type: String,
      default: "modal"
    }
  },
  emits: [
    "close"
  ],
  setup(s, { emit: C }) {
    const e = s, v = n(() => `${e.modalClassName}__${e.size}`), k = n(() => [
      `${e.modalClassName}__header`,
      e.headerClasses
    ]), h = n(() => [
      `${e.modalClassName}__body`,
      e.bodyClasses
    ]), _ = n(() => [
      `${e.modalClassName}__footer`,
      e.footerClasses
    ]);
    function i(l) {
      C("close", l);
    }
    function $() {
      e.closeOnOverlayClick && i(!1);
    }
    function m(l) {
      e.closeOnEscape && (l.key !== "Escape" || l.keyCode !== 27 || i(!1));
    }
    return N(() => e.show, (l) => {
      if (!l && e.lockHtmlScroll) {
        document.documentElement.classList.remove(`${e.modalClassName}-open-scroll-disabled`);
        return;
      }
      e.lockHtmlScroll && document.documentElement.classList.add(`${e.modalClassName}-open-scroll-disabled`);
    }), g(() => {
      window.addEventListener("keydown", m);
    }), w(() => {
      window.removeEventListener("keydown", m);
    }), (l, u) => (o(), S(b, { to: "body" }, [
      f(p, {
        name: "fade-overlay",
        appear: ""
      }, {
        default: y(() => [
          e.show ? (o(), t("div", {
            key: 0,
            class: a(`${e.modalClassName}__overlay`),
            onClick: $
          }, null, 2)) : r("", !0)
        ]),
        _: 1
      }),
      e.show ? (o(), t("div", {
        key: 0,
        class: a(e.modalClassName),
        role: "dialog"
      }, [
        f(p, {
          name: e.transition,
          appear: ""
        }, {
          default: y(() => [
            d("div", {
              class: a(`${e.modalClassName}__dialog`, [v.value])
            }, [
              s.hideHeader ? r("", !0) : (o(), t(E, { key: 0 }, [
                l.$slots.header ? (o(), t("div", {
                  key: 1,
                  class: a(`${e.modalClassName}__header`)
                }, [
                  c(l.$slots, "header")
                ], 2)) : (o(), t("div", {
                  key: 0,
                  class: a(k.value)
                }, [
                  d("div", {
                    class: a(`${e.modalClassName}__title`)
                  }, O(e.title), 3),
                  d("div", {
                    class: a(`${e.modalClassName}__header-operations`)
                  }, [
                    d("a", {
                      href: "#",
                      class: a(`${e.modalClassName}__close`),
                      onClick: u[0] || (u[0] = (H) => i(!1))
                    }, null, 2)
                  ], 2)
                ], 2))
              ], 64)),
              d("div", {
                class: a(h.value)
              }, [
                c(l.$slots, "default")
              ], 2),
              !e.hideFooter && l.$slots.footer ? (o(), t("div", {
                key: 1,
                class: a(_.value)
              }, [
                c(l.$slots, "footer")
              ], 2)) : r("", !0)
            ], 2)
          ]),
          _: 3
        }, 8, ["name"])
      ], 2)) : r("", !0)
    ]));
  }
}, z = (s) => {
  s.component("modal", B);
}, L = {
  install: z
};
export {
  B as Modal,
  L as default,
  z as install
};
