-- This is the database schema that would be used if we weren't using Supabase
-- In the actual implementation, these tables are managed through Supabase

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Artifacts table
CREATE TABLE artifacts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  period_era VARCHAR(255),
  date VARCHAR(255),
  age VARCHAR(255),
  century VARCHAR(255),
  location VARCHAR(255),
  excavation_site VARCHAR(255),
  region VARCHAR(255),
  country VARCHAR(255),
  material VARCHAR(255),
  dimensions VARCHAR(255),
  weight VARCHAR(255),
  condition VARCHAR(255),
  culture VARCHAR(255),
  civilization VARCHAR(255),
  dynasty VARCHAR(255),
  significance TEXT,
  resource_type VARCHAR(255),
  language VARCHAR(255),
  current_location VARCHAR(255),
  excavator VARCHAR(255),
  reference_doc TEXT,
  category VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id)
);

-- Comments table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  artifact_id INTEGER REFERENCES artifacts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tags table
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

-- Artifact tags (many-to-many relationship)
CREATE TABLE artifact_tags (
  artifact_id INTEGER REFERENCES artifacts(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (artifact_id, tag_id)
); 