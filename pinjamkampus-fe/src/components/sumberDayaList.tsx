
import type { SumberDaya } from "../api/sumberDaya";

type Props = {
sumberDaya: SumberDaya[];
};

export default function SumberDayaList({ sumberDaya }: Props) {
return (
    <section>
    <h2>Daftar Sumber Daya</h2>

    <ul aria-label="Daftar sumber daya">
        {sumberDaya.map((item) => (
        <li key={item.id}>
            {item.nama} — Jenis: {item.jenis} — Stok: {item.stok}
        </li>
        ))}
    </ul>
    </section>
);
}
