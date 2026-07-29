export async function POST(request: Request) {
  try {
    const { craneData, maintenanceHistory, currentIssues } = await request.json()

    const prompt = `You are an expert industrial crane maintenance consultant. Analyze the following crane maintenance data and provide comprehensive feedback including maintenance recommendations, equipment health assessment, and compliance & safety alerts.

CRANE DATA:
${JSON.stringify(craneData, null, 2)}

MAINTENANCE HISTORY:
${JSON.stringify(maintenanceHistory, null, 2)}

CURRENT ISSUES:
${JSON.stringify(currentIssues, null, 2)}

Please provide a detailed AI assistance report with the following sections:

1. **Maintenance Recommendations** - Suggest specific preventive maintenance tasks based on the crane's operational history and current condition.

2. **Equipment Health Assessment** - Analyze the overall health of each crane based on check history and identify components that may need attention or replacement soon.

3. **Compliance & Safety Alerts** - Flag any safety concerns, compliance gaps, or potential violations based on the data provided and relevant standards (ASME, OSHA, IS).

4. **Priority Actions** - List the most critical actions to take immediately to ensure safety and operational efficiency.

Format the report clearly with headers, bullet points, and specific recommendations for each crane.`

    const apiKey = process.env.AI_GATEWAY_API_KEY
    if (!apiKey) {
      return Response.json(
        { success: false, error: 'AI_GATEWAY_API_KEY not configured' },
        { status: 500 }
      )
    }

    const response = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-4-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed')
    }

    const reportText = data.choices[0]?.message?.content || 'No response generated'

    return Response.json({
      success: true,
      report: reportText,
    })
  } catch (error) {
    console.error('[v0] Error generating report:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate report'
    return Response.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    )
  }
}
