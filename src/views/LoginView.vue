<template>
  <section class="vh-100 bg-primary">
    <div class="bg-secondary py-2 mb-3">
      <h1 class="h4 mb-0 text-center text-primary fw-bold">京式會社管理後台</h1>
    </div>
    <div class="container">
      <form class="row justify-content-center" @submit.prevent="postApi">
        <div class="col-md-6">
          <h2 class="h3 mb-3 font-weight-normal text-center text-white fw-bold">
            登入Login
          </h2>
          <div class="mb-2 input-group">
            <label
              for="inputEmail"
              class="sr-only input-group-text rounded-start-pill bg-info text-white"
              ><i class="bi bi-person-fill"></i></label
            >
            <input
              type="email"
              id="inputEmail"
              class="form-control rounded-end-pill"
              placeholder="example@gmail.com"
              required
              autofocus
              v-model="user.username"
            />
          </div>
          <div class="mb-2 input-group">
            <label
              for="inputPassword"
              class="sr-only input-group-text rounded-start-pill bg-info text-white"
              ><i class="bi bi-key-fill"></i></label
            >
            <input
              type="password"
              id="inputPassword"
              class="form-control rounded-end-pill"
              placeholder="Password"
              required
              v-model="user.password"
            />
          </div>
          <div class="text-end mt-4">
            <button
              class="btn btn-lg btn-info btn-block w-100 rounded-pill fw-bold text-white"
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    postApi () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          this.$router.push('/dashBoard/products')
        }
      })
    }
  }
}
</script>
