const universeId = "8766666913";
const proxyUrl = "https://simplegames.0408-wayox2.workers.dev/";
const gamesDiv = document.getElementById("games");

async function fetchGame() {
  try {
    const res = await fetch(`${proxyUrl}?universeId=${universeId}`);
    const data = await res.json();

    if(data.error){
      gamesDiv.innerHTML = `<p>Error: ${data.error}</p>`;
      return;
    }

    const game = data.data[0];
    const thumbnailUrl = `https://www.roblox.com/thumbnail/asset?assetId=${game.rootPlaceId}&width=420&height=420&format=png`;

    gamesDiv.innerHTML = `
      <div class="game-card">
        <h2>${game.name}</h2>
        <p>Players: ${game.playing}</p>
        <p>Visits: ${game.visits}</p>
        <img src="${thumbnailUrl}" alt="Game Thumbnail">
      </div>
    `;
  } catch(err){
    console.error(err);
    gamesDiv.innerHTML = `<p>Error fetching game data.</p>`;
  }
}

// เรียก fetch ทุก 5 วินาที
fetchGame();
setInterval(fetchGame, 5000);
