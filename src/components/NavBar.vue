<template>
  <div class="d-flex align-items-start justify-content-center justify-content-lg-start">
    <nav class="nav flex-column nav-pills w-75">
      <a class="mb-3 text-primary text-decoration-none fw-bold h4" href="#">京式會社 | <span class="h5 fw-normal">管理後台</span></a>
      <div class="row">
        <div class="col-6 col-lg-12">
          <router-link
        to="/dashBoard/products"
        class="nav-link w-100"
        @click.prevent="isActive = 'products'"
        :class="{ active: isActive === 'products' }"
        >商品列表
      </router-link>
      <router-link
        to="/dashBoard/orderList"
        class="nav-link w-100"
        @click.prevent="isActive = 'orderList'"
        :class="{ active: isActive === 'orderList' }"
        >訂單查詢
      </router-link>
        </div>
        <div class="col-6 col-lg-12">
          <router-link
        to="/dashBoard/coupon"
        class="nav-link w-100"
        @click.prevent="isActive = 'coupon'"
        :class="{ active: isActive === 'coupon' }"
        >優惠券設定
      </router-link>
      <a
        class="nav-link w-100"
        href="#"
        @click.prevent="signOut(), (isActive = 'signOut')"
        :class="{ active: isActive === 'signOut' }"
        >登出</a
      >
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
// import Collapse from 'bootstrap/js/dist/collapse'
export default {
  data () {
    return {
      collapse: {},
      isActive: this.$route.name || 'products'
    }
  },
  methods: {
    signOut () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          console.log(res)
          this.$router.push('/login')
        }
      })
    }
  }
  // mounted () {
  //   this.collapse = new Collapse(this.$refs.collapse)
  // }
}
</script>
