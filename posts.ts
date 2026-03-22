import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  category: text("category"),
  likes: integer("likes").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertPostSchema = createInsertSchema(postsTable).omit({ id: true, createdAt: true, likes: true });
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof postsTable.$inferSelect;

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>شارع الحياة - Guinness World Record</title>
    <script src="https://tailwindcss.com"></script>
    <style>
        @import url('https://googleapis.com');
        body { font-family: 'Cairo', sans-serif; background-color: #000; color: white; -webkit-tap-highlight-color: transparent; }
        .gold-glow { box-shadow: 0 0 25px rgba(212, 175, 55, 0.3); border: 1px solid #d4af37; }
        .orange-glow { box-shadow: 0 0 20px rgba(255, 98, 0, 0.4); }
        .scroll-hide::-webkit-scrollbar { display: none; }
        .live-dot { width: 8px; height: 8px; background: #00ff00; border-radius: 50%; display: inline-block; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
    </style>
</head>
<body class="overflow-x-hidden select-none">

    <!-- 1. بوابة تسجيل الدخول (الهوية) -->
    <div id="auth-page" class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center transition-all duration-700">
        <div class="mb-12 animate-bounce">
            <div class="inline-block p-5 rounded-full border-4 border-yellow-600 bg-red-700 gold-glow">
                <h1 class="text-4xl font-black text-white">شارع الحياة</h1>
            </div>
        </div>
        <div class="w-full max-w-sm space-y-6">
            <h2 class="text-2xl font-black text-orange-500">سجل هويتك يا برنس 👑</h2>
            <input id="user-name" type="text" placeholder="اسم الشهرة / اللقب" class="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-3xl text-white outline-none focus:border-orange-600 text-center text-lg">
            <select id="user-region" class="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-3xl text-gray-400 outline-none focus:border-orange-600 text-center text-lg appearance-none">
                <option value="">اختر منطقتك المميزة 📍</option>
                <option value="القاهرة">القاهرة (المحروسة)</option>
                <option value="الإسكندرية">الإسكندرية (عروس البحر)</option>
                <option value="السويس">السويس (أرض الغريب)</option>
                <option value="الصعيد">الصعيد (أهل الأصول)</option>
                <option value="سيناء">سيناء (أرض الفيروز)</option>
            </select>
            <button onclick="startApp()" class="w-full bg-orange-600 py-5 rounded-3xl font-black text-2xl shadow-xl orange-glow active:scale-95 transition-all">دخول الشارع 🚀</button>
        </div>
    </div>

    <!-- 2. واجهة التطبيق الرئيسية -->
    <div id="main-app" class="hidden">
        <!-- شريط جينيس -->
        <div class="bg-red-900 text-[10px] py-1 text-center font-bold tracking-widest border-b border-yellow-600">
            🌍 نظام شارع الحياة الموحد يربط 27 محافظة.. تحطيم رقم جينيس قيد التنفيذ..
        </div>

        <!-- الهيدر -->
        <header class="pt-10 pb-6 text-center bg-gradient-to-b from-orange-950/20 to-black">
            <div class="inline-block px-10 py-4 rounded-[3rem] border-2 border-yellow-600 bg-black gold-glow mb-4">
                <h1 class="text-5xl font-black text-orange-500 tracking-tighter drop-shadow-2xl">شارع الحياة</h1>
                <p class="text-[10px] text-yellow-500 font-bold tracking-[0.3rem] uppercase mt-1">Guinness World Record 🏆</p>
            </div>
            <div class="text-[12px] text-gray-500 font-bold">
                <span class="live-dot ml-1"></span> <span id="v-count">1,250,420</span> جدع متصل بالرادار الآن
            </div>
        </header>

        <!-- المحتوى -->
        <main class="px-4 pb-32">
            <div id="home-content">
                <h2 class="text-orange-500 font-bold text-sm mb-4 border-r-4 border-orange-500 pr-2">الخدمات السيادية ⚙️</h2>
                <div class="grid grid-cols-3 gap-3 mb-8 text-center">
                    <div onclick="openPage('سوق الصفقات')" class="bg-zinc-900/50 p-4 rounded-[2rem] border-t-2 border-yellow-500 active:scale-90">
                        <span class="text-3xl">🤝</span><p class="text-[10px] font-bold mt-2">الصفقات</p>
                    </div>
                    <div onclick="openPage('المايك المفتوح')" class="bg-zinc-900/50 p-4 rounded-[2rem] border-t-2 border-orange-500 active:scale-90">
                        <span class="text-3xl">🎤</span><p class="text-[10px] font-bold mt-2">المايك</p>
                    </div>
                    <div onclick="openPage('البورصة')" class="bg-zinc-900/50 p-4 rounded-[2rem] border-t-2 border-green-500 active:scale-90">
                        <span class="text-3xl">🏦</span><p class="text-[10px] font-bold mt-2">البورصة</p>
                    </div>
                </div>

                <h2 class="text-orange-500 font-bold text-sm mb-4 border-r-4 border-orange-500 pr-2">رادار المحافظات 📍</h2>
                <div class="flex gap-3 overflow-x-auto pb-6 scroll-hide">
                    <div onclick="openPage('القاهرة')" class="min-w-[110px] bg-zinc-900 p-6 rounded-[2.5rem] text-center border border-zinc-800">
                        <span class="text-4xl">🏰</span><p class="text-xs font-black mt-2">القاهرة</p>
                    </div>
                    <div onclick="openPage('الإسكندرية')" class="min-w-[110px] bg-zinc-900 p-6 rounded-[2.5rem] text-center border border-zinc-800">
                        <span class="text-4xl">🌊</span><p class="text-xs font-black mt-2">الإسكندرية</p>
                    </div>
                    <div onclick="openPage('السويس')" class="min-w-[110px] bg-zinc-900 p-6 rounded-[2.5rem] text-center border border-zinc-800">
                        <span class="text-4xl">🏮</span><p class="text-xs font-black mt-2">السويس</p>
                    </div>
                </div>

                <!-- تحدي جينيس -->
                <div class="mt-8 p-10 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-yellow-600/30 text-center shadow-2xl">
                    <h3 class="text-yellow-500 font-black text-2xl mb-2">تحدي جينيس العالمي 🏆</h3>
                    <p class="text-[10px] text-gray-500 mb-8 uppercase tracking-[0.2rem]">ادعم رقم مصر القياسي</p>
                    <button onclick="boost()" class="w-full bg-orange-600 py-5 rounded-2xl font-black text-white shadow-xl orange-glow active:scale-95 transition-all">دعم الرقم الآن 🔥</button>
                </div>
            </div>

            <!-- صفحة فرعية -->
            <div id="sub-page" class="hidden animate-in fade-in duration-500">
                <button onclick="goHome()" class="text-gray-500 border border-gray-800 px-6 py-2 rounded-2xl mb-8 text-xs font-bold">← العودة</button>
                <h2 id="sub-title" class="text-4xl font-black text-orange-500 text-center mb-12"></h2>
                <div class="space-y-4">
                    <div class="bg-zinc-900 p-8 rounded-[2.5rem] border-r-8 border-orange-600 shadow-xl">
                        <p class="text-orange-500 font-bold mb-2">📢 نداء المنطقة:</p>
                        <p class="text-gray-300">"الجدعنة عنواننا والكلمة عقدنا.. أهلاً بكل ولاد البلد."</p>
                    </div>
                </div>
                <button class="w-full bg-orange-600 py-6 rounded-[2rem] font-black text-xl mt-12 shadow-2xl">دخول المايك المفتوح 🎤</button>
            </div>
        </main>

        <!-- التنقل السفلي -->
        <nav class="fixed bottom-0 w-full bg-black/95 backdrop-blur-xl border-t border-zinc-900 flex justify-around py-5 z-50">
            <div onclick="goHome()" class="text-orange-500 flex flex-col items-center">
                <span class="text-2xl">🏠</span><span class="text-[8px] font-bold mt-1">الرئيسية</span>
            </div>
            <div onclick="alert('الرادار متصل بـ 27 محافظة 📍')" class="text-gray-600 flex flex-col items-center">
                <span class="text-2xl">📍</span><span class="text-[8px] font-bold mt-1">الرادار</span>
            </div>
            <div onclick="alert('البورصة تفتح 9 صباحاً 🏦')" class="text-gray-600 flex flex-col items-center">
                <span class="text-2xl">🏦</span><span class="text-[8px] font-bold mt-1">البورصة</span>
            </div>
            <div onclick="alert('حساب الجدع الشخصي مفعل 👤')" class="text-gray-600 flex flex-col items-center">
                <span class="text-2xl">👤</span><span class="text-[8px] font-bold mt-1">حسابي</span>
            </div>
        </nav>
    </div>

    <script>
        let visitors = 1250420;

        function startApp() {
            const name = document.getElementById('user-name').value;
            const region = document.getElementById('user-region').value;
            if(!name || !region) return alert("يا برنس.. سجل بياناتك عشان الرادار يعرفك!");

            localStorage.setItem('sharea_user', name);
            document.getElementById('auth-page').style.transform = 'translateY(-100%)';
            setTimeout(() => {
                document.getElementById('auth-page').classList.add('hidden');
                document.getElementById('main-app').classList.remove('hidden');
            }, 700);
        }

        window.onload = () => {
            if(localStorage.getItem('sharea_user')) {
                document.getElementById('auth-page').classList.add('hidden');
                document.getElementById('main-app').classList.remove('hidden');
            }
            setInterval(() => {
                visitors += Math.floor(Math.random() * 8);
                document.getElementById('v-count').innerText = visitors.toLocaleString();
            }, 4000);
        };

        function openPage(title) {
            document.getElementById('home-content').classList.add('hidden');
            document.getElementById('sub-page').classList.remove('hidden');
            document.getElementById('sub-title').innerText = title;
            window.scrollTo(0,0);
        }

        function goHome() {
            document.getElementById('home-content').classList.remove('hidden');
            document.getElementById('sub-page').classList.add('hidden');
        }

        function boost() {
            visitors += 1000;
            document.getElementById('v-count').innerText = visitors.toLocaleString();
            alert("تم دعم رقم مصر العالمي بـ 1000 نقطة إضافية! 🔥🏆");
        }
    </script>
</body>
</html>