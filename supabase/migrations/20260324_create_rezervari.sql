-- Tabel rezervări Vibe Caffè
CREATE TABLE rezervari (
  id            BIGSERIAL PRIMARY KEY,
  nume          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  telefon       TEXT        NOT NULL,
  numar_persoane INTEGER    NOT NULL DEFAULT 2,
  data          DATE        NOT NULL,
  ora           TIME        NOT NULL,
  status        TEXT        NOT NULL DEFAULT 'în așteptare',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Activează Row Level Security
ALTER TABLE rezervari ENABLE ROW LEVEL SECURITY;

-- Oricine poate adăuga o rezervare nouă
CREATE POLICY "public_insert" ON rezervari
  FOR INSERT TO anon WITH CHECK (true);

-- Oricine poate citi rezervările
CREATE POLICY "public_select" ON rezervari
  FOR SELECT TO anon USING (true);

-- Oricine poate modifica o rezervare
CREATE POLICY "public_update" ON rezervari
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Oricine poate șterge o rezervare
CREATE POLICY "public_delete" ON rezervari
  FOR DELETE TO anon USING (true);
