export const OTPhtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            margin: 0;
            padding: 0;
        }
        .container {
            background: #ffffff;
            max-width: 500px;
            margin: 50px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #207cca, #20a7d8);
            color: white;
            padding: 15px;
            border-radius: 10px 10px 0 0;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #b22222;
            margin-top: 20px;
        }
        .footer {
            font-size: 12px;
            color: #666;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>MyCollab</h2>
            <p>{date}</p>
        </div>
        <h3>Your OTP</h3>
        <p>Hey {name},</p>
        <p>Thank you for choosing MyCollab Team. Use the following OTP to complete the procedure to change your profile password. OTP is valid for <strong>10 minutes</strong>. Do not share this code with others, including MyCollab Team.</p>
        <div class="otp" style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #b22222; margin-top: 20px; display: block; justify-content: center; align-items: center; text-align: center;">{otp}</div>
        <div class="footer">&copy; 2025 MyCollab Team. All rights reserved.</div>
    </div>
</body>
</html>

`