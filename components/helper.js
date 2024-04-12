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
