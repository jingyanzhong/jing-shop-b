<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="d-flex align-items-center">
    <h2 class="h5 me-auto mb-0">商品列表</h2>
    <div class="text-end">
        <button class="btn btn-primary" type="button"
        @click="openModal(true)">新增商品</button>
    </div>
  </div>
  <modal ref="ProductModal"
  :product="tempProduct"
  :is-new="isNew"
  @update-product="updateProduct"
  @edit-product="editProduct"
  ></modal>
  <div class="text-nowrap overflow-x-scroll">
    <table class="table mt-4">
      <thead>
          <tr>
        <th width="120">分類</th>
        <th>商品名稱</th>
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
            <i class="bi bi-toggle-on h4 text-success"></i>
          </td>
          <td v-else>
            <i class="bi bi-toggle-off h4 text-info"></i>
          </td>
          <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(item)">刪除</button>
              </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <pagination :page="pagination"
  @get-products="getProducts"></pagination>
  <!-- <nav aria-label="Page navigation">
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
</nav> -->
<deleteModal ref="deleteModal"
:delete="tempProduct"
@delete-product="deleteProduct"
></deleteModal>
</template>

<script>
import modal from '@/components/ProductModal.vue'
import deleteModal from '@/components/DeleteModal.vue'
import pagination from '@/components/PaginationComponent.vue'
export default {
  components: {
    modal, deleteModal, pagination
  },
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: '',
      isLoading: false
    }
  },
  methods: {
    getProducts (page) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        // console.log(res.data.products)
        this.isLoading = false
        this.products = res.data.products
        this.pagination = res.data.pagination
      })
    },
    openModal (isNew, item) {
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
          productComponent.hideModal()
          productComponent.resetTempProduct()
          this.getProducts()
        })
    },
    openDeleteModal (item) {
      this.tempProduct = { ...item }
      const deleteModalComponent = this.$refs.deleteModal
      deleteModalComponent.showModal()
    },
    deleteProduct (item) {
      const deleteModalComponent = this.$refs.deleteModal
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      this.$http.delete(api)
        .then((res) => {
          deleteModalComponent.hideModal()
          deleteModalComponent.resetTempProduct()
          this.getProducts()
        })
    }
  },
  created () {
    this.getProducts(1)
  }
}
</script>
