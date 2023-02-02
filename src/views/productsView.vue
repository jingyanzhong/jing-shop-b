<template>
    <div class="text-end">
        <button class="btn btn-primary" type="button"
        @click="openModal(true)">新增產品列表</button>
    </div>
  <modal ref="ProductModal"
  :product="tempProduct"
  :is-new="isNew"
  @update-product="updateProduct"
  @edit-product="editProduct"
  ></modal>
  <table class="table mt-4">
    <thead>
        <tr>
      <th width="120">分類</th>
      <th>產品名稱</th>
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="100">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
    </thead>
    <tbody>
        <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.origin_price }}</td>
        <td>{{ item.price }}</td>
        <td v-if="item.is_enabled === 1">
            <span class="text-success">啟用</span>
        </td>
        <td v-else>
            <span class="text-info">未啟用</span>
        </td>
        <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteProduct(item)">刪除</button>
            </div>
        </td>
      </tr>
    </tbody>
  </table>
  <nav aria-label="Page navigation">
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"
    v-for="page in pagination.total_pages"
    :key="page">
        <a class="page-link" href="#">{{ page }}</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>

<script>
import modal from '@/components/ProductModal.vue'
export default {
  components: {
    modal
  },
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: ''
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`
      this.$http.get(api).then((res) => {
        console.log(res.data.products)
        this.products = res.data.products
        this.pagination = res.data.pagination
      })
    },
    openModal (isNew, item) {
      console.log(isNew, item)
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.ProductModal
      productComponent.showModal()
    },
    updateProduct (item) {
      this.tempProduct = item
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      const productComponent = this.$refs.ProductModal
      this.$http.post(api, { data: this.tempProduct })
        .then((res) => {
          console.log(res)
          productComponent.hideModal()
          productComponent.resetTempProduct()
          this.getProducts()
        })
    },
    editProduct (item) {
      this.tempProduct = item
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      const productComponent = this.$refs.ProductModal
      this.$http.put(api, { data: this.tempProduct })
        .then((res) => {
          console.log(res)
          productComponent.hideModal()
          productComponent.resetTempProduct()
          this.getProducts()
        })
    },
    deleteProduct (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      this.$http.delete(api)
        .then((res) => {
          console.log(res)
          this.getProducts()
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
