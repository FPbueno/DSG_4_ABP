-- Verifica se o banco de dados existe
SELECT 'CREATE DATABASE "AquaTrace"'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'AquaTrace');

-- Conecta ao banco de dados AquaTrace
\c AquaTrace; 