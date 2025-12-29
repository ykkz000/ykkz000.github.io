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
  <div class="card"><h1>YKKZ000的博客</h1></div>
  <load-more-list no-data-msg="No blog" :page-content="data" :child="BlogAbstractItem" @load-more="loadMore"/>
</template>

<script setup lang="ts">
import {searchBlogByEmpty} from "@/apis";
import {ref} from "vue";
import LoadMoreList from "@/components/lists/LoadMoreList.vue";
import BlogAbstractItem from "@/components/items/BlogAbstractItem.vue";

let data = ref<PageContent<BlogAbstract>>({
  totalPages: 0,
  totalElements: 0,
  pageSize: 0,
  pageNumber: 0,
  content: [],
} as PageContent<BlogAbstract>);

let currentPage = ref(0);

const updateList = (pageNumber: number) => {
  searchBlogByEmpty(pageNumber - 1, 10)
      .then(res => {
        data.value.totalElements = res.data.data.totalElements;
        data.value.totalPages = res.data.data.totalPages;
        data.value.pageNumber = res.data.data.pageNumber + 1;
        data.value.pageSize = res.data.data.pageSize;
        data.value.content.push(...res.data.data.content);
      });
}

updateList(1);

const loadMore = () => {
  if (data.value.totalPages > currentPage.value) {
    currentPage.value++;
    updateList(currentPage.value);
  }
}
</script>