<?php
// Step 1: Connect to the database
$servername = "localhost";
$username = "root"; // Default username for XAMPP
$password = ""; // Default password is empty for XAMPP
$dbname = "mydb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
If ($conn->connect_error) {
    Die("Connection failed: ". $conn->connect_error);
}

// Step 2: Get the form data
$user = $_POST['username'];
$email = $_POST['email'];
$pass = $_POST['password'];

// Step 3: Secure the data
// Hash the password before saving it to the database
$hashed_password = password_hash($pass, PASSWORD_DEFAULT);

// Step 4: Prepare the bind
$stmt =$conn->prepare("INSERT INTO reg(username,email,password) VALUES(?,?,?)");
$stmt ->bind_param("sss",$user,$email,$hashed_password);
// Execute the statment
if($stmt->execute()){
    echo "Registration successful!";
}else{
    echo "Error: " . $stmt->error;
}
//close connections
$stmt->close();
$conn->close();
?>


