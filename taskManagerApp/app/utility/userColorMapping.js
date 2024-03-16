const colors = [
    '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c', '#fdd835', '#748ffc',
    '#9775fa', '#df5286', '#7fa900', '#fec200', '#5978ee', '#00bdae', '#ea80fc'
  ];
  
  // Object to store user ID to color mapping
  const userColors = {};
  
  // Function to get a user's color by ID
  function getUserColor(userId) {
    if (!userColors[userId]) {
      // Assign a color from the array based on the number of keys currently in userColors
      userColors[userId] = colors[Object.keys(userColors).length % colors.length];
    }
    return userColors[userId];
  }
  
  export { getUserColor };
  