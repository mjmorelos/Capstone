export default function generateResourceData(users) {
  var data = [];
  var colors = [
    "#DB8780",
    "#9775fa",
    "#748ffc",
    "#3bc9db",
    "#69db7c",
    "#fdd835",
    "#FF033E",
    "#7D7098",
    "#df5286",
    "#7fa900",
    "#fec200",
    "#5978ee",
    "#00bdae",
    "#ea80fc",
  ];
  // Ensure there are enough colors for the users.
  // If not, add more colors to the array.
  if (users.length > colors.length) {
    throw new Error("Not enough colors for the number of users");
  }

  return users.map((user, index) => {
    // Use the index to match the user with a color.
    return {
      Id: index + 1, // Assign a new ID based on the index to ensure uniqueness
      Text: user.name, // Assuming 'name' is the attribute for the user's name
      Color: colors[index], // Match color index with user index
    };
  });
}
