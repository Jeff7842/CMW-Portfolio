<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "your-email@example.com"; // Replace with your email
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $email_body = "
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Subject:</strong> $subject</p>
    <p><strong>Message:</strong> $message</p>
    ";
    
    if (mail($to, $subject, $email_body, $headers)) {
        echo "<script>alert('Message sent successfully!'); window.location.href = 'index.html';</script>";
    } else {
        echo "<script>alert('Failed to send message.'); window.history.back();</script>";
    }
}
?>