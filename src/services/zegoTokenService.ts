import { supabase } from '../lib/supabase';

export interface ZegoTokenResponse {
  token: string;
  appId: number;
  expireAt: number;
}

/**
 * Service to handle ZEGOCLOUD token generation via Supabase Edge Functions.
 */
export const zegoTokenService = {
  /**
   * Fetches a short-lived ZEGOCLOUD token for a specific room and user.
   * 
   * @param roomId - The ID of the room to join
   * @param userId - The ID of the user joining the call
   * @returns A promise resolving to the token response
   * @throws Error if the request fails or response is invalid
   */
  async getZegoToken(roomId: string, userId: string): Promise<ZegoTokenResponse> {
    if (!roomId || !userId) {
      throw new Error('Room ID and User ID are required to generate a token');
    }

    const { data, error } = await supabase.functions.invoke<ZegoTokenResponse>('generate-zego-token', {
      body: { roomId, userId },
    });

    if (error) {
      console.error('Error invoking generate-zego-token:', error);
      throw new Error(error.message || 'Failed to generate ZEGOCLOUD token');
    }

    if (!data || !data.token || !data.appId) {
      throw new Error('Invalid response from token generation service');
    }

    return {
      token: data.token,
      appId: data.appId,
      expireAt: data.expireAt,
    };
  }
};
