import { NextResponse } from "next/server";
import axios from "axios";
import { baseURL } from "../helpers/variables";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const name = searchParams.get("name");

  try {
    const response = await axios.get(`${baseURL}/character`, {
      params: { page, name },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Error fetching data from the backend." },
      { status: 500 }
    );
  }
}
