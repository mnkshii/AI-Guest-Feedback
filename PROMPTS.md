# AI Guest Feedback Analyzer – Prompt Engineering Log

## Prompt 1 (Basic – unstructured)
**Prompt**: "Analyze this hotel review: "${review}""
**Input**: "The room was clean but staff was rude."
**Output**: "Negative sentiment. Staff rude."
**Assessment**: Too short and unstructured. Not usable for frontend display.

## Prompt 2 (Role-based – better context)
**Prompt**: "You are a hotel manager. Analyze guest feedback and suggest improvements: "${review}""
**Input**: "The room was clean but staff was rude."
**Output**: "Cleanliness is good, but staff behavior needs improvement. Recommend: apology and staff training."
**Assessment**: Better context and actionable suggestions, but still plain text – not parseable by frontend.

## Prompt 3 (Final – structured JSON)
**Prompt**: `You are an AI hotel feedback analyzer. Analyze this guest review: "${review}". Return ONLY JSON in this format: { "sentiment":"", "keyPoints":"", "response":"" }`
**Input**: "The room was very clean but the staff was rude and the breakfast was cold."
**Output**:
{
  "sentiment": "Negative",
  "keyPoints": "room cleanliness, staff rudeness, cold breakfast",
  "response": "Thank you for your feedback. We're glad to hear you found the room clean, but we're sorry to hear about your experience with our staff and the breakfast. We'll address these issues to ensure a better experience in the future."
}

**Why Best**: 
This prompt forces the AI to return clean, structured JSON that can be directly consumed by the React frontend. The `keyPoints` string is split into an array for theme-tag display, `sentiment` maps to UI icons (positive/neutral/negative), and `response` is rendered as the manager reply. This eliminates parsing errors, ensures consistency, and makes the feature production-ready.