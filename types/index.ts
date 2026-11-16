export type Subtom = "quente" | "frio" | "neutro";

export type EstacaoCores =
  | "primavera"
  | "verao"
  | "outono"
  | "inverno";

export type Contraste = "alto" | "medio" | "baixo";

export type CategoriaPeca =
  | "camiseta"
  | "camisa"
  | "blusa"
  | "calca"
  | "shorts"
  | "saia"
  | "vestido"
  | "jaqueta"
  | "casaco"
  | "tenis"
  | "sapato"
  | "sandalia"
  | "acessorio"
  | "outro";

export type Ocasiao =
  | "casual"
  | "trabalho"
  | "evento"
  | "esporte"
  | "noite"
  | "viagem";

export type Clima =
  | "quente"
  | "ameno"
  | "frio"
  | "chuva";

/** Linha da tabela public.pecas_closet (schema do SQL do Supabase) */
export interface PecaCloset {
  id: number;
  user_id: string;
  nome: string;
  categoria: string;
  cor: string;
  imagem: string | null;
  tags: string[] | null;
  criado_em: string;
}

export interface AnaliseCores {
  id: string;
  user_id: string;
  subtom: Subtom;
  contraste: Contraste;
  estacao: EstacaoCores;
  cores_recomendadas: string[];
  cores_evitar: string[];
  observacoes?: string;
  imagem_url?: string;
  created_at: string;
}

export interface Look {
  id: string;
  user_id: string;
  titulo: string;
  ocasiao: Ocasiao;
  clima: Clima;
  pecas_ids: string[];
  descricao?: string;
  created_at: string;
}

export interface PerfilUsuario {
  id: string;
  nome: string;
  email: string;
  genero?: string;
  cidade?: string;
  estilo?: string;
  subtom?: string;
  biotipo?: string;
  paleta_id?: string;
  avatar_url?: string;
  criado_em?: string;
}

export const CATEGORIAS_PECA: { value: CategoriaPeca; label: string }[] = [
  { value: "camiseta", label: "Camiseta" },
  { value: "camisa", label: "Camisa" },
  { value: "blusa", label: "Blusa" },
  { value: "calca", label: "Calça" },
  { value: "shorts", label: "Shorts" },
  { value: "saia", label: "Saia" },
  { value: "vestido", label: "Vestido" },
  { value: "jaqueta", label: "Jaqueta" },
  { value: "casaco", label: "Casaco" },
  { value: "tenis", label: "Tênis" },
  { value: "sapato", label: "Sapato" },
  { value: "sandalia", label: "Sandália" },
  { value: "acessorio", label: "Acessório" },
  { value: "outro", label: "Outro" },
];
