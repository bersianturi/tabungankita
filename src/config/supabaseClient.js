import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cmlmbkymblmqeoixvgdd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtbG1ia3ltYmxtcWVvaXh2Z2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzMDM1MDksImV4cCI6MjAyMDg3OTUwOX0.9G2U2AmVdflVL-VIO910lrrpTLsSUMyjfiHHC5zS3RY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
