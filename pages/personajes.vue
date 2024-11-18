<template>
  <div class="container">
    <HeaderView />
    <h3 style="margin-top: 15px">Personajes</h3>
    <p>Explore a collection of personajes from around the world.</p>
    <ul>
      <li v-for="personaje in paginatedPersonajes" :key="personaje.characterName">
        <NuxtLink :to="{ name: 'character-slug', params: { slug: personaje.characterName } }">
  {{ personaje.characterName }}
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
      // Cargar datos del archivo personajes.json
      const data = await $content('personajes').fetch();
      const personajes = data.characters || []; // Acceder al array bajo 'characters'
      return {
        personajes,
      };
    } catch (error) {
      console.error('Error loading personajes:', error);
      return {
        personajes: [],
      };
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10, // Número de personajes por página
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.personajes.length / this.itemsPerPage);
    },
    paginatedPersonajes() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.personajes.slice(start, end);
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
