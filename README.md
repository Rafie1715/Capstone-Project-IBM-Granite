# Capstone Project: Block Breaker Game

## Deskripsi
Proyek ini adalah implementasi modern dari game arcade klasik "Breakout" atau "Arkanoid", yang dibuat dari nol sebagai bagian dari Capstone Project. Game ini menantang pemain untuk menghancurkan semua bata di layar dengan memantulkan bola menggunakan sebuah paddle.

Tujuan utama proyek ini adalah untuk membangun sebuah aplikasi web yang fungsional dan interaktif, sambil mendokumentasikan bagaimana **bantuan AI (Artificial Intelligence)** digunakan untuk mempercepat, mengoptimalkan, dan memecahkan masalah selama proses pengembangan.

## Teknologi yang Digunakan
* **HTML5**: Digunakan untuk struktur dasar halaman web, dengan elemen inti `<canvas>` sebagai panggung utama permainan.
* **CSS3**: Bertanggung jawab untuk semua styling modern, termasuk layout, latar belakang gradasi, Google Fonts ('Poppins'), dan efek bayangan (`box-shadow`) untuk menciptakan antarmuka yang menarik secara visual.
* **JavaScript (ES6+)**: Menjadi otak dari semua logika permainan. Ini mencakup *game loop*, rendering objek pada canvas, fisika sederhana, deteksi tabrakan, manajemen *state* (layar menu, bermain, game over), dan penanganan input dari pengguna. **Tidak ada *library* atau *framework* eksternal yang digunakan.**
* **AI Assistant (IBM Granite)**: Berperan sebagai asisten developer untuk menghasilkan *boilerplate code*, mengembangkan fungsi kompleks, memberikan saran improvisasi, dan membantu proses *debugging*.
* **Git & GitHub**: Digunakan untuk manajemen versi dan sebagai repositori kode.

## Fitur
* **Gameplay Klasik Breakout**: Kontrol paddle untuk memantulkan bola dan hancurkan semua bata untuk menang.
* **Sistem Kontrol Ganda**: Pemain dapat dengan mudah beralih antara **kontrol Mouse** yang intuitif dan **kontrol Keyboard** klasik (Tombol Panah) melalui tombol di layar.
* **Manajemen State Permainan**: Game memiliki alur yang jelas dengan beberapa state: Layar Awal (`menu`), Bermain (`playing`), Menang (`win`), dan Kalah (`gameOver`).
* **Antarmuka Modern**: Pesan di layar (seperti "Click to Start" atau "GAME OVER") ditampilkan secara elegan sebagai *overlay* di atas canvas, menggantikan `alert()` yang kaku.
* **Mekanik "Sticky Ball"**: Untuk memberikan kontrol lebih, bola akan menempel pada paddle di awal permainan dan setelah kehilangan nyawa. Pemain meluncurkan bola dengan melakukan klik mouse.
* **Sistem Skor & Nyawa**: Progres pemain dilacak melalui sistem skor dan tiga nyawa yang ditampilkan secara *real-time* di dalam canvas.
* **Visual yang Menarik**: Objek permainan seperti bola, paddle, dan bata diberi gaya gradasi warna untuk memberikan nuansa 3D yang halus dan modern.

## Petunjuk Setup
Proyek ini tidak memerlukan proses instalasi atau *build* yang rumit.
1.  *Clone* repositori ini ke komputer lokal Anda:
    ```bash
    git clone https://github.com/Rafie1715/Capstone-Project-IBM-Granite
    ```
2.  Masuk ke direktori proyek.
3.  Buka file `index.html` menggunakan browser web modern seperti Google Chrome, Firefox, atau Edge.
4.  Selesai! Game siap dimainkan.

## Penjelasan Dukungan AI (AI Support Explanation)
Dalam pengembangan game Breakout ini, AI berperan sebagai *co-pilot* yang sangat penting. Bantuan AI tidak hanya mempercepat penulisan kode, tetapi juga membantu dalam memecahkan masalah logika dan mengimplementasikan fitur-fitur canggih. Berikut adalah rincian kontribusinya:

1.  **Generasi Kode Awal & Setup**: Saya memberikan prompt kepada AI untuk membuat struktur dasar HTML dengan elemen `<canvas>` dan *boilerplate* CSS, termasuk mengimpor font dan menata layout halaman. Ini menghemat waktu setup awal.

2.  **Pengembangan Fungsi Inti**: AI membantu menghasilkan fungsi-fungsi inti yang menjadi dasar permainan:
    * **Fungsi Rendering**: Dengan prompt seperti "Buatkan fungsi untuk menggambar bola di canvas", AI menghasilkan kode Canvas API yang benar untuk `drawBall()`, `drawPaddle()`, dan `drawBricks()`.
    * **Deteksi Tabrakan**: Saya meminta AI untuk membuat logika deteksi tabrakan (`collisionDetection()`), sebuah tugas yang cukup kompleks. AI memberikan algoritma untuk memeriksa apakah koordinat bola bersinggungan dengan batas-batas setiap bata, dinding, dan paddle.

3.  **Debugging sebagai Partner**: Selama pengembangan, terjadi *bug* di mana bata tidak muncul di layar. Setelah saya deskripsikan masalahnya, AI membantu saya menelusuri kode dan kami menemukan adanya kesalahan penulisan variabel (`padding` seharusnya `brickPadding`). Ini menunjukkan betapa bergunanya AI sebagai partner *debugging*.

4.  **Implementasi Fitur Lanjutan (Improvisasi)**: Setelah kerangka dasar jadi, saya menggunakan AI untuk melakukan *refactoring* dan menambahkan fitur-fitur canggih:
    * **Kontrol Mouse**: Saya meminta AI untuk "menambahkan kontrol mouse yang intuitif untuk menggerakkan paddle".
    * **Manajemen State**: Prompt "ubah game agar memiliki state menu, bermain, dan game over" menghasilkan implementasi *state machine* sederhana yang menjadi dasar untuk alur permainan yang lebih baik.
    * **UI di Canvas**: Untuk mengganti `alert()`, saya meminta AI membuat fungsi yang bisa menampilkan pesan di tengah canvas dengan latar belakang semi-transparan.

**Dampak Nyata**: Penggunaan AI secara signifikan mengurangi waktu yang dihabiskan untuk mencari dokumentasi API Canvas dan merancang algoritma dari nol. Hal ini memungkinkan saya untuk lebih fokus pada aspek desain game, pengalaman pengguna (UX), dan menambahkan fitur-fitur polesan yang membuat game ini lebih menarik.
