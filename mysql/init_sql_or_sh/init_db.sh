#!/bin/bash

# 通过shell 执行sql脚本可以 自定义sql的执行顺序，此处执行的脚本为 database目录下的脚本
mysql -uroot -p${MYSQL_ROOT_PASSWORD} <<EOF
source /home/mysql_sql/1.sql
# source /home/mysql_sql/2.sql
 