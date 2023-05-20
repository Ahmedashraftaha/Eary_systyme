-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2023 at 02:28 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hearingdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id_question` int(10) UNSIGNED NOT NULL,
  `answer_index` int(10) UNSIGNED NOT NULL,
  `answer` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `point` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id_question`, `answer_index`, `answer`, `is_correct`, `point`, `modified_at`) VALUES
(11, 0, '', 0, 0, '2023-05-05 09:46:53'),
(11, 1, 'new11 answer', 0, 999, '2023-05-06 03:05:38'),
(13, 0, 'khkhkhkhkhkh', 0, 0, '2023-05-06 07:10:59'),
(14, 0, 'adfdf', 1, 0, '2023-05-07 07:25:51');

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `exam_id` int(10) UNSIGNED NOT NULL,
  `id_creator` int(10) UNSIGNED NOT NULL,
  `header` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `state` varchar(55) NOT NULL DEFAULT 'IN_CREATION',
  `duration_mins` int(10) UNSIGNED NOT NULL DEFAULT 30,
  `difficultly` varchar(55) NOT NULL DEFAULT 'NOT_DETERMINED',
  `total_score` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `logo` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `actived_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`exam_id`, `id_creator`, `header`, `description`, `state`, `duration_mins`, `difficultly`, `total_score`, `logo`, `created_at`, `actived_at`, `modified_at`) VALUES
(3, 2, 'ahmed ashref', '', 'MAINTAINED', 12, 'ea11adf2sy', 1, '', '2023-05-05 09:31:35', NULL, '2023-05-06 19:21:20'),
(4, 2, '', '', 'MAINTAINED', 2113333, 'ha1321rd', 2, '', '2023-05-06 10:12:40', '2023-05-06 16:22:25', '2023-05-06 17:22:25'),
(5, 2, '', '', 'MAINTAINED', 1123, 'd12adfd3', 123, '', '2023-05-06 10:12:40', '2023-05-06 16:22:25', '2023-05-06 19:21:20'),
(6, 2, 'new header', '', 'MAINTAINED', 144, 'ea132sy', 4, '', '2023-05-06 10:12:40', '2023-05-06 16:22:25', '2023-05-06 19:21:20'),
(7, 2, 'aadfdfkdfjdlkf', '', 'MAINTAINED', 2113333, 'hdafadfa1321rd', 2, '', '2023-05-06 10:12:40', NULL, '2023-05-06 19:21:20'),
(8, 2, '', '', 'IN_CREATION', 113, 'easy', 1, '', '2023-05-06 10:13:05', NULL, '2023-05-06 10:13:05'),
(9, 2, '', '', 'MAINTAINED', 113, 'hard', 2, '', '2023-05-06 10:13:05', NULL, '2023-05-06 16:45:01'),
(10, 2, '', '', 'IN_CREATION', 1123, 'd', 123, '', '2023-05-06 10:13:05', NULL, '2023-05-06 10:13:05'),
(11, 2, '', '', 'MAINTAINED', 144, 'easy', 4, '', '2023-05-06 10:13:05', NULL, '2023-05-06 16:43:24'),
(12, 2, '', '', 'IN_CREATION', 113, 'easy', 1, '', '2023-05-06 15:46:28', NULL, '2023-05-06 15:46:28'),
(13, 2, '', '', 'ACTIVITED', 113, 'hard', 2, '', '2023-05-06 15:46:28', NULL, '2023-05-06 18:13:42'),
(14, 2, '', '', 'MAINTAINED', 1123, 'd', 123, '', '2023-05-06 15:46:28', NULL, '2023-05-06 16:43:31'),
(15, 2, '', '', 'IN_CREATION', 144, 'easy', 4, '', '2023-05-06 15:46:28', NULL, '2023-05-06 15:46:28'),
(21, 1, '', '', 'IN_CREATION', 113, 'hard', 2, '', '2023-05-06 16:09:54', NULL, '2023-05-06 16:09:54'),
(22, 1, '', '', 'ACTIVITED', 1123, 'd', 123, '', '2023-05-06 16:09:54', NULL, '2023-05-07 09:44:13'),
(23, 1, '', '', 'ACTIVITED', 144, 'easy', 4, '', '2023-05-06 16:09:54', NULL, '2023-05-06 18:13:53'),
(24, 1, 'new ahmed ashref', 'adfdf', 'IN_CREATION', 12, 'eadfadfa11adf2sy', 13, '', '2023-05-06 19:33:23', NULL, '2023-05-06 19:33:23'),
(25, 1, 'aadfdf23kdfjdlkf', 'adfdfdf', 'IN_CREATION', 2113333, 'hdafadfa1321rd', 2, '', '2023-05-06 19:33:23', NULL, '2023-05-06 19:33:23'),
(26, 1, 'adfdfdfd', 'adfdfd', 'IN_CREATION', 1123, 'd12adfd3', 123, '', '2023-05-06 19:33:23', NULL, '2023-05-06 19:33:23'),
(27, 1, 'new header', '12344', 'IN_CREATION', 144, 'ea132sy', 4, '', '2023-05-06 19:33:23', NULL, '2023-05-06 19:33:23'),
(28, 1, 'new ahmed ashref', 'adfdf', 'IN_CREATION', 12, 'eadfadfa11adf2sy', 13, '', '2023-05-07 10:10:29', NULL, '2023-05-07 10:10:29'),
(29, 1, 'aadfdf23kdfjdlkf', 'adfdfdf', 'IN_CREATION', 2113333, 'hdafadfa1321rd', 2, '', '2023-05-07 10:10:29', NULL, '2023-05-07 10:10:29'),
(30, 1, 'adfdfdfd', 'adfdfd', 'IN_CREATION', 1123, 'd12adfd3', 123, '', '2023-05-07 10:10:29', NULL, '2023-05-07 10:10:29'),
(31, 1, 'new header', '12344', 'IN_CREATION', 144, 'ea132sy', 4, '', '2023-05-07 10:10:29', NULL, '2023-05-07 10:10:29');

-- --------------------------------------------------------

--
-- Table structure for table `identity`
--

CREATE TABLE `identity` (
  `identity_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `state` varchar(100) NOT NULL DEFAULT 'INACTIVE',
  `role` varchar(100) NOT NULL DEFAULT 'USER',
  `direcotroy_path` varchar(260) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `actived_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `identity`
--

INSERT INTO `identity` (`identity_id`, `name`, `email`, `user_name`, `password`, `state`, `role`, `direcotroy_path`, `created_at`, `actived_at`, `modified_at`) VALUES
(1, 'mohamed', 'mohamed@gmali.com', 'moo', '123', 'ACTIVE', 'ADMIN', '', '2023-05-05 04:57:54', '2023-05-05 04:57:54', '2023-05-05 04:57:54'),
(2, 'aa', 'mars@gmail.com', 'rrrr', 'aaaa', 'ACTIVE', 'USER', '', '2023-05-05 04:59:42', '2023-05-05 04:59:42', '2023-05-05 05:01:04');

-- --------------------------------------------------------

--
-- Table structure for table `identity_score`
--

CREATE TABLE `identity_score` (
  `identity_score_id` int(10) UNSIGNED NOT NULL,
  `id_identity` int(10) UNSIGNED NOT NULL,
  `id_exam` int(10) UNSIGNED NOT NULL,
  `score` int(10) UNSIGNED NOT NULL,
  `taken_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(10) UNSIGNED NOT NULL,
  `id_exam` int(10) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'NOT_DETERMINED',
  `header` varchar(255) NOT NULL DEFAULT 'NOT_DETERMINED',
  `description` text NOT NULL DEFAULT 'NOT_DETERMINED',
  `state` tinyint(1) NOT NULL DEFAULT 0,
  `rank` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `file_path` varchar(256) DEFAULT NULL,
  `icon_path` varchar(256) DEFAULT NULL,
  `default_point` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `actived_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `id_exam`, `type`, `header`, `description`, `state`, `rank`, `file_path`, `icon_path`, `default_point`, `created_at`, `actived_at`, `modified_at`) VALUES
(11, 3, 'kkk', 'NOT_DETERMINED', 'NOT_DETERMINED', 1, 0, '.mp3', '.img', 0, '2023-05-05 09:33:13', NULL, '2023-05-07 04:22:21'),
(13, 3, 'vvvvv', 'vvv', 'uuuuuuuu', 1, 0, '.mp3', '.img', 1, '2023-05-05 12:57:52', NULL, '2023-05-05 12:57:52'),
(14, 13, 'active', '13???', 'NOT_DETERMINED', 1, 0, NULL, NULL, 0, '2023-05-07 07:03:49', NULL, '2023-05-07 07:03:49'),
(15, 13, 'NOT_DETERMINED', 'NOT_DETERMINED', 'NOT_DETERMINED', 0, 0, NULL, NULL, 0, '2023-05-07 07:04:05', NULL, '2023-05-07 07:04:05'),
(16, 13, 'akdjfkld', 'adfmdf', 'NOT_DETERMINED', 1, 0, NULL, NULL, 0, '2023-05-07 09:46:27', NULL, '2023-05-07 09:46:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `role` int(11) NOT NULL DEFAULT 0,
  `token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `status`, `role`, `token`) VALUES
