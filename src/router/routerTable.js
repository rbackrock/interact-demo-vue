import Layout from '@/layouts/index.vue'
import Home from '@/views/home/index.vue'
import Visualization from '@/views/visualization/index.vue'
import Demo from '@/views/demo/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: {
      name: 'Home'
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/visualization',
        name: 'Visualization',
        component: Visualization
      },
      {
        path: '/demo',
        name: 'Demo',
        component: Demo
      }
    ]
  }
]

export default routes