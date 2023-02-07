<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="d-flex align-items-center">
    <h2 class="h5 me-auto mb-0">優惠券設定</h2>
    <div class="text-end">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        新增優惠券
      </button>
    </div>
  </div>
  <couponModal
    ref="couponModal"
    :couponList="tempCoupon"
    :is-new="isNew"
    @update-coupon="updateCoupon"
    @edit-coupon="editCoupon"
  ></couponModal>
  <div class="text-nowrap overflow-x-scroll">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>優惠券名稱</th>
          <th width="120">優惠碼</th>
          <th width="120">優惠價</th>
          <th width="200">到期日</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }} %</td>
          <td>{{ date(item.due_date) }}</td>
          <td v-if="item.is_enabled === 1">
            <i class="bi bi-toggle-on h4 text-success"></i>
          </td>
          <td v-else>
            <i class="bi bi-toggle-off h4 text-info"></i>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDeleteModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page">
        <a class="page-link" href="#">{{ page }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  <deleteModal
  ref="deleteModal"
  :delete="tempCoupon"
  @delete-product="deleteProduct"
  ></deleteModal>
</template>

<script>
import deleteModal from '@/components/DeleteModal.vue'
import couponModal from '@/components/CouponModal.vue'
import { date } from '@/methods/filters'
export default {
  components: {
    couponModal, deleteModal
  },
  inject: ['emitter'],
  data () {
    return {
      coupons: {},
      pagination: {},
      tempCoupon: {},
      isNew: '',
      isLoading: false
    }
  },
  methods: {
    date,
    getCoupon () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        console.log(res.data)
        this.isLoading = false
        this.coupons = res.data.coupons
        this.pagination = res.data.pagination
      })
    },
    openModal (isNew, item) {
      this.isNew = isNew
      if (isNew) {
        this.tempCoupon = {}
      } else {
        this.tempCoupon = { ...item }
      }
      const couponComponent = this.$refs.couponModal
      couponComponent.showModal()
    },
    updateCoupon (item) {
      const list = item
      const time = Math.floor(new Date(list.due_date) / 1000)
      list.due_date = time
      this.tempCoupon = list
      console.log(this.tempCoupon)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      const couponComponent = this.$refs.couponModal
      this.$http.post(api, { data: this.tempCoupon }).then((res) => {
        console.log(res)
        couponComponent.hideModal()
        couponComponent.resetTempCoupon()
        this.getCoupon()
      })
    },
    editCoupon (item) {
      const list = item
      const time = Math.floor(new Date(list.due_date) / 1000)
      list.due_date = time
      this.tempCoupon = list
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      const couponComponent = this.$refs.couponModal
      this.$http.put(api, { data: this.tempCoupon })
        .then((res) => {
          couponComponent.hideModal()
          if (res.data.success) {
            this.getCoupon()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功'
            })
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、')
            })
          }
          couponComponent.resetTempCoupon()
        })
    },
    openDeleteModal (item) {
      this.tempCoupon = { ...item }
      const deleteModalComponent = this.$refs.deleteModal
      deleteModalComponent.showModal()
    },
    deleteProduct (item) {
      console.log(item)
      const deleteModalComponent = this.$refs.deleteModal
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
      this.$http.delete(api)
        .then((res) => {
          deleteModalComponent.hideModal()
          deleteModalComponent.resetTempProduct()
          this.getCoupon()
        })
    }
  },
  created () {
    this.getCoupon()
  }
}
</script>
