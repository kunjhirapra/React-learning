import {createClient} from "@supabase/supabase-js";
export const supabaseUrl = "https://lepylsjhnunubdvfukbi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcHlsc2pobnVudWJkdmZ1a2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3Nzk5NjUsImV4cCI6MjA4MTM1NTk2NX0.HcvzhvYILvS1gZA_EewmBKkdjlRv5ePui9eE0RU3M94";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
