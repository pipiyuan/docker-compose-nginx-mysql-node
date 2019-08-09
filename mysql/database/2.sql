-- 建库
CREATE DATABASE IF NOT EXISTS my_db2 default charset utf8 COLLATE utf8_general_ci;

-- 切换数据库
use my_db2;

-- 建表
DROP TABLE IF EXISTS `table1`;

CREATE TABLE `table1` (
`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(20) DEFAULT NULL COMMENT '姓名',
`age` int(11) DEFAULT NULL COMMENT '年龄',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 插入数据
INSERT INTO `table1` (`id`, `name`, `age`)
VALUES
(1,'姓名12',16),
(2,'姓名23',16);