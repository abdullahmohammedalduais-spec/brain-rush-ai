export default function handler(req: any, res: any) {
  res.status(200).json({
    status: "ok",
    hasGemini: !!process.env.GEMINI_API_KEY,
    monetag: {
      zoneId: "11787291",
      domain: "3nbf4.com",
      swVerified: true
    }
  });
}
