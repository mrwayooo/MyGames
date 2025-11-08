const universeId = "8766666913";
const proxyUrl = "https://simplegames.0408-wayox2.workers.dev/";
const gamesDiv = document.getElementById("games");

async function fetchGame() {
  try {
    const res = await fetch(`${proxyUrl}?universeIds=${universeId}`); // ✅ มี s
    const data = await res.json();

    if (data.error) {
      gamesDiv.innerHTML = `<p>Error: ${data.error}</p>`;
      return;
    }

    const game = data.data[0];
    const thumbnailUrl = `https://www.roblox.com/thumbnail/asset?assetId=${game.rootPlaceId}&width=420&height=420&format=png`;

    gamesDiv.innerHTML = `
      <div class="game-card">
        <h2>${game.name}</h2>
        <p><strong>Creator:</strong> ${game.creator.name}</p>
        <p><strong>Players:</strong> ${game.playing}</p>
        <p><strong>Visits:</strong> ${game.visits.toLocaleString()}</p>
        <img src="${thumbnailUrl}" alt="Game Thumbnail">
      </div>
    `;
  } catch (err) {
    console.error(err);
    gamesDiv.innerHTML = `<p>⚠️ Error fetching game data.</p>`;
  }
}

// โหลดข้อมูลครั้งแรก + อัปเดตใหม่ทุก 10 วินาที
fetchGame();
setInterval(fetchGame, 10000);
