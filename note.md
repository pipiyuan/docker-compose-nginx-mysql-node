# docker 笔记

## 一、docker 常用命令

```
#查看当前docker版本   
docker -v   
#查看当前本地所有镜像
docker images
#构造镜像,用法docker build -t 镜像名称 .
docker build -t docker_demo .
#用于容器与主机之间的数据拷贝。用法docker cp 主机文件地址 容器内地址。12d7f14v45cv为容器id。
docker cp /www/runoob 12d7f14v45cv:/www/
#创建一个新的容器并运行，-d为后台执行，-p 9000:3000前面为主机端口，后面是容器端口。docker_demo镜像名
docker run -d -p 9000:3000 docker_demo
#启动已被停止的容器
docker start docker_demo
#关闭已被启动的容器
docker stop docker_demo
#重新启动容器
docker restart docker_demo
#杀掉一个运行中的容器。
docker kill -s KILL docker_demo
#删除一个或多少容器。-f :通过SIGKILL信号强制删除一个运行中的容器-l :移除容器间的网络连接，而非容器本身-v :-v 删除与容器关联的卷
docker rm -f docker_demo、docker_demo1
#在运行的容器中执行命令。104e28f2f072容器id
sudo docker exec -it 104e28f2f072 /bin/bash 
#列出容器。 -a:所有容器包含没有运行的
docker ps 
#获取容器获取容器的日志 104e28f2f072容器id，-t:显示时间戳
docker logs -f -t 104e28f2f072 
#登陆镜像仓库
docker login
#获取镜像
docker pull 
#上传镜像
docker push
#查看指定镜像的创建历史。
docker history docker_demo
```

