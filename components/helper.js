export const getBlankEdges = (gridSize) => {
  let edgeData = [];

  for (x = 1; x <= gridSize + 1; x++) {
    for (y = 0; y <= gridSize * 2; y++) {
      if (!(x === gridSize + 1 && y % 2 === 0)) {
        edgeData.push({
          x: x,
          y: y,
          status: "open",
          ownership: 0,
        });
      }
    }
  }

  return edgeData;
};

export const getBlankCells = (gridSize) => {
  let cellData = [];
  for (x = 1; x <= gridSize; x++) {
    for (y = 1; y <= gridSize; y++) {
      cellData.push({
        x: x,
        y: y,
        status: "empty", //empty, owned, ?bonus?
        ownership: 0,
      });
    }
  }
  return cellData;
};

export const countOpenEdges = (edgeState) => {
  return edgeState.filter((edge) => edge.status === "open").length;
};

export const countConfirmedEdges = (edgeState) => {
  return edgeState.filter((edge) => edge.status === "confirmed").length;
};

export function getEdgePairs(x, y) {
  const pairs = [];

  // Top edge
  if (y > 0) {
    pairs.push({ x: x, y: y * 2 - 2 });
  }

  // // Left edge
  pairs.push({ x: x, y: y * 2 - 1 });

  // // Right edge
  pairs.push({ x: x + 1, y: y * 2 - 1 });

  // // Bottom edge
  pairs.push({ x: x, y: y * 2 });

  return pairs;
}

export const getPlayerScore = (ownership, cellState) => {
  if (ownership === 0) {
    return cellState.filter((cell) => cell.status === "empty").length;
  } else {
    return cellState.reduce((count, cell) => {
      if (cell.ownership === "owned" && cell.capturedBy === ownership) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
  }
};

export const getDefaultPlayers = () => {
  return [
    {
      name: "Player 1",
    },
    {
      name: "Player 2",
    },
  ];
};

export const lightenColor = (hexColor) => {
  // Remove the '#' if present
  hexColor = hexColor.replace("#", "");

  // Convert hex to RGB
  let r = parseInt(hexColor.substring(0, 2), 16);
  let g = parseInt(hexColor.substring(2, 4), 16);
  let b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate lighter shade (increase RGB values)
  r = Math.min(255, r + 50);
  g = Math.min(255, g + 50);
  b = Math.min(255, b + 50);

  // Convert RGB to hex
  r = r.toString(16).padStart(2, "0");
  g = g.toString(16).padStart(2, "0");
  b = b.toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
};

export const darkenColor = (hexColor) => {
  // Remove the '#' if present
  hexColor = hexColor.replace("#", "");

  // Convert hex to RGB
  let r = parseInt(hexColor.substring(0, 2), 16);
  let g = parseInt(hexColor.substring(2, 4), 16);
  let b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate darker shade (decrease RGB values)
  r = Math.max(0, r - 50);
  g = Math.max(0, g - 50);
  b = Math.max(0, b - 50);

  // Convert RGB to hex
  r = r.toString(16).padStart(2, "0");
  g = g.toString(16).padStart(2, "0");
  b = b.toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
};

export const getRandomComputerName = () => {
  const adjectives = [
    "Alpha",
    "Beta",
    "Gamma",
    "Delta",
    "Omega",
    "Sigma",
    "Epsilon",
    "Zeta",
    "Theta",
    "Kappa",
  ];
  const nouns = [
    "Cyber",
    "Bot",
    "AI",
    "Processor",
    "Server",
    "Mainframe",
    "Data",
    "Matrix",
    "Byte",
    "Chip",
  ];

  const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
  const randomNounIndex = Math.floor(Math.random() * nouns.length);

  const adjective = adjectives[randomAdjectiveIndex];
  const noun = nouns[randomNounIndex];

  return `${adjective} ${noun}`;
};
