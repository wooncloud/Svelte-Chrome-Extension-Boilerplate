<script>
  // Write your new tab logic here
  let title = "Svelte Chrome Extension";
  let currentTime = new Date();
  
  // Function to update current time
  function updateTime() {
    currentTime = new Date();
  }
  
  // Update time every second
  setInterval(updateTime, 1000);
</script>

<main>
  <div class="newtab-container">
    <h1>{title}</h1>
    <div class="clock">
      {currentTime.toLocaleTimeString()}
    </div>
    <p>This is a new tab page component</p>
    <div class="search-box">
      <input type="text" placeholder="Search the web" />
      <button on:click={() => alert('Search function goes here')}>
        Search
      </button>
    </div>
  </div>
</main>

<style>
  .newtab-container {
    max-width: 800px;
    margin: 100px auto;
    text-align: center;
    font-family: system-ui, sans-serif;
  }
  
  h1 {
    font-size: 32px;
    margin-bottom: 20px;
    color: #4285f4;
  }
  
  .clock {
    font-size: 48px;
    margin-bottom: 30px;
    color: #333;
  }
  
  p {
    margin-bottom: 20px;
    color: #555;
  }
  
  .search-box {
    display: flex;
    max-width: 500px;
    margin: 0 auto;
  }
  
  input {
    flex: 1;
    padding: 10px 16px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    font-size: 16px;
  }
  
  button {
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    padding: 10px 16px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #3367d6;
  }
</style>