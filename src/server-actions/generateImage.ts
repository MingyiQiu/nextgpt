"use server";

import cloudinary from "@/lib/cloudinary";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateImage(prompt: string) {
  const trimmedContent = prompt.trim();

  if (!trimmedContent) {
    throw new Error("Prompt is required.");
  }

  const imageKitUrl = `${process.env.IMAGINEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodeURIComponent(trimmedContent)}/nextgpt-${crypto.randomUUID()}.png`;

  const maxAttempts = 40;
  let imageResponse: Response | null = null;

  // Poll ImageKit until the image is ready
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const response = await fetch(imageKitUrl, {
      signal: AbortSignal.timeout(30_000),
    });

    if (response.headers.get("is-intermediate-response") === "true") {
      if (attempt === maxAttempts) {
        throw new Error("Image generation timed out.");
      }

      await sleep(3000);
      continue;
    }

    imageResponse = response;
    break;
  }

  if (!imageResponse || !imageResponse.ok) {
    throw new Error("Failed to generate image.");
  }

  const contentType = imageResponse.headers.get("content-type");

  if (!contentType?.startsWith("image/")) {
    throw new Error("Invalid image response.");
  }

  // Convert image to Buffer
  const arrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload image to Cloudinary
  const base64 = `data:${contentType};base64,${buffer.toString("base64")}`;

  const uploaded = await cloudinary.uploader.upload(base64, {
    folder: "nextgpt",
    resource_type: "image",
  });

  return uploaded.secure_url;
}
