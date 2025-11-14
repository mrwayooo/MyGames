const universeId = "8766666913";
const gamesContainer = document.getElementById("games");

async function fetchGame() {
  try {
    // 📌 1) ดึงข้อมูลเกม
    const res = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
    const data = await res.json();
    const game = data.data[0];

    if (!game) {
      gamesContainer.innerHTML = `<p>Game not found.</p>`;
      return;
    }

    // 📌 2) ขอ Thumbnail จาก Roblox API
    const thumbRes = await fetch(
      `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`
    );
    const thumbData = await thumbRes.json();
    const thumbnailUrl = thumbData.data?.[0]?.imageUrl || "";

    gamesContainer.innerHTML = `
      <div class="game-card">
        <h3>${game.name}</h3>
        <p>👤 Creator: ${game.creator.name}</p>

        <img 
          src="${thumbnailUrl}" 
          alt="${game.name}"
          onerror="this.src='fallback.png'"
        >

        <p>🕹️ Players: ${game.playing}</p>
        <p>👁️ Visits: ${game.visits.toLocaleString()}</p>

        <a class="play-btn" href="https://www.roblox.com/games/${game.rootPlaceId}" target="_blank">
          ▶ Play on Roblox
        </a>
      </div>
    `;
  } catch (err) {
    console.error("Error fetching game:", err);
    gamesContainer.innerHTML = `<p>Error loading game data.</p>`;
  }
}

fetchGame();
