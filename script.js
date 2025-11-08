// =============================
// ตั้งค่า UniverseId ของเกม Roblox
// =============================
const universeId = "8766666913"; // แทนด้วยรหัสเกมของคุณ
const proxyUrl = "https://simplegames.0408-wayox2.workers.dev/"; // แทนด้วย URL Worker ของคุณ

const gamesDiv = document.getElementById("games");

// =============================
// ฟังก์ชัน fetch เกมจาก Worker
// =============================
async function fetchGames() {
  try {
    const res = await fetch(`${proxyUrl}?universeId=${universeId}`);
    const data = await res.json();

    if (data.error) {
      gamesDiv.innerHTML = `<p>Error: ${data.error}</p>`;
      return;
    }

    const game = data.data[0];

    // สร้าง card แสดงข้อมูลเกม
    gamesDiv.innerHTML = `
      <div class="game-card">
        <h2>${game.name}</h2>
        <p>Players: ${game.playing}</p>
        <img src="${game.thumbnailUrl}" alt="Game Thumbnail">
      </div>
    `;
  } catch (err) {
    console.error("Failed to fetch:", err);
    gamesDiv.innerHTML = `<p>Error fetching game data.</p>`;
  }
}

// =============================
// เรียก fetch ตอนโหลดหน้า และอัพเดตทุก 5 วินาที
// =============================
fetchGames();
setInterval(fetchGames, 5000);
