import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на email и сохранение в БД"""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    address = body.get("address", "").strip()
    comment = body.get("comment", "").strip()
    site = body.get("site", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO t_p84599805_dmitriy_services_pro.applications (name, phone, address, comment, site) VALUES (%s, %s, %s, %s, %s)",
        (name, phone, address or None, comment or None, site or None),
    )
    conn.commit()
    cur.close()
    conn.close()

    to_email = "d4505507@gmail.com"
    from_email = "d4505507@gmail.com"
    smtp_password = os.environ.get("SMTP_PASSWORD", "")

    subject = f"Новая заявка с сайта — {name}"
    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #1a1714; border-bottom: 2px solid #d4870a; padding-bottom: 8px;">Новая заявка</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;">Имя:</td><td style="padding: 8px 0; font-weight: bold;">{name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Телефон:</td><td style="padding: 8px 0; font-weight: bold;"><a href="tel:{phone}">{phone}</a></td></tr>
            {"<tr><td style='padding: 8px 0; color: #666;'>Адрес:</td><td style='padding: 8px 0;'>" + address + "</td></tr>" if address else ""}
            {"<tr><td style='padding: 8px 0; color: #666;'>Описание:</td><td style='padding: 8px 0;'>" + comment + "</td></tr>" if comment else ""}
            {"<tr><td style='padding: 8px 0; color: #666;'>Сайт:</td><td style='padding: 8px 0;'>" + site + "</td></tr>" if site else ""}
        </table>
    </div>
    """

    if smtp_password:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = from_email
        msg["To"] = to_email
        msg.attach(MIMEText(html_body, "html"))
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(from_email, smtp_password)
            server.sendmail(from_email, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }