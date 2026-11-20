import prisma from "@/database/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error(error);
    return new Response("Invalid signature", {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const app = session.metadata?.app;

    const userId = session.metadata?.userId;

    const credits = Number(session.metadata?.credits);

    if (app !== "nextgpt") {
      return Response.json({
        received: true,
      });
    }

    if (!userId || !credits) {
      return Response.json({
        received: true,
      });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        credits: { increment: credits },
      },
    });
    console.log(`Added ${credits} credits to ${userId}`);

    return Response.json({
      received: true,
    });
  }
}
