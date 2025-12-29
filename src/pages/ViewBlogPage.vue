<template>
  <div class="card">
    <h2>{{ blog.title }}</h2>
    <div class="time-container">
      <div>最后更新时间
        <el-icon size="14px">
          <Clock/>
        </el-icon>
        {{ timestampToDate(blog.lastModifiedDate) }}
      </div>
      <div>创建时间
        <el-icon size="14px">
          <Clock/>
        </el-icon>
        {{ timestampToDate(blog.createdDate) }}
      </div>
    </div>
    <p>
      <el-tag v-for="tag in blog.blogTags" :key="tag" class="blog-tag">
        <router-link :to="{path: '/tag', query: {t: tag}}" class="tag-link">{{ tag }}</router-link>
      </el-tag>
    </p>
  </div>
  <div class="card">
    <MdPreview v-model="blog.content"/>
  </div>
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {getBlog} from "@/apis";
import {ref} from "vue";
import {Clock} from "@element-plus/icons-vue";
import {timestampToDate} from "@/utils";
import {MdPreview} from "md-editor-v3";

import "md-editor-v3/lib/style.css";

const route = useRoute();

const blog = ref<Blog>({
  id: -1,
  title: "",
  blogTags: [],
  content: "",
  lastModifiedDate: 0,
  createdDate: 0,
});

getBlog(Number(route.params.blogId)).then(res => {
  blog.value = res.data.data;
});
</script>
<style scoped>
</style>
