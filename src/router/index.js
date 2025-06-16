import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../views/LoginForm.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
//import UserView from '@/views/UserView.vue'
import AboutView from '@/views/PacoteView.vue'
import HomeView from '@/views/HomeView.vue'
import UserView from '@/views/UserView.vue'
import LivroView from '@/views/LivroView.vue'
import PagamentoView from '@/views/PagamentoView.vue'
import LivroForm from '@/views/LivroForm.vue'





const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginForm,
    meta: { title: 'Login' }
  },
  {
    path: '/app',
    component: DefaultLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta: { title: 'Home' },
      },
      {
        path: '/pagamentos',
        name: 'pagamentos',
        component: PagamentoView,
        meta: { title: 'Lista de Pagamentos' },
      },
      {
        path: '/livros',
        name: 'livros',
        component: LivroView,
        meta: { title: 'Lista de Livros' },
      },
      {
        path: '/utilizadores',
        name: 'utilizadores',
        component: UserView,
        meta: { title: 'Todos Utilizadores' },
      },
      {
        path: '/pacotes',
        name: 'pacotes',
        component: AboutView,
        meta: { title: 'Todos Pacotes' },
      },
      {
        path: '/livrosform',
        name: 'Adicionar Livros',
        component: LivroForm,
        meta: { title: 'Publicar livro' },
      },
    ],
  },

  
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
