//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
  const outputTable = document.getElementById("output");

  // Show initial loading row
  outputTable.innerHTML = `
    <tr id="loadingRow">
      <td colspan="2" class="text-center">Loading...</td>
    </tr>
  `;

  // Function to create a promise with random delay between 1 to 3 seconds
  function createPromise(index) {
    const delay = (Math.random() * 2 + 1).toFixed(3); // Generates between 1.000 to 3.000
    return new Promise((resolve) => {
      setTimeout(() => resolve({ name: `Promise ${index}`, time: parseFloat(delay) }), delay * 1000);
    });
  }

  // Create 3 promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  // Execute all promises and update table
  const startTime = performance.now(); // Start time tracking

  Promise.all(promises).then((results) => {
    const endTime = performance.now(); // End time tracking
    const totalTime = ((endTime - startTime) / 1000).toFixed(3); // Convert ms to seconds with 3 decimal places

    // Remove the "Loading..." row
    document.getElementById("loadingRow").remove();

    // Populate table with promise results
    results.forEach(({ name, time }) => {
      const row = `<tr><td>${name}</td><td>${time}</td></tr>`;
      outputTable.innerHTML += row;
    });

    // Add total time row
    outputTable.innerHTML += `<tr><td><b>Total</b></td><td><b>${totalTime}</b></td></tr>`;
  });
});