## 二、Dockerfile 常用命令
[docker 文档](https://yeasy.gitbooks.io/docker_practice/content/image/dockerfile/arg.html)

| 部分 |	命令 |
| :--- |:---:|
| 基础镜像信息 |	FROM |
| 维护者信息 |	MAINTAINER |
| 镜像操作指令 |	RUN、COPY、ADD、EXPOSE、WORKDIR、ONBUILD、USER、VOLUME等 |
| 容器启动时执行指令 |	CMD、ENTRYPOINT |
```
#ARG变量,也可以接受yml中传的参数 ARG ROOT_PATH（定义在yml）
ARG ROOT_PATH=/a/b
#制定node镜像的版本
FROM node:8.9-alpine
#声明作者
MAINTAINER robin
#ADD、COPY 移动当前目录下面的文件到app目录下（需要复制的目录一定要放在Dockerfile文件的同级目录下）；ADD会对压缩文件（tar, gzip, bzip2, etc）做提取和解压操作，COPY单纯复制文件（）；如果想添加远程文件、目录，请使用 RUN + curl/weget
ADD test / 
ADD test.tar.gz /
COPY . /app/
#WORKDIR指令设置Dockerfile中的任何RUN，CMD，ENTRPOINT，COPY和ADD指令的工作目录。如果WORKDIR指 定的目录不存在，即使随后的指令没有用到这个目录，都会创建；单个Dockerfile可以使用多次WORKFDIR
WORKDIR /app
#在新镜像内部执行的命令，比如安装一些软件、配置一些基础环境，可使用\来换行, 多个命令则执行多个 RUN
RUN npm install
#对外暴露的端口
EXPOSE 3000
#ENTRYPOINT、CMD容器启动时需要执行的命令（CMD的命令会被 docker run 的命令覆盖而ENTRYPOINT不会）
CMD ["npm", "start"] 或 CMD echo "hello docker" && ...
#指定该镜像以什么样的用户去执行
USER mongo
#为当前容器设置环境变量
ENV myName="pipi"
#给创建的镜像添加标签，比如作者信息，版本信息，描述信息等
LABEL maintainer = "作者姓名"
LABEL version = "1.0"
LABEL description = "描述"
#VOLUME 指令创建的挂载点，无法指定主机上对应的目录，是自动生成的；docker run命令的-v创建的挂载点则可以指定host主机目录，但必须为绝对路径
VOLUME /myvol
```

#### 重启docker服务  
  * sudo service docker restart

**备注：**
>1、Dockerfile中RUN，CMD和ENTRYPOINT都能够用于执行命令，下面是三者的主要用途：
* RUN命令执行命令并创建新的镜像层，通常用于安装软件包
* CMD命令设置容器启动后默认执行的命令及其参数，但CMD设置的命令能够被docker run命令后面的命令行参数替换
* ENTRYPOINT配置容器启动时的执行命令（不会被忽略，一定会被执行，即使运行 docker run时指定了其他命令）

>2、我们可用两种方式指定 RUN、CMD 和 ENTRYPOINT 要运行的命令：Shell 格式和 Exec 格式：
* Shell格式：<instruction> <command>。例如：apt-get install python3
* Exec格式：<instruction> ["executable", "param1", "param2", ...]。例如： ["apt-get", "install", "python3"]  
* CMD 和 ENTRYPOINT 推荐使用 Exec 格式      
  
 **示例：**
```
FROM centos:latest
MAINTAINER pipi

WORKDIR /Users/pp/Desktop/dockerWorkSpace
ADD test.txt.zip ./add/
COPY test.txt.zip ./copy/
EXPOSE 22
RUN mkdir qwe
VOLUME /db
ENV myName pipi
LABEL maintainer = "pipi"
LABEL version = "1.0"
LABEL description = "this is test projiect"
ENTRYPOINT ["/bin/bash"]
```

## 三、docker-compose 使用
[docker-compose 简介](https://blog.51cto.com/9291927/2310444)

> Docker-Compose项目是Docker官方的开源项目，负责实现对Docker容器集群的快速编排。

### （1）、docker-compose常用命令

```
1、docker-compose up        启动项目
    选项包括：
        -d                  在后台运行服务容器
        --force-recreate    强制重新创建容器
        –-no-recreate       如果容器已经存在，则不重新创建
        --build             在启动容器前构建服务镜像
2、docker-compose ps        列出项目中目前的所有容器
3、docker-compose stop/start/restart      停止/启动/重启正在运行的容器
4、docker-compose down      停止和删除容器、网络、卷、镜像
        -v, –-volumes        删除已经在compose文件中定义的和匿名的附在容器上的数据卷
```
### （2）、Docker-Compose模板文件

```
version: "3"
services:
  nginx:
    # labels:       # 为容器添加Docker元数据（metadata）信息
    image: nginx
    ports:          # ports用于映射端口的标签
      - "8888:80"
    # extra_hosts:  #添加主机名的标签，会在/etc/hosts文件中添加一些记录
    #   - "somehost:162.242.195.82"
    container_name: "nginx"
    volumes:        # 挂载一个目录或者一个已存在的数据卷容器;[HOST:CONTAINER:ro]格式，后者对于容器来说，数据卷是只读的
      - ./nginx/html:/var/www/html/:rw
      - ./nginx/config/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/logs:/var/log/nginx/:rw
      # - ./conf/localtime:/etc/localtime:ro
      #- ./conf/timezone:/etc/timezone:ro
    # env_file:     # 定义一个专门存放变量的文件；如果有变量名称与environment指令冲突，则以后者为准
    #   -
    # restart: always
    links:          # 容器之间可使用容器名称相互访问。如在nginx中可以通过 node:7001 访问到 node服务l。原理：links 当前在容器/etc/hosts里创建表：172.17.2.186 node；
      - node
    # environment:  # 容器中可以拿取到的变量值
    # command:      # 使用 command 可以覆盖容器启动后默认执行的命令
    networks:
      - default
  node:
    build:
      context: ./node
      dockerfile: Dockerfile
      # args:       # 添加构建参数，这些参数是仅在构建过程中可访问的环境变量
      #   ROOT_PATH: /var/www/project/nodeService
    container_name: "node"
    volumes:
      - ./node/eggFramework:/home/node_projiect
    # restart: always
    depends_on:     # depends_on 依赖其他容器，需其他容器启动完成后再启动本容器
      - mysql
    links:
      - mysql
    networks:
      - default
  mysql:
    image: mysql:5.7
    ports:
      - "3306"
    volumes:
      - "./mysql/conf/my.cnf:/etc/my.cnf"
      - "./mysql/init_sql_or_sh:/docker-entrypoint-initdb.d"  #！！！！！！重点： 此处必须是 文件夹映射到 docker-entrypoint-initdb.d，否则会报错 
      - "./mysql/database:/home/mysql_sql"
      #- "./mysql/data:/var/lib/mysql"     # 映射数据目录，数据持久化；删除容器后输入仍在 mysql/data 目录下；添加了数据持久化，想重置重启 需先删除此目录
      - "./mysql/logs:/var/log/mysql"     # 日志目录
    container_name: "mysql"
    environment:
      MYSQL_ROOT_PASSWORD: "123456"
      # INIT_DB_SHELL_PATH: "/docker-entrypoint-initdb.d"
    networks:
      - default
# 使用networks命令，即可方便实现服务间的网络隔离与连接。默认容器间都使用同一个网络，定义网络名为byfn，那么最终生产的网络名为：<当前路径名_byfn>
networks:
  default:

```
