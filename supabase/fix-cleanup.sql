-- Quick fix: clean up + add missing INSERT policy
DELETE FROM profiles WHERE email = 'levaribar@gmail.com';
DELETE FROM auth.users WHERE email = 'levaribar@gmail.com';
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
