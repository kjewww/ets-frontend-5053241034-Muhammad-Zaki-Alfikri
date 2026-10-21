
import { useEffect, useState } from "react";
import { getSumberDaya, tambahSumberDaya, } from "./api/sumberDaya";
import type { SumberDaya, SumberDayaInput, } from "./api/sumberDaya";
import SumberDayaForm from "./components/sumberDayaForm";
import SumberDayaList from "./components/sumberDayaList";

export default function App() {
  const [sumberDaya, setSumberDaya] = useState<SumberDaya[]>([]);
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState<"ruang" | "alat">("ruang");
  const [stok, setStok] = useState("1");

  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function muatData() {
      try {
        const data = await getSumberDaya();
        setSumberDaya(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Gagal memuat sumber daya."
        );
      } finally {
        setMemuat(false);
      }
    }

    void muatData();
  }, []);

  async function handleTambah(data: SumberDayaInput) {
    if (menyimpan) return;

    setMenyimpan(true);
    setError("");

    try {
      const hasil = await tambahSumberDaya(data);

      setSumberDaya((sebelumnya) => [...sebelumnya, hasil]);
      setNama("");
      setJenis("ruang");
      setStok("1");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal menyimpan sumber daya."
      );
    } finally {
      setMenyimpan(false);
    }
  }

  return (
    <main>
      <h1>PinjamKampus</h1>

      {memuat && <p>Memuat...</p>}

      {error && <p role="alert">{error}</p>}

      <SumberDayaForm
        nama={nama}
        jenis={jenis}
        stok={stok}
        menyimpan={menyimpan}
        onNamaChange={setNama}
        onJenisChange={setJenis}
        onStokChange={setStok}
        onSubmit={handleTambah}
      />

      {!memuat && (
        <SumberDayaList sumberDaya={sumberDaya} />
      )}
    </main>
  );
}
