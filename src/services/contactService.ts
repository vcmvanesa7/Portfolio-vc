type ApiResponse = 
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function sendContact(data: {
  fullName: string;
  email: string;
  message: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Si no es OK, leer texto para debug
    if (!res.ok) {
      const text = await res.text();
      console.error("Error response:", text);
      return { ok: false, message: `Server error ${res.status}` };
    }

    const json = (await res.json()) as ApiResponse;
    return json;
  } catch (error) {
    console.error("Error sending contact:", error);
    return { ok: false, message: "Network error" };
  }
}


