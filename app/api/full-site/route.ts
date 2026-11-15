import { NextResponse } from "next/server";

/**
 * Serve o index.html do repositório como página HTML,
 * com ajustes: sem tutorial do GitHub, links de login/cadastro
 * e checkout com pagamento simulado.
 */
export async function GET() {
  const res = await fetch(
    "https://raw.githubusercontent.com/qeloize-elyot/kloset-styles/main/index.html",
    {
      next: { revalidate: 30 },
      headers: { Accept: "text/html,text/plain,*/*" },
    }
  );

  if (!res.ok) {
    return new NextResponse(
      "<!DOCTYPE html><html><body><h1>Não foi possível carregar o site.</h1></body></html>",
      {
        status: 502,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  let html = await res.text();
  html = patchHtml(html);

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
    },
  });
}

function patchHtml(html: string): string {
  // 1) Remove botão "Arquivos GitHub" do topo
  html = html.replace(
    /<button onclick="openGitHubModal\(\)"[\s\S]*?<\/button>/,
    ""
  );

  // 2) Remove botão de baixar index.html do rodapé (se existir)
  html = html.replace(
    /<button[^>]*>[\s\S]*?Baixar index\.html[\s\S]*?<\/button>/gi,
    ""
  );

  // 3) Troca openGitHubModal por no-op
  html = html.replace(
    /function openGitHubModal\(\) \{[\s\S]*?\n    \}/,
    `function openGitHubModal() {
      showToast('Central de arquivos desativada neste ambiente.');
    }`
  );

  // 4) Adiciona links Entrar / Criar conta na barra superior (antes dos ícones)
  const authLinks = `
        <a href="/login" class="hidden sm:inline-flex items-center text-[#dfc9ee] hover:text-white text-[11px] font-medium transition px-2">Entrar</a>
        <a href="/cadastro" class="hidden sm:inline-flex items-center bg-[#b79ac8] hover:bg-[#c8aed8] text-[#1c1123] text-[11px] font-semibold px-3 py-1 rounded-full transition">Criar conta</a>
`;

  html = html.replace(
    /(<div class="flex items-center gap-3\.5 text-\[#e2d4ec\]">)/,
    `$1${authLinks}`
  );

  // 5) Checkout simulado com formas de pagamento
  html = html.replace(
    /function checkoutCart\(\) \{[\s\S]*?\n    \}/,
    `function checkoutCart() {
      if (shoppingCart.length === 0) {
        showToast('Sua sacola está vazia.');
        return;
      }
      openPaymentModal();
    }

    function openPaymentModal() {
      const backdrop = document.getElementById('info-modal-backdrop');
      const body = document.getElementById('info-modal-body');
      if (!backdrop || !body) return;

      const total = shoppingCart.reduce((acc, entry) => {
        const p = catalogProducts.find(prod => prod.id === entry.productId);
        return acc + (p ? p.price * entry.qty : 0);
      }, 0);

      backdrop.classList.remove('hidden');
      backdrop.classList.add('flex');

      body.innerHTML = \
        <span class="text-[10px] tracking-[0.2em] uppercase text-[#b89bc8] font-semibold">PAGAMENTO SIMULADO</span>
        <h3 class="font-serif text-3xl text-white mt-1">Finalizar compra</h3>
        <p class="text-xs text-[#cbbad7] mt-2">Ambiente de demonstração — nenhum valor real é cobrado.</p>
        <p class="font-serif text-2xl text-[#dfc9ee] mt-4">Total: R$ \\$\{total.toFixed(2).replace('.', ',')}\</p>

        <div class="mt-5 space-y-2">
          <p class="text-[10px] tracking-[0.15em] uppercase text-[#b89bc8]">Forma de pagamento</p>
          <label class="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 cursor-pointer hover:border-[#b89bc8]/50">
            <input type="radio" name="pay" value="pix" checked class="accent-[#b79ac8]" />
            <span class="text-sm text-white">PIX (aprovação instantânea)</span>
          </label>
          <label class="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 cursor-pointer hover:border-[#b89bc8]/50">
            <input type="radio" name="pay" value="cartao" class="accent-[#b79ac8]" />
            <span class="text-sm text-white">Cartão de crédito (simulada)</span>
          </label>
          <label class="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 cursor-pointer hover:border-[#b89bc8]/50">
            <input type="radio" name="pay" value="boleto" class="accent-[#b79ac8]" />
            <span class="text-sm text-white">Boleto bancário (simulado)</span>
          </label>
        </div>

        <div class="mt-6 flex flex-wrap gap-3">
          <button onclick="confirmSimulatedPayment()" class="flex-1 bg-[#b79ac8] hover:bg-[#c8aed8] text-[#1c1123] font-semibold text-xs py-3 px-4 rounded-full transition">
            Confirmar pedido simulado
          </button>
          <button onclick="closeInfoModal()" class="bg-white/10 hover:bg-white/20 text-white text-xs py-3 px-5 rounded-full">
            Cancelar
          </button>
        </div>
      \\;
    }

    function confirmSimulatedPayment() {
      const method = document.querySelector('input[name="pay"]:checked');
      const label = method && method.value === 'pix' ? 'PIX' : method && method.value === 'cartao' ? 'Cartão' : 'Boleto';
      shoppingCart = [];
      updateBadges();
      renderCartDrawer();
      toggleCartDrawer(false);
      closeInfoModal();
      showToast('Pedido simulado aprovado via ' + label + ' — obrigada por escolher a Kloset Styles');
    }`
  );

  // 6) Texto do botão da sacola mais claro
  html = html.replace(
    />Finalizar compra</,
    ">Pagar (simulado)</"
  );

  return html;
}
