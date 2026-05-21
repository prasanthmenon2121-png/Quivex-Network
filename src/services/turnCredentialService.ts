import { supabase } from '../lib/supabase';

export interface RTCIceServer {
  urls: string | string[];
  username?: string;
  credential?: string;
}

export interface TurnCredentialResponse {
  iceServers: RTCIceServer[];
}

/**
 * Service to handle Metered TURN credential generation via Supabase Edge Functions.
 */
export const turnCredentialService = {
  /**
   * Fetches TURN/STUN credentials for WebRTC connections.
   * 
   * @returns A promise resolving to an array of RTCIceServer objects
   * @throws Error if the request fails or response is invalid
   */
  async getTurnCredentials(): Promise<RTCIceServer[]> {
    const { data, error } = await supabase.functions.invoke<TurnCredentialResponse>('generate-turn-credentials', {
      method: 'POST',
    });

    if (error) {
      console.error('Error invoking generate-turn-credentials:', error);
      throw new Error(error.message || 'Failed to fetch TURN credentials');
    }

    if (!data || !Array.isArray(data.iceServers)) {
      throw new Error('Invalid response format from TURN credential service');
    }

    // Validate that each object in iceServers has at least the 'urls' property
    const isValid = data.iceServers.every(server => 
      server && (typeof server.urls === 'string' || Array.isArray(server.urls))
    );

    if (!isValid) {
      throw new Error('Response contained malformed ICE server objects');
    }

    return data.iceServers;
  }
};
