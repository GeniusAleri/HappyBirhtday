document.getElementById("lanjut-btn").addEventListener("click", () => {
  const nama = document.getElementById("nama").value.trim();
  if (nama === "") {
    alert("Tolong masukkan nama kamu dulu ya!");
    return;
  }
  document.getElementById("form-container").classList.add("hidden");
  document.getElementById("message-container").classList.remove("hidden");
  document.getElementById("nama-output").textContent = nama;

  // 🎉 Efek confetti
  startConfettiParty(); // 💥 Mulai party!
});

// Amplop ke form
document.getElementById("envelope").addEventListener("click", () => {
  const amplop = document.getElementById("envelope");
  const form = document.getElementById("form-container");

  // Tambah animasi zoom
  amplop.classList.add("zoomed");

  // Setelah animasi selesai, tampilkan form dan sembunyikan amplop
  setTimeout(() => {
    amplop.classList.add("hidden");
    form.classList.remove("hidden");
    form.classList.add("fade-in");
  }, 600); // durasi harus sama dengan animasi zoomIn
});

// Form ke pesan
document.getElementById("lanjut-btn").addEventListener("click", () => {
  const nama = document.getElementById("nama").value.trim();
  if (nama === "") {
    alert("Tolong masukkan nama kamu dulu ya!");
    return;
  }

  // Sembunyikan amplop & form
  document.getElementById("envelope").classList.add("hidden");
  document.getElementById("form-container").classList.add("hidden");

  // Tampilkan ucapan
  document.getElementById("message-container").classList.remove("hidden");
  document.getElementById("nama-output").textContent = nama;

  // Efek mengetik
  ketikTeks(pesanUcapan, "typewriter", 40);
});

// Auto play audio setelah user berinteraksi
function playMusic() {
  const audio = document.getElementById("bg-music");
  const isPlaying = !audio.paused;

  // Jika belum main, tunggu interaksi user
  if (!isPlaying) {
    const playOnClick = () => {
      audio.play().catch((e) => {
        console.log("Autoplay gagal:", e);
      });
      document.removeEventListener("click", playOnClick);
    };

    document.addEventListener("click", playOnClick);
  }
}

window.addEventListener("load", playMusic);

// Bintang jatuh
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 1,
    d: Math.random() * 0.5 + 0.5,
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  updateStars();
}

function updateStars() {
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }
}

setInterval(drawStars, 33);

const pesanUcapan = `
Selamat ulang tahun yaa, sayangku yang paling manis dan paling ngeselin 🥰 <br><br>

Hari ini kamu tambah umur, tapi tetep nggak nambah tinggi 😝 — eh tapi nggak apa-apa, yang penting hatinya makin luas dan sabarnya makin tebal buat hadapin aku 😆 <br><br>

Semoga semua harapan kamu tercapai, dimudahkan segala urusan, dan tetap jadi versi terbaik dari dirimu sendiri. Jangan lupa bahagia yaa, apalagi ada aku yang selalu support kamu... dari jarak dekat maupun jauh 🫶 <br><br>

Terima kasih ya udah sabar banget sama aku, meskipun kadang aku ngambek-ngambek nggak jelas atau becandanya kelewatan. Tapi percayalah, semua itu karena aku nyaman sama kamu 😚 <br><br>

Jadiii… selamat ulang tahun lagi, ya cintaa!  <br><br>
Tetap jadi kamu yang aku sayang setiap hari. Dan siap-siap, hari ini aku bakal makin nyebelin, tapi dengan dosis cinta yang lebih tinggi 💖<br><br>

btw akuu gatau wkk ini kadonya udah sampe atau belom tapi kalo belom sampee yaudah tunggu aja, kalo udah sampee yaa semoga kamu sukaa sayangg...
`;

function ketikTeks(teks, elemenId, kecepatan = 50) {
  let i = 0;
  const target = document.getElementById(elemenId);
  target.innerHTML = "";

  const interval = setInterval(() => {
    if (i < teks.length) {
      // Tambah satu karakter per langkah
      const char = teks.charAt(i);

      // Deteksi <br> agar tidak dipotong
      if (teks.substring(i, i + 4) === "<br>") {
        target.innerHTML += "<br>";
        i += 4;
      } else {
        target.innerHTML += char;
        i++;
      }
    } else {
      clearInterval(interval);
      document.getElementById("downloadPrompt").style.display = "block";
    }
  }, kecepatan);
}

function startConfettiParty() {
  const duration = 2500; // 2.5 detik
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 1000 };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // ledakan kiri
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: Math.random() * 0.2, y: Math.random() * 0.6 },
      })
    );

    // ledakan kanan
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: Math.random() * 0.2 + 0.8, y: Math.random() * 0.6 },
      })
    );

    // tengah atas
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: 0.5, y: Math.random() * 0.2 },
      })
    );
  }, 200);
}

function createFallingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 3 + Math.random() * 3 + "s";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

// Ulangi terus setiap 300ms
setInterval(createFallingHeart, 300);
