import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const validate = async (req: NextRequest) => {
  const token = req.headers.get("Authorization");
  console.log(token);
};
