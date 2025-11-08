const universeId = "8766666913";
const proxyUrl = "https://simplegames.0408-wayox2.workers.dev";
const gamesDiv = document.getElementById("games");

async function fetchGames() {
  try {
    const res = await fetch(`${proxyUrl}?universeId=${universeId}`);
    const data = await res.json();

    if (data.error) {
      gamesDiv.innerHTML = `<p>Error: ${data.error}</p>`;
      return;
    }

    const game = data.data[0];

    gamesDiv.innerHTML = `
      <div class="game-card">
        <h2>${game.name}</h2>
        <p>Players: ${game.playing}</p>
        <p>Visits: ${game.visits}</p>
        <img src="https://t6.rbxcdn.com/${game.id}" alt="Game Thumbnail" width="200">
      </div>
    `;
  } catch (err) {
    console.error("Failed to fetch:", err);
    gamesDiv.innerHTML = `<p>Error fetching game data.</p>`;
  }
}

// เรียก fetch ตอนโหลดหน้า และอัพเดตทุก 5 วินาที
fetchGames();
setInterval(fetchGames, 5000);

