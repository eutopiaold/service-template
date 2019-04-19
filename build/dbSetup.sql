CREATE SCHEMA IF NOT EXISTS sc_xxxx;

DROP TABLE IF EXISTS sc_xxxx;
CREATE TABLE sc_xxxx.something();

DROP USER IF EXISTS service_xxxx;
CREATE USER service_xxxx;

GRANT USAGE ON SCHEMA sc_xxxx TO service_xxxx;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA sc_xxxx TO service_xxxx;
