-- Insert sample election
INSERT INTO elections (name, date, is_active) VALUES ('National Election 2026', '2026-02-11', 1);

-- Insert sample candidates for Jhalokhati-1 (constituency_id = 4602)
INSERT INTO candidates (election_id, name, party, symbol, constituency_id) VALUES
(1, 'Candidate A (J-1)', 'Party X', 'Boat', 4602),
(1, 'Candidate B (J-1)', 'Party Y', 'Sheaf', 4602);

-- Insert sample candidates for Jhalokhati-2 (constituency_id = 4603)
INSERT INTO candidates (election_id, name, party, symbol, constituency_id) VALUES
(1, 'Candidate C (J-2)', 'Party X', 'Boat', 4603),
(1, 'Candidate D (J-2)', 'Party Z', 'Plough', 4603);

-- Insert sample candidates for Patuakhali-1 (constituency_id = 4604)
INSERT INTO candidates (election_id, name, party, symbol, constituency_id) VALUES
(1, 'Candidate E (P-1)', 'Party Y', 'Sheaf', 4604),
(1, 'Candidate F (P-1)', 'Party X', 'Boat', 4604);

-- Insert initial sample election results
INSERT INTO election_results (election_id, candidate_id, constituency_id, vote_count) VALUES
(1, 1, 4602, 15000),
(1, 2, 4602, 12000),
(1, 3, 4603, 20000),
(1, 4, 4603, 18000),
(1, 5, 4604, 25000),
(1, 6, 4604, 22000);
