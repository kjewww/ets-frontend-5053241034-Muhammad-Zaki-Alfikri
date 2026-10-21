# AI-LOG

Catat setiap penggunaan AI yang menghasilkan kode. Jika tidak memakai AI sama sekali, tulis satu baris: **tidak memakai AI**.

Log yang jujur tidak mengurangi nilai, sebanyak apa pun AI dipakai. Yang mengurangi nilai adalah log yang tidak sesuai dengan kode, atau isi log yang tidak bisa kamu jelaskan.

## (Nama fitur atau komponen, misalnya: Penanganan error 409 di form peminjaman, F5)
- Prompt: (ringkas, apa yang kamu minta)
- Dipakai: (bagian kode yang kamu ambil, misalnya nama komponen/fungsi dan file)
- Diubah: (apa yang kamu ubah atau perbaiki dari hasil AI, dan kenapa)

## (Entri berikutnya)
- Prompt: (F1) Meminta bantuan utk membuat Formulir untuk membuat sumber daya (ruang atau alat) dan daftar sumber daya yang diambil dari server saat halaman dibuka
- Dipakai: src/api/sumberDaya.ts — fungsi getSumberDaya() dan tambahSumberDaya(); src/components/sumberDayaForm.tsx — formulir sumber daya; src/components/sumberDayaList.tsx — daftar sumber daya; src/App.tsx — state dan pemanggilan API.
- Diubah:

## (Entri berikutnya)
- Prompt: (F2) meminta bantuan utk membuat Formulir peminjaman: satu sumber daya, satu tanggal, rentang slot, dan jumlah unit; item baru langsung tampil di daftar
- Dipakai: src/api/peminjaman.ts — fungsi tambahPeminjaman(); src/components/peminjamanForm.tsx — formulir peminjaman; src/App.tsx — handleSimpanPeminjaman() dan state peminjaman.
- Diubah:

## (Entri berikutnya)
- Prompt: (F3) meminta bantuan utk Daftar peminjaman dengan filter (sumber daya, tanggal, status) yang diproses server, dan detail satu peminjaman
- Dipakai: src/api/peminjaman.ts — fungsi getPeminjaman() dan getDetailPeminjaman(); src/components/peminjamanList.tsx — daftar dan filter; src/App.tsx — state filter, pemuatan daftar, dan handleDetail().
- Diubah:

## (Entri berikutnya)
- Prompt: (F4) meminta bantuan utk Input diperiksa sebelum dikirim; pesan error dari server ditampilkan; aplikasi tetap bisa dipakai saat server tidak bisa dihubungi
- Dipakai: src/api/http.ts — fungsi kirimRequest() dan ambilPesanError(); src/components/sumberDayaForm.tsx dan src/components/peminjamanForm.tsx — validasi form; src/App.tsx — pengelolaan error dan status loading.
- Diubah:

## (Entri berikutnya)
- Prompt: (F5) meminta bantuan utk Peminjaman yang ditolak karena slot penuh (409) dijelaskan ke pengguna tanpa menghapus isian form
- Dipakai: src/api/http.ts — fungsi ambilPesanError(); src/api/peminjaman.ts — fungsi tambahPeminjaman(); src/components/peminjamanForm.tsx — penampilan pesan error; src/App.tsx — handleSimpanPeminjaman().
- Diubah:

## (Entri berikutnya)
- Prompt: (F6) meminta bantuan utk membuat fitur Edit mengisi form dengan data yang ada lalu mengirim PUT; hapus mengirim DELETE; keduanya menjaga tampilan tetap sama dengan data di server
- Dipakai: src/api/peminjaman.ts — fungsi getDetailPeminjaman(), ubahPeminjaman(), dan hapusPeminjaman(); src/components/peminjamanForm.tsx — pengisian formulir edit; src/components/peminjamanList.tsx — tombol edit dan hapus; src/App.tsx — handleEdit(), handleSimpanPeminjaman(), handleBatalEdit(), dan handleHapus().
- Diubah: