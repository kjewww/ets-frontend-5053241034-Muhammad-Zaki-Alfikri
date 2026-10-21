
    import { useState, useRef } from "react";
    import type { SumberDaya } from "../api/sumberDaya";
    import type { PeminjamanInput } from "../api/peminjaman";


    type Props = {
    sumberDaya: SumberDaya[];
    menyimpan: boolean;
    onSubmit: (data: PeminjamanInput) => Promise<void>;
    };

    export default function PeminjamanForm({
    sumberDaya,
    menyimpan,
    onSubmit,
    }: Props) {
    const [sumberDayaID, setSumberDayaID] = useState("");
    const [peminjam, setPeminjam] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [slotMulai, setSlotMulai] = useState("1");
    const [slotSelesai, setSlotSelesai] = useState("1");
    const [jumlah, setJumlah] = useState("1");
    const [error, setError] = useState("");
    const sedangMengirim = useRef(false);

    const pilihan = sumberDaya.find(
    (item) => item.id === Number(sumberDayaID)
    );

    async function handleSubmit(
    e: React.SubmitEvent<HTMLFormElement>
    ) {
    e.preventDefault();

    if (sedangMengirim.current) {
    return;
    }

    setError("");

    const namaPeminjam = peminjam.trim();
    const mulai = Number(slotMulai);
    const selesai = Number(slotSelesai);
    const banyak = Number(jumlah);

    if (!pilihan) {
        setError("Pilih sumber daya terlebih dahulu.");
        return;
    }

    if (!namaPeminjam || namaPeminjam.length > 50) {
        setError("Peminjam wajib diisi, maksimal 50 karakter.");
        return;
    }


    if (!tanggal) {
    setError("Tanggal wajib diisi.");
    return;
    }

    const [tahun, bulan, hari] = tanggal.split("-").map(Number);
    const tanggalValid = new Date(tahun, bulan - 1, hari);

    if (
    tanggalValid.getFullYear() !== tahun ||
    tanggalValid.getMonth() !== bulan - 1 ||
    tanggalValid.getDate() !== hari
    ) {
    setError("Tanggal tidak valid.");
    return;
    }


    if (
        !Number.isInteger(mulai) ||
        !Number.isInteger(selesai) ||
        mulai < 1 ||
        mulai > 8 ||
        selesai < mulai ||
        selesai > 8
    ) {
        setError("Slot harus 1-8 dan slot selesai tidak boleh lebih kecil dari slot mulai.");
        return;
    }

    if (
        !Number.isInteger(banyak) ||
        banyak < 1 ||
        banyak > pilihan.stok
    ) {
        setError(`Jumlah harus antara 1 dan ${pilihan.stok}.`);
        return;
    }

    sedangMengirim.current = true;

    try {
    await onSubmit({
        sumber_daya_id: pilihan.id,
        peminjam: namaPeminjam,
        tanggal,
        slot_mulai: mulai,
        slot_selesai: selesai,
        jumlah: banyak,
    });
    } catch {
    } finally {
    sedangMengirim.current = false;
    }
    }

    return (
    <form onSubmit={handleSubmit}>
        <h2>Form Peminjaman</h2>

        {error && <p role="alert">{error}</p>}

        <label>
        Sumber daya
        <select
            value={sumberDayaID}
            onChange={(e) => setSumberDayaID(e.target.value)}
            required
        >
            <option value="">Pilih sumber daya</option>
            {sumberDaya.map((item) => (
            <option key={item.id} value={item.id}>
                {item.nama}
            </option>
            ))}
        </select>
        </label>

        {pilihan && (
        <p>Stok tersedia: {pilihan.stok}</p>
        )}

        <label>
        Peminjam
        <input
            value={peminjam}
            onChange={(e) => setPeminjam(e.target.value)}
            maxLength={50}
            required
        />
        </label>

        <label>
        Tanggal
        <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
        />
        </label>

        <label>
        Slot mulai
        <select
            value={slotMulai}
            onChange={(e) => setSlotMulai(e.target.value)}
        >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((slot) => (
            <option key={slot} value={slot}>
                {slot}
            </option>
            ))}
        </select>
        </label>

        <label>
        Slot selesai
        <select
            value={slotSelesai}
            onChange={(e) => setSlotSelesai(e.target.value)}
        >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((slot) => (
            <option key={slot} value={slot}>
                {slot}
            </option>
            ))}
        </select>
        </label>

        <label>
        Jumlah
        <input
            type="number"
            min={1}
            max={pilihan?.stok ?? 1}
            step={1}
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            required
        />
        </label>

        <button
        type="submit"
        disabled={menyimpan || sumberDaya.length === 0}
        >
        Simpan peminjaman
        </button>
    </form>
    );
    }
