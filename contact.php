<?php
// Contact Form Processing

// Set headers to prevent caching
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-Type: application/json');

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = isset($_POST['Name']) ? trim($_POST['Name']) : '';
    $email = isset($_POST['Email']) ? trim($_POST['Email']) : '';
    $subject = isset($_POST['Subject']) ? trim($_POST['Subject']) : 'Portfolio Contact Form';
    $message = isset($_POST['Message']) ? trim($_POST['Message']) : '';
    
    // Validate inputs
    $errors = [];
    
    if (empty($name)) {
        $errors[] = 'Name is required';
    }
    
    if (empty($email)) {
        $errors[] = 'Email is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email is not valid';
    }
    
    if (empty($message)) {
        $errors[] = 'Message is required';
    }
    
    // If there are validation errors, return them
    if (!empty($errors)) {
        echo json_encode([
            'success' => false,
            'message' => 'There were errors in your submission',
            'errors' => $errors
        ]);
        exit;
    }
    
    // Email details
    $to = 'nandeshkalshetti1@gmail.com'; // Your email address
    $email_subject = "Portfolio Contact: $subject";
    $email_body = "You have received a new message from your portfolio website.\n\n" .
        "Here are the details:\n\nName: $name\n\nEmail: $email\n\nSubject: $subject\n\nMessage:\n$message";
    $headers = "From: $email\n";
    $headers .= "Reply-To: $email";
    
    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo json_encode([
            'success' => true,
            'message' => 'Your message has been sent successfully. I will get back to you soon!'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'There was an error sending your message. Please try again later.'
        ]);
    }
} else {
    // If not a POST request, return an error
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
} 