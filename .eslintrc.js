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

module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    parser: 'vue-eslint-parser', // 使用 vue-eslint-parser 解析 Vue 单文件组件
    parserOptions: {
        parser: '@typescript-eslint/parser', // 使用 @typescript-eslint/parser 解析 TypeScript
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended', // ESLint 推荐规则
        'plugin:vue/vue3-recommended', // Vue 3 推荐规则
        'plugin:@typescript-eslint/recommended', // TypeScript 推荐规则
    ],
    rules: {
        // 自定义规则
        'vue/multi-word-component-names': 'off', // 关闭 Vue 组件名必须多单词的规则
        '@typescript-eslint/no-explicit-any': 'off', // 关闭禁止使用 any 类型的规则
    },
};