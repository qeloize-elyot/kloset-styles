import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://raw.githubusercontent.com/qeloize-elyot/kloset-styles/main/index.html",
    {
      cache: "no-store",
      headers: { Accept: "text/html,text/plain,*/*" },
    }
  );

  if (!res.ok) {
    return new NextResponse(
      "<!DOCTYPE html><html><body><h1>Nao foi possivel carregar o site.</h1></body></html>",
      { status: 502, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  const original = await res.text();
  let html = patchHtml(original);

  // Nunca servir HTML quebrado
  if (html.length < original.length * 0.8) {
    html = original;
  }

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function patchHtml(html: string): string {
  // 1. Esconde botao do tutorial GitHub (sem apagar o resto do HTML)
  html = html.split("Arquivos GitHub").join("");
  html = html.split("Baixar index.html para GitHub").join("");
  html = html.split("Baixar index.html Completo").join("Fechar");

  // 2. Login / Criar conta (rotas Next.js existentes)
  const marker = '<div class="flex items-center gap-3.5 text-[#e2d4ec]">';
  if (html.includes(marker) && !html.includes('href="/login"')) {
    const auth =
      marker +
      '<a href="/login" class="text-[#dfc9ee] hover:text-white text-[11px] font-medium transition px-2">Entrar</a>' +
      '<a href="/cadastro" class="bg-[#b79ac8] hover:bg-[#c8aed8] text-[#1c1123] text-[11px] font-semibold px-3 py-1 rounded-full transition">Criar conta</a>';
    html = html.replace(marker, auth);
  }

  // 3. Pagamento simulado: sobrescreve so a funcao checkoutCart
  const start = html.indexOf("function checkoutCart() {");
  if (start !== -1) {
    // encontra o fechamento da funcao (proximo "\n    }\n" apos o start, nivel simples)
    const after = html.slice(start);
    const endRel = after.indexOf("\n    }\n");
    if (endRel !== -1) {
      const end = start + endRel + "\n    }\n".length;
      const replacement = `
    function checkoutCart() {
      if (shoppingCart.length === 0) { showToast('Sua sacola esta vazia.'); return; }
      openPaymentModal();
    }

    function openPaymentModal() {
      var backdrop = document.getElementById('info-modal-backdrop');
      var body = document.getElementById('info-modal-body');
      if (!backdrop || !body) return;
      var total = shoppingCart.reduce(function (acc, entry) {
        var p = catalogProducts.find(function (prod) { return prod.id === entry.productId; });
        return acc + (p ? p.price * entry.qty : 0);
      }, 0);
      backdrop.classList.remove('hidden');
      backdrop.classList.add('flex');
      body.innerHTML =
        '<span class="text-[10px] tracking-[0.2em] uppercase text-[#b89bc8] font-semibold">PAGAMENTO SIMULADO</span>' +
        '<h3 class="font-serif text-3xl text-white mt-1">Finalizar compra</h3>' +
        '<p class="text-xs text-[#cbbad7] mt-2">Demonstracao — nenhum valor real e cobrado.</p>' +
        '<p class="font-serif text-2xl text-[#dfc9ee] mt-4">Total: R$ ' + total.toFixed(2).replace('.', ',') + '</p>' +
        '<div class="mt-5 space-y-2">' +
        '<p class="text-[10px] tracking-[0.15em] uppercase text-[#b89bc8]">Forma de pagamento</p>' +
        '<label class="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 cursor-pointer"><input type="radio" name="pay" value="pix" checked class="accent-[#b79ac8]" /><span class="text-sm text-white">PIX (simulacao)</span></label>' +
        '<label class="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 cursor-pointer"><input type="radio" name="pay" value="cartao" class="accent-[#b79ac8]" /><span class="text-sm text-white">Cartao de credito (simulacao)</span></label>' +
        '<label class="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 cursor-pointer"><input type="radio" name="pay" value="boleto" class="accent-[#b79ac8]" /><span class="text-sm text-white">Boleto bancario (simulacao)</span></label>' +
        '</div>' +
        '<div class="mt-6 flex flex-wrap gap-3">' +
        '<button onclick="confirmSimulatedPayment()" class="flex-1 bg-[#b79ac8] hover:bg-[#c8aed8] text-[#1c1123] font-semibold text-xs py-3 px-4 rounded-full">Confirmar pedido simulado</button>' +
        '<button onclick="closeInfoModal()" class="bg-white/10 hover:bg-white/20 text-white text-xs py-3 px-5 rounded-full">Cancelar</button>' +
        '</div>';
    }

    function confirmSimulatedPayment() {
      var method = document.querySelector('input[name=pay]:checked');
      var label = 'PIX';
      if (method && method.value === 'cartao') label = 'Cartao';
      if (method && method.value === 'boleto') label = 'Boleto';
      shoppingCart = [];
      updateBadges();
      renderCartDrawer();
      toggleCartDrawer(false);
      closeInfoModal();
      showToast('Pedido simulado aprovado via ' + label + ' — obrigada!');
    }
`;
      html = html.slice(0, start) + replacement + html.slice(end);
    }
  }

  // 4. openGitHubModal vira no-op (so o corpo, se existir)
  const gStart = html.indexOf("function openGitHubModal() {");
  if (gStart !== -1) {
    const after = html.slice(gStart);
    const endRel = after.indexOf("\n    }\n");
    if (endRel !== -1) {
      const end = gStart + endRel + "\n    }\n".length;
      html =
        html.slice(0, gStart) +
        "function openGitHubModal() { closeInfoModal(); }\n" +
        html.slice(end);
    }
  }

  return html;
}
