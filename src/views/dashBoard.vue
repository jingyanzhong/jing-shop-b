<template>
  <div class="vh-100 bg-light">
    <div class="row mx-5 py-5">
      <div class="col col-md-2 py-5">
        <Narbar></Narbar>
      </div>
      <div class="col col-md-10 border-start">
        <div class="container-fluid">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Narbar from '@/components/NavBar.vue'
export default {
  components: {
    Narbar
  },
  created () {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexToken'))
      ?.split('=')[1]
    this.$http.defaults.headers.common.Authorization = cookieValue
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api).then((res) => {
      if (!res.data.success) {
        this.$router.push('/login')
      }
    })
  }
}
</script>
