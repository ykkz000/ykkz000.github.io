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
  <div class="card">
    <el-form>
      <el-form-item label="标题">
        <el-input v-model="blog.title" placeholder="Title"/>
      </el-form-item>
      <el-form-item label="标签">
        <el-input-tag v-model="blog.blogTags" placeholder="Tags"/>
      </el-form-item>
      <el-form-item>
        <MdEditor v-model="blog.content" lang="zh-CN" :max-length="MAX_BLOG_LENGTH" showToolbarName autoDetectCode @on-upload-img="onUploadImg"/>
      </el-form-item>
      <el-form-item class="editor-footer">
        <div class="child-flex-right editor-footer-container">
          <el-button type="primary" @click="remove" color="var(--theme-background-color)" v-if="blog.id !== -1"><span
              class="button-text">删除</span></el-button>
          <el-button type="primary" @click="submit" color="var(--theme-background-color)"><span
              class="button-text">提交</span></el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {createBlog, deleteBlog, getBlog, updateBlog} from "@/apis";
import {useRoute} from "vue-router";
import {MdEditor} from "md-editor-v3";
import {ElMessage} from "element-plus";
import router from "@/router";
import {convertImgToBase64} from "@/utils";

import "md-editor-v3/lib/style.css";

const MAX_BLOG_LENGTH = 2000000;

const route = useRoute();

const blog = ref<Blog>({
  id: -1,
  title: "",
  blogTags: [],
  content: "",
  lastModifiedDate: 0,
  createdDate: 0,
});

const blogId = Number(route.params.blogId);

if (blogId !== -1) {
  getBlog(blogId).then(res => {
    blog.value = res.data.data;
  });
}

const remove = () => {
  deleteBlog(blogId).then(res => {
    ElMessage.info(res.data.message);
    router.push('/admin/blog');
  });
}

const onUploadImg =
    async (files: Array<File>, callback: (urls: string[] | {
      url: string;
      alt: string;
      title: string
    }[]) => void) => {
      const res = await Promise.all(
          files.map((file) => {
            return new Promise((rev, rej) => {
              convertImgToBase64(file).then(reader => {
                rev(reader.result);
              })
            })
          }));
      callback(res.map(url => url as string));
    };

const submit = () => {
  if (blog.value.id === -1) {
    createBlog(blog.value).then(res => {
      ElMessage.info("创建成功");
      router.push('/admin/blog');
    });
  } else {
    updateBlog(blogId, blog.value).then(res => {
      ElMessage.info("更新成功");
      router.push('/admin/blog');
    });
  }
}
</script>
<style scoped>
.editor-footer {
  width: 100%;
}

.editor-footer-container {
  width: 100%;
}
</style>
