<script>
  // Write your popup logic here
  let title = "Svelte Chrome Extension";
</script>

<main>
  <div class="popup-container">
    <h1>{title}</h1>
    <p>This is a popup component</p>
    <button on:click={() => alert('Hello from Svelte!')}>
      Click me
    </button>
  </div>
</main>

<style>
  .popup-container {
    width: 300px;
    padding: 16px;
    font-family: system-ui, sans-serif;
  }

  h1 {
    font-size: 18px;
    margin-bottom: 16px;
  }

  button {
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    margin-top: 16px;
  }

  button:hover {
    background-color: #3367d6;
  }
</style> 