<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        @keyframes borderColorAnimation {
            0% {
                border-color: #FF5733;
            }
            25% {
                border-color: #33ff57;
            }
            50% {
                border-color: #3357ff;
            }
            75% {
                border-color: #ff33a6;
            }
            100% {
                border-color: #ff5733;
            }
        }

        .container {
            background-image: url("Assets/Images/background12.jpg");
            padding: 20px;
            border-radius: 8px;
            border: 4px solid;
            width: 350px;
            text-align: center;
            color: whitesmoke;
            animation: borderColorAnimation 5s linear infinite;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Reset Your Password</h2>
        <form action="update-password.php" method="POST">
            <?php
            $token = isset($_GET['token']) ? $_GET['token'] : '';
            ?>
            <input type="hidden" name="token" value="<?php echo htmlspecialchars($token, ENT_QUOTES, 'UTF-8'); ?>"> 
            <input type="password" id="password" name="password" required>
            <button type="submit">Update Password</button>
        </form>
    </div>
</body>
</html>
