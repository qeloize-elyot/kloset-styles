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

export interface Peca {
  id: string;
  user_id: string;
  nome: string;
  categoria: CategoriaPeca;
  cor_principal: string;
  cores_secundarias?: string[];
  estilo?: string;
  imagem_url?: string;
  observacoes?: string;
  created_at: string;
  updated_at: string;
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
  avatar_url?: string;
  analise_id?: string;
  created_at: string;
}
