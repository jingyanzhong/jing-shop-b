<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增優惠券</span>
            <!-- <span v-else>編輯優惠券</span> -->
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
            />
          </div>
          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="percent" class="form-label">折扣金額</label>
              <input
                type="text"
                class="form-control"
                id="percent"
                v-model.number="tempCoupon.percent"
                placeholder="請輸入折扣金額"
              />
            </div>
            <div class="mb-3 col-md-6">
              <label for="code" class="form-label">優惠代碼</label>
              <input
                type="text"
                class="form-control"
                id="code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠代碼"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="due_date" class="form-label">優惠券到期日</label>
            <input
              type="date"
              class="form-control"
              id="due_date"
              v-model="tempCoupon.due_date"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                id="is_enabled"
                v-model="tempCoupon.is_enabled"
              />
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon',tempCoupon)">確認</button>
          <!-- <button
            type="button"
            class="btn btn-primary"
          >
            編輯
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: {
    couponList: {
      type: Object,
      default () { return {} }
    },
    isNew: {
      type: Boolean,
      default () { return true }
    }
  },
  watch: {
    couponList () {
      this.tempCoupon = this.couponList
    }
  },
  data () {
    return {
      modal: {},
      tempCoupon: {}
    }
  },
  methods: {
    showModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    },
    resetTempCoupon () {
      this.tempCoupon = {}
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
