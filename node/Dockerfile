
FROM node
# WORKDIR的路径为 node 代码在容器内的存放地址，的与 yml里配置的 volumes 代码地址一致，
# 把代码与主机地址的映射反倒yml是因为，让主机代码更新，容器代码也时时更新
WORKDIR /home/node_projiect 
EXPOSE 7001
ENTRYPOINT npm install --registry=https://registry.npm.taobao.org && npm run dev