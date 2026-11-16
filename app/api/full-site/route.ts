import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

/**
 * Serve o index.html injetando:
 * 1) Credenciais públicas do Supabase
 * 2) Overrides de login/cadastro para usar Auth de verdade (sem fake localStorage)
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

  // Sobrescreve funções de auth do index.html (que antes aceitavam qualquer login)
  const authOverride = `
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

  var _origLogout = typeof logoutUser === 'function' ? logoutUser : null;
  window.logoutUser = function () {
    currentUser = null;
    localStorage.removeItem('kloset_auth_user');
    var client = getClient();
    if (client) client.auth.signOut().catch(function () {});
    if (typeof renderAuthView === 'function') renderAuthView();
    toast('Você saiu da sua conta.');
  };
})();
</script>`;

  if (html.includes("</head>")) {
    html = html.replace("</head>", `${headInject}</head>`);
  } else {
    html = headInject + html;
  }

  if (html.includes("</body>")) {
    html = html.replace("</body>", `${authOverride}</body>`);
  } else {
    html = html + authOverride;
  }

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
