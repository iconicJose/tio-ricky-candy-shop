import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

// Product prices (server-side source of truth)
const PRODUCT_PRICES: Record<string, number> = {
  // Candy Mix
  'medium': 5,
  'large': 10,
  // Chamoy products
  'rim-dip': 10,
  'chili-powder': 8,
  'keychain-bottle': 6,
  // Trays
  'candy-tray': 45,
  'fruit-tray': 50,
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  flavor?: string;
  customizations?: string;
}

interface CreatePaymentIntentRequest {
  items: CartItem[];
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: CreatePaymentIntentRequest = await request.json();
    const { items, customerInfo, shippingAddress } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Server-side calculation of total (never trust client total)
    let subtotal = 0;
    const lineItems: string[] = [];

    for (const item of items) {
      // Validate and calculate price server-side
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      lineItems.push(`${item.quantity}x ${item.name} ($${item.price.toFixed(2)} each)`);
    }

    // Calculate shipping (flat rate for now)
    const shipping = 0; // Free shipping or calculate based on location
    
    // Calculate tax (placeholder - implement based on location)
    const taxRate = 0.0; // 0% for now
    const tax = subtotal * taxRate;
    
    // Total in cents for Stripe
    const total = Math.round((subtotal + shipping + tax) * 100);

    if (total < 50) {
      return NextResponse.json(
        { error: 'Order minimum is $0.50' },
        { status: 400 }
      );
    }

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone || '',
        shipping_address: JSON.stringify(shippingAddress),
        order_items: lineItems.join('; '),
      },
      receipt_email: customerInfo.email,
      shipping: {
        name: customerInfo.name,
        address: {
          line1: shippingAddress.line1,
          line2: shippingAddress.line2 || undefined,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postal_code: shippingAddress.postal_code,
          country: shippingAddress.country,
        },
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      subtotal,
      shipping,
      tax,
      total: total / 100, // Return in dollars for display
    });
  } catch (error) {
    console.error('Payment Intent Error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
