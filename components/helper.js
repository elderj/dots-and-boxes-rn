export const getBlankEdges = (gridSize) => {
  let edgeData = [];

  for (x = 1; x <= gridSize; x++) {
    for (y = 0; y <= gridSize * 2; y++) {
      edgeData.push({
        x: x,
        y: y,
        status: "open",
        ownership: 0,
      });
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

// export const getDefaultPlayerState = () => {
//   return [
//     {
//       id: "p1",
//       name: "Player 1",
//       color: "#FF5252",
//     },
//   ];
// };

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
