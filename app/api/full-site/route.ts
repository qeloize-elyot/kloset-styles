import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

/**
 * Serve o index.html injetando:
 * 1) Credenciais públicas do Supabase
 * 2) Auth real (login/cadastro)
 * 3) Análise de subtom via Gemini
 * 4) Geração de looks via Gemini
 */
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  let html: string | null = null;

  try {
    const filePath = path.join(process.cwd(), "index.html");
    html = await readFile(filePath, "utf-8");
  } catch {
    html = null;
  }

  if (!html) {
    const res = await fetch(
      "https://raw.githubusercontent.com/qeloize-elyot/kloset-styles/main/index.html",
      {
        cache: "no-store",
        headers: { Accept: "text/html,text/plain,*/*" },
      }
    );

    if (!res.ok) {
      return new NextResponse(
        "<!DOCTYPE html><html lang=\"pt-BR\"><body style=\"font-family:system-ui;padding:40px;background:#140c18;color:#f4edf9\"><h1>Kloset Styles</h1><p>Não foi possível carregar o site.</p></body></html>",
        {
          status: 502,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    html = await res.text();
  }

  const headInject = `<script>window.NEXT_PUBLIC_SUPABASE_URL=${JSON.stringify(
    supabaseUrl
  )};window.NEXT_PUBLIC_SUPABASE_ANON_KEY=${JSON.stringify(
    supabaseAnonKey
  )};</script>`;

  const appOverride = `
<script>
(function () {
  function toast(msg) {
    if (typeof showToast === 'function') showToast(msg);
    else alert(msg);
  }

  function getClient() {
    if (typeof supabaseClient !== 'undefined' && supabaseClient) return supabaseClient;
    if (window.supabase && window.NEXT_PUBLIC_SUPABASE_URL && window.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        window.__klosetSb = window.__klosetSb || window.supabase.createClient(
          window.NEXT_PUBLIC_SUPABASE_URL,
          window.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
        return window.__klosetSb;
      } catch (e) { return null; }
    }
    return null;
  }

  function findPieceById(list, id) {
    if (id == null) return null;
    var sid = String(id);
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].id) === sid) return list[i];
    }
    return null;
  }

  function pickByCategory(list, cats, offset) {
    var filtered = list.filter(function (i) { return cats.indexOf(i.category) >= 0; });
    if (!filtered.length) return null;
    var idx = (offset || 0) % filtered.length;
    return filtered[idx];
  }

  // ---------- AUTH REAL ----------
  window.handleAuthLogin = async function (e) {
    e.preventDefault();
    var email = (document.getElementById('login-email') || {}).value || '';
    var password = (document.getElementById('login-password') || {}).value || '';
    email = String(email).trim();
    if (!email || !password) { toast('Preencha e-mail e senha.'); return; }

    var client = getClient();
    if (!client) {
      toast('Banco não conectado. Verifique as variáveis do Supabase na Vercel.');
      return;
    }

    try {
      var res = await client.auth.signInWithPassword({ email: email, password: password });
      if (res.error) {
        var m = (res.error.message || '').toLowerCase();
        toast(m.indexOf('invalid') >= 0 || m.indexOf('credentials') >= 0
          ? 'E-mail ou senha incorretos. Crie uma conta primeiro em Criar conta.'
          : (res.error.message || 'Falha no login.'));
        return;
      }
      var user = res.data && res.data.user;
      if (!user) { toast('Não foi possível autenticar.'); return; }

      var meta = user.user_metadata || {};
      currentUser = {
        id: user.id,
        email: user.email,
        nome: meta.nome || meta.name || email.split('@')[0],
        genero: meta.genero || (typeof currentGender !== 'undefined' ? currentGender : 'feminino'),
        cidade: meta.cidade || (typeof userCityPref !== 'undefined' ? userCityPref : ''),
        estilo: meta.estilo || (typeof userStylePref !== 'undefined' ? userStylePref : ''),
        subtom: meta.subtom || (typeof userSubtom !== 'undefined' ? userSubtom : ''),
        biotipo: meta.biotipo || (typeof userBiotipo !== 'undefined' ? userBiotipo : ''),
        paleta_id: meta.paleta_id || (typeof activePaletteId !== 'undefined' ? activePaletteId : '')
      };
      localStorage.setItem('kloset_auth_user', JSON.stringify(currentUser));
      if (meta.genero && typeof setGenderProfile === 'function') setGenderProfile(meta.genero);
      if (typeof renderAuthView === 'function') renderAuthView();
      toast('Bem-vindo(a) de volta, ' + currentUser.nome + '!');
    } catch (err) {
      toast('Erro de conexão com o banco. Tente novamente.');
    }
  };

  window.handleAuthRegister = async function (e) {
    e.preventDefault();
    var nome = ((document.getElementById('reg-name') || {}).value || '').trim();
    var genero = (document.getElementById('reg-gender') || {}).value || 'feminino';
    var cidade = ((document.getElementById('reg-city') || {}).value || '').trim() || 'Maringá - PR';
    var estilo = (document.getElementById('reg-style') || {}).value || 'Casual Chic';
    var email = ((document.getElementById('reg-email') || {}).value || '').trim();
    var password = (document.getElementById('reg-password') || {}).value || '';
    var subtom = (document.getElementById('reg-subtom') || {}).value || 'Frio';
    var biotipo = (document.getElementById('reg-biotipo') || {}).value || 'Ampulheta';

    if (!nome || !email || !password) { toast('Preencha nome, e-mail e senha.'); return; }
    if (password.length < 6) { toast('A senha deve ter no mínimo 6 caracteres.'); return; }

    if (typeof userSubtom !== 'undefined') userSubtom = subtom;
    if (typeof userBiotipo !== 'undefined') userBiotipo = biotipo;
    if (typeof userStylePref !== 'undefined') userStylePref = estilo;
    if (typeof userCityPref !== 'undefined') userCityPref = cidade;

    var palette = 'inverno_profundo';
    if (subtom === 'Quente') palette = 'outono_escuro';
    else if (subtom === 'Neutro') palette = 'verao_suave';
    if (typeof activePaletteId !== 'undefined') activePaletteId = palette;

    var client = getClient();
    if (!client) {
      toast('Banco não conectado. Verifique as variáveis do Supabase na Vercel.');
      return;
    }

    try {
      var res = await client.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            nome: nome,
            genero: genero,
            cidade: cidade,
            estilo: estilo,
            subtom: subtom,
            biotipo: biotipo,
            paleta_id: palette
          }
        }
      });

      if (res.error) {
        var msg = (res.error.message || '').toLowerCase();
        if (msg.indexOf('already') >= 0 || msg.indexOf('registered') >= 0 || msg.indexOf('exists') >= 0) {
          toast('Este e-mail já está cadastrado. Use a aba Entrar.');
        } else {
          toast(res.error.message || 'Erro ao criar conta.');
        }
        return;
      }

      if (!res.data.session) {
        toast('Conta criada! Se pedir confirmação, confira o e-mail e depois use Entrar.');
        if (typeof switchAuthTab === 'function') switchAuthTab('login');
        return;
      }

      var user = res.data.user;
      currentUser = {
        id: user.id,
        email: user.email,
        nome: nome,
        genero: genero,
        cidade: cidade,
        estilo: estilo,
        subtom: subtom,
        biotipo: biotipo,
        paleta_id: palette
      };
      localStorage.setItem('kloset_auth_user', JSON.stringify(currentUser));
      if (typeof setGenderProfile === 'function') setGenderProfile(genero);
      if (typeof updateBadges === 'function') updateBadges();
      if (typeof renderAuthView === 'function') renderAuthView();
      toast('Conta criada com sucesso! Bem-vindo(a), ' + nome + '.');
    } catch (err) {
      toast('Erro de conexão com o banco. Tente novamente.');
    }
  };

  window.logoutUser = function () {
    currentUser = null;
    localStorage.removeItem('kloset_auth_user');
    var client = getClient();
    if (client) client.auth.signOut().catch(function () {});
    if (typeof renderAuthView === 'function') renderAuthView();
    toast('Você saiu da sua conta.');
  };

  // ---------- GEMINI: análise real de subtom ----------
  window.__klosetLastSelfieDataUrl = null;

  async function analisarComGemini(dataUrl) {
    if (!dataUrl || dataUrl.indexOf('base64,') < 0) {
      toast('Envie ou tire uma selfie primeiro.');
      return null;
    }

    toast('Analisando com Google Gemini…');

    var mime = 'image/jpeg';
    if (dataUrl.indexOf('image/png') >= 0) mime = 'image/png';
    else if (dataUrl.indexOf('image/webp') >= 0) mime = 'image/webp';

    var genero = (typeof currentGender !== 'undefined' ? currentGender : 'feminino');

    try {
      var resp = await fetch('/api/analise-subtom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: dataUrl,
          mimeType: mime,
          genero: genero
        })
      });

      var data = await resp.json();
      if (!resp.ok || data.error) {
        toast(data.error || ('Erro na análise (' + resp.status + ')'));
        return null;
      }

      if (typeof userSubtom !== 'undefined') userSubtom = data.subtom || userSubtom;
      if (typeof userBiotipo !== 'undefined') userBiotipo = data.biotipo || userBiotipo;
      if (typeof activePaletteId !== 'undefined') activePaletteId = data.paleta_id || activePaletteId;

      if (typeof saveProfilePreferences === 'function') saveProfilePreferences();
      if (typeof populateBiotypeSelect === 'function') populateBiotypeSelect();
      if (typeof selectPersonalPalette === 'function') {
        selectPersonalPalette(activePaletteId, true);
      }

      var conf = data.confianca != null ? data.confianca : 80;
      toast('Gemini: Subtom ' soft + userSubtom + ' • Biotipo ' + userBiotipo + ' (' + conf + '%).');
      return data;
    } catch (err) {
      toast('Falha ao chamar a API do Gemini. Tente de novo.');
      return null;
    }
  }

  window.handlePalettePhotoUpload = function (event) {
    var file = event.target && event.target.files && event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      var dataUrl = e.target.result;
      window.__klosetLastSelfieDataUrl = dataUrl;
      var prevBox = document.getElementById('palette-photo-preview-box');
      var prevImg = document.getElementById('palette-photo-preview-img');
      if (prevBox && prevImg) {
        prevImg.src = dataUrl;
        prevBox.classList.remove('hidden');
      }
      toast('Foto pronta. Clique em "Descobrir Automaticamente com IA".');
    };
    reader.readAsDataURL(file);
  };

  window.capturePalettePhotoAndAnalyze = async function () {
    var video = document.getElementById('palette-camera-video');
    if (video) {
      var canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      var ctx = canvas.getContext('2d');
      if (ctx) ctx.drawImage(video, 0, 0, 512, 512);
      var dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      window.__klosetLastSelfieDataUrl = dataUrl;
      var prevBox = document.getElementById('palette-photo-preview-box');
      var prevImg = document.getElementById('palette-photo-preview-img');
      if (prevBox && prevImg) {
        prevImg.src = dataUrl;
        prevBox.classList.remove('hidden');
      }
    }
    if (typeof stopPaletteAICamera === 'function') stopPaletteAICamera();
    await window.runAutomaticAIDiagnosis();
  };

  window.runAutomaticAIDiagnosis = async function () {
    var dataUrl = window.__klosetLastSelfieDataUrl;
    if (!dataUrl) {
      var prevImg = document.getElementById('palette-photo-preview-img');
      if (prevImg && prevImg.src && prevImg.src.indexOf('base64,') >= 0) {
        dataUrl = prevImg.src;
        window.__klosetLastSelfieDataUrl = dataUrl;
      }
    }

    if (!dataUrl) {
      toast('Tire ou envie uma selfie antes de analisar com a IA.');
      return;
    }

    await analisarComGemini(dataUrl);
  };

  // ---------- GEMINI: gerar look (não aleatório) ----------
  window.generateCompleteAILook = async function (rotatePieces) {
    var container = document.getElementById('ai-generated-outfit-container');
    var moodboardBox = document.getElementById('ai-pinterest-moodboard');
    if (!container) return;

    if (rotatePieces && typeof closetLookRotationIndex !== 'undefined') {
      closetLookRotationIndex += 1;
    }

    var locationStr = (document.getElementById('ai-builder-location') || {}).value || (typeof userCityPref !== 'undefined' ? userCityPref : 'Maringá - PR');
    var occasion = (document.getElementById('ai-builder-occasion') || {}).value || 'Faculdade / Dia a Dia';
    var weather = (document.getElementById('ai-builder-weather') || {}).value || 'ameno';
    var styleChosen = (document.getElementById('ai-builder-style') || {}).value || (typeof userStylePref !== 'undefined' ? userStylePref : 'Casual Chic');
    var palObj = (typeof seasonalPalettes !== 'undefined')
      ? (seasonalPalettes.find(function (p) { return p.id === activePaletteId; }) || seasonalPalettes[0])
      : { name: 'Sua paleta' };

    var sideSummary = document.getElementById('ai-side-profile-summary');
    var sideClosetCount = document.getElementById('ai-side-closet-count');
    if (sideSummary) sideSummary.textContent = (typeof userSubtom !== 'undefined' ? userSubtom : '') + ' • ' + (typeof userBiotipo !== 'undefined' ? userBiotipo : '');
    if (sideClosetCount && typeof userCloset !== 'undefined') sideClosetCount.textContent = userCloset.length + ' peças salvas';

    var closet = (typeof userCloset !== 'undefined' && userCloset.length) ? userCloset : (typeof defaultClosetItems !== 'undefined' ? defaultClosetItems : []);
    var rot = (typeof closetLookRotationIndex !== 'undefined' ? closetLookRotationIndex : 0);

    container.innerHTML = '<div class="p-6 text-sm text-[#cbbad7]">Consultando Google Gemini para montar seu look…</div>';

    var payloadPieces = closet.map(function (p) {
      return {
        id: p.id,
        name: p.name,
        category: p.category,
        style: p.style || '',
        season: p.season || '',
        colorName: p.colorName || '',
        colorHex: p.colorHex || ''
      };
    });

    var geminiData = null;
    try {
      var resp = await fetch('/api/gerar-look', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pieces: payloadPieces,
          occasion: occasion,
          weather: weather,
          style: styleChosen,
          location: locationStr,
          subtom: (typeof userSubtom !== 'undefined' ? userSubtom : 'Neutro'),
          biotipo: (typeof userBiotipo !== 'undefined' ? userBiotipo : 'Ampulheta'),
          palette: (typeof activePaletteId !== 'undefined' ? activePaletteId : 'inverno_profundo'),
          genero: (typeof currentGender !== 'undefined' ? currentGender : 'feminino')
        })
      });
      geminiData = await resp.json();
      if (!resp.ok || geminiData.error) {
        toast(geminiData.error || 'Não foi possível gerar o look com Gemini.');
        geminiData = null;
      }
    } catch (e) {
      toast('Falha ao chamar a API de looks. Usando combinação local.');
      geminiData = null;
    }

    var topPiece = geminiData ? findPieceById(closet, geminiData.top_id) : null;
    var bottomPiece = geminiData ? findPieceById(closet, geminiData.bottom_id) : null;
    var shoePiece = geminiData ? findPieceById(closet, geminiData.shoe_id) : null;

    if (!topPiece) topPiece = pickByCategory(closet, ['blusas', 'casacos', 'vestidos'], rot) || (typeof defaultClosetItems !== 'undefined' ? defaultClosetItems[0] : null);
    if (!bottomPiece) bottomPiece = pickByCategory(closet, ['calcas', 'saias'], rot) || (typeof defaultClosetItems !== 'undefined' ? defaultClosetItems[2] : null);
    if (!shoePiece) shoePiece = pickByCategory(closet, ['calcados'], rot) || (typeof defaultClosetItems !== 'undefined' ? defaultClosetItems[4] : null);

    var chosenClosetPieces = [];
    if (topPiece) chosenClosetPieces.push({ role: '1. Blusa / Parte Superior (Do Seu Closet)', piece: topPiece });
    if (bottomPiece) chosenClosetPieces.push({ role: '2. Calça / Parte Inferior (Do Seu Closet)', piece: bottomPiece });
    if (shoePiece) chosenClosetPieces.push({ role: '3. Calçado / Sapato (Do Seu Closet)', piece: shoePiece });

    var weatherLabel = weather === 'frio' ? 'Clima Frio (15°C)' : weather === 'quente' ? 'Clima Quente (29°C)' : 'Clima Ameno (22°C)';
    var title = (geminiData && geminiData.title) ? geminiData.title : (styleChosen + ' para ' + occasion);
    var explanation = (geminiData && geminiData.explanation)
      ? geminiData.explanation
      : ('Para <strong>' + occasion + '</strong> em <strong>' + locationStr + '</strong> (' + weatherLabel + '), combinamos peças do seu guarda-roupa respeitando estilo <strong>' + styleChosen + '</strong>, biotipo <strong>' + (typeof userBiotipo !== 'undefined' ? userBiotipo : '') + '</strong> e subtom <strong>' + (typeof userSubtom !== 'undefined' ? userSubtom : '') + '</strong>.');

    var providerBadge = (geminiData && geminiData.provider === 'google-gemini')
      ? 'Google Gemini'
      : 'Modo reserva';

    if (geminiData && geminiData.provider === 'google-gemini') {
      toast('Look montado com Google Gemini.');
    } else if (geminiData && geminiData.note) {
      toast(geminiData.note);
    }

    container.innerHTML = '\n' +
      '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">' +
        '<div>' +
          '<span class="text-[10px] tracking-[0.2em] uppercase text-[#cbb0dc] font-semibold">LOOK COM IA • ' + providerBadge.toUpperCase() + ' • ' + String(locationStr).toUpperCase() + '</span>' +
          '<h3 class="heading-adaptive font-serif text-2xl sm:text-3xl text-white mt-0.5">' + title + '</h3>' +
        '</div>' +
        '<div class="flex items-center gap-2">' +
          '<button onclick="generateCompleteAILook(true)" class="bg-white/10 hover:bg-white/20 text-xs text-[#dfc9ee] px-3.5 py-1.5 rounded-full transition">Alternar / Regenerar com IA</button>' +
        '</div>' +
      '</div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">' +
        chosenClosetPieces.map(function (entry) {
          return '<div class="bg-[#170f1c] border border-[#b89bc8]/30 rounded-2xl p-3 flex flex-col justify-between">' +
            '<div class="relative">' +
              '<img src="' + (entry.piece.image || '') + '" alt="' + (entry.piece.name || '') + '" class="w-full h-48 object-cover object-top rounded-xl" />' +
              '<span class="absolute top-2.5 left-2.5 bg-[#1c1123]/90 border border-[#b89bc8]/40 text-[#dfc9ee] text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full">' + entry.role + '</span>' +
            '</div>' +
            '<div class="mt-3">' +
              '<div class="flex items-center gap-1.5 text-[10px] text-[#b89bc8] uppercase">' +
                '<span class="w-2.5 h-2.5 rounded-full inline-block" style="background:' + (entry.piece.colorHex || '#888') + '"></span>' +
                '<span>' + (entry.piece.colorName || '') + ' • ' + (entry.piece.style || styleChosen) + '</span>' +
              '</div>' +
              '<h4 class="font-serif text-lg text-white leading-tight mt-0.5">' + (entry.piece.name || '') + '</h4>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div class="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">' +
        '<div class="text-xs text-[#cbbad7] text-muted-adaptive space-y-1.5">' +
          '<p class="text-white heading-adaptive font-semibold flex items-center gap-1.5"><span>Por que a IA escolheu este look:</span></p>' +
          '<p>' + explanation + '</p>' +
        '</div>' +
        '<button onclick="showToast(\'Look salvo nos seus Looks Favoritos do Closet!\')" class="shrink-0 bg-[#b79ac8] hover:bg-[#c8aed8] text-[#1c1123] font-semibold text-xs px-5 py-2.5 rounded-full shadow-md transition">Salvar Este Look</button>' +
      '</div>';

    if (moodboardBox && typeof pinterestMoodboards !== 'undefined') {
      var gKey = (typeof currentGender !== 'undefined' && currentGender === 'masculino') ? 'masculino' : 'feminino';
      var styleBoards = (pinterestMoodboards[gKey] && (pinterestMoodboards[gKey][styleChosen] || pinterestMoodboards[gKey]['Casual Chic'])) || [];
      moodboardBox.innerHTML = '\n' +
        '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">' +
          '<div>' +
            '<span class="text-[10px] tracking-[0.2em] uppercase text-[#cbb0dc] font-semibold">REFERÊNCIAS VISUAIS • ESTILO PINTEREST</span>' +
            '<h3 class="heading-adaptive font-serif text-2xl text-white mt-0.5">Inspirações (' + styleChosen + ' • Biotipo ' + (typeof userBiotipo !== 'undefined' ? userBiotipo : '') + ')</h3>' +
          '</div>' +
          '<span class="text-[11px] text-[#dfc9ee] bg-white/10 px-3 py-1 rounded-full">Curadoria Visual</span>' +
        '</div>' +
        '<div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">' +
          styleBoards.map(function (pin) {
            return '<div class="group relative rounded-2xl overflow-hidden bg-[#160e1b] border border-white/10 aspect-[3/4.2]">' +
              '<img src="' + pin.img + '" alt="' + pin.title + '" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" style="filter: contrast(1.08) brightness(0.9);" />' +
              '<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>' +
              '<div class="absolute bottom-2.5 left-2.5 right-2.5 text-left">' +
                '<span class="text-[9.5px] text-[#dfc9ee] bg-black/50 px-2 py-0.5 rounded-full">' + pin.tag + '</span>' +
                '<p class="text-xs font-medium text-white mt-1 leading-snug">' + pin.title + '</p>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>';
    }
  };
})();
</script>`;

  // Fix accidental typo if any slipped - rebuild without typo
  // (see soft typo guard below)

  if (html.includes("</head>")) {
    html = html.replace("</head>", `${headInject}</head>`);
  } else {
    html = headInject + html;
  }

  if (html.includes("</body>")) {
    html = html.replace("</body>", `${appOverride}</body>`);
  } else {
    html = html + appOverride;
  }

  // Safety: fix a possible typo introduced in toast string
  html = html.replace("userSubtom ' soft +", "userSubtom + ");
  html = html.replace("' soft + userSubtom", "' + userSubtom");

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
