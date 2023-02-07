<template>
  <div class="vh-100 bg-light position-relative">
    <ToastMessage></ToastMessage>
    <div class="row mx-lg-5 py-lg-5 py-3 bg-light">
      <div class="col-lg-3 py-lg-5 py-3">
        <Narbar></Narbar>
        <hr class="d-lg-none">
      </div>
      <div class="col-lg-9 border-start py-lg-3">
        <div class="container-fluid">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import emitter from '@/methods/emitter'
import ToastMessage from '@/components/ToastMessages.vue'
import Narbar from '@/components/NavBar.vue'
export default {
  components: {
    Narbar, ToastMessage
  },
  provide () {
    return {
      emitter
    }
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
      } else {
        emitter.emit('push-message', {
          style: 'success',
          title: '登入成功'
        })
      }
    })
  }
}
</script>
