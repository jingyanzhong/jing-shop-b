<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="Modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">刪除「{{ tempProduct.title }}」警告</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">是否確定要刪除「{{ tempProduct.title }}」?<br>刪除後商品將無法復原，請謹慎操作。</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger"
          @click="$emit('delete-product', tempProduct)"
          >確定刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    delete: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    delete () {
      this.tempProduct = this.delete
    }
  },
  data () {
    return {
      modal: {},
      tempProduct: {}
    }
  },
  mixins: [modalMixin]
}
</script>
