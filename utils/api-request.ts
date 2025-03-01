import { SynchronicityLogger } from '@/lib/SynchronicityLogger';
import axios from 'axios';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';
import { Request, Response } from 'express';

const logger = new SynchronicityLogger({
  name: 'utils/apiRequest'
});

const HEYGEN_API_BASE_URL = process.env.HEYGEN_API_BASE_URL;
const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;

if (!process.env.STRIPE_API_KEY) {
  throw new Error('STRIPE_API_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_API_KEY, { apiVersion: '2022-11-15' });

export default async function apiRequest(
  url: string,
  data: object,
  method?: string
) {
  const response = await fetch(url, {
    method: method || 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const text = await response.text();
    const err = new Error();
    const stack = err.stack;
    throw new Error(
      `HTTP error! Status: ${response.status} - ${text} - ${stack}`
    );
  }

  return response.json();
}

// Function to get supported languages
export async function getSupportedLanguages() {
    const response = await axios.get(`${HEYGEN_API_BASE_URL}/video_translate/target_languages`, {
        headers: { 'Authorization': `Bearer ${HEYGEN_API_KEY}` }
    });
    return response.data;
}

// Function to submit a video translation request
export async function submitTranslationRequest(videoUrl: string, outputLanguage: string, title: string) {
    const response = await axios.post(`${HEYGEN_API_BASE_URL}/video_translate`, {
        video_url: videoUrl,
        output_language: outputLanguage,
        title: title
    }, {
        headers: { 'Authorization': `Bearer ${HEYGEN_API_KEY}` }
    });
    return response.data;
}

// Function to poll translation status
export async function pollTranslationStatus(videoTranslateId: string) {
    let status = 'pending';
    while (status === 'pending') {
        const response = await axios.get(`${HEYGEN_API_BASE_URL}/video_translate/${videoTranslateId}`, {
            headers: { 'Authorization': `Bearer ${HEYGEN_API_KEY}` }
        });
        status = response.data.status;
        if (status === 'success' || status === 'failed') {
            return response.data;
        }
        await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5 seconds
    }
}

export async function uploadFileToSupabase(file: File) {
    const path = `videos/${file.name}`;
    const { data, error } = await supabase.storage.from('videos').upload(path, file);
    if (error) throw error;
    return data;
}

export async function purchaseCredits(userId: string, amount: number) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Video Translation Credits',
                },
                unit_amount: amount * 100,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/success`,
        cancel_url: `${process.env.BASE_URL}/cancel`,
        client_reference_id: userId,
        metadata: {
            userId: userId
        }
    });
    return session.url;
}

export async function handleStripeWebhook(req: Request, res: Response) {
    const event = req.body;
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // Update user's credit balance in Supabase
            break;
        // Handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
}
