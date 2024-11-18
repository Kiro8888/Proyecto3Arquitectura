<template>
    <div class="container">
      <HeaderView />
      <h3 style="margin-top: 15px">muertes</h3>
      <p>Explore a collection of muertes from around the world.</p>
      <ul>
        <li v-for="muerte in paginatedmuertes" :key="muerte.Name">
          <NuxtLink :to="{ name: 'death-slug', params: { slug: muerte.Name } }">
    {{ muerte.Name }}
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
        // Cargar datos del archivo muertes.json
        const data = await $content('muertes').fetch();
        const muertes = data.deaths || []; // Acceder al array bajo 'characters'
        return {
            muertes,
        };
      } catch (error) {
        console.error('Error loading muertes:', error);
        return {
            muertes: [],
        };
      }
    },
    data() {
      return {
        currentPage: 1,
        itemsPerPage: 10, // Número de muertes por página
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.muertes.length / this.itemsPerPage);
      },
      paginatedmuertes() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.muertes.slice(start, end);
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
  