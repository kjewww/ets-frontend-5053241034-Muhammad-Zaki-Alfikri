import type { Peminjaman } from "../api/peminjaman";
import type { SumberDaya } from "../api/sumberDaya";

type Props = {
peminjaman: Peminjaman[];
sumberDaya: SumberDaya[];
filterSumberDaya: string;
filterTanggal: string;
filterStatus: string;
onFilterSumberDaya: (nilai: string) => void;
onFilterTanggal: (nilai: string) => void;
onFilterStatus: (nilai: string) => void;
onDetail: (id: number) => void;
onEdit: (item: Peminjaman) => void;
onHapus: (id: number) => void;
menghapusID: number | null;
};

export default function PeminjamanList({
  peminjaman,
  sumberDaya,
  filterSumberDaya,
  filterTanggal,
  filterStatus,
  onFilterSumberDaya,
  onFilterTanggal,
  onFilterStatus,
  onDetail,
  onEdit,
  onHapus,
  menghapusID,
}: Props) {
return (
    <section>
    <h2>Daftar Peminjaman</h2>

    <label>
        Filter sumber daya
        <select
        value={filterSumberDaya}
        onChange={(e) => onFilterSumberDaya(e.target.value)}
        >
        <option value="">Semua</option>
        {sumberDaya.map((item) => (
            <option key={item.id} value={item.id}>
            {item.nama}
            </option>
        ))}
        </select>
    </label>

    <label>
        Filter tanggal
        <input
        type="date"
        value={filterTanggal}
        onChange={(e) => onFilterTanggal(e.target.value)}
        />
    </label>

    <label>
        Filter status
        <select
        value={filterStatus}
        onChange={(e) => onFilterStatus(e.target.value)}
        >
        <option value="">Semua</option>
        <option value="aktif">aktif</option>
        <option value="dibatalkan">dibatalkan</option>
        </select>
    </label>

    <ul aria-label="Daftar peminjaman">
        {peminjaman.map((item) => {
        const sumber = sumberDaya.find(
            (s) => s.id === item.sumber_daya_id
        );

        return (
            <li key={item.id}>
            <p>
                {item.peminjam} — {sumber?.nama ?? "Sumber daya tidak ditemukan"}
            </p>

            <p>Tanggal: {item.tanggal}</p>
            <p>
                Slot {item.slot_mulai}-{item.slot_selesai}
            </p>
            <p>Jumlah: {item.jumlah}</p>
            <p>Status: {item.status}</p>

            <button
                type="button"
                onClick={() => onDetail(item.id)}
            >
                Detail
            </button>
            {item.status === "aktif" && (

            <button
                type="button"
                onClick={() => onEdit(item)}
            >
                Edit
            </button>
            )}

            <button
            type="button"
            onClick={() => onHapus(item.id)}
            disabled={menghapusID !== null}
            >
            Hapus
            </button>
            </li>
        );
        })}
    </ul>
    </section>
);
}
