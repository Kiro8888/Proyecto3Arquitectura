<template>
  <div class="navbar">
    <NuxtLink class="nav-link" to="/">Home</NuxtLink>
    <NuxtLink class="nav-link" to="/personajes">Personajes</NuxtLink>
    <NuxtLink class="nav-link" to="/batallas">Batallas</NuxtLink>
    <NuxtLink class="nav-link" to="/casas">Casas</NuxtLink>
    <NuxtLink class="nav-link" to="/muertes">Muertes</NuxtLink>
    <NuxtLink class="nav-link" to="/regiones">Ubicaciones</NuxtLink>
  </div>
</template>

<style scoped>
/* Barra de navegación */
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #2c3e50; /* Gris oscuro */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilo de los enlaces de la barra */
.nav-link {
  padding: 10px 20px;
  font-size: 1.1rem;
  color: #ecf0f1; /* Blanco suave */
  background-color: #34495e; /* Gris más claro */
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  display: inline-block;
}

/* Efecto hover para los enlaces */
.nav-link:hover {
  background-color: #16a085; /* Verde suave */
  color: white;
  transform: scale(1.05);
}

/* Efecto active para los enlaces (cuando se hace clic) */
.nav-link:active {
  background-color: #1abc9c; /* Verde más oscuro */
}

/* Estilos responsivos para pantallas pequeñas */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    margin: 5px 0;
  }
}
</style>
