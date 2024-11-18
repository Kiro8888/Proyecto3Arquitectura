<template>
  <div class="container">
    <HeaderView />
    <div class="row main-content">
      <div class="three columns image-container">
        <!-- Imagen del muerte (por ejemplo, imagen del personaje fallecido) -->
        <!-- Si tienes una imagen del personaje, agrega un src aquí -->
        <img 
          v-if="muerte.image" 
          :src="muerte.image" 
          :alt="`Image of ${muerte.Name}`" 
          class="death-image"
        />
      </div>
      <div class="six columns death-info">
        <!-- Información principal de la muerte -->
        <h4 class="death-name">
          <a :href="muerteLink" class="death-link">{{ muerte.Name }}</a>
        </h4>
        <h5 class="death-allegiances">{{ muerte.Allegiances }}</h5>
        <!-- Aquí puedes agregar más información si es necesario -->
        <!-- <h5>{{ muerte.DeathYear }}</h5> -->
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
      // Cargar todos los muertes
      const data = await $content('muertes').fetch();
      const muertes = data.deaths || [];

      // Encontrar la muerte por su nombre (slug)
      const muerte = muertes.find((p) => p.Name === params.slug);

      // Manejar el caso en que no se encuentre la muerte
      if (!muerte) {
        console.warn(`No se encontró la muerte con el slug: ${params.slug}`);
        return { muerte: {}, muerteLink: "" };
      }

      // Buscar el personaje correspondiente a esta muerte
      const personajesData = await $content('personajes').fetch();
      const personajes = personajesData.characters || [];

      // Buscar el personaje con el mismo nombre
      const personaje = personajes.find((p) => p.characterName === muerte.Name);

      // Si se encuentra el personaje, obtener el enlace completo a su detalle
      const muerteLink = personaje ? `/character/${encodeURIComponent(personaje.characterName)}` : "";

      return { muerte, muerteLink };
    } catch (error) {
      console.error('Error loading muerte or personajes:', error);
      return { muerte: {}, muerteLink: "" };
    }
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f7f7f7;
}

.main-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.image-container {
  text-align: center;
}

.death-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.death-info {
  padding-left: 20px;
}

.death-name {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.death-link {
  color: #e74c3c;
  text-decoration: none;
}

.death-link:hover {
  text-decoration: underline;
  color: #c0392b;
}

.death-allegiances {
  font-size: 1.1rem;
  color: #34495e;
  margin: 10px 0;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    padding: 10px;
  }

  .image-container, .death-info {
    width: 100%;
    margin-bottom: 20px;
  }

  .death-name {
    font-size: 1.5rem;
  }

  .death-allegiances {
    font-size: 1rem;
  }
}
</style>
