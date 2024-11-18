<template>
  <div class="container">
    <HeaderView />
    <div class="row main-content">
      <div class="ten columns">
        <!-- Información principal de la batalla -->
        <h2>Detalle de la Batalla</h2>
        <div v-if="batalla.name">
          <div class="batalla-detail">
            <h4>Nombre: {{ batalla.name }}</h4>
            <h4>Año: {{ batalla.year }}</h4>
            <h4>Rey Atacante: {{ batalla.attacker_king }}</h4>
            <h4>Rey Defensor: {{ batalla.defender_king }}</h4>
            <h4>Ubicación: {{ batalla.location }}</h4>
            <h4>
              Región: 
              <router-link :to="`/region/${batalla.region}`" class="region-link">
                {{ batalla.region }}
              </router-link>
            </h4>
          </div>
        </div>
        <div v-else>
          <p>Batalla no encontrada.</p>
        </div>
      </div>
      <div class="two columns"></div>
    </div>
    <FooterView />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    try {
      // Cargar todas las batallas
      const data = await $content('batallas').fetch();
      const batallas = data.battles || [];

      // Encontrar la batalla por su slug
      const batalla = batallas.find((b) => b.name === params.slug);

      // Manejar el caso en que no se encuentre la batalla
      if (!batalla) {
        console.warn(`No se encontró la batalla con el slug: ${params.slug}`);
        return { batalla: {} };
      }

      return { batalla };
    } catch (error) {
      console.error('Error loading batalla:', error);
      return { batalla: {} };
    }
  },
};
</script>

<style scoped>
.container {
  padding: 10px;
  background-color: #f7f7f7;
}

.main-content {
  display: flex;
  justify-content: space-between;
}

h2 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #2c3e50;
}

.batalla-detail h4 {
  margin: 10px 0;
  font-size: 1.2rem;
  color: #34495e;
}

.region-link {
  color: #1abc9c;
  text-decoration: none;
  font-weight: bold;
}

.region-link:hover {
  text-decoration: underline;
  color: #16a085;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    padding: 10px;
  }

  .six.columns, .two.columns {
    width: 100%;
    margin-bottom: 20px;
  }

  .batalla-detail h4 {
    font-size: 1rem;
  }
}
</style>
