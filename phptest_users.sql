-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  130.79.158.79:3306
-- Généré le :  Mer 25 Janvier 2017 à 12:33
-- Version du serveur :  5.5.54-0+deb8u1
-- Version de PHP :  5.6.27-1~dotdeb+7.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `guingand_backend`
--

-- --------------------------------------------------------

--
-- Structure de la table `phptest_users`
--

CREATE TABLE `phptest_users` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `phptest_users`
--

INSERT INTO `phptest_users` (`email`, `password`, `active`, `date`) VALUES
('adresse1@mail.com', '123456', 0, '2016-12-13 17:37:49'),
('adresse2@mail.com', '123456', 0, '2016-12-13 17:37:51'),
('adresse3@mail.com', '123456', 0, '2016-12-13 17:37:54'),
('adresse@mail.com', '123456', 0, '2016-12-13 17:37:35'),
('antoine.guingand@wanadoo.fr', '1234', 0, '2016-12-13 00:00:00');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `phptest_users`
--
ALTER TABLE `phptest_users`
  ADD PRIMARY KEY (`email`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
