<template>
  <div class="container">
    <HeaderView />
    <div class="row">
      <div class="three columns"></div>
      <div class="six columns region-info">
        <!-- Títulos de la región -->
        <h2 class="region-title">{{ region.location }}</h2>
        <h4 class="region-sub-location">Sub ubicaciones: {{ region.subLocation }}</h4>
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
      // Cargar datos de regiones
      const data = await $content('regiones').fetch();
      const regiones = data.regions || [];

      // Encontrar la región por el slug
      const region = regiones.find((p) => p.location === params.slug);

      if (!region) {
        console.warn(`No se encontró la región con el slug: ${params.slug}`);
        return { region: {} };
      }

      return { region };
    } catch (error) {
      console.error('Error cargando la región:', error);
      return { region: {} };
    }
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f7f7f7;
}

.region-info {
  text-align: center;
  padding: 20px;
}

.region-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.region-sub-location {
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .region-title {
    font-size: 1.5rem;
  }

  .region-sub-location {
    font-size: 1.2rem;
  }

  .region-info {
    padding: 10px;
  }
}
</style>
