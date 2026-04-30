import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/0948110f-1e25-4e81-ad38-abda2bd7e702/files/39b3ee62-73fb-4a83-bac5-40ee12b039e5.jpg";
const FARM_IMG = "https://cdn.poehali.dev/projects/0948110f-1e25-4e81-ad38-abda2bd7e702/files/d57d292f-94fa-4915-9641-66b35d5fc4f8.jpg";

const CATALOG = [
  { id: 1, name: "Клубника садовая", category: "ягоды", season: "лето", price: "320 ₽/кг", emoji: "🍓", badge: "Хит" },
  { id: 2, name: "Манго Альфонсо", category: "экзотика", season: "круглый год", price: "480 ₽/кг", emoji: "🥭", badge: "" },
  { id: 3, name: "Томаты черри", category: "овощи", season: "лето", price: "180 ₽/кг", emoji: "🍅", badge: "Новинка" },
  { id: 4, name: "Апельсины Навел", category: "цитрусы", season: "зима", price: "140 ₽/кг", emoji: "🍊", badge: "" },
  { id: 5, name: "Авокадо Хасс", category: "экзотика", season: "круглый год", price: "260 ₽/шт", emoji: "🥑", badge: "" },
  { id: 6, name: "Арбуз Астраханский", category: "ягоды", season: "лето", price: "45 ₽/кг", emoji: "🍉", badge: "Сезон!" },
  { id: 7, name: "Брокколи свежая", category: "овощи", season: "весна", price: "160 ₽/кг", emoji: "🥦", badge: "" },
  { id: 8, name: "Виноград Мускат", category: "ягоды", season: "осень", price: "280 ₽/кг", emoji: "🍇", badge: "" },
  { id: 9, name: "Лимоны Сицилия", category: "цитрусы", season: "круглый год", price: "200 ₽/кг", emoji: "🍋", badge: "" },
  { id: 10, name: "Перец Ратунда", category: "овощи", season: "осень", price: "130 ₽/кг", emoji: "🫑", badge: "" },
  { id: 11, name: "Дыня Колхозница", category: "экзотика", season: "лето", price: "95 ₽/кг", emoji: "🍈", badge: "" },
  { id: 12, name: "Яблоки Антоновка", category: "фрукты", season: "осень", price: "110 ₽/кг", emoji: "🍎", badge: "Местные" },
];

const CATEGORIES = ["все", "фрукты", "овощи", "ягоды", "цитрусы", "экзотика"];
const SEASONS = ["все сезоны", "весна", "лето", "осень", "зима", "круглый год"];

const SEASON_EMOJI: Record<string, string> = {
  "все сезоны": "🍀",
  "весна": "🌸",
  "лето": "☀️",
  "осень": "🍂",
  "зима": "❄️",
  "круглый год": "🔄",
};

const REVIEWS = [
  { name: "Анна К.", stars: 5, text: "Заказываю уже полгода! Фрукты всегда свежайшие, доставка вовремя. Клубника просто восхитительная!", avatar: "А" },
  { name: "Михаил Д.", stars: 5, text: "Отличный сервис. Нашёл экзотику которой нигде нет. Манго просто тает во рту. Рекомендую!", avatar: "М" },
  { name: "Светлана Р.", stars: 5, text: "Дети в восторге от фруктов! Теперь едят их с удовольствием. Качество на высоте, цены разумные.", avatar: "С" },
  { name: "Дмитрий В.", stars: 4, text: "Хороший магазин, свежие овощи. Авокадо всегда идеальной спелости. Спасибо за внимание к деталям.", avatar: "Д" },
];

const ARTICLES = [
  { title: "5 суперфудов, которые стоит есть каждый день", tag: "Здоровье", emoji: "🥗", time: "5 мин" },
  { title: "Зелёный смузи: заряд бодрости с утра", tag: "Рецепты", emoji: "🥤", time: "3 мин" },
  { title: "Как выбрать спелый авокадо: полный гид", tag: "Советы", emoji: "🥑", time: "4 мин" },
  { title: "Сезонные фрукты: что покупать в мае и июне", tag: "Сезон", emoji: "🌿", time: "6 мин" },
];

