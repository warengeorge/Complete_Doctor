import axios from "axios";

import { bffClient, getApiErrorMessage } from "@/lib/api-client";

export type CreateCategoryInput = {
  name: string;
  slug: string;
  description?: string;
  icon?: File | null;
};

export type CreateCategoryResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

const multipartClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export async function createCategoryRequest(
  input: CreateCategoryInput,
): Promise<CreateCategoryResponse> {
  try {
    if (input.icon) {
      const body = new FormData();
      body.append("name", input.name);
      body.append("slug", input.slug);
      if (input.description) {
        body.append("description", input.description);
      }
      body.append("icon", input.icon);

      const { data } = await multipartClient.post<CreateCategoryResponse>(
        "/categories",
        body,
      );

      if (!data.success) {
        throw new Error(data.message || "Unable to create category.");
      }

      return data;
    }

    const { data } = await bffClient.post<CreateCategoryResponse>(
      "/categories",
      {
        name: input.name,
        slug: input.slug,
        description: input.description ?? undefined,
      },
    );

    if (!data.success) {
      throw new Error(data.message || "Unable to create category.");
    }

    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to create category."));
  }
}
