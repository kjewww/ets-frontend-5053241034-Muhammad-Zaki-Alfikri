const BASE_URL = "http://localhost:8081";

export type SumberDaya = {
  id: number;
  nama: string;
  jenis: "ruang" | "alat";
  stok: number;
};

export type SumberDayaInput = {
  nama: string;
  jenis: "ruang" | "alat";
  stok: number;
};

async function ambilError(response: Response): Promise<string> {
  const data: { error?: string } = await response.json();
  return data.error || "Terjadi error pada server.";
}

export async function getSumberDaya(): Promise<SumberDaya[]> {
  const response = await fetch(`${BASE_URL}/sumber-daya`);

  if (!response.ok) {
    throw new Error(await ambilError(response));
  }

  return response.json() as Promise<SumberDaya[]>;
}

export async function tambahSumberDaya(
  data: SumberDayaInput,
): Promise<SumberDaya> {
  const response = await fetch(`${BASE_URL}/sumber-daya`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await ambilError(response));
  }

  return response.json() as Promise<SumberDaya>;
}
