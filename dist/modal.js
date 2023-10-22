import { computed as d, watch as g, onMounted as S, onUnmounted as b, openBlock as t, createBlock as E, Teleport as O, createVNode as m, Transition as p, withCtx as y, createElementBlock as a, createCommentVNode as n, createElementVNode as s, normalizeClass as r, Fragment as B, toDisplayString as $, renderSlot as c } from "vue";
const z = {
  key: 0,
  class: "modal",
  role: "dialog"
}, H = { class: "modal__title" }, M = { class: "modal__header-operations" }, L = {
  key: 1,
  class: "modal__header"
}, j = {
  __name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "small",
      validator(o) {
        return ["small", "medium", "large", "full-screen"].includes(o);
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
      validator(o) {
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
        ].includes(o);
      }
    },
    lockHtmlScroll: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "close"
  ],
  setup(o, { emit: _ }) {
    const e = o, v = d(() => `modal__${e.size}`), h = d(() => [
      "modal__header",
      e.headerClasses
    ]), k = d(() => [
      "modal__body",
      e.bodyClasses
    ]), C = d(() => [
      "modal__footer",
      e.footerClasses
    ]);
    function i(l) {
      _("close", l);
    }
    function w() {
      e.closeOnOverlayClick && i(!1);
    }
    function u(l) {
      e.closeOnEscape && (l.key !== "Escape" || l.keyCode !== 27 || i(!1));
    }
    return g(() => e.show, (l) => {
      if (!l && e.lockHtmlScroll) {
        document.documentElement.classList.remove("modal-open-scroll-disabled");
        return;
      }
      e.lockHtmlScroll && document.documentElement.classList.add("modal-open-scroll-disabled");
    }), S(() => {
      window.addEventListener("keydown", u);
    }), b(() => {
      window.removeEventListener("keydown", u);
    }), (l, f) => (t(), E(O, { to: "body" }, [
      m(p, {
        name: "fade-overlay",
        appear: ""
      }, {
        default: y(() => [
          e.show ? (t(), a("div", {
            key: 0,
            class: "modal__overlay",
            onClick: w
          })) : n("", !0)
        ]),
        _: 1
      }),
      e.show ? (t(), a("div", z, [
        m(p, {
          name: e.transition,
          appear: ""
        }, {
          default: y(() => [
            s("div", {
              class: r(["modal__dialog", [v.value]])
            }, [
              o.hideHeader ? n("", !0) : (t(), a(B, { key: 0 }, [
                l.$slots.header ? (t(), a("div", L, [
                  c(l.$slots, "header")
                ])) : (t(), a("div", {
                  key: 0,
                  class: r(h.value)
                }, [
                  s("div", H, $(e.title), 1),
                  s("div", M, [
                    s("a", {
                      href: "#",
                      class: "modal__close",
                      onClick: f[0] || (f[0] = (F) => i(!1))
                    })
                  ])
                ], 2))
              ], 64)),
              s("div", {
                class: r(k.value)
              }, [
                c(l.$slots, "default")
              ], 2),
              !e.hideFooter && l.$slots.footer ? (t(), a("div", {
                key: 1,
                class: r(C.value)
              }, [
                c(l.$slots, "footer")
              ], 2)) : n("", !0)
            ], 2)
          ]),
          _: 3
        }, 8, ["name"])
      ])) : n("", !0)
    ]));
  }
}, A = (o) => {
  o.component("modal", j);
}, V = {
  install: A
};
export {
  j as Modal,
  V as default,
  A as install
};
