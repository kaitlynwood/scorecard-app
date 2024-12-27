// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("create-scorecard-btn").addEventListener("click", createScorecard);
    document.getElementById("add-player-btn").addEventListener("click", addPlayer);
    document.getElementById("calculate-scores-btn").addEventListener("click", calculateScores);
});

// Function to create the scorecard
function createScorecard() {
    const container = document.getElementById("scorecard-container");

    // Clear existing content
    container.innerHTML = '';

    // Create a table element
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    // Create and append the header row
    const headerRow = document.createElement("tr");

    // Define headers for player name and 18 holes
    const headers = ["Player"];
    for (let i = 1; i <= 18; i++) {
        headers.push(`Hole ${i}`);
    }

    headers.forEach(headerText => {
        const header = document.createElement("th");
        header.innerText = headerText;
        header.style.border = "1px solid black";
        header.style.padding = "8px";
        header.style.textAlign = "center";
        headerRow.append(header);
    });

    table.append(headerRow);
    container.append(table);

    // Show the Add Player and Calculate Scores buttons
    document.getElementById("add-player-btn").style.display = "inline-block";
    document.getElementById("calculate-scores-btn").style.display = "inline-block";
}

// Function to add a new player row
function addPlayer() {
    const playerName = prompt("Enter player's name:");

    if (!playerName) {
        return; // If no name is entered, exit
    }

    const table = document.querySelector("#scorecard-container table");

    // Create a new row
    const row = document.createElement("tr");

    // Create a cell for the player name
    const playerCell = document.createElement("td");
    playerCell.innerText = playerName;
    playerCell.style.border = "1px solid black";
    playerCell.style.padding = "8px";
    playerCell.style.textAlign = "center";
    row.append(playerCell);

    // Create cells for the 18 holes
    for (let i = 1; i <= 18; i++) {
        const holeCell = document.createElement("td");
        holeCell.contentEditable = true; // Make cells editable
        holeCell.style.border = "1px solid black";
        holeCell.style.padding = "8px";
        holeCell.style.textAlign = "center";
        row.append(holeCell);
    }

    table.append(row);
}

// Function to calculate scores for each player
function calculateScores() {
    const rows = document.querySelectorAll("#scorecard-container table tr");
    let totalScores = [];

    rows.forEach((row, index) => {
        if (index === 0) return; // Skip the header row

        let totalScore = 0;
        const cells = row.querySelectorAll("td");

        // Calculate total score for the row (excluding the first cell with player name)
        for (let i = 1; i < cells.length; i++) {
            const score = parseInt(cells[i].innerText);
            if (!isNaN(score)) {
                totalScore += score;
            }
        }

        // Add the total score to the player row
        const totalScoreCell = document.createElement("td");
        totalScoreCell.innerText = totalScore;
        totalScoreCell.style.border = "1px solid black";
        totalScoreCell.style.padding = "8px";
        totalScoreCell.style.textAlign = "center";
        row.append(totalScoreCell);
    });
}
