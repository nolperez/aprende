import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://nxsjuywalvqioskffjyp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54c2p1eXdhbHZxaW9za2ZmanlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNzQ5NDIsImV4cCI6MjA2NTc1MDk0Mn0.bRJy5JUpPrBRmHIGmoHpHJKzHRf1_cQho76d2KD13jk'
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }