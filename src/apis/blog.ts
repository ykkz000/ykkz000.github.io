import api, {ApiResultPromise} from '@/apis/base'

export const createBlog = async (blog: Blog): ApiResultPromise<void> => {
    return await api.post(`/blogs/`, blog);
};

export const searchBlogByEmpty = async (pageNumber: number, pageSize: number): ApiResultPromise<PageContent<BlogAbstract>> => {
    return await api.get(`/blogs/search/${pageNumber}/${pageSize}`);
};

export const searchBlogByTitle = async (searchTitle: string, pageNumber: number, pageSize: number): ApiResultPromise<PageContent<BlogAbstract>> => {
    return await api.get(`/blogs/search/title/${searchTitle}/${pageNumber}/${pageSize}`);
};

export const searchBlogByTag = async (searchTag: string, pageNumber: number, pageSize: number): ApiResultPromise<PageContent<BlogAbstract>> => {
    return await api.get(`/blogs/search/tag/${searchTag}/${pageNumber}/${pageSize}`);
};

export const getBlog = async (id: number): ApiResultPromise<Blog> => {
    return await api.get(`/blogs/${id}`);
};

export const updateBlog = async (id: number, blog: Blog): ApiResultPromise<void> => {
    return await api.put(`/blogs/${id}`, blog);
};

export const deleteBlog = async (id: number): ApiResultPromise<void> => {
    return await api.delete(`/blogs/${id}`);
};
