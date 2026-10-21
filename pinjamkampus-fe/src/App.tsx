
import { useEffect, useState } from "react";
import { getSumberDaya, tambahSumberDaya, } from "./api/sumberDaya";
import type { SumberDaya, SumberDayaInput, } from "./api/sumberDaya";
import SumberDayaForm from "./components/sumberDayaForm";
import SumberDayaList from "./components/sumberDayaList";

import PeminjamanForm from "./components/peminjamanForm";
import { tambahPeminjaman } from "./api/peminjaman";
import type { PeminjamanInput } from "./api/peminjaman";

import PeminjamanList from "./components/peminjamanList";
import { getPeminjaman, getDetailPeminjaman, } from "./api/peminjaman";
import type { Peminjaman } from "./api/peminjaman";

export default function App() {
  const [sumberDaya, setSumberDaya] = useState<SumberDaya[]>([]);
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState<"ruang" | "alat">("ruang");
  const [stok, setStok] = useState("1");

  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [error, setError] = useState("");

  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([]);
  const [filterSumberDaya, setFilterSumberDaya] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [refreshPeminjaman, setRefreshPeminjaman] = useState(0);
  const [memuatPeminjaman, setMemuatPeminjaman] = useState(true);
  const [detail, setDetail] = useState<Peminjaman | null>(null);

  // F1
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

  // F2
async function handleTambahPeminjaman(data: PeminjamanInput) {
  if (menyimpan) return;

  setMenyimpan(true);
  setError("");

try {
  await tambahPeminjaman(data);

  setRefreshPeminjaman((sebelumnya) => sebelumnya + 1);
} catch (err) {
  setError(
    err instanceof Error
      ? err.message
      : "Gagal menyimpan peminjaman."
  );
} finally {
  setMenyimpan(false);
}
}

// F3
useEffect(() => {
  async function muatPeminjaman() {
    setMemuatPeminjaman(true);
    setError("");

    try {
      const data = await getPeminjaman(
        filterSumberDaya,
        filterTanggal,
        filterStatus
      );

      setPeminjaman(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memuat daftar peminjaman."
      );
    } finally {
      setMemuatPeminjaman(false);
    }
  }

  void muatPeminjaman();
}, [
  filterSumberDaya,
  filterTanggal,
  filterStatus,
  refreshPeminjaman,
]);

async function handleDetail(id: number) {
  setError("");
  setDetail(null);

  try {
    const data = await getDetailPeminjaman(id);
    setDetail(data);
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Gagal mengambil detail peminjaman."
    );
  }
}

  return (
    <main>
      <h1>PinjamKampus</h1>

      {memuat && <p>Memuat...</p>}
      {error && <p role="alert">{error}</p>}
{/* F1 */}
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
      {!memuat && (<SumberDayaList sumberDaya={sumberDaya} />)}
{/* F2 */}
      <PeminjamanForm
        sumberDaya={sumberDaya}
        menyimpan={menyimpan}
        onSubmit={handleTambahPeminjaman}
      />
{/* F3 */}
{memuatPeminjaman && <p>Memuat...</p>}

{!memuatPeminjaman && (
  <PeminjamanList
    peminjaman={peminjaman}
    sumberDaya={sumberDaya}
    filterSumberDaya={filterSumberDaya}
    filterTanggal={filterTanggal}
    filterStatus={filterStatus}
    onFilterSumberDaya={setFilterSumberDaya}
    onFilterTanggal={setFilterTanggal}
    onFilterStatus={setFilterStatus}
    onDetail={handleDetail}
  />
)}

<section aria-label="Detail peminjaman">
  <h2>Detail Peminjaman</h2>

  {detail && (
    <>
      <p>ID: {detail.id}</p>
      <p>Peminjam: {detail.peminjam}</p>
      <p>Sumber daya ID: {detail.sumber_daya_id}</p>
      <p>Tanggal: {detail.tanggal}</p>
      <p>
        Slot {detail.slot_mulai}-{detail.slot_selesai}
      </p>
      <p>Jumlah: {detail.jumlah}</p>
      <p>Status: {detail.status}</p>
    </>
  )}
</section>

    </main>
  );
}
