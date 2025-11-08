const universeId = "8766666913";
const gamesContainer = document.getElementById("games");

async function fetchGame() {
  try {
    const res = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
    const data = await res.json();
    const game = data.data[0];

    if (!game) {
      gamesContainer.innerHTML = `<p>Game not found.</p>`;
      return;
    }

    // ✅ ใช้ภาพ thumbnail ที่ได้จาก Roblox (ของคุณ)
    const imageUrl = "https://tr.rbxcdn.com/180DAY-f2e9e930722b81d9339296e5b1060087/420/420/Image/Png/noFilter";

    gamesContainer.innerHTML = `
      <div class="game-card">
        <h3>${game.name}</h3>
        <p>👤 Creator: ${game.creator.name}</p>
        <img src="${imageUrl}" alt="${game.name}">
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
