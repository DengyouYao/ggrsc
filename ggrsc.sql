-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 2017-11-10 00:51:26
-- 服务器版本： 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ggrsc`
--

-- --------------------------------------------------------

--
-- 表的结构 `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sid` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `img` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `newprice` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `oldprice` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `status` varchar(11) COLLATE utf8_unicode_ci DEFAULT '1',
  `timer` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `carts`
--

INSERT INTO `carts` (`id`, `username`, `sid`, `title`, `img`, `newprice`, `oldprice`, `amount`, `status`, `timer`) VALUES
(19, 'ydy', '7', '笔记本可印刷logo封麦广告记事作业练习英语软抄小本a5因近期印刷品价格浮动较大，购买先确认价格', 'http://localhost/javascript/ggrsc/img/else/407_05205136434452587_240.jpg', '180.00', '270.00', 3, '1', '2017-11-09 08:49:30'),
(18, 'ydy', '8', '笔记本可印刷logo封麦广告记事作业练习英语软抄小本a5因近期印刷品价格浮动较大，购买先确认价格', 'http://localhost/javascript/ggrsc/img/else/407_05205136434452587_240.jpg', '180.00', '270.00', 4, '1', '2017-11-09 08:49:29'),
(17, 'ydy', '4', '笔记本可印刷logo封麦广告记事作业练习英语软抄小本a5因近期印刷品价格浮动较大，购买先确认价格', 'http://localhost/javascript/ggrsc/img/else/407_05205136434452587_240.jpg', '180.00', '270.00', 3, '1', '2017-11-09 08:49:26');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `leval` char(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'vip1',
  `timer` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone`, `leval`, `timer`) VALUES
(1, 'ydy', '123456789', '22222@qq.com', NULL, 'vip1', '2017-11-07 08:51:53');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
