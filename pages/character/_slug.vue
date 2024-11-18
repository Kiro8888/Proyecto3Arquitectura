<template>
  <div class="container">
    <HeaderView />
    <div class="row main-content">
      <div class="three columns image-container">
        <!-- Imagen del personaje -->
        <img 
          v-if="personaje.characterImageFull" 
          :src="personaje.characterImageFull" 
          :alt="`Image of ${personaje.characterName}`" 
          class="character-image"
        />
      </div>
      <div class="six columns character-info">
        <!-- Información principal del personaje -->
        <h4 class="character-name">{{ personaje.characterName }}</h4>
        
        <p v-if="personaje.houseName">
          House: 
          <router-link 
            v-if="casa"
            :to="`/houses/${encodeURIComponent(casa.House_name)}`"
            class="house-link"
          >
            {{ casa.House_name }}
          </router-link>
          <span v-else>{{ personaje.houseName }}</span>
        </p>
        
        <p v-if="personaje.royal" class="royal-status">Royal: Yes</p>
        <p v-if="personaje.nickname">Nickname: {{ personaje.nickname }}</p>
        
        <!-- Relacionados -->
        <p v-if="personaje.parents && personaje.parents.length">Parents: {{ personaje.parents.join(', ') }}</p>
        <p v-if="personaje.siblings && personaje.siblings.length">Siblings: {{ personaje.siblings.join(', ') }}</p>
        <p v-if="personaje.killedBy && personaje.killedBy.length">Killed By: {{ personaje.killedBy.join(', ') }}</p>
        <p v-if="personaje.killed && personaje.killed.length">Killed: {{ personaje.killed.join(', ') }}</p>
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
      // Cargar datos de personajes y casas
      const personajesData = await $content('personajes').fetch();
      const casasData = await $content('casas').fetch();

      const personajes = personajesData.characters || [];
      const casas = casasData.houses || [];

      // Encontrar el personaje por su nombre (slug)
      const personaje = personajes.find((p) => p.characterName === params.slug);

      if (!personaje) {
        console.warn(`No se encontró el personaje con el slug: ${params.slug}`);
        return { personaje: {}, casa: null };
      }

      // Buscar la casa correspondiente
      let casa = null;
      if (personaje.houseName) {
        casa = casas.find((h) =>
          h.House_name.toLowerCase().includes(personaje.houseName.toLowerCase())
        );
      }

      return { personaje, casa };
    } catch (error) {
      console.error('Error loading personaje or casa:', error);
      return { personaje: {}, casa: null };
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

.character-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.character-info {
  padding-left: 20px;
}

.character-name {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.house-link {
  color: #1abc9c;
  text-decoration: none;
}

.house-link:hover {
  text-decoration: underline;
  color: #16a085;
}

.royal-status {
  font-weight: bold;
  color: #e74c3c;
}

p {
  font-size: 1.1rem;
  color: #34495e;
  margin: 10px 0;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    padding: 10px;
  }

  .image-container, .character-info {
    width: 100%;
    margin-bottom: 20px;
  }

  .character-name {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
}
</style>
