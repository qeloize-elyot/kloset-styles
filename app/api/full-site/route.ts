import { NextResponse } from "next/server";

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
      "<!DOCTYPE html><html><body><h1>Nao foi possivel carregar o site.</h1></body></html>",
      { status: 502, headers: { "Content-Type": "text/html; charset=utf-8" } }
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
  // Remove botao Arquivos GitHub (linha unica com onclick)
  html = html.replace(
    '<button onclick="openGitHubModal()" class="text-[#dfc9ee] hover:text-white font-medium inline-flex items-center gap-1 transition">',
    '<button style="display:none" aria-hidden="true">'
  );

  // Esconde texto do botao GitHub no footer se existir
  html = html.replace(/Baixar index\.html para GitHub/g, "");
  html = html.replace(/Arquivos GitHub/g, "");

  // Links de login e cadastro (Next.js ja tem /login e /cadastro)
  const authLinks =
    '<a href="/login" class="text-[#dfc9ee] hover:text-white text-[11px] font-medium transition px-2">Entrar</a>' +
    '<a href="/cadastro" class="bg-[#b79ac8] hover:bg-[#c8aed8] text-[#1c1123] text-[11px] font-semibold px-3 py-1 rounded-full transition">Criar conta</a>';

  html = html.replace(
    '<div class="flex items-center gap-3.5 text-[#e2d4ec]">',
    '<div class="flex items-center gap-3.5 text-[#e2d4ec]">' + authLinks
  );

  // Checkout: troca toast simples por fluxo com formas de pagamento simuladas
  const oldCheckout =
    "function checkoutCart() {\n" +
    "      if (shoppingCart.length === 0) return;\n" +
    "      shoppingCart = [];\n" +
    "      updateBadges();\n" +
    "      renderCartDrawer();\n" +
    "      toggleCartDrawer(false);\n" +
    "      showToast('Pedido realizado com sucesso! Obrigada por escolher a Kloset Styles \u2726');\n" +
    "    }";

  const newCheckout = [
    "function checkoutCart() {",
    "      if (shoppingCart.length === 0) { showToast('Sua sacola esta vazia.'); return; }",
    "      openPaymentModal();",
    "    }",
    "",
    "    function openPaymentModal() {",
    "      var backdrop = document.getElementById('info-modal-backdrop');",
    "      var body = document.getElementById('info-modal-body');",
    "      if (!backdrop || !body) return;",
    "      var total = shoppingCart.reduce(function(acc, entry) {",
    "        var p = catalogProducts.find(function(prod) { return prod.id === entry.productId; });",
    "        return acc + (p ? p.price * entry.qty : 0);",
    "      }, 0);",
    "      backdrop.classList.remove('hidden');",
    "      backdrop.classList.add('flex');",
    "      body.innerHTML = '' +",
    "        '<span class=\"text-[10px] tracking-[0.2em] uppercase text-[#b89bc8] font-semibold\">PAGAMENTO SIMULADO</span>' +",
    "        '<h3 class=\"font-serif text-3xl text-white mt-1\">Finalizar compra</h3>' +",
    "        '<p class=\"text-xs text-[#cbbad7] mt-2\">Demonstracao — nenhum valor real e cobrado.</p>' +",
    "        '<p class=\"font-serif text-2xl text-[#dfc9ee] mt-4\">Total: R$ ' + total.toFixed(2).replace('.', ',') + '</p>' +",
    "        '<div class=\"mt-5 space-y-2\">' +",
    "          '<p class=\"text-[10px] tracking-[0.15em] uppercase text-[#b89bc8]\">Forma de pagamento</p>' +",
    "          '<label class=\"flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 cursor-pointer\"><input type=\"radio\" name=\"pay\" value=\"pix\" checked class=\"accent-[#b79ac8]\" /><span class=\"text-sm text-white\">PIX (simulacao)</span></label>' +",
    "          '<label class=\"flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 cursor-pointer\"><input type=\"radio\" name=\"pay\" value=\"cartao\" class=\"accent-[#b79ac8]\" /><span class=\"text-sm text-white\">Cartao de credito (simulacao)</span></label>' +",
    "          '<label class=\"flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 cursor-pointer\"><input type=\"radio\" name=\"pay\" value=\"boleto\" class=\"accent-[#b79ac8]\" /><span class=\"text-sm text-white\">Boleto bancario (simulacao)</span></label>' +",
    "        '</div>' +",
    "        '<div class=\"mt-6 flex flex-wrap gap-3\">' +",
    "          '<button onclick=\"confirmSimulatedPayment()\" class=\"flex-1 bg-[#b79ac8] hover:bg-[#c8aed8] text-[#1c1123] font-semibold text-xs py-3 px-4 rounded-full\">Confirmar pedido simulado</button>' +",
    "          '<button onclick=\"closeInfoModal()\" class=\"bg-white/10 hover:bg-white/20 text-white text-xs py-3 px-5 rounded-full\">Cancelar</button>' +",
    "        '</div>';",
    "    }",
    "",
    "    function confirmSimulatedPayment() {",
    "      var method = document.querySelector('input[name=pay]:checked');",
    "      var label = 'PIX';",
    "      if (method && method.value === 'cartao') label = 'Cartao';",
    "      if (method && method.value === 'boleto') label = 'Boleto';",
    "      shoppingCart = [];",
    "      updateBadges();",
    "      renderCartDrawer();",
    "      toggleCartDrawer(false);",
    "      closeInfoModal();",
    "      showToast('Pedido simulado aprovado via ' + label + ' — obrigada!');",
    "    }",
  ].join("\n");

  if (html.includes(oldCheckout)) {
    html = html.replace(oldCheckout, newCheckout);
  } else {
    // fallback: injeta funcoes antes do </script> final
    html = html.replace(
      "function checkoutCart() {",
      newCheckout + "\n\n    function checkoutCart_UNUSED() {"
    );
  }

  // IA: reforca texto da Paleta Pessoal sobre tom de pele e biotipo (se existir titulo)
  html = html.replace(
    "Paleta Pessoal",
    "Paleta Pessoal"
  );

  // Injeta nota de IA/biotipo perto do quiz se houver ancora
  if (html.includes("id=\"page-paleta\"") && !html.includes("Analise de tom de pele e biotipo")) {
    html = html.replace(
      "id=\"page-paleta\"",
      "id=\"page-paleta\" data-ai=\"tom-pele-biotipo\""
    );
  }

  return html;
}
