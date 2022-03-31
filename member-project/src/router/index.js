import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login';

Vue.use(VueRouter);

const routes = [
  {
    path : "/login",
    name : "login",
    component: Login
  },
  {
    path : "/",
    name : "layout",
    redirect : "/index",
    component: () => import('../components/Layout.vue'),
    children : [
      {
        path : "index",
        name : "index",
        component: () => import('../views/home'),
      }
    ]
  },
  {
    path : "/member",
    name : "layout",
    component: () => import('../components/Layout.vue'),
    children : [
      {
        path : "/",
        name : "member",
        component: () => import('../views/member'),
      }
    ]
  },
  {
    path : "/supplier",
    name : "layout",
    component: () => import('../components/Layout.vue'),
    children : [
      {
        path : "/",
        name : "supplier",
        component: () => import('../views/supplier'),
      }
    ]
  },
  {
    path : "/goods",
    name : "layout",
    component: () => import('../components/Layout.vue'),
    children : [
      {
        path : "/",
        name : "goods",
        component: () => import('../views/goods')
      }
    ]
  },
  {
    path : "/staff",
    name : "layout",
    component: () => import('../components/Layout.vue'),
    children : [
      {
        path : "/",
        name : "staff",
        component: () => import('../views/staff'),
      }
    ]
  }
  /*
  {
    path : "/layout",
    name : "layout",
    redirect : "/index",
    component: () => import('../components/Layout.vue'),
    children : [
      {
        path : "index",
        name : "index",
        component: () => import('../views/home'),
      },
      {
        path : "member",
        name : "member",
        component: () => import('../views/member'),
      },
      {
        path : "supplier",
        name : "supplier",
        component: () => import('../views/supplier'),
      },
      {
        path : "goods",
        name : "goods",
        component: () => import('../views/goods'),
      },
      {
        path : "staff",
        name : "staff",
        component: () => import('../views/staff'),
      }
    ]
  }*/
];

const router = new VueRouter({
  routes,
});


export default router;
