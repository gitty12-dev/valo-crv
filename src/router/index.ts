import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/child/ProfileView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      redirect: { name: 'home' },
    },
    {
      path: '/about',
      name: 'about',
      alias: '/aboutus',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      // ★meta Fields(ナビゲーションガード)
      // meta: { requireAuth: true},
      // ★Per Route Guard(ナビゲーションガード)
      // beforeEnter: (to, from) => {
      //   const isAuthenticated = false;
    
      //   if (!isAuthenticated && to.name !== 'home') {
      //     return { name: 'home' };
      //   }
      // },
      beforeEnter: (to, from) => {
        if (Object.keys(to.query).length) {
          return { path: to.path, query: {} }
        }
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/users/:userId',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      props: (route) => ({
        userId: route.params.userId,
      }),
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    }
  ]
});

// ★Global Before Guards(ナビゲーションガード)
router.beforeEach((to, from) => {
  console.log('to:', to);
  console.log('from:', from);

  // if ( to.meta.requireAuth && to.name !== 'home') {
  //   return { name: 'home' };
  // }

});

export default router
