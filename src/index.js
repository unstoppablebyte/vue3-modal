import Modal from "@/Modal.vue";

const install = (app) => {
    app.component('modal', Modal);
};

export {
    Modal,
    install
};

export default {
    install
};