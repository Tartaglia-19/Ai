const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const dialogBox = document.getElementById("dialog-box");
const activeMissionText = document.getElementById("active-mission");
const missionLog = document.getElementById("mission-log");
const storyText = document.getElementById("story-text");

const TILE = 32;
const SPEED = 2;

const tileColors = {
  0: "#16a34a", // grass
  1: "#334155", // wall
  2: "#d97706", // road
  3: "#0ea5e9", // water
  4: "#f59e0b", // gym floor
  5: "#84cc16", // meadow
};

const maps = {
  leafroot: {
    name: "Leafroot Town",
    spawn: { x: 2, y: 2 },
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1],
      [1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1],
      [1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1],
      [1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1],
      [1,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    npcs: [
      {
        id: "professor",
        name: "Professor Pine",
        x: 5,
        y: 4,
        color: "#a78bfa",
        dialog: [
          "Welcome, trainer! Team Ember stole my research notes.",
          "Find Scout Aria in Misty Route and help her recover the lost pages.",
          "Press Enter to continue dialogue and E to interact with people.",
        ],
        missionStart: "recover-notes",
      },
      {
        id: "healer",
        name: "Nurse Clover",
        x: 15,
        y: 4,
        color: "#f472b6",
        dialog: [
          "I can patch up your Pixelmon whenever you're tired.",
          "Keep training! The gym in Spark City is tough.",
        ],
      },
    ],
    portals: [
      { x: 18, y: 6, toMap: "misty-route", toX: 1, toY: 6 },
    ],
  },
  "misty-route": {
    name: "Misty Route",
    spawn: { x: 1, y: 6 },
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1],
      [1,5,5,5,5,5,5,0,0,0,0,0,0,0,5,5,5,5,5,1],
      [1,2,2,2,2,2,2,2,2,2,2,2,2,0,5,5,5,5,5,1],
      [1,5,5,5,5,5,5,0,0,0,0,0,2,0,5,5,5,5,5,1],
      [1,5,5,5,5,5,5,0,3,3,3,0,2,0,5,5,5,5,5,1],
      [1,5,5,5,5,5,5,0,3,3,3,0,2,0,5,5,5,5,5,1],
      [1,5,5,5,5,5,5,0,3,3,3,0,2,2,2,2,2,2,2,1],
      [1,5,5,5,5,5,5,0,0,0,0,0,0,5,5,5,5,5,5,1],
      [1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1],
      [1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    npcs: [
      {
        id: "aria",
        name: "Scout Aria",
        x: 8,
        y: 4,
        color: "#60a5fa",
        dialog: [
          "Team Ember dropped notes near the lagoon.",
          "A wild Sparkit guards them. Beat it in battle!",
        ],
      },
      {
        id: "ember-grunt",
        name: "Ember Grunt",
        x: 12,
        y: 7,
        color: "#ef4444",
        dialog: [
          "You'll never get past me!",
        ],
        battleId: "grunt",
      },
    ],
    portals: [
      { x: 1, y: 3, toMap: "leafroot", toX: 17, toY: 6 },
      { x: 18, y: 7, toMap: "spark-city", toX: 1, toY: 5 },
    ],
  },
  "spark-city": {
    name: "Spark City Gym",
    spawn: { x: 1, y: 5 },
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
      [1,4,4,0,0,0,4,4,4,4,4,4,0,0,0,4,4,4,4,1],
      [1,4,4,0,0,0,4,4,4,4,4,4,0,0,0,4,4,4,4,1],
      [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
      [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    npcs: [
      {
        id: "gym-leader",
        name: "Leader Volt",
        x: 14,
        y: 4,
        color: "#fde047",
        dialog: ["Welcome challenger. Only true strategists earn the Thunder Badge!"],
        battleId: "volt",
      },
    ],
    portals: [
      { x: 1, y: 5, toMap: "misty-route", toX: 17, toY: 7 },
    ],
  },
};

const missions = {
  "recover-notes": {
    title: "Recover Professor Pine's Notes",
    description: "Find Scout Aria on Misty Route and defeat the Ember Grunt.",
    status: "locked",
  },
  "return-notes": {
    title: "Return the Notes",
    description: "Bring the recovered notes back to Professor Pine.",
    status: "locked",
  },
  "beat-gym": {
    title: "Earn the Thunder Badge",
    description: "Defeat Leader Volt in Spark City Gym.",
    status: "locked",
  },
};

const state = {
  map: "leafroot",
  player: {
    x: maps.leafroot.spawn.x * TILE + 4,
    y: maps.leafroot.spawn.y * TILE + 4,
    width: 22,
    height: 22,
    color: "#f8fafc",
    hp: 28,
    maxHp: 28,
    attack: 8,
  },
  keys: new Set(),
  nearbyNpc: null,
  dialogQueue: [],
  inDialog: false,
  inBattle: false,
  questFlags: {
    notesRecovered: false,
    badgeEarned: false,
  },
};

function setDialog(text) {
  dialogBox.textContent = text;
}

function setActiveMission(text) {
  activeMissionText.textContent = text;
}

function updateMissionLog() {
  missionLog.innerHTML = "";
  Object.values(missions).forEach((mission) => {
    if (mission.status === "locked") return;
    const li = document.createElement("li");
    li.textContent = `${mission.title}: ${mission.description}`;
    if (mission.status === "done") li.classList.add("done");
    missionLog.appendChild(li);
  });
}

function startMission(id) {
  const mission = missions[id];
  if (!mission || mission.status !== "locked") return;
  mission.status = "active";
  setActiveMission(`${mission.title} — ${mission.description}`);
  updateMissionLog();
}

function completeMission(id) {
  const mission = missions[id];
  if (!mission || mission.status !== "active") return;
  mission.status = "done";
  updateMissionLog();
}

function currentMap() {
  return maps[state.map];
}

function tileAtPixel(px, py) {
  const map = currentMap();
  const tx = Math.floor(px / TILE);
  const ty = Math.floor(py / TILE);
  return map.tiles[ty]?.[tx] ?? 1;
}

function solidTile(tile) {
  return tile === 1;
}

function collides(x, y) {
  const p = state.player;
  const corners = [
    [x, y],
    [x + p.width, y],
    [x, y + p.height],
    [x + p.width, y + p.height],
  ];
  return corners.some(([px, py]) => solidTile(tileAtPixel(px, py)));
}

function tryMove(dx, dy) {
  if (state.inDialog || state.inBattle) return;

  const p = state.player;
  const nx = p.x + dx;
  const ny = p.y + dy;

  if (!collides(nx, p.y)) p.x = nx;
  if (!collides(p.x, ny)) p.y = ny;

  handlePortal();
  detectNpc();
}

function detectNpc() {
  const map = currentMap();
  state.nearbyNpc = null;
  for (const npc of map.npcs) {
    const npcPx = npc.x * TILE + 4;
    const npcPy = npc.y * TILE + 4;
    const dist = Math.hypot(state.player.x - npcPx, state.player.y - npcPy);
    if (dist < 34) {
      state.nearbyNpc = npc;
      return;
    }
  }
}

function handlePortal() {
  const map = currentMap();
  const ptx = Math.floor((state.player.x + 10) / TILE);
  const pty = Math.floor((state.player.y + 10) / TILE);
  const portal = map.portals.find((entry) => entry.x === ptx && entry.y === pty);
  if (!portal) return;

  state.map = portal.toMap;
  state.player.x = portal.toX * TILE + 4;
  state.player.y = portal.toY * TILE + 4;
  setDialog(`You arrived at ${currentMap().name}.`);
  detectNpc();
}

function startDialog(lines) {
  state.dialogQueue = [...lines];
  state.inDialog = true;
  nextDialogLine();
}

function nextDialogLine() {
  if (!state.dialogQueue.length) {
    state.inDialog = false;
    setDialog(state.nearbyNpc ? `Press Enter to talk with ${state.nearbyNpc.name}.` : "Explore and help people around the island.");
    return;
  }
  setDialog(state.dialogQueue.shift());
}

function interactWithNpc() {
  const npc = state.nearbyNpc;
  if (!npc) {
    setDialog("No one is nearby. Walk close to an NPC and press E.");
    return;
  }

  if (npc.id === "professor") {
    if (missions["recover-notes"].status === "locked") {
      startMission("recover-notes");
      storyText.textContent = "Your first mission has begun. Head east to Misty Route.";
    } else if (missions["return-notes"].status === "active") {
      completeMission("return-notes");
      startMission("beat-gym");
      storyText.textContent = "Professor Pine has upgraded your Pixelmon. Challenge Leader Volt!";
      state.player.attack += 2;
      setDialog("Thanks for the notes! I improved your Pixelmon's attack.");
    }
  }

  if (npc.id === "aria" && missions["recover-notes"].status === "active") {
    setDialog("Aria: The grunt is just ahead. Beat them to reclaim the notes!");
  }

  if (npc.dialog) {
    startDialog(npc.dialog);
  }

  if (npc.battleId) {
    setDialog(`Press Enter again to battle ${npc.name}.`);
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function battle(enemyName, hp, attack) {
  state.inBattle = true;
  let enemyHp = hp;

  const turns = [];
  turns.push(`Battle Start! ${enemyName} challenges you.`);

  while (enemyHp > 0 && state.player.hp > 0) {
    const playerHit = randomInt(state.player.attack - 2, state.player.attack + 3);
    enemyHp -= playerHit;
    turns.push(`You hit ${enemyName} for ${playerHit}. (${Math.max(enemyHp, 0)} HP left)`);
    if (enemyHp <= 0) break;

    const enemyHit = randomInt(attack - 2, attack + 2);
    state.player.hp -= enemyHit;
    turns.push(`${enemyName} strikes back for ${enemyHit}. (${Math.max(state.player.hp, 0)} HP left)`);
  }

  if (state.player.hp <= 0) {
    state.player.hp = state.player.maxHp;
    state.inBattle = false;
    startDialog([...turns, "You blacked out... Nurse Clover healed your Pixelmon in Leafroot Town."]);
    state.map = "leafroot";
    state.player.x = maps.leafroot.spawn.x * TILE + 4;
    state.player.y = maps.leafroot.spawn.y * TILE + 4;
    return false;
  }

  state.inBattle = false;
  startDialog([...turns, `You defeated ${enemyName}!`]);
  return true;
}

function handleBattleInteraction() {
  const npc = state.nearbyNpc;
  if (!npc || !npc.battleId) return;

  if (npc.battleId === "grunt" && !state.questFlags.notesRecovered) {
    const won = battle("Ember Hound", 20, 6);
    if (won) {
      state.questFlags.notesRecovered = true;
      completeMission("recover-notes");
      startMission("return-notes");
      storyText.textContent = "You recovered the notes. Return to Professor Pine in Leafroot.";
    }
  }

  if (npc.battleId === "volt" && missions["beat-gym"].status === "active" && !state.questFlags.badgeEarned) {
    const won = battle("Volt's Stormlion", 30, 9);
    if (won) {
      state.questFlags.badgeEarned = true;
      completeMission("beat-gym");
      setActiveMission("All major missions complete! Keep exploring and talking to NPCs.");
      storyText.textContent = "You earned the Thunder Badge and became a hero of the island!";
    }
  }
}

function drawMap() {
  const map = currentMap();
  map.tiles.forEach((row, y) => {
    row.forEach((tile, x) => {
      ctx.fillStyle = tileColors[tile];
      ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
    });
  });

  for (const npc of map.npcs) {
    ctx.fillStyle = npc.color;
    ctx.fillRect(npc.x * TILE + 4, npc.y * TILE + 4, 22, 22);
    ctx.fillStyle = "#020617";
    ctx.font = "12px sans-serif";
    ctx.fillText(npc.name.split(" ")[0], npc.x * TILE - 2, npc.y * TILE - 4);
  }
}

function drawPlayer() {
  const p = state.player;
  ctx.fillStyle = p.color;
  ctx.fillRect(p.x, p.y, p.width, p.height);
  ctx.strokeStyle = "#0f172a";
  ctx.strokeRect(p.x, p.y, p.width, p.height);

  ctx.fillStyle = "#020617";
  ctx.fillRect(6, 6, 160, 18);
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(8, 8, (state.player.hp / state.player.maxHp) * 120, 14);
  ctx.fillStyle = "#fff";
  ctx.font = "12px sans-serif";
  ctx.fillText(`HP ${state.player.hp}/${state.player.maxHp} · ${currentMap().name}`, 132, 20);
}

function gameLoop() {
  if (state.keys.has("ArrowUp") || state.keys.has("w")) tryMove(0, -SPEED);
  if (state.keys.has("ArrowDown") || state.keys.has("s")) tryMove(0, SPEED);
  if (state.keys.has("ArrowLeft") || state.keys.has("a")) tryMove(-SPEED, 0);
  if (state.keys.has("ArrowRight") || state.keys.has("d")) tryMove(SPEED, 0);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  state.keys.add(event.key);
  state.keys.add(key);

  if (key === "e" && !state.inDialog) {
    interactWithNpc();
  }

  if (event.key === "Enter") {
    if (state.inDialog) {
      nextDialogLine();
      return;
    }
    handleBattleInteraction();
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  state.keys.delete(event.key);
  state.keys.delete(key);
});

startMission("recover-notes");
updateMissionLog();
detectNpc();
setDialog("Find Professor Pine and press E to talk.");
requestAnimationFrame(gameLoop);
