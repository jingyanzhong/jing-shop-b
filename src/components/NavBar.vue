<template>
  <div class="d-flex align-items-start">
    <nav class="nav flex-column nav-pills me-3">
      <a class="mb-3 text-primary text-decoration-none fw-bold h4" href="#">京式會社 | <span class="h5 fw-normal">管理後台</span></a>
      <router-link
        to="/dashBoard/products"
        class="nav-link"
        @click.prevent="isActive = 'products'"
        :class="{ active: isActive === 'products' }"
        >商品列表
      </router-link>
      <router-link
        to="/dashBoard/orderList"
        class="nav-link"
        @click.prevent="isActive = 'orderList'"
        :class="{ active: isActive === 'orderList' }"
        >訂單查詢
      </router-link>
      <router-link
        to="/dashBoard/coupon"
        class="nav-link"
        @click.prevent="isActive = 'coupon'"
        :class="{ active: isActive === 'coupon' }"
        >優惠券設定
      </router-link>
      <a
        class="nav-link"
        href="#"
        @click.prevent="signOut(), (isActive = 'signOut')"
        :class="{ active: isActive === 'signOut' }"
        >登出</a
      >
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
