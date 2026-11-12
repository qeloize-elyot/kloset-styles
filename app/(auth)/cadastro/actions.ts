"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const nome = formData.get("nome") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!nome || !email || !password) {
    return { error: "Preencha todos os campos." };
  }

  if (password.length < 6) {
    return { error: "A senha deve ter no mínimo 6 caracteres." };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nome,
        name: nome,
      },
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "Este e-mail já está cadastrado." };
    }
    return { error: error.message || "Erro ao criar conta. Tente novamente." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
