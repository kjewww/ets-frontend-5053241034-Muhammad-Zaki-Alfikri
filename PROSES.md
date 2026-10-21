# PROSES

## 1. Persona dan masalahnya
pengguna adalah asisten lab yang mengelola peminjaman lab. tapi pada jam tertentu lab tidak bisa digunakan dan jika ada yg sudah terlanjur meminjam dapat dibatalkan aslab.

## 2. Rancangan komponen dan state
(Gambar atau tulis pembagian komponen: komponen apa saja, state apa disimpan di komponen mana, dan props apa yang mengalir ke bawah. Rancang ini sebelum menulis kode, lalu catat kalau berubah di tengah jalan.)
src/
├── api/
│   ├── http.ts
│   ├── sumberDaya.ts
│   └── peminjaman.ts
├── components/
│   ├── SumberDayaForm.tsx
│   ├── SumberDayaList.tsx
│   ├── PeminjamanForm.tsx
│   └── PeminjamanList.tsx
├── App.tsx
└── main.tsx

App.tsx	Mengelola state utama, memanggil API, mengatur loading, error, tambah/edit/hapus, dan menyegarkan data.
SumberDayaForm.tsx	Menampilkan form sumber daya, memvalidasi input, dan mencegah pengiriman berulang.
SumberDayaList.tsx	Menampilkan daftar sumber daya. Tidak mengelola salinan state daftar.
PeminjamanForm.tsx	Menampilkan form peminjaman, memvalidasi input, mengisi data ketika edit, dan mencegah pengiriman berulang.
PeminjamanList.tsx	Menampilkan daftar peminjaman, filter, serta tombol detail, edit, dan hapus.
api/http.ts	Menangani request HTTP dan membaca pesan error dari server.
api/sumberDaya.ts	Menyediakan fungsi API untuk mengambil dan menambah sumber daya.
api/peminjaman.ts	Menyediakan fungsi API untuk mengambil, menambah, mengubah, dan menghapus peminjaman.
main.tsx hanya menjadi titik masuk aplikasi React, jadi tidak perlu menyimpan state bisnis.


## 3. Satu keputusan desain
-

## 4. Bug atau kendala (minimal dua)
### Bug 1
- Gejala:
- Cara menemukan:
- Penyebab dan solusi:

### Bug 2
- Gejala:
- Cara menemukan:
- Penyebab dan solusi:

## 5. Change request
(Apa yang diminta, bagian kode mana yang kamu ubah, dan satu keputusan desain yang kamu ambil.)
