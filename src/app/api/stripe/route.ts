import prisma from "@/lib/db";


export async function POST(request: Request) {
  const body = await request.text();

  console.log("body", body);

  // verify webhook came from Stripe
  

  // fullfill order

  const event = JSON.parse(body);
      await prisma.user.update({
        where: {
          email: event.data.object.customer_email,
        },
        data: {
          hasAccess: true,
        },
      });
   
    
  }

  return new Response(null, {
    status: 200,
  });
}

// STRIPE
// werwe
