<template>
  <ul class="pagination">
    <li
      class="page-item"
      :class="{ active: currentPage === page }"
      v-for="page in pages"
      :key="page"
    >
      <router-link
        class="page-link"
        :to="{ path: url, query: { page: page } }"
        >{{ page }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import { range } from "@/helpers/utils.js";
export default {
  name: "McvPagination",
  props: {
    // :total="total" :perPage="perPage" :currentPage="currentPage" :url="url"
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    pages() {
      const pagesCount = Math.ceil(this.total / this.perPage);
      return range(1, pagesCount);
    },
  },
};
</script>