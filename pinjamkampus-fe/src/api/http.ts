export async function kirimRequest(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  try {
    return await fetch(url, options);
  } catch {
    throw new Error("Gagal terhubung ke server. Pastikan backend berjalan.");
  }
}

export async function ambilPesanError(response: Response): Promise<string> {
  try {
    const hasil: { error?: string } = await response.json();

    if (hasil.error) {
      return hasil.error;
    }
  } catch {
    // Respons bukan JSON yang valid.
  }

  return `Terjadi error pada server (HTTP ${response.status}).`;
}
