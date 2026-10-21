const BASE_URL = "http://localhost:8081";
import { kirimRequest, ambilPesanError } from "./http";

export type Peminjaman = {
  id: number;
  sumber_daya_id: number;
  peminjam: string;
  tanggal: string;
  slot_mulai: number;
  slot_selesai: number;
  jumlah: number;
  status: string;
};

export type PeminjamanInput = {
  sumber_daya_id: number;
  peminjam: string;
  tanggal: string;
  slot_mulai: number;
  slot_selesai: number;
  jumlah: number;
};

export async function tambahPeminjaman(
  data: PeminjamanInput,
): Promise<Peminjaman> {
  const response = await kirimRequest(`${BASE_URL}/peminjaman`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // const hasil: { error?: string } = await response.json();
    throw new Error(await ambilPesanError(response));
  }

  return response.json() as Promise<Peminjaman>;
}

export async function getPeminjaman(
  sumberDayaID: string,
  tanggal: string,
  status: string,
): Promise<Peminjaman[]> {
  const params = new URLSearchParams();

  if (sumberDayaID) {
    params.append("sumber_daya_id", sumberDayaID);
  }

  if (tanggal) {
    params.append("tanggal", tanggal);
  }

  if (status) {
    params.append("status", status);
  }

  const query = params.toString();
  const url = query
    ? `${BASE_URL}/peminjaman?${query}`
    : `${BASE_URL}/peminjaman`;

  const response = await kirimRequest(url);

  if (!response.ok) {
    // const hasil: { error?: string } = await response.json();
    throw new Error(await ambilPesanError(response));
  }

  return response.json() as Promise<Peminjaman[]>;
}

export async function getDetailPeminjaman(id: number): Promise<Peminjaman> {
  const response = await kirimRequest(`${BASE_URL}/peminjaman/${id}`);

  if (!response.ok) {
    throw new Error(await ambilPesanError(response));
  }

  return response.json() as Promise<Peminjaman>;
}

export async function ubahPeminjaman(
  id: number,
  data: PeminjamanInput,
): Promise<Peminjaman> {
  const response = await kirimRequest(`${BASE_URL}/peminjaman/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await ambilPesanError(response));
  }

  return response.json() as Promise<Peminjaman>;
}
