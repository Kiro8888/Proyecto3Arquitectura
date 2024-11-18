<template>
  <div class="container">
    <HeaderView />
    <h3 style="margin-top: 15px">casas</h3>
    <p>Explore a collection of casas from around the world.</p>
    <ul>
      <li v-for="casa in paginatedcasas" :key="casa.House_name">
        <NuxtLink :to="{ name: 'houses-slug', params: { slug: casa.House_name } }">
  {{ casa.House_name }}
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
      // Cargar datos del archivo casacasas.json
      const data = await $content('casas').fetch();
      const casas = data.houses || []; // Acceder al array bajo 'houses'
      return {
        casas,
      };
    } catch (error) {
      console.error('Error loading casas:', error);
      return {
        casas: [],
      };
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10, // Número de casas por página
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.casas.length / this.itemsPerPage);
    },
    paginatedcasas() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.casas.slice(start, end);
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
