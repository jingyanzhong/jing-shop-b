<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="d-flex align-items-center mb-5">
    <h2 class="h5 me-auto mb-0">訂單查詢</h2>
    <button class="btn btn-outline-danger btn-sm">刪除全部訂單</button>
  </div>
  <div v-for="item in orders" :key="item.id">
    <div class="d-flex align-items-center bg-primary text-white p-3">
        <h3 class="h4 mb-0">訂單編號：{{ item.create_at }}</h3>
        <div class="btn-group ms-auto">
            <button
            class="btn btn-outline-secondary btn-sm"
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
    </div>
    <div class="text-nowrap overflow-x-scroll">
        <table class="table mt-3">
            <thead>
            <tr>
                <th>商品名稱</th>
                <th width="100">顏色</th>
                <th width="100">數量</th>
                <th width="150">總價</th>
                <th width="150">折扣價</th>
                <th width="250">優惠券</th>
                <th width="100">是否付款</th>
                <th width="100">付款時間</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in item.products" :key="product.id">
                <td>{{ product.product.title }}</td>
                <td>{{ product.color }}</td>
                <td>{{ product.qty }} 件</td>
                <td class="text-decoration-line-through">NTD {{ currency(product.total) }} 元</td>
                <td class="text-danger">NTD {{ currency(product.final_total) }} 元</td>
                <td v-if="product.coupon">{{ product.coupon.code }}</td>
                <td v-else>無</td>
                <td v-if="item.is_paid" class="text-success">已付款</td>
                <td v-else class="text-danger">未付款</td>
                <td v-if="item.is_paid">{{ date(item.paid_date) }}</td>
                <td v-else>---</td>
            </tr>
            </tbody>
            <tfoot class="text-end">
            <tr>
                <th colspan="8">總計 NTD {{ currency(item.total) }} 元</th>
            </tr>
            </tfoot>
        </table>
    </div>
    <h4>收件人資訊</h4>
    <table class="table mt-3 mb-5">
        <tbody>
        <tr>
            <th width="100">姓名</th>
            <td>{{ item.user.name }}</td>
        </tr>
        <tr>
            <th width="100">Email</th>
            <td>{{ item.user.email }}</td>
        </tr>
        <tr>
            <th width="100">電話</th>
            <td>{{ item.user.tel }}</td>
        </tr>
        <tr>
            <th width="100">地址</th>
            <td>{{ item.user.address }}</td>
        </tr>
        <tr>
            <th width="100">留言</th>
            <td>{{ item.message }}</td>
        </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { date, currency } from '@/methods/filters'
export default {
  inject: ['emitter'],
  data () {
    return {
      orders: {},
      pagination: {},
      tempOrder: {},
      isNew: '',
      isLoading: false
    }
  },
  methods: {
    date,
    currency,
    getOrder (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        console.log(res.data)
        this.isLoading = false
        this.orders = res.data.orders
        this.pagination = res.data.pagination
      })
    }
    // openModal (isNew, item) {
    //   this.isNew = isNew
    //   if (isNew) {
    //     this.tempCoupon = {}
    //   } else {
    //     this.tempCoupon = { ...item }
    //   }
    //   const couponComponent = this.$refs.couponModal
    //   couponComponent.showModal()
    // },
    // updateCoupon (item) {
    //   const list = item
    //   const time = Math.floor(new Date(list.due_date) / 1000)
    //   list.due_date = time
    //   this.tempCoupon = list
    //   console.log(this.tempCoupon)
    //   const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
    //   const couponComponent = this.$refs.couponModal
    //   this.$http.post(api, { data: this.tempCoupon }).then((res) => {
    //     console.log(res)
    //     couponComponent.hideModal()
    //     couponComponent.resetTempCoupon()
    //     this.getCoupon()
    //   })
    // },
    // editCoupon (item) {
    //   const list = item
    //   const time = Math.floor(new Date(list.due_date) / 1000)
    //   list.due_date = time
    //   this.tempCoupon = list
    //   const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
    //   const couponComponent = this.$refs.couponModal
    //   this.$http.put(api, { data: this.tempCoupon })
    //     .then((res) => {
    //       couponComponent.hideModal()
    //       if (res.data.success) {
    //         this.getCoupon()
    //         this.emitter.emit('push-message', {
    //           style: 'success',
    //           title: '更新成功'
    //         })
    //       } else {
    //         this.emitter.emit('push-message', {
    //           style: 'danger',
    //           title: '更新失敗',
    //           content: res.data.message.join('、')
    //         })
    //       }
    //       couponComponent.resetTempCoupon()
    //     })
    // },
    // openDeleteModal (item) {
    //   this.tempCoupon = { ...item }
    //   const deleteModalComponent = this.$refs.deleteModal
    //   deleteModalComponent.showModal()
    // },
    // deleteProduct (item) {
    //   console.log(item)
    //   const deleteModalComponent = this.$refs.deleteModal
    //   const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
    //   this.$http.delete(api)
    //     .then((res) => {
    //       deleteModalComponent.hideModal()
    //       deleteModalComponent.resetTempProduct()
    //       this.getCoupon()
    //     })
    // }
  },
  created () {
    this.getOrder()
  }
}
</script>
