<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !hasPre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="hasPreFn()"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
      v-for="page in pagination.total_pages"
      :key="page"
      :class="{ active: currentPage === page }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="updatePage(page)"
          >{{ page }}</a
        >
      </li>
      <li class="page-item" :class="{ disabled: !hasNext }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="hasNextFn()"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    page () {
      this.pagination = this.page
      this.totalPage = this.page.total_pages
      this.currentPage = this.page.current_page
      this.hasPre = this.page.has_pre
      this.hasNext = this.page.has_next
    }
  },
  data () {
    return {
      pagination: {},
      totalPage: '',
      currentPage: '',
      hasPre: '',
      hasNext: ''
    }
  },
  methods: {
    updatePage (page) {
      this.currentPage = page
      this.disabled()
      this.getProduct()
    },
    hasPreFn () {
      this.currentPage = this.currentPage - 1
      this.disabled()
      this.getProduct()
    },
    hasNextFn () {
      this.currentPage = this.currentPage + 1
      this.disabled()
      this.getProduct()
    },
    disabled () {
      this.currentPage <= 1 ? (this.hasPre = false) : (this.hasPre = true)
      this.currentPage >= this.totalPage
        ? (this.hasNext = false)
        : (this.hasNext = true)
    },
    getProduct () {
      this.$emit('get-products', this.currentPage)
    }
  }
}
</script>
