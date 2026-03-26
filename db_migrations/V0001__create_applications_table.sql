CREATE TABLE t_p84599805_dmitriy_services_pro.applications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  comment TEXT,
  site TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);