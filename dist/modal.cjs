"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const e=require("vue"),r={__name:"Modal",props:{show:{type:Boolean,default:!1},size:{type:String,default:"small",validator(o){return["small","medium","large","full-screen"].includes(o)}},title:{type:String,default:"Modal"},headerClasses:{type:[String,Array,Object],default:null},hideHeader:{type:Boolean,default:!1},bodyClasses:{type:[String,Array,Object],default:null},footerClasses:{type:[String,Array,Object],default:null},hideFooter:{type:Boolean,default:!1},closeOnOverlayClick:{type:Boolean,default:!1},closeOnEscape:{type:Boolean,default:!1},transition:{type:String,default:"fade",validator(o){return["fade","pop","bounce","slide-down","slide-up","slide-left","slide-right","rotate","flip-x","flip-y","zoom-in","zoom-out"].includes(o)}},lockHtmlScroll:{type:Boolean,default:!1},modalClassName:{type:String,default:"modal"}},emits:["close"],setup(o,{emit:i}){const l=o,c=e.computed(()=>`${l.modalClassName}__${l.size}`),m=e.computed(()=>[`${l.modalClassName}__header`,l.headerClasses]),u=e.computed(()=>[`${l.modalClassName}__body`,l.bodyClasses]),f=e.computed(()=>[`${l.modalClassName}__footer`,l.footerClasses]);function t(a){i("close",a)}function p(){l.closeOnOverlayClick&&t(!1)}function s(a){l.closeOnEscape&&(a.key!=="Escape"||a.keyCode!==27||t(!1))}return e.watch(()=>l.show,a=>{if(!a&&l.lockHtmlScroll){document.documentElement.classList.remove(`${l.modalClassName}-open-scroll-disabled`);return}l.lockHtmlScroll&&document.documentElement.classList.add(`${l.modalClassName}-open-scroll-disabled`)}),e.onMounted(()=>{window.addEventListener("keydown",s)}),e.onUnmounted(()=>{window.removeEventListener("keydown",s)}),(a,n)=>(e.openBlock(),e.createBlock(e.Teleport,{to:"body"},[e.createVNode(e.Transition,{name:"fade-overlay",appear:""},{default:e.withCtx(()=>[l.show?(e.openBlock(),e.createElementBlock("div",{key:0,class:e.normalizeClass(`${l.modalClassName}__overlay`),onClick:p},null,2)):e.createCommentVNode("",!0)]),_:1}),l.show?(e.openBlock(),e.createElementBlock("div",{key:0,class:e.normalizeClass(l.modalClassName),role:"dialog"},[e.createVNode(e.Transition,{name:l.transition,appear:""},{default:e.withCtx(()=>[e.createElementVNode("div",{class:e.normalizeClass(`${l.modalClassName}__dialog`,[c.value])},[o.hideHeader?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[a.$slots.header?(e.openBlock(),e.createElementBlock("div",{key:1,class:e.normalizeClass(`${l.modalClassName}__header`)},[e.renderSlot(a.$slots,"header")],2)):(e.openBlock(),e.createElementBlock("div",{key:0,class:e.normalizeClass(m.value)},[e.createElementVNode("div",{class:e.normalizeClass(`${l.modalClassName}__title`)},e.toDisplayString(l.title),3),e.createElementVNode("div",{class:e.normalizeClass(`${l.modalClassName}__header-operations`)},[e.createElementVNode("a",{href:"#",class:e.normalizeClass(`${l.modalClassName}__close`),onClick:n[0]||(n[0]=y=>t(!1))},null,2)],2)],2))],64)),e.createElementVNode("div",{class:e.normalizeClass(u.value)},[e.renderSlot(a.$slots,"default")],2),!l.hideFooter&&a.$slots.footer?(e.openBlock(),e.createElementBlock("div",{key:1,class:e.normalizeClass(f.value)},[e.renderSlot(a.$slots,"footer")],2)):e.createCommentVNode("",!0)],2)]),_:3},8,["name"])],2)):e.createCommentVNode("",!0)]))}},d=o=>{o.component("modal",r)},C={install:d};exports.Modal=r;exports.default=C;exports.install=d;
