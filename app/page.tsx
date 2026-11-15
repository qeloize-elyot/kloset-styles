import { permanentRedirect } from "next/navigation";

/**
 * Redireciona a home para a rota que devolve o HTML
 * com Content-Type correto (página renderizada, não código).
 */
export default function HomePage() {
  permanentRedirect("/api/full-site");
}
