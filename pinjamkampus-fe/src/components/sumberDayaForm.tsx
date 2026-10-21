
import type { SumberDayaInput } from "../api/sumberDaya";

type Props = {
    nama: string;
    jenis: "ruang" | "alat";
    stok: string;
    menyimpan: boolean;
    onNamaChange: (nilai: string) => void;
    onJenisChange: (nilai: "ruang" | "alat") => void;
    onStokChange: (nilai: string) => void;
    onSubmit: (data: SumberDayaInput) => Promise<void>;
};

export default function SumberDayaForm({
    nama,
    jenis,
    stok,
    menyimpan,
    onNamaChange,
    onJenisChange,
    onStokChange,
    onSubmit,
}: Props) {
function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const namaBersih = nama.trim();
    const stokAngka = Number(stok);

    if (!namaBersih) {
    return;
    }

    if (namaBersih.length > 50) {
    return;
    }

    if (!Number.isInteger(stokAngka) || stokAngka < 1) {
    return;
    }

    onSubmit({
    nama: namaBersih,
    jenis,
    stok: stokAngka,
    });
}

return (
    <form onSubmit={handleSubmit}>
    <h2>Tambah Sumber Daya</h2>

    <label>
        Nama sumber daya
        <input
        value={nama}
        onChange={(e) => onNamaChange(e.target.value)}
        maxLength={50}
        required
        />
    </label>

    <label>
        Jenis
        <select
        value={jenis}
        onChange={(e) =>
            onJenisChange(e.target.value as "ruang" | "alat")
        }
        >
        <option value="ruang">Ruang</option>
        <option value="alat">Alat</option>
        </select>
    </label>

    <label>
        Stok
        <input
        type="number"
        min={1}
        step={1}
        value={stok}
        onChange={(e) => onStokChange(e.target.value)}
        required
        />
    </label>

    <button type="submit" disabled={menyimpan}>
        Simpan sumber daya
    </button>
    </form>
);
}
