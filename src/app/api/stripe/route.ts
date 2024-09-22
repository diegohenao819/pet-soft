import prisma from "@/lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const buf = await request.arrayBuffer();
  const rawBody = Buffer.from(buf);
  
  const signature = request.headers.get("Stripe-Signature");
  console.log("body", rawBody);

  // verify webhook came from Stripe
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook verification failed.", error);
    return Response.json(null, { status: 400 });
  }

  // fullfill order

  switch (event.type) {
    case "checkout.session.completed":
      console.log("Ya pagó maldita sea");
      await prisma.user.update({
        where: {
          email: event.data.object.customer_email,
        },
        data: {
          hasAccess: true,
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, {
    status: 200,
  });
}

// STRIPE
// werwe
