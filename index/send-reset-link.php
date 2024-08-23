<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer classes (make sure you've installed PHPMailer via Composer)
require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ensure the email is set
    if (!isset($_POST['email'])) {
        die("Email not submitted.");
    }

    // Sanitize and validate email
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format.");
    }

    $conn = new mysqli('localhost', 'root', '', 'mydb');

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the email exists
    $query = "SELECT * FROM reg WHERE email=?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $token = bin2hex(random_bytes(50));
        $expires_at = date("U") + 1800; // 30 minutes expiration

        $query = "UPDATE reg SET reset_token=?, reset_expires_at=? WHERE email=?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sis", $token, $expires_at, $email);
        $stmt->execute();

        // Send reset email using PHPMailer
        $reset_link = "http://localhost/mywebsite/reset-password.php?token=" . $token;

        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();                                      // Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                 // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                             // Enable SMTP authentication
            $mail->Username   = getenv('SMTP_USERNAME');           // SMTP username from environment variable
            $mail->Password   = getenv('SMTP_PASSWORD');           // SMTP password from environment variable
            $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port       = 587;                              // TCP port to connect to

            // Recipients
            $mail->setFrom(getenv('SMTP_USERNAME'), 'Elsecritor'); // Ensure this is a valid email address and matches SMTP username
            $mail->addAddress($email);                            // Add a recipient (user's email)

            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Password Reset Request';
            $mail->Body    = 'Click this link to reset your password: <a href="' . $reset_link . '">Reset Password</a>';
            $mail->AltBody = 'Click this link to reset your password: ' . $reset_link; // For non-HTML email clients

            $mail->send();
            echo 'Please check your email for a password reset link.';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }

    } else {
        echo "No account found with that email address.";
    }

    $stmt->close();
    $conn->close();
}
?>
