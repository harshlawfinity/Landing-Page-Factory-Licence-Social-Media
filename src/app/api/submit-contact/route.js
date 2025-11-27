import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);

    const name = params.get("name");
    const phone = params.get("phone");
    const email = params.get("email");
    const description = params.get("description");
    const pageSource = params.get("pageSource");
    const timestamp = params.get("timestamp");
    const source = params.get("source");

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sheetData = new URLSearchParams();
    sheetData.append("name", name);
    sheetData.append("phone", phone);
    sheetData.append("email", email);
    sheetData.append("description", description);
    sheetData.append("pageSource", pageSource);
    sheetData.append("timestamp", timestamp);
    sheetData.append("source", source);

    const googleScriptURL =
      "https://script.google.com/macros/s/AKfycbzHo9imgK0mxejZhOfSxypBNrBcEf3FA2BavP2g27BTRdXcu2BKR9mWjRWAbTRR2w9_/exec";

    const res = await fetch(googleScriptURL, {
      method: "POST",
      body: sheetData,
    });

    if (!res.ok) {
      console.error("Google Apps Script error:", await res.text());
      return NextResponse.json(
        { error: "Failed to write to sheet" },
        { status: 502 }
      );
    }

    // Send webhook data
    const webhookData = {
      name,
      phone,
      email,
      description,
      pageSource,
      timestamp,
      source,
    };

    await fetch(
      "https://internal.lawfinity.in/api/sales/google-factory-f-landing-webhook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
