<template>
  <div class="container">
    <HeaderView />
    <h2 class="title">PROYECTO 3</h2>
    
    <div class="intro">
      <p>
        En esta página descubrirás información detallada sobre los personajes más importantes de este universo ficticio, las casas más influyentes, las batallas más épicas y las regiones que han marcado la historia. Sumérgete en este fascinante mundo y conoce los eventos y figuras que han dejado una huella imborrable en su legado.  </p>
    </div>

    <ul class="links-list">
      <li><NuxtLink to="/personajes" class="link-item">Personajes information</NuxtLink></li>
      <li><NuxtLink to="/batallas" class="link-item">Batallas information</NuxtLink></li>
      <li><NuxtLink to="/casas" class="link-item">Casas information</NuxtLink></li>
      <li><NuxtLink to="/muertes" class="link-item">Muertes information</NuxtLink></li>
      <li><NuxtLink to="/regiones" class="link-item">Ubicaciones information</NuxtLink></li>
    </ul>
    
    <FooterView />
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.intro {
  margin-bottom: 30px;
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}

.links-list {
  list-style-type: none;
  padding-left: 0;
}

.link-item {
  font-size: 1.5rem;
  color: #007bff;
  text-decoration: none;
  display: block;
  padding: 10px;
  margin: 8px 0;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.link-item:hover {
  background-color: #007bff;
  color: white;
}

FooterView {
  margin-top: 50px;
  text-align: center;
  font-size: 0.9rem;
  color: #777;
}
</style>
