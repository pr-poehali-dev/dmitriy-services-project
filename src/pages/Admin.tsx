import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

interface Application {
  id: number;
  name: string;
  phone: string;
  address: string | null;
  comment: string | null;
  site: string | null;
  created_at: string;
}

const ADMIN_PASSWORD = "golub2026";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Неверный пароль");
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetch(func2url["get-applications"], {
      headers: { "X-Admin-Password": ADMIN_PASSWORD },
    })
      .then((r) => r.json())
      .then((d) => setApps(d.applications || []))
      .finally(() => setLoading(false));
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#1a1714] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="font-oswald text-2xl font-bold text-white tracking-widest uppercase">
              Голубничий<span className="text-[#d4870a]"> Д.Н.</span>
            </span>
            <p className="text-white/40 text-sm font-golos mt-2">Панель заявок</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-white/50 text-xs font-golos uppercase tracking-wider mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-[#d4870a] text-white px-4 py-3 font-golos text-sm outline-none transition-colors duration-200"
                placeholder="Введите пароль"
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-sm font-golos">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#d4870a] hover:bg-[#b87209] text-white font-oswald text-sm tracking-[0.15em] uppercase py-4 transition-colors duration-200"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <div className="bg-[#1a1714] py-4 px-4 sm:px-6 flex items-center justify-between">
        <span className="font-oswald text-lg font-bold text-white tracking-widest uppercase">
          Голубничий<span className="text-[#d4870a]"> Д.Н.</span> — Заявки
        </span>
        <a href="/" className="text-white/50 hover:text-white text-sm font-golos transition-colors">
          ← На сайт
        </a>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="text-center py-20 text-[#1a1714]/40 font-golos">Загружаем заявки...</div>
        ) : apps.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="Inbox" size={48} className="text-[#1a1714]/20 mx-auto mb-4" />
            <p className="text-[#1a1714]/40 font-golos">Заявок пока нет</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-[#1a1714]/50 text-sm font-golos mb-6">Всего заявок: {apps.length}</p>
            {apps.map((a) => (
              <div key={a.id} className="bg-white p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-oswald text-xl font-semibold text-[#1a1714]">{a.name}</h3>
                    <a
                      href={`tel:${a.phone}`}
                      className="text-[#d4870a] font-golos font-medium hover:underline"
                    >
                      {a.phone}
                    </a>
                  </div>
                  <div className="text-right">
                    <span className="text-[#1a1714]/40 text-xs font-golos">{a.created_at}</span>
                    {a.site && (
                      <div className="mt-1">
                        <span className="bg-[#d4870a]/10 text-[#d4870a] text-xs font-golos px-2 py-0.5">
                          {a.site}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {(a.address || a.comment) && (
                  <div className="border-t border-[#1a1714]/5 pt-4 space-y-2">
                    {a.address && (
                      <div className="flex gap-2 items-start">
                        <Icon name="MapPin" size={14} className="text-[#d4870a] shrink-0 mt-0.5" />
                        <span className="text-[#1a1714]/70 text-sm font-golos">{a.address}</span>
                      </div>
                    )}
                    {a.comment && (
                      <div className="flex gap-2 items-start">
                        <Icon name="MessageSquare" size={14} className="text-[#d4870a] shrink-0 mt-0.5" />
                        <span className="text-[#1a1714]/70 text-sm font-golos">{a.comment}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
