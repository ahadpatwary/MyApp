export async function getData(
  id: string,
  model: "User" | "Card",
  properties: string[]
): Promise<any[]> {
  try {
    const response = await fetch("/api/getData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, model, properties }),
    });

    if (!response.ok) {
      const text = await response.text(); 
      console.error("❌ API Error:", text);
      throw new Error(`API request failed: ${text}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "API returned unsuccessful response");
    }

    return data.data;
  } catch (err: any) {
    console.error("Fetch error:", err);
    throw new Error(err.message || "Failed to fetch data");
  }
}