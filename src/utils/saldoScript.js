import { useState } from "react";
import { supabase } from "../config/supabaseClient";

const [pengeluaran, setPengeluaran] = useState();
const [pemasukan, setPemasukan] = useState();

try {
  const { data: pengeluaranData, error: pengeluaranError } = await supabase
    .from("transaksi")
    .select(
      supabase.raw(`
          SUM(nominal) AS total_saldo WHERE tipe='Masuk'
        `)
    )
    .single();

  if (pengeluaranError) {
    throw pengeluaranError;
  }

  setPengeluaran(pengeluaranData);
} catch (error) {
  console.error("Error fetching saldo:", error.message);
}

try {
  const { data: pemasukanData, error: pemasukanError } = await supabase
    .from("transaksi")
    .select(
      supabase.raw(`
          SUM(nominal) AS total_saldo WHERE tipe='Masuk'
        `)
    )
    .single();

  if (pemasukanError) {
    throw pemasukanError;
  }

  setPemasukan(pemasukanData);
} catch (error) {
  console.error("Error fetching saldo:", error.message);
}

const saldo = pemasukan - pengeluaran;

export { saldo };
