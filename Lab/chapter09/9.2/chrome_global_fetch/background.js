self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted:', event.request.url);
  // 在这里可以处理或者修改请求
  // 例如：返回自定义的响应、从缓存中获取资源等
});
