<template>
    <div class="container">
      <HeaderView />
      <h3 style="margin-top: 15px">regiones</h3>
      <p>Explore a collection of regiones from around the world.</p>
      <ul>
        <li v-for="region in paginatedregiones" :key="region.location">
          <NuxtLink :to="{ name: 'region-slug', params: { slug: region.location } }">
    {{ region.location }}
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
     
        const data = await $content('regiones').fetch();
        const regiones = data.regions || []; 
        return {
            regiones,
        };
      } catch (error) {
        console.error('Error loading regiones:', error);
        return {
            regiones: [],
        };
      }
    },
    data() {
      return {
        currentPage: 1,
        itemsPerPage: 10,
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.regiones.length / this.itemsPerPage);
      },
      paginatedregiones() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.regiones.slice(start, end);
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
  