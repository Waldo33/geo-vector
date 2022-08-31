<?php

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

$title = 'Заказ звонка с сайта "Вектор Геодезии"';

$c = true;
//Формирование самого письма
foreach ( $_POST as $key => $value ) {
    if($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
        $body .= "
            " . ( ($c = !$c) ? '<tr>': '<tr style="background-color: #f8f8f8;">' ) . "
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$value</b></td>
         </tr>
        ";
    }
}

$body = "<table style='width: 100%'>$body</table>";

//Настройки PHPMailer
$mail = new \PHPMailer\PHPMailer\PHPMailer();

try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth = true;

    $mail->Host = 'mail.hosting.reg.ru';
    $mail->Username = 'no-reply@tserkovnikov.ru';
    $mail->Password = '';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('no-reply@tserkovnikov.ru', 'Заказ звонка с сайта "Вектор Геодезии"');

    $mail->addAddress('');

    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    $mail->send();
} catch (Exception $e) {
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}