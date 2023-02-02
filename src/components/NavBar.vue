<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid" ref="collapse">
      <a class="navbar-brand text-primary fw-bold" href="#">京式會社</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link"
              aria-current="page"
              href="#"
              @click.prevent="isActive = 'Home'"
              :class="{ active: isActive === 'Home' }"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/dashBoard/products"
              class="nav-link"
              @click.prevent="isActive = 'products'"
              :class="{ active: isActive === 'products' }"
              >產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click.prevent="signOut(), (isActive = 'signOut')"
              :class="{ active: isActive === 'signOut' }"
              >登出</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Collapse from 'bootstrap/js/dist/collapse'
export default {
  data () {
    return {
      collapse: {},
      isActive: 'products'
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
  },
  mounted () {
    this.collapse = new Collapse(this.$refs.collapse)
  }
}
</script>
