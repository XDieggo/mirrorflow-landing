// api/proxy-gemini.js

export default async function handler(request, response) {
  // Solo permitir solicitudes POST
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  // Obtener la clave API desde las variables de entorno de Vercel
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: 'API key not configured.' });
  }

  const { systemPrompt, userPrompt } = request.body;

  if (!userPrompt) {
    return response.status(400).json({ error: 'userPrompt is required.' });
  }
  
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const payload = {
      contents: [{ parts: [{ text: userPrompt }] }],
      ...(systemPrompt && { systemInstruction: { parts: [{ text: systemPrompt }] } }),
  };

  try {
    const geminiResponse = await fetch(geminiApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!geminiResponse.ok) {
        const errorBody = await geminiResponse.text();
        console.error('Gemini API Error:', errorBody);
        return response.status(geminiResponse.status).json({ error: 'Failed to fetch from Gemini API.' });
    }

    const result = await geminiResponse.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
        return response.status(200).json({ text });
    } else {
        return response.status(500).json({ error: 'Invalid response structure from Gemini API.' });
    }

  } catch (error) {
    console.error('Proxy Error:', error);
    return response.status(500).json({ error: 'An internal error occurred.' });
  }
}

