const universeIds = ["8766666913"]; // ใส่หลาย UniverseId
const proxyUrl = "https://simplegames.0408-wayox2.workers.dev/";
const gamesDiv = document.getElementById("games");

async function fetchGames() {
  try {
    // เรียก Worker พร้อมหลาย UniverseId
    const res = await fetch(`${proxyUrl}?universeIds=${universeIds.join(",")}`);
    const data = await res.json();

    if (data.error) {
      gamesDiv.innerHTML = `<p>Error: ${data.error}</p>`;
      return;
    }

    // ล้าง div ก่อน
    gamesDiv.innerHTML = "";

    // Loop ผ่านทุกเกมใน data
    data.data.forEach(game => {
      const thumbnailUrl = `https://www.roblox.com/thumbnail/asset?assetId=${game.rootPlaceId}&width=420&height=420&format=png`;

      const gameCard = document.createElement("div");
      gameCard.className = "game-card";
      gameCard.innerHTML = `
        <h2>${game.name}</h2>
        <p>Players: ${game.playing}</p>
        <p>Visits: ${game.visits}</p>
        <img src="${thumbnailUrl}" alt="Game Thumbnail">
      `;
      gamesDiv.appendChild(gameCard);
    });

  } catch (err) {
    console.error("Failed to fetch:", err);
    gamesDiv.innerHTML = `<p>Error fetching game data.</p>`;
  }
}

// เรียก fetch ตอนโหลดหน้า และอัพเดตทุก 5 วินาที
fetchGames();
setInterval(fetchGames, 5000);



