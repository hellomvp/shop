const MainRoutes = [
    {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue'),
        children: MenuRoutes
    },
    {
        path: 'shopbag',
        name: 'Shopbag',
        component: () => import('../views/Shopbag.vue')
    },
    {
        path: 'user',
        name: 'User',
        component: () => import('../views/User.vue'),
        children: UserRouters
    },
];
const MenuRoutes = [
    {
        path: 'test',
        name: 'Test',
        component: () => import('../views/Test.vue')
    },
];

const UserRouters = [
    {
        path:'like',
        name:'like',
        component: () => import('../views/Mylike.vue')
    }
]
export const routes = [
    {
        path: '/',
        name: 'Main',
        redirect: 'home',
        component: () => import('../views/Main.vue'),
        children: MainRoutes
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/details/:pid',
        name: 'Details',
        component: () => import('../views/Details.vue')
    },
]