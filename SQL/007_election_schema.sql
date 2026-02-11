-- Create elections table
CREATE TABLE IF NOT EXISTS "elections" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT 1
);

-- Create candidates table
CREATE TABLE IF NOT EXISTS "candidates" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "election_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "party" TEXT,
    "symbol" TEXT,
    "constituency_id" INTEGER,
    FOREIGN KEY("election_id") REFERENCES "elections"("id"),
    FOREIGN KEY("constituency_id") REFERENCES "constituencies"("id")
);

-- Create election_results table
CREATE TABLE IF NOT EXISTS "election_results" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "election_id" INTEGER NOT NULL,
    "candidate_id" INTEGER NOT NULL,
    "constituency_id" INTEGER NOT NULL,
    "vote_count" INTEGER NOT NULL DEFAULT 0,
    "last_updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY("election_id") REFERENCES "elections"("id"),
    FOREIGN KEY("candidate_id") REFERENCES "candidates"("id"),
    FOREIGN KEY("constituency_id") REFERENCES "constituencies"("id")
);
