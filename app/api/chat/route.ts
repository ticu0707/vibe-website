import Anthropic from '@anthropic-ai/sdk';
import { KNOWLEDGE_BASE } from '@/lib/knowledge-base';

// ---------------------------------------------------------------------------
// TIPURI
// ---------------------------------------------------------------------------

interface MesajIstoric {
  rol: 'user' | 'bot';
  text: string;
}

// ---------------------------------------------------------------------------
// POST /api/chat
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const { mesaj, istoric = [] }: { mesaj: string; istoric: MesajIstoric[] } = await req.json();

    if (!mesaj || typeof mesaj !== 'string') {
      return Response.json({ error: 'Mesaj invalid.' }, { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // Păstrăm ultimele 6 mesaje din istoric ca context
    const istoricLimitat = istoric.slice(-6);

    // Convertim istoricul la formatul Anthropic
    const mesajeContext: Anthropic.MessageParam[] = istoricLimitat
      .filter(m => m.rol !== 'bot' || m.text) // excludem mesaje goale
      .map(m => ({
        role: m.rol === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

    // Adăugăm mesajul curent al utilizatorului
    mesajeContext.push({ role: 'user', content: mesaj });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 200,
      system: KNOWLEDGE_BASE,
      messages: mesajeContext,
    });

    const raspuns =
      response.content[0]?.type === 'text'
        ? response.content[0].text
        : 'Îmi pare rău, a apărut o eroare. Încearcă din nou!';

    return Response.json({ raspuns });
  } catch (err) {
    console.error('[/api/chat] Eroare:', err);
    return Response.json(
      { raspuns: 'Conexiunea cu barista a eșuat. Încearcă din nou în câteva secunde!' },
      { status: 500 },
    );
  }
}
