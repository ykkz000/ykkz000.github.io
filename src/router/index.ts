/*
 * ykkz000_s blog
 * Copyright (C) 2025  ykkz000
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import {useGlobalStore} from "@/store";
import {getMe} from "@/apis";
import {ElMessage} from "element-plus";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/HomePage.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/AboutPage.vue'),
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('@/pages/SearchPage.vue'),
    },
    {
        path: '/tag',
        name: 'Tag',
        component: () => import('@/pages/TagPage.vue'),
    },
    {
        path: '/view/:blogId',
        name: 'ViewBlog',
        component: () => import('@/pages/ViewBlogPage.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/LoginPage.vue'),
    },
    {
        path: '/admin',
        name: 'Admin',
        meta: {requiresAuth: true as boolean, requiredAdmin: true as boolean},
        component: () => import('@/pages/AdminPage.vue'),
        children: [
            {
                path: '',
                name: 'AdminHome',
                component: () => import('@/pages/admin/AdminHomePage.vue'),
            },
            {
                path: 'blog',
                name: 'AdminBlog',
                component: () => import('@/pages/admin/AdminBlogPage.vue'),
            },
            {
                path: 'edit',
                children: [
                    {
                        path: 'blog/:blogId',
                        name: 'AdminEditBlog',
                        component: () => import('@/pages/admin/AdminEditBlogPage.vue'),
                    }
                ]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const globalStore = useGlobalStore();
    getMe().then(res => {
        globalStore.setCurrentUser(res.data.data);
        next();
    }).catch(err => {
        globalStore.setCurrentUser({id: -1, username: "", role: 1});
        next();
    });
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (useGlobalStore().currentUser.id === -1) {
            ElMessage.error("请先登录");
            next({path: '/login', query: {redirect: to.fullPath}});
            return;
        }
        if (to.meta.requiredAdmin && useGlobalStore().currentUser.role != 0) {
            ElMessage.error("没有权限");
            next({path: '/'});
            return;
        }
        next();
    } else {
        next();
    }
});

export default router;