const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "Каталог", href: "#catalog" },
  { label: "О нас", href: "#about" },
  { label: "Доставка", href: "#delivery" },
  { label: "Лояльность", href: "#loyalty" },
  { label: "Рецепты", href: "#articles" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("все");
  const [activeSeason, setActiveSeason] = useState("все сезоны");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });

  const filtered = CATALOG.filter((item) => {
    const catOk = activeCategory === "все" || item.category === activeCategory;
    const seaOk = activeSeason === "все сезоны" || item.season === activeSeason;
    return catOk && seaOk;
  });

  const addToCart = (id: number) => setCart((prev) => [...prev, id]);
  const cartCount = cart.length;

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-golos">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-oswald text-xl font-bold uppercase tracking-wide" style={{ color: "#2d7a1f" }}>
              Фруктовый рай
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#catalog")}
              className="relative text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
              style={{ backgroundColor: "#2d7a1f" }}
            >
              <Icon name="ShoppingCart" size={16} />
              <span>Корзина</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: "#f57c00" }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="block w-full text-left py-3 text-base font-medium text-gray-700 border-b border-gray-50 hover:text-green-700"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,26,14,0.88) 0%, rgba(26,26,14,0.6) 55%, transparent 100%)" }} />

        <div className="relative z-10 container mx-auto px-4 pt-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in" style={{ backgroundColor: "rgba(245,124,0,0.9)" }}>
              <span>🚀</span>
              <span>Доставка за 2 часа по городу</span>
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              СВЕЖЕСТЬ
              <br />
              <span style={{ color: "#ff9800" }}>ПРЯМО</span>
              <br />
              С ГРЯДКИ
            </h1>

            <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Фрукты и овощи от местных фермеров — без посредников, с гарантией
              свежести и натурального качества.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <button
                onClick={() => scrollTo("#catalog")}
                className="text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-all hover:scale-105 shadow-lg"
                style={{ backgroundColor: "#2d7a1f" }}
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("#delivery")}
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white transition-all"
                style={{ color: "white" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#1a1a0e"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
              >
                Условия доставки
              </button>
            </div>

            <div className="flex flex-wrap gap-8 mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {[
                { value: "500+", label: "Видов продуктов" },
                { value: "50+", label: "Местных ферм" },
                { value: "2 часа", label: "Время доставки" },
                { value: "4.9 ★", label: "Рейтинг" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-oswald text-2xl font-bold" style={{ color: "#ff9800" }}>{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-light">
          <button onClick={() => scrollTo("#catalog")} className="text-white/60 hover:text-white">
            <Icon name="ChevronDown" size={32} />
          </button>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20" style={{ backgroundColor: "#fdf8f0" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-4xl mb-3 block">🛒</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-3" style={{ color: "#1a1a0e" }}>
              Каталог товаров
            </h2>
            <p className="text-gray-600 text-lg">Только свежее, только сезонное</p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mb-4 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all"
                style={{
                  backgroundColor: activeCategory === cat ? "#2d7a1f" : "white",
                  color: activeCategory === cat ? "white" : "#555",
                  border: activeCategory === cat ? "none" : "1px solid #ddd",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Season filters */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {SEASONS.map((sea) => (
              <button
                key={sea}
                onClick={() => setActiveSeason(sea)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeSeason === sea ? "#f57c00" : "white",
                  color: activeSeason === sea ? "white" : "#555",
                  border: activeSeason === sea ? "none" : "1px solid #ddd",
                }}
              >
                {SEASON_EMOJI[sea]} {sea}
              </button>
            ))}
          </div>

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg">Ничего не найдено — попробуйте другой фильтр</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all hover-scale border border-gray-100 relative overflow-hidden"
                >
                  {item.badge && (
                    <span
                      className="absolute top-3 right-3 text-white text-xs font-bold px-2 py-1 rounded-full"
                      style={{
                        backgroundColor:
                          item.badge === "Хит" ? "#c62828" :
                          item.badge === "Новинка" ? "#2d7a1f" : "#f57c00"
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <div className="text-5xl mb-3 text-center">{item.emoji}</div>
                  <h3 className="font-semibold text-sm mb-1 leading-tight" style={{ color: "#1a1a0e" }}>{item.name}</h3>
                  <p className="text-gray-400 text-xs capitalize mb-3">{item.category} · {item.season}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-oswald text-lg font-bold" style={{ color: "#2d7a1f" }}>{item.price}</span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                      style={{ backgroundColor: "#2d7a1f" }}
                    >
                      <Icon name="Plus" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-4xl block mb-4">🌾</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-6" style={{ color: "#1a1a0e" }}>
                МЫ РАБОТАЕМ
                <br />
                <span style={{ color: "#2d7a1f" }}>С ЛУЧШИМИ</span>
                <br />
                ФЕРМЕРАМИ
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">
                «Фруктовый рай» — это прямые партнёрства с более чем 50 местными
                фермерскими хозяйствами. Мы лично отбираем каждого поставщика,
                проверяем качество продукции и условия выращивания.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Никаких химических ускорителей роста. Только
                натуральное земледелие и честный труд. Покупая у нас, вы поддерживаете
                местных производителей.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Leaf", title: "Без химии", desc: "Натуральное земледелие" },
                  { icon: "MapPin", title: "Местные", desc: "Фермеры вашего региона" },
                  { icon: "Award", title: "Сертификаты", desc: "Все продукты проверены" },
                  { icon: "Heart", title: "С любовью", desc: "Каждый день для вас" },
                ].map((feat) => (
                  <div key={feat.title} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: "#fdf8f0" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: "#2d7a1f" }}>
                      <Icon name={feat.icon as "Leaf"} size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "#1a1a0e" }}>{feat.title}</div>
                      <div className="text-gray-500 text-xs">{feat.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={FARM_IMG}
                alt="Фермеры"
                className="rounded-3xl w-full object-cover shadow-2xl"
                style={{ height: "480px" }}
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🤝</span>
                  <div>
                    <div className="font-oswald font-bold text-lg" style={{ color: "#1a1a0e" }}>50+ партнёров</div>
                    <div className="text-gray-500 text-sm">Местные фермеры</div>
                  </div>
                </div>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-20" style={{ backgroundColor: "#1a1a0e" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-4xl block mb-3">🚚</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase mb-3">
              ДОСТАВКА И ЗАКАЗ
            </h2>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.6)" }}>Быстро, удобно, надёжно</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              { emoji: "⚡", title: "Экспресс", desc: "Доставка за 2 часа по городу. Минимальный заказ 500 ₽", price: "199 ₽", color: "#f57c00" },
              { emoji: "📅", title: "Плановая", desc: "Выбери удобное время в течение дня. Приоритетная обработка", price: "99 ₽", color: "#2d7a1f" },
              { emoji: "🎁", title: "Бесплатная", desc: "При заказе от 2000 ₽ доставка бесплатна в любой район", price: "0 ₽", color: "#ef5350" },
            ].map((opt) => (
              <div
                key={opt.title}
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)" }}
              >
                <div className="text-4xl mb-4">{opt.emoji}</div>
                <div className="font-oswald text-2xl font-bold text-white mb-2">{opt.title}</div>
                <p className="leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>{opt.desc}</p>
                <div className="font-oswald text-3xl font-bold" style={{ color: opt.color }}>{opt.price}</div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl p-8 border" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
            <h3 className="font-oswald text-2xl text-white font-bold mb-6">Способы оплаты</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: "CreditCard", label: "Банковская карта" },
                { icon: "Smartphone", label: "СБП / Телефон" },
                { icon: "Wallet", label: "Электронные кошельки" },
              ].map((pay) => (
                <div
                  key={pay.label}
                  className="flex items-center gap-3 p-4 rounded-xl border"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: "#2d7a1f" }}>
                    <Icon name={pay.icon as "CreditCard"} size={18} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>{pay.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOYALTY */}
      <section id="loyalty" className="py-20" style={{ backgroundColor: "#fdf8f0" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-4xl block mb-3">🏆</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-3" style={{ color: "#1a1a0e" }}>
              ПРОГРАММА
              <span style={{ color: "#f57c00" }}> ЛОЯЛЬНОСТИ</span>
            </h2>
            <p className="text-gray-600 text-lg">Покупай больше — экономь больше</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                level: "Зелёный", emoji: "🌱", discount: "3%", threshold: "от 1 заказа",
                perks: ["Кэшбэк 3% на все покупки", "Уведомления о новинках", "Приоритетная поддержка"],
                bg: "#e8f5e9", color: "#2d7a1f",
              },
              {
                level: "Золотой", emoji: "🌟", discount: "7%", threshold: "от 5 000 ₽/мес",
                perks: ["Кэшбэк 7%", "Ранний доступ к акциям", "Бесплатная экспресс-доставка", "Персональный менеджер"],
                bg: "#fff8e1", color: "#f57c00",
              },
              {
                level: "Платиновый", emoji: "💎", discount: "15%", threshold: "от 15 000 ₽/мес",
                perks: ["Кэшбэк 15%", "Закрытые распродажи", "Подарки на день рождения", "VIP-доставка"],
                bg: "#fce4ec", color: "#c62828",
              },
            ].map((tier) => (
              <div
                key={tier.level}
                className="rounded-3xl p-7 border-2"
                style={{ backgroundColor: tier.bg, borderColor: tier.color + "40" }}
              >
                <div className="text-5xl mb-4">{tier.emoji}</div>
                <div className="font-oswald text-xl font-bold mb-1" style={{ color: tier.color }}>{tier.level}</div>
                <div className="font-oswald text-5xl font-bold mb-1" style={{ color: "#1a1a0e" }}>{tier.discount}</div>
                <div className="text-gray-500 text-sm mb-5">{tier.threshold}</div>
                <ul className="space-y-2">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-gray-700">
                      <span style={{ color: tier.color }}>✓</span> {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
            <h3 className="font-oswald text-2xl font-bold mb-3" style={{ color: "#1a1a0e" }}>
              Начните копить бонусы прямо сейчас
            </h3>
            <p className="text-gray-500 mb-6">Регистрация занимает 30 секунд. Первый заказ — уже со скидкой</p>
            <button
              className="text-white px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all hover:scale-105"
              style={{ backgroundColor: "#2d7a1f" }}
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section id="articles" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-4xl block mb-3">📖</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-3" style={{ color: "#1a1a0e" }}>
              ЗДОРОВОЕ ПИТАНИЕ
              <br />
              <span style={{ color: "#2d7a1f" }}>И РЕЦЕПТЫ</span>
            </h2>
            <p className="text-gray-600 text-lg">Советы от наших нутрициологов</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {ARTICLES.map((art, i) => (
              <div
                key={art.title}
                className="rounded-2xl p-6 hover-scale cursor-pointer border border-gray-100 hover:shadow-lg transition-all"
                style={{ backgroundColor: i % 2 === 0 ? "#fdf8f0" : "#f1f8e9" }}
              >
                <div className="text-4xl mb-4">{art.emoji}</div>
                <span
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3"
                  style={{ backgroundColor: "rgba(45,122,31,0.12)", color: "#2d7a1f" }}
                >
                  {art.tag}
                </span>
                <h3 className="font-semibold leading-snug mb-3 text-sm" style={{ color: "#1a1a0e" }}>{art.title}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Icon name="Clock" size={12} />
                  <span>Читать {art.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              className="border-2 font-semibold px-8 py-3 rounded-full transition-all"
              style={{ borderColor: "#2d7a1f", color: "#2d7a1f" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2d7a1f";
                (e.currentTarget as HTMLButtonElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#2d7a1f";
              }}
            >
              Все статьи →
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20" style={{ backgroundColor: "#fdf8f0" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-4xl block mb-3">💬</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-3" style={{ color: "#1a1a0e" }}>
              ОТЗЫВЫ КЛИЕНТОВ
            </h2>
            <div className="flex items-center justify-center gap-2 text-yellow-500 text-xl">
              ★★★★★
              <span className="text-gray-600 text-base font-medium ml-2">4.9 из 5 · 2 400+ отзывов</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((rev) => (
              <div key={rev.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-oswald font-bold text-white text-lg flex-shrink-0"
                    style={{ backgroundColor: "#2d7a1f" }}
                  >
                    {rev.avatar}
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: "#1a1a0e" }}>{rev.name}</div>
                    <div className="text-yellow-400 text-sm">{"★".repeat(rev.stars)}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{rev.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 rounded-2xl px-8 py-5" style={{ backgroundColor: "#e8f5e9" }}>
              <span className="text-3xl">📸</span>
              <div className="text-left">
                <div className="font-semibold" style={{ color: "#1a1a0e" }}>Поделитесь своим заказом</div>
                <div className="text-gray-500 text-sm">Отметьте нас в Instagram — получите 200 бонусных рублей</div>
              </div>
              <button className="text-white px-5 py-2 rounded-full font-semibold text-sm ml-4 whitespace-nowrap" style={{ backgroundColor: "#2d7a1f" }}>
                @fruit_paradise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-4xl block mb-3">📍</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-3" style={{ color: "#1a1a0e" }}>
              КОНТАКТЫ
            </h2>
            <p className="text-gray-600 text-lg">Мы всегда на связи</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (800) 555-00-00", sub: "Бесплатно, круглосуточно" },
                { icon: "Mail", label: "Email", value: "hello@fruitparadise.ru", sub: "Ответим в течение часа" },
                { icon: "MapPin", label: "Офис", value: "ул. Садовая, 12", sub: "Пн–Пт 9:00–18:00" },
                { icon: "MessageCircle", label: "Telegram", value: "@fruit_paradise_bot", sub: "Онлайн-заказ и поддержка" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100" style={{ backgroundColor: "#fdf8f0" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: "#2d7a1f" }}>
                    <Icon name={c.icon as "Phone"} size={20} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider">{c.label}</div>
                    <div className="font-semibold" style={{ color: "#1a1a0e" }}>{c.value}</div>
                    <div className="text-gray-400 text-sm">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-oswald text-2xl font-bold mb-6" style={{ color: "#1a1a0e" }}>Напишите нам</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
                  setContactForm({ name: "", phone: "", message: "" });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-colors font-golos"
                    style={{ fontFamily: "Golos Text, sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-colors"
                    style={{ fontFamily: "Golos Text, sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Расскажите, чем мы можем помочь..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-colors resize-none"
                    style={{ fontFamily: "Golos Text, sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all"
                  style={{ backgroundColor: "#2d7a1f" }}
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12" style={{ backgroundColor: "#1a1a0e" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌿</span>
                <span className="font-oswald text-xl font-bold text-white uppercase tracking-wide">
                  Фруктовый рай
                </span>
              </div>
              <p className="leading-relaxed mb-5 max-w-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                Свежие фрукты и овощи от местных фермеров с доставкой на ваш стол.
                Качество, которому доверяют тысячи семей.
              </p>
              <div className="flex gap-3">
                {["📱", "📷", "💬", "🐦"].map((s, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="font-oswald text-white font-bold mb-4 uppercase tracking-wider text-sm">Разделы</div>
              <ul className="space-y-2">
                {NAV_ITEMS.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="text-sm hover:text-white transition-colors"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-oswald text-white font-bold mb-4 uppercase tracking-wider text-sm">Ещё</div>
              <ul className="space-y-2">
                {NAV_ITEMS.slice(4).map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="text-sm hover:text-white transition-colors"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>© 2024 Фруктовый рай. Все права защищены.</span>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>🌱 Сделано с заботой о вашем здоровье</span>
          </div>
        </div>
      </footer>
    </div>
  );
}