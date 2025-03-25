document.addEventListener("DOMContentLoaded", () => {
  const outputTable = document.getElementById("output");

  // Display initial loading row (fixing Cypress ID issue)
  outputTable.innerHTML = `
    <tr id="loading">
      <td colspan="2" class="text-center">Loading...</td>
    </tr>
  `;

  // Function to create a promise that resolves after a random time (1-3s)
  function createPromise(index) {
    const delay = (Math.random() * 2 + 1).toFixed(3); // Generates 1.000 - 3.000 seconds
    return new Promise((resolve) => {
      setTimeout(() => resolve({ name: `Promise ${index}`, time: parseFloat(delay) }), delay * 1000);
    });
  }

  // Create 3 promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  // Start time tracking
  const startTime = performance.now();

  // Use Promise.all() to wait for all promises to resolve
  Promise.all(promises).then((results) => {
    const endTime = performance.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(3); // Convert ms to seconds

    // Remove "Loading..." row
    document.getElementById("loading").remove();

    // Populate table with resolved promise results
    results.forEach(({ name, time }) => {
      const row = `<tr><td>${name}</td><td>${time}</td></tr>`;
      outputTable.innerHTML += row;
    });

    // Add total time row
    outputTable.innerHTML += `<tr><td><b>Total</b></td><td><b>${totalTime}</b></td></tr>`;
  });
});
