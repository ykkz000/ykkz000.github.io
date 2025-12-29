<!--
  - ykkz000_s blog
  - Copyright (C) 2025  ykkz000
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<template>
  <div class="card"><h1>查询标签：{{route.query.t}}</h1></div>
  <page-list no-data-msg="No blog" :page-content="data" :child="BlogAbstractItem" @changePage="changePage"/>
</template>

<script setup lang="ts">
import {searchBlogByTag} from "@/apis";
import {ref} from "vue";
import BlogAbstractItem from "@/components/items/BlogAbstractItem.vue";
import PageList from "@/components/lists/PageList.vue";
import {useRoute} from "vue-router";

let data = ref<PageContent<BlogAbstract>>({
  totalPages: 0,
  totalElements: 0,
  pageSize: 0,
  pageNumber: 0,
  content: [],
} as PageContent<BlogAbstract>);

const route = useRoute();

function changePage(pageNumber: number, pageSize: number = 10) {
  searchBlogByTag(route.query.t as string, pageNumber - 1, pageSize)
      .then(res => {
        data.value.totalElements = res.data.data.totalElements;
        data.value.totalPages = res.data.data.totalPages;
        data.value.pageNumber = res.data.data.pageNumber + 1;
        data.value.pageSize = res.data.data.pageSize;
        data.value.content.length = 0;
        data.value.content.push(...res.data.data.content);
      });
}

changePage(1);
</script>