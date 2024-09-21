import prisma from "@/lib/db";

export async function POST(request: Request) {
  const data = await request.json();
  console.log("pago exitoso");
  console.log("body", data);

  // verify webhook came from Stripe

  // fullfill order
  await prisma.user.update({
    where: {
      email: data.data.object.customer.customer_email,
    },
    data: {
      hasAccess: true,
    },
  });

  return new Response(null, {
    status: 200,
  });
}

// STRIPE
