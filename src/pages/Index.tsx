import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "Hammer",
    title: "Демонтаж зданий",
    desc: "Снос домов, гаражей, хозпостроек любой сложности. Полная очистка территории от мусора.",
    price: "от 50 000 ₽",
  },
  {
    icon: "Shovel",
    title: "Расчистка участков",
    desc: "Уборка строительного мусора, старых конструкций, пней и растительности.",
    price: "от 15 000 ₽",
  },
  {
    icon: "Home",
    title: "Новое строительство",
    desc: "Строительство хозяйственных построек, бытовок, гаражей под ключ.",
    price: "от 200 000 ₽",
  },
  {
    icon: "Truck",
    title: "Вывоз мусора",
    desc: "Оперативный вывоз строительного и бытового мусора. Контейнеры от 8 до 32 м³.",
    price: "от 8 000 ₽",
  },
];

const PORTFOLIO = [
  {
    img: "https://cdn.poehali.dev/projects/f3760bfd-bc9d-4f1d-a6f8-d145d3b63408/bucket/cbaa6eed-36fb-412d-8859-cfd078a1335e.png",
    title: "Новая бытовка",
    tag: "Строительство",
  },
  {
    img: "https://cdn.poehali.dev/projects/f3760bfd-bc9d-4f1d-a6f8-d145d3b63408/bucket/a07d3bbd-6b82-4f83-9142-32e8684ea60a.jpg",
    title: "Демонтаж строения",
    tag: "Демонтаж",
  },
  {
    img: "https://cdn.poehali.dev/projects/f3760bfd-bc9d-4f1d-a6f8-d145d3b63408/bucket/23e51503-9ca6-4b69-ad89-3a0376f6d6e0.jpg",
    title: "Расчистка фундамента",
    tag: "Демонтаж",
  },
  {
    img: "https://cdn.poehali.dev/projects/f3760bfd-bc9d-4f1d-a6f8-d145d3b63408/bucket/5518aa3e-44dc-4926-94c9-990cb9ff2d28.jpg",
    title: "Работы на участке",
    tag: "Расчистка",
  },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", comment: "", photo: null as File | null });
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen font-golos bg-[#f7f5f2] text-[#1a1714]">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1714]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <span className="font-oswald text-xl font-bold text-white tracking-widest uppercase">
            Голубничий<span className="text-[#d4870a]"> Д.Н.</span>
          </span>
          <div className="hidden md:flex gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-white/70 hover:text-[#d4870a] text-sm font-medium tracking-wider uppercase transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-1"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#1a1714] border-t border-white/10 px-4 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-white/80 text-left text-sm font-medium uppercase tracking-wider py-1"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-end pb-20 pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/f3760bfd-bc9d-4f1d-a6f8-d145d3b63408/bucket/5518aa3e-44dc-4926-94c9-990cb9ff2d28.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1714] via-[#1a1714]/60 to-[#1a1714]/20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl">
            <div className="inline-block bg-[#d4870a] px-3 py-1 mb-6">
              <span className="font-oswald text-white text-xs tracking-[0.2em] uppercase">Бесплатный осмотр объекта</span>
            </div>
            <h1 className="font-oswald text-5xl sm:text-7xl font-bold text-white leading-none mb-6 tracking-tight">
              Демонтаж.<br />
              Расчистка.<br />
              <span className="text-[#d4870a]">Строительство.</span>
            </h1>
            <p className="text-white/70 text-lg mb-10 font-golos max-w-xl">
              Профессиональный снос и строительство любых объектов. Работаем быстро, убираем за собой.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("#contacts")}
                className="bg-[#d4870a] hover:bg-[#b87209] text-white font-oswald text-sm tracking-[0.15em] uppercase px-8 py-4 transition-colors duration-200"
              >
                Записаться на осмотр
              </button>
              <button
                onClick={() => scrollTo("#portfolio")}
                className="border border-white/40 hover:border-white text-white font-oswald text-sm tracking-[0.15em] uppercase px-8 py-4 transition-colors duration-200"
              >
                Наши работы
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#1a1714] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "200+", label: "Объектов сдано" },
              { num: "8 лет", label: "На рынке" },
              { num: "100%", label: "Вывоз мусора" },
              { num: "0 ₽", label: "Выезд и осмотр" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-oswald text-3xl sm:text-4xl font-bold text-[#d4870a]">{s.num}</div>
                <div className="text-white/50 text-sm mt-1 font-golos">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#f7f5f2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <div className="w-12 h-0.5 bg-[#d4870a] mb-4" />
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-[#1a1714] tracking-tight">Услуги</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-white p-8 group hover:bg-[#1a1714] transition-colors duration-300 cursor-default"
              >
                <div className="mb-6">
                  <Icon name={s.icon} size={28} className="text-[#d4870a]" />
                </div>
                <h3 className="font-oswald text-xl font-semibold text-[#1a1714] group-hover:text-white mb-3 tracking-wide">
                  {s.title}
                </h3>
                <p className="text-[#1a1714]/60 group-hover:text-white/60 text-sm leading-relaxed mb-6 font-golos">
                  {s.desc}
                </p>
                <div className="font-oswald text-[#d4870a] text-sm tracking-wider">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-[#ede9e3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <div className="w-12 h-0.5 bg-[#d4870a] mb-4" />
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-[#1a1714] tracking-tight">Портфолио</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PORTFOLIO.map((p, i) => (
              <div key={i} className="relative overflow-hidden group aspect-[4/3]">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1714]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="font-oswald text-[#d4870a] text-xs tracking-[0.2em] uppercase mb-1">{p.tag}</span>
                  <span className="font-oswald text-white text-xl font-semibold">{p.title}</span>
                </div>
                <div className="absolute top-4 left-4 bg-[#d4870a] px-2 py-1">
                  <span className="font-oswald text-white text-xs tracking-wider uppercase">{p.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#1a1714]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="w-12 h-0.5 bg-[#d4870a] mb-4" />
              <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
                Бесплатный осмотр
              </h2>
              <p className="text-white/60 font-golos leading-relaxed mb-10">
                Оставьте заявку — мы приедем, оценим объём работ и дадим точную стоимость. Без скрытых платежей.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "Phone", text: "+7 (999) 000-00-00" },
                  { icon: "MapPin", text: "Свердловская область" },
                  { icon: "Clock", text: "Пн–Вс, 8:00–20:00" },
                  { icon: "BadgeCheck", text: "Самозанятый · ИНН 661914015077" },
                ].map((c) => (
                  <div key={c.text} className="flex items-center gap-3">
                    <Icon name={c.icon} size={18} className="text-[#d4870a] shrink-0" />
                    <span className="text-white/80 font-golos">{c.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="bg-white/5 border border-white/10 p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <Icon name="CheckCircle" size={48} className="text-[#d4870a] mb-4" />
                  <h3 className="font-oswald text-2xl text-white mb-2">Заявка принята!</h3>
                  <p className="text-white/60 font-golos">Мы свяжемся с вами в ближайшее время для согласования визита.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-xs font-golos uppercase tracking-wider mb-2">Ваше имя *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#d4870a] text-white px-4 py-3 font-golos text-sm outline-none transition-colors duration-200"
                        placeholder="Иван Петров"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-golos uppercase tracking-wider mb-2">Телефон *</label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#d4870a] text-white px-4 py-3 font-golos text-sm outline-none transition-colors duration-200"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-golos uppercase tracking-wider mb-2">Адрес объекта</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#d4870a] text-white px-4 py-3 font-golos text-sm outline-none transition-colors duration-200"
                      placeholder="Улица, дом"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-golos uppercase tracking-wider mb-2">Описание задачи</label>
                    <textarea
                      rows={3}
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#d4870a] text-white px-4 py-3 font-golos text-sm outline-none transition-colors duration-200 resize-none"
                      placeholder="Расскажите что нужно сделать..."
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-golos uppercase tracking-wider mb-2">Фото объекта</label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="border border-dashed border-white/20 hover:border-[#d4870a] px-4 py-6 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 gap-2"
                    >
                      <Icon name="Upload" size={20} className="text-white/40" />
                      <span className="text-white/40 text-sm font-golos">
                        {form.photo ? form.photo.name : "Нажмите, чтобы загрузить фото"}
                      </span>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setForm({ ...form, photo: e.target.files?.[0] || null })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#d4870a] hover:bg-[#b87209] text-white font-oswald text-sm tracking-[0.15em] uppercase py-4 transition-colors duration-200"
                  >
                    Записаться на бесплатный осмотр
                  </button>
                  <p className="text-white/30 text-xs font-golos text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f0d0b] py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-oswald text-white/40 text-sm tracking-widest uppercase">
            Голубничий Д.Н. <span className="text-[#d4870a]/60">© 2026</span>
          </span>
          <span className="text-white/30 text-xs font-golos">Самозанятый · ИНН 661914015077</span>
        </div>
      </footer>
    </div>
  );
}