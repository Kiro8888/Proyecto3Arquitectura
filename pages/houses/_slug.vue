<template>
  <div class="container">
    <HeaderView />
    <div class="row">
      <div class="three columns">
      </div>
      <div class="six columns">
        <h1>Detalles de la casa</h1>
        <!-- Información principal del casa -->
        <h4>Nombre: {{ casa.House_name }}</h4>
        <h4>Region: {{ casa.Region }}</h4>  </div>
      <div class="two columns"></div>
    </div>
    <FooterView />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    try {
      // Cargar todos las casas
      const data = await $content('casas').fetch();
      const casas = data.houses || []; // Acceder al array bajo 'houses'

      // Encontrar la casa por su nombre (slug)
      const casa = casas.find((p) => p.House_name === params.slug);

      // Manejar el caso en que no se encuentre la casa
      if (!casa) {
        console.warn(`No se encontró la casa con el slug: ${params.slug}`);
        return { casa: {} };
      }

      return { casa };
    } catch (error) {
      console.error('Error loading casa:', error);
      return { casa: {} };
    }
  },
};
</script>

