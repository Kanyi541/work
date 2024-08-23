<?php
If ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST['token'];
    $new_password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    
    $conn = new mysqli('localhost', 'root', '', 'mydb');
    
    If ($conn->connect_error) {
        Die("Connection failed: " . $conn->connect_error);
    }

    $query = "SELECT * FROM reg WHERE reset_token=? AND reset_expires_at >= ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("si", $token, date("U"));
    $stmt->execute();
    $result = $stmt->get_result();

    If ($result->num_rows > 0) {
        $query = "UPDATE reg SET password=?, reset_token=NULL, reset_expires_at=NULL WHERE reset_token=?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ss", $new_password, $token);
        $stmt->execute();

        Echo "Your password has been successfully updated!";
    } else {
        Echo "Invalid or expired token.";
    }

    $stmt->close();
    $conn->close();
}
?>