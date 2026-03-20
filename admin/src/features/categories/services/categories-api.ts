import { bffClient, getApiErrorMessage } from "@/lib/api-client";
import type { CategoryListItem } from "../types";

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

export type CategoriesListParams = {
  page?: number;
  pageSize?: number;
};

type CategoriesApiItem = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  courseCount?: number | null;
};

type CategoriesListPayload = {
  data: CategoriesApiItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};

export type CategoriesListResponse = {
  success: boolean;
  message: string;
  data?: CategoriesListPayload;
};

export type CategoriesListResult = {
  items: CategoryListItem[];
  meta: CategoriesListPayload["meta"];
};

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

      const { data } = await bffClient.post<CreateCategoryResponse>(
        "/categories",
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
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

export async function getCategoriesRequest(
  params: CategoriesListParams = {},
): Promise<CategoriesListResult> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;

  try {
    const { data } = await bffClient.get<CategoriesListResponse>(
      "/categories",
      {
        params: {
          page,
          pageSize,
        },
      },
    );

    if (!data.success) {
      throw new Error(data.message || "Unable to fetch categories.");
    }

    const items: CategoryListItem[] = (data.data?.data ?? []).map(
      (category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description ?? undefined,
        coursesCount: category.courseCount ?? 0,
      }),
    );

    return {
      items,
      meta: data.data?.meta ?? {
        total: items.length,
        page,
        limit: pageSize,
        pages: 1,
      },
    };
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to fetch categories."));
  }
}
