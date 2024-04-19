-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2023 a las 23:53:37
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cloe_pots`
--
CREATE DATABASE IF NOT EXISTS `cloe_pots` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cloe_pots`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `att_clien`
--

CREATE TABLE `att_clien` (
  `id` int(11) NOT NULL,
  `id_ped` int(11) NOT NULL,
  `mensaje` varchar(255) NOT NULL,
  `estado` enum('resuelta','nueva') NOT NULL,
  `respuesta` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `att_clien`
--

INSERT INTO `att_clien` (`id`, `id_ped`, `mensaje`, `estado`, `respuesta`) VALUES
(1, 1, 'Como puedo solicitar el reembolso??', 'resuelta', 'No reembolsamos pasados los 3 meses desde la realización de la compra. Disculpe las molestias.'),
(2, 1, 'Buenos días, se pueden realizar pedidos desde Suec', 'nueva', 'No, no se puede.'),
(3, 1, 'Pregunta de prueba', 'resuelta', NULL),
(4, 1, 'pregunta de prueba 2', 'nueva', NULL),
(8, 0, 'Xeno', 'nueva', NULL),
(9, 0, 'Hugo', 'resuelta', NULL),
(10, 0, 'SOLICITUD DE CONTRASEÑA DEL USUARIO: Cloe', 'nueva', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pedidos`
--

CREATE TABLE `detalles_pedidos` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_pedidos`
--

INSERT INTO `detalles_pedidos` (`id`, `id_pedido`, `id_prod`, `cantidad`, `precio`) VALUES
(1, 1, 1, 2, '40.80'),
(2, 1, 12, 1, '12.99');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `id_clie` int(11) NOT NULL,
  `fecha_pedido` datetime NOT NULL,
  `fecha_entrega` datetime DEFAULT NULL,
  `estado` enum('pendiente','enviado','entregado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `id_clie`, `fecha_pedido`, `fecha_entrega`, `estado`) VALUES
(0, 1, '2022-04-02 00:00:00', '2022-04-02 00:00:00', 'pendiente'),
(1, 2, '2022-04-02 00:00:00', '2023-06-10 17:08:37', 'entregado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `estado` enum('planta','maceta','herramienta','otros') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `cantidad`, `precio_unitario`, `estado`) VALUES
(1, 'Poto', 8, '20.40', 'planta'),
(2, 'Maceta de cerámica', 16, '4.20', 'maceta'),
(3, 'Crasas', 4, '17.99', 'planta'),
(4, 'Cactus', 27, '33.33', 'planta'),
(5, 'Pala', 44, '44.99', 'herramienta'),
(6, 'Fertilizante', 22, '22.99', 'otros'),
(7, 'Maceta colgante', 27, '27.99', 'maceta'),
(8, 'Ficus', 77, '77.33', 'planta'),
(9, 'Regadera', 29, '29.99', 'herramienta'),
(10, 'Sustrato', 55, '55.99', 'otros'),
(11, 'Fungicida', 11, '11.99', 'otros'),
(12, 'Pulverizador', 12, '12.99', 'herramienta'),
(13, 'Aloe', 23, '23.99', 'planta'),
(14, 'Insecticida', 34, '34.38', 'otros'),
(15, 'Maceta de plástico', 45, '45.99', 'maceta'),
(16, 'Dracena', 56, '56.99', 'planta'),
(17, 'Guantes', 67, '67.99', 'herramienta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  `admin` enum('si','no') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `contrasena`, `admin`) VALUES
(1, 'admin', 'admin', 'si'),
(2, 'Cloe', 'Cloe', 'no'),
(3, 'x2', 'x2', 'no'),
(4, 'x3', 'x3', 'no'),
(5, 'prueba', 'x', 'no');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `att_clien`
--
ALTER TABLE `att_clien`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ped_a` (`id_ped`);

--
-- Indices de la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ped` (`id_pedido`),
  ADD KEY `fk_prod` (`id_prod`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_clie_p` (`id_clie`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `att_clien`
--
ALTER TABLE `att_clien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `att_clien`
--
ALTER TABLE `att_clien`
  ADD CONSTRAINT `fk_ped_a` FOREIGN KEY (`id_ped`) REFERENCES `pedidos` (`id`);

--
-- Filtros para la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  ADD CONSTRAINT `fk_ped` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `fk_prod` FOREIGN KEY (`id_prod`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_clie_p` FOREIGN KEY (`id_clie`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