(1, 'ali', 'khara@gmail.com', '$2b$10$nQ10T8b46D9uDgSFLrq69eQkzJdhadrTDdSoYkN4cEhGh0rh/oy36', '0100023', 0, 1, 'c33bbe9d844ef1d995f22a2a702bfc7e'),
(2, 'ali123123123', 'khara@gmail.com', '$2b$10$RXHnlNm5z8mvceF/C08tCeHN2j6vAbDo1p5T9VR5tHC689wFdlAjC', '0100023', 0, 0, '8f46da5cd03acc352d2a8267fff802c7');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id_question`,`answer_index`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`exam_id`),
  ADD KEY `fk_creator_id` (`id_creator`);

--
-- Indexes for table `identity`
--
ALTER TABLE `identity`
  ADD PRIMARY KEY (`identity_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- Indexes for table `identity_score`
--
ALTER TABLE `identity_score`
  ADD PRIMARY KEY (`identity_score_id`),
  ADD KEY `fk_exam_id_score` (`id_exam`),
  ADD KEY `fk_indentity_id_score` (`id_identity`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `fk_exam_id` (`id_exam`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `exam_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `identity`
--
ALTER TABLE `identity`
  MODIFY `identity_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `identity_score`
--
ALTER TABLE `identity_score`
  MODIFY `identity_score_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `fk_question_id` FOREIGN KEY (`id_question`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `fk_creator_id` FOREIGN KEY (`id_creator`) REFERENCES `identity` (`identity_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `identity_score`
--
ALTER TABLE `identity_score`
  ADD CONSTRAINT `fk_exam_id_score` FOREIGN KEY (`id_exam`) REFERENCES `exams` (`exam_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_indentity_id_score` FOREIGN KEY (`id_identity`) REFERENCES `identity` (`identity_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_exam_id` FOREIGN KEY (`id_exam`) REFERENCES `exams` (`exam_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
