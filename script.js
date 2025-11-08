const gamesDiv = document.getElementById("games");

// ข้อมูลเกมเดียว
const game = {
  name: "[HALLOWEEN PART2🎃] Simple MiniGames",
  players: 0,
  visits: 22,
  thumbnail: "images/game1.png"  // path รูปใน repo
};

// แสดงผลบนหน้าเว็บ
gamesDiv.innerHTML = `
  <div class="game-card">
    <h2>${game.name}</h2>
    <p>Players: ${game.players}</p>
    <p>Visits: ${game.visits}</p>
    <img src="${game.thumbnail}" alt="Game Thumbnail">
  </div>
`;
