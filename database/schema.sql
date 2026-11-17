-- Bumi Bawah — skema database
-- MySQL 8 / MariaDB 10.4+
-- Import: mysql -u root -p < database/schema.sql

SET NAMES utf8mb4;
SET time_zone = '+07:00';

CREATE DATABASE IF NOT EXISTS dalam_bumi
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE dalam_bumi;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS login_attempts;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS gallery;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS milestones;
DROP TABLE IF EXISTS layers;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE layers (
    id                  INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nama                VARCHAR(80)  NOT NULL,
    slug                VARCHAR(80)  NOT NULL,
    kedalaman_min_m     DECIMAL(12,3) NOT NULL DEFAULT 0,
    kedalaman_max_m     DECIMAL(12,3) NOT NULL,
    deskripsi_singkat   VARCHAR(255) NOT NULL,
    komposisi           TEXT         NOT NULL,
    proses_pembentukan  TEXT         NOT NULL,
    peran_ekologis      TEXT         NOT NULL,
    ancaman             TEXT         NOT NULL,
    suhu_perkiraan      VARCHAR(60)  NOT NULL,
    warna_hex           CHAR(7)      NOT NULL,
    urutan              TINYINT UNSIGNED NOT NULL,
    created_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_layers_slug (slug),
    UNIQUE KEY uq_layers_urutan (urutan),
    CONSTRAINT chk_layers_depth CHECK (kedalaman_max_m > kedalaman_min_m),
    CONSTRAINT chk_layers_color CHECK (warna_hex REGEXP '^#[0-9A-Fa-f]{6}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE milestones (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
    layer_id        INT UNSIGNED NOT NULL,
    nama            VARCHAR(100) NOT NULL,
    jenis           ENUM('makhluk','tumbuhan','rekor manusia','fenomena alam','fakta') NOT NULL,
    kedalaman_m     DECIMAL(12,3) NOT NULL,
    keterangan      VARCHAR(255) NOT NULL,
    ilustrasi_svg   VARCHAR(120) NOT NULL,
    sumber_url      VARCHAR(255) NOT NULL,
    sumber_nama     VARCHAR(150) NOT NULL,
    PRIMARY KEY (id),
    KEY idx_milestones_layer (layer_id),
    KEY idx_milestones_depth (kedalaman_m),
    CONSTRAINT fk_milestones_layer FOREIGN KEY (layer_id)
        REFERENCES layers (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_milestones_depth CHECK (kedalaman_m >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE articles (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    layer_id    INT UNSIGNED NULL,
    judul       VARCHAR(160) NOT NULL,
    slug        VARCHAR(180) NOT NULL,
    ringkasan   VARCHAR(300) NOT NULL,
    isi         LONGTEXT     NOT NULL,
    sumber      TEXT         NULL,
    gambar      VARCHAR(255) NULL,
    penulis     VARCHAR(80)  NOT NULL,
    status      ENUM('draft','published') NOT NULL DEFAULT 'draft',
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_articles_slug (slug),
    KEY idx_articles_layer (layer_id),
    KEY idx_articles_status_date (status, created_at),
    CONSTRAINT fk_articles_layer FOREIGN KEY (layer_id)
        REFERENCES layers (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gallery (
    id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
    judul        VARCHAR(140) NOT NULL,
    deskripsi    VARCHAR(400) NOT NULL,
    lokasi       VARCHAR(140) NOT NULL,
    gambar       VARCHAR(255) NOT NULL,
    kategori     VARCHAR(50)  NOT NULL,
    kredit_foto  VARCHAR(180) NOT NULL,
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_gallery_kategori (kategori),
    KEY idx_gallery_date (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE messages (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nama        VARCHAR(80)  NOT NULL,
    email       VARCHAR(160) NOT NULL,
    subjek      VARCHAR(160) NOT NULL,
    pesan       TEXT         NOT NULL,
    ip_hash     CHAR(64)     NULL,
    dibaca      TINYINT UNSIGNED NOT NULL DEFAULT 0,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_messages_date (created_at),
    KEY idx_messages_ip (ip_hash, created_at),
    KEY idx_messages_read (dibaca)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE login_attempts (
    id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
    ip_hash      CHAR(64)     NOT NULL,
    username     VARCHAR(60)  NOT NULL,
    berhasil     TINYINT UNSIGNED NOT NULL DEFAULT 0,
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_login_ip (ip_hash, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
    id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username       VARCHAR(60)  NOT NULL,
    password_hash  VARCHAR(255) NOT NULL,
    role           ENUM('admin','editor') NOT NULL DEFAULT 'editor',
    created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
