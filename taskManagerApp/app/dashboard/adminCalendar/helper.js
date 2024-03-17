
export default function generateResourceData(users) {
    var data = [];
    var colors = [
        '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c', '#fdd835', '#748ffc',
        '#9775fa', '#df5286', '#7fa900', '#fec200', '#5978ee', '#00bdae', '#ea80fc'
    ];
    return users.map((user, index) => {
        const colorIndex = Math.floor(Math.random() * colors.length);
        return {
            Id: index + 1, // Assign a new ID based on array index
            Text: user.name, // Assuming 'name' is the attribute for the user's name
            Color: colors[colorIndex]
        };
    });
}
