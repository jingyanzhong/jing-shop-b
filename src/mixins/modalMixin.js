import Modal from 'bootstrap/js/dist/modal'

export default {
  methods: {
    showModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    },
    resetTempProduct () {
      this.tempProduct = {}
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.Modal)
  }
}
