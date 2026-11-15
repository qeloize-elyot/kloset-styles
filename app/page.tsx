import { permanentRedirect } from "next/navigation";

/**
 * A home do Vercel passa a abrir o site HTML completo
 * (arquivo estático em /public/site.html).
 */
export default function HomePage() {
  permanentRedirect("/site.html");
}
