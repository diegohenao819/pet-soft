import prisma from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.text();
  console.log("Received webhook event");

  const event = JSON.parse(body);

  // Process only 'checkout.session.completed' events
  if (event.type === "checkout.session.completed") {
    const customerEmail = event.data.object.customer_email;

    if (!customerEmail) {
      console.error("Customer email not found in event data.");
      return new Response(null, { status: 400 });
    }

    try {
      await prisma.user.update({
        where: {
          email: customerEmail,
        },
        data: {
          hasAccess: true,
        },
      });
      console.log(`User with email ${customerEmail} updated successfully.`);
    } catch (error) {
      console.error("Database update failed.", error);
      return new Response(null, { status: 500 });
    }
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, {
    status: 200,
  });
}
