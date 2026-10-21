
import { useCallback, useEffect, useState } from "react";

import {
  getSumberDaya,
  tambahSumberDaya,
} from "./api/sumberDaya";
import type {
  SumberDaya,
  SumberDayaInput,
} from "./api/sumberDaya";

import SumberDayaForm from "./components/sumberDayaForm";
import SumberDayaList from "./components/sumberDayaList";

import PeminjamanForm from "./components/peminjamanForm";
import PeminjamanList from "./components/peminjamanList";

import {
  tambahPeminjaman,
  getPeminjaman,
  getDetailPeminjaman,
  ubahPeminjaman,
  hapusPeminjaman,
} from "./api/peminjaman";
import type {
  Peminjaman,
  PeminjamanInput,
} from "./api/peminjaman";

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
  const [peminjamanDiedit, setPeminjamanDiedit] =
    useState<Peminjaman | null>(null);
  const [menghapusID, setMenghapusID] = useState<number | null>(null);

  // Memuat atau memuat ulang daftar sumber daya dari API.
  const muatSumberDaya = useCallback(async () => {
    setMemuat(true);

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
  }, []);

  // F1: Muat sumber daya saat aplikasi pertama kali dibuka.
  useEffect(() => {
    void muatSumberDaya();
  }, [muatSumberDaya]);

  // F1: Tambah sumber daya.
  async function handleTambah(data: SumberDayaInput) {
    if (menyimpan) return;

    setMenyimpan(true);
    setError("");

    try {
      await tambahSumberDaya(data);

      // Ambil daftar terbaru dari backend setelah berhasil menambah.
      await muatSumberDaya();

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

  // F3: Muat daftar peminjaman sesuai filter.
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

  // F3: Tampilkan detail peminjaman.
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

  // F6: Pilih peminjaman yang akan diedit.
  function handleEdit(item: Peminjaman) {
    setPeminjamanDiedit(item);
    setError("");
  }

  // F2 dan F6: Tambah peminjaman atau simpan perubahan.
  async function handleSimpanPeminjaman(data: PeminjamanInput) {
    if (menyimpan) return;

    setMenyimpan(true);
    setError("");

    try {
      if (peminjamanDiedit) {
        await ubahPeminjaman(peminjamanDiedit.id, data);
        setPeminjamanDiedit(null);
      } else {
        await tambahPeminjaman(data);
      }

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

  // F6: Batalkan mode edit.
  function handleBatalEdit() {
    setPeminjamanDiedit(null);
    setError("");
  }

  // F6: Hapus peminjaman.
  async function handleHapus(id: number) {
    if (menghapusID !== null) return;

    setMenghapusID(id);
    setError("");

    try {
      await hapusPeminjaman(id);

      setRefreshPeminjaman((sebelumnya) => sebelumnya + 1);

      if (detail?.id === id) {
        setDetail(null);
      }

      if (peminjamanDiedit?.id === id) {
        setPeminjamanDiedit(null);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal menghapus peminjaman."
      );
    } finally {
      setMenghapusID(null);
    }
  }

  return (
    <main>
      <h1>PinjamKampus</h1>

      {memuat && <p>Memuat...</p>}

      {error && <p role="alert">{error}</p>}

      {/* F1: Sumber daya */}
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

      {/* F2: Form peminjaman */}
      <PeminjamanForm
        sumberDaya={sumberDaya}
        menyimpan={menyimpan}
        dataEdit={peminjamanDiedit}
        onSubmit={handleSimpanPeminjaman}
        onBatalEdit={handleBatalEdit}
        pesanError={error}
      />

      {/* F3: Daftar peminjaman */}
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
          onEdit={handleEdit}
          onHapus={handleHapus}
          menghapusID={menghapusID}
        />
      )}

      {/* Detail peminjaman */}
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
