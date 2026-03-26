import json
import os
import psycopg2


ADMIN_PASSWORD = "golub2026"


def handler(event: dict, context) -> dict:
    """Получение списка заявок для страницы администратора"""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    headers = event.get("headers") or {}
    password = headers.get("X-Admin-Password", "")
    if password != ADMIN_PASSWORD:
        return {
            "statusCode": 401,
            "headers": cors_headers,
            "body": json.dumps({"error": "Неверный пароль"}),
        }

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "SELECT id, name, phone, address, comment, site, created_at FROM t_p84599805_dmitriy_services_pro.applications ORDER BY created_at DESC"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    applications = [
        {
            "id": r[0],
            "name": r[1],
            "phone": r[2],
            "address": r[3],
            "comment": r[4],
            "site": r[5],
            "created_at": r[6].strftime("%d.%m.%Y %H:%M") if r[6] else "",
        }
        for r in rows
    ]

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"applications": applications}, ensure_ascii=False),
    }
