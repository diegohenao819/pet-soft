export async function POST(request: Request) {
  const body = await request.json();
  console.log("pago exitoso");
  console.log(body);

  return new Response(null, {
 
    status: 200,
  });
}
