<?php
// Receive JSON data
$jsonData = json_decode($_POST['user'], true);

// Extract data from JSON
$name = $jsonData['name'];
$email = $jsonData['email'];
$phoneNumber = $jsonData['tel'];
$subselect = $jsonData['subSelect'];
$gender = $jsonData['gender'];

// Receive image file
$image = $_FILES['img'];

// Receive PDF file
$pdf = $_FILES['cv'];

// Include PHPMailer library
require 'vendor/autoload.php';

// Initialize PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

// SMTP Configuration
$mail->isSMTP();
$mail->Host = 'smtp.example.com';
$mail->SMTPAuth = true;
$mail->Username = 'your_email@example.com';
$mail->Password = 'your_password';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

// Sender and recipient
$mail->setFrom('your_email@example.com', 'Your Name');
$mail->addAddress('your_email@example.com', 'Your Name');

// Email subject and body
$mail->Subject = 'Form Submission';
$mail->Body = "Name: $name\nEmail: $email\nPhone Number: $phoneNumber\nGender: $gender";

// Attach files
$mail->addStringAttachment(file_get_contents($image['tmp_name']), $image['name']);
$mail->addStringAttachment(file_get_contents($pdf['tmp_name']), $pdf['name']);

// Send email
if (!$mail->send()) {
    echo 'Email could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Email sent successfully.';
}
?>
