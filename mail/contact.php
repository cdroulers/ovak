<?php
    $success = false;
    if (sizeof($_POST) > 0)
    {
        if (!empty($_POST{"comment"}))
        {
            $success = true;
        }
        else if (!empty($_POST{"name"}) && !empty($_POST{"subject"}) && !empty($_POST{"spam"}) && !empty($_POST{"emailaddress"}))
        {
            $host = getenv('HTTP_HOST');
            $to = $_POST{"to"};
            $name = $_POST{"name"};
            $subject = "Contact form on Ovak (via $host contact page.)";
            $comment = $_POST{"spam"} . "\n with phone " . $_POST{"phone"};
            $emailaddress = $_POST{"emailaddress"};
            
            // http://php.net/manual/en/function.mail.php
            
            $success = mail(
                $to,
                $subject,
                $comment,
                "From: $name <$emailaddress>");
        }     
    }
    echo ($success) ? "true" : "false";
?>