<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>Bookane Admin</v-app-bar-title>
      <v-spacer />
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar size="32">
              <v-img :src="user.photo" alt="Profile" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" :rail="mini" permanent  color="primary" 
    dark>
      
      <v-list>
        <v-divider />
        <v-list-item to="/home" prepend-icon="mdi-home" title="Home" />
        <v-list-item to="/pagamentos" prepend-icon="mdi-cash-multiple" title="Pagamentos" />
        <v-list-item to="/livros" prepend-icon="mdi-book" title="Livros" />
        <v-list-item to="/pacotes" prepend-icon="mdi-package-variant" title="Pacotes" />
        <v-list-item to="/utilizadores" prepend-icon="mdi-account" title="Utilizadores" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app color="#efefef" dark>
      <v-col class="text-center">© 2025. Bookane</v-col>
    </v-footer>
  </v-app>
</template>

  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const drawer = ref(true)
  const mini = ref(false)
  const router = useRouter()
  
  const user = {
    name: 'Tomasia Guambe',
    photo: 'https://randomuser.me/api/portraits/men/85.jpg', // Replace with real profile image
  }
  
  const logout = () => {
    // Do logout logic here (clear token, etc.)
    router.push({ name: 'login' })
  }
  </script>
  