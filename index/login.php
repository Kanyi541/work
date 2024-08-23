<?php
// Step 1: Connect to the database
$servername = "localhost";
$username = "root"; // Default username for XAMPP
$password = ""; // Default password is empty for XAMPP
$dbname = "mydb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Step 2: Get the form data
$user = $_POST['username'];
$pass = $_POST['password'];

// Step 3: Prepare the SQL statement to retrieve user information
$stmt = $conn->prepare("SELECT username, password FROM reg WHERE username = ? OR email = ?");
$stmt->bind_param("ss", $user, $user);
$stmt->execute();
$stmt->store_result();

// Check if the user exists
if ($stmt->num_rows > 0) {
    // Bind the results
    $stmt->bind_result($dbUsername, $dbPassword);
    $stmt->fetch();

    // Step 4: Verify the password
    if (password_verify($pass, $dbPassword)) {
        echo "Login successful! Welcome, " . $dbUsername;
    //redirectes
    header("location:Elscritor.html");
    exit();
    } else {
        echo "Invalid password.";
    }
} else {
    echo "User not found.";
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
