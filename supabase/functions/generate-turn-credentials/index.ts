import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface MeteredCredential {
  urls: string[];
  username?: string;
  credential?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }

  try {
    const appName = Deno.env.get('METERED_APP_NAME')
    const secretKey = Deno.env.get('METERED_SECRET_KEY')

    if (!appName || !secretKey) {
      throw new Error('Server configuration error: Missing Metered secrets')
    }

    // Call Metered TURN API
    const response = await fetch(
      `https://${appName}.metered.ca/api/v1/turn/credentials?secretKey=${secretKey}`,
      {
        method: 'GET', // Metered API uses GET with secretKey query param
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Metered API Error:', errorText)
      throw new Error('Failed to fetch credentials from Metered')
    }

    const meteredServers = await response.json() as MeteredCredential[]

    // Standard Google STUN fallbacks
    const stunServers = [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ]

    // Combine servers into RTCIceServer format
    const iceServers = [...stunServers, ...meteredServers]

    return new Response(
      JSON.stringify({ iceServers }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
