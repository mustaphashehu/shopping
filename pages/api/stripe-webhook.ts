import { Stripe } from 'stripe';
import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
    api: {
        bodyParser: false,
    },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-05-28.basil'
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;

    if (!sig) {
        return res.status(400).send('Missing Stripe signature');
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        console.error('Error constructing webhook event:', err);
        return res.status(400).send(`Webhook Error: ${err}`);
    }



    switch (event.type) {
        case "charge.succeeded":
            const charge: any = event.data.object as Stripe.Charge;

            if (typeof charge.payment_intent === 'string') {
                await prisma?.order.update({
                    where: { paymentIntentId: charge.payment_intent },
                    data: {
                        status: 'complete',
                        address: charge.shipping?.address
                    }
                })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);

    }

    return res.json({ received: true });
}








// switch (event.type) {
//     case 'payment_intent.succeeded':
//         const paymentIntent = event.data.object as Stripe.PaymentIntent;
//         console.log('PaymentIntent was successful!', paymentIntent);
//         // Handle successful payment intent here
//         break;

//     case 'payment_intent.payment_failed':
//         const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
//         console.log('PaymentIntent failed:', failedPaymentIntent);
//         // Handle failed payment intent here
//         break;

//     default:
//         console.warn(`Unhandled event type ${event.type}`);
// }