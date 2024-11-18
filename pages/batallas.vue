<template>
  <div class="container">
    <HeaderView />
    <h3 style="margin-top: 15px">batallas</h3>
    <p>Explore a collection of batallas from around the world.</p>
    <ul>
      <li v-for="batalla in paginatedbatallas" :key="batalla.name">
        <NuxtLink :to="{ name: 'battle-slug', params: { slug: batalla.name } }">
  {{ batalla.name }}
</NuxtLink>

      </li>
    </ul>

    <!-- Paginación -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
    </div>

    <FooterView />
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    try {
      // Cargar datos del archivo batallas.json
      const data = await $content('batallas').fetch();
      const batallas = data.battles || []; // Acceder al array bajo 'characters'
      return {
        batallas,
      };
    } catch (error) {
      console.error('Error loading batallas:', error);
      return {
        batallas: [],
      };
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10, // Número de batallas por página
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.batallas.length / this.itemsPerPage);
    },
    paginatedbatallas() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.batallas.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
