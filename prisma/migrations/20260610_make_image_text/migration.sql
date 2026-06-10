-- Migration: make image column TEXT to allow long URLs
-- Generated manually: alters the Notice.image column to TEXT

ALTER TABLE `Notice`
  MODIFY COLUMN `image` TEXT;
