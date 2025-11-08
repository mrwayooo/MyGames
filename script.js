const universeId = "8766666913"; // ใส่รหัสเกมของคุณ
const proxyUrl = "https://simplegames.0408-wayox2.workers.dev/";

const gamesDiv = document.getElementById("games");

async function fetchGames() {
  try {
    const res = await fetch(`${proxyUrl}?universeId=${universeId}`);
    const data = await res.json();
    
    if(data.error) {
      gamesDiv.innerHTML = `<p>${data.error}</p>`;
      return;
    }

    const game = data.data[0];

    gamesDiv.innerHTML = `
      <h2>${game.name}</h2>
      <p>Players: ${game.playing}</p>
      <img src="${game.thumbnailUrl}" width="200">
    `;
  } catch (err) {
    console.error("Failed to fetch:", err);
    gamesDiv.innerHTML = `<p>Error fetching game data.</p>`;
  }
}

fetchGames();
setInterval(fetchGames, 5000);


