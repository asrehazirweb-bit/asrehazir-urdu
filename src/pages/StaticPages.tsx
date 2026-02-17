import { Mail, Phone, MapPin, Clock, Shield, Scale, Info, Megaphone, PenTool, Globe, Zap, CheckCircle2 } from 'lucide-react';

export function ContactPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-serif selection:bg-red-600 selection:text-white pb-20 text-right" dir="rtl">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4 overflow-hidden bg-zinc-900 border-b border-white/5">
                <div className="absolute top-0 right-0 w-full h-full opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-[120px] -ml-32 -mt-32"></div>
                </div>
                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-red-500 text-sm font-black mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Zap size={14} className="animate-pulse" /> ہم سے رابطہ کریں
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        عالمی <span className="text-red-600 italic">نیوز ڈیسک</span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        کیا آپ کے پاس کوئی کہانی ہے، رائے ہے یا شراکت داری کے بارے میں سوالات؟ ہمارا بین الاقوامی نیوز روم آپ کی بات سننے کے لیے 24/7 فعال ہے۔
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8 text-right">
                    {/* Contact Cards */}
                    <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center group hover:border-red-600 transition-all duration-500">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/10 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform">
                            <Mail size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">ای میل ڈیسک</h3>
                        <p className="text-zinc-500 text-sm mb-6 font-medium">سرکاری پوچھ گچھ اور پریس ریلیز کے لیے</p>
                        <a href="mailto:asrehazir.web@gmail.com" className="text-lg font-bold text-red-600 hover:black transition-colors">asrehazir.web@gmail.com</a>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center group hover:border-red-600 transition-all duration-500">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/10 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform">
                            <Phone size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">ہاٹ لائن</h3>
                        <p className="text-zinc-500 text-sm mb-6 font-medium">بریکنگ نیوز یا خبروں کی اطلاع کے لیے</p>
                        <span className="text-lg font-bold text-zinc-900 dark:text-white" dir="ltr">+91 40 1234 5678</span>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center group hover:border-red-600 transition-all duration-500">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/10 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform">
                            <MapPin size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">مقام</h3>
                        <p className="text-zinc-500 text-sm mb-6 font-medium">بنجارہ ہلز، روڈ نمبر 12</p>
                        <span className="text-lg font-bold text-zinc-900 dark:text-white">حیدرآباد، انڈیا</span>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-20 grid md:grid-cols-2 gap-12 items-center text-right">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter mb-4 leading-tight">
                                عالمی مارکیٹ میں <br /><span className="text-red-600 italic">ہماری موجودگی</span>
                            </h2>
                            <p className="text-zinc-500 text-lg leading-relaxed">
                                عصر حاضر صرف ایک پورٹل نہیں ہے؛ یہ جدید صحافت میں ایک تحریک ہے۔ ہم مقامی واقعات اور عالمی تناظر کے درمیان فرق کو ختم کرتے ہیں۔
                            </p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { icon: <Clock className="text-red-600" />, title: "24/7 آپریشنز", desc: "ہمارا نیوز روم کبھی نہیں سوتا۔" },
                                { icon: <Globe className="text-red-600" />, title: "عالمی رسائی", desc: "50 سے زائد ممالک میں پڑھا جاتا ہے۔" },
                                { icon: <Shield className="text-red-600" />, title: "تصدیق شدہ رپورٹس", desc: "ماہر ایڈیٹرز کے ذریعے حقائق کی جانچ پڑتال۔" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors items-start">
                                    <div className="mt-1">{item.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-zinc-900 dark:text-white text-md tracking-wide">{item.title}</h4>
                                        <p className="text-zinc-500 text-sm font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-zinc-900 p-8 rounded-[3rem] shadow-3xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/20 rounded-full blur-[80px] -ml-32 -mt-32 transition-colors group-hover:bg-red-600/30"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
                                    <Zap size={20} fill="currentColor" />
                                </div>
                                <h3 className="font-black text-2xl italic">فوری رابطہ</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                ہمارے قارئین کے حلقے میں شامل ہوں۔ بریکنگ نیوز الرٹس براہ راست اپنے ان باکس یا واٹس ایپ پر کسی اور سے پہلے حاصل کریں۔
                            </p>
                            <div className="flex flex-col gap-4">
                                <a
                                    href="mailto:asrehazir.web@gmail.com"
                                    className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-sm hover:bg-red-600 hover:text-white transition-all shadow-xl text-center flex flex-row-reverse items-center justify-center gap-2"
                                >
                                    <Mail size={18} /> ادارتی ڈیسک سے رابطہ کریں
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-serif pb-20 text-right" dir="rtl">
            {/* Hero Section */}
            <div className="pt-32 pb-24 text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-transparent opacity-50"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-red-600 text-sm font-black uppercase tracking-[0.4em] mb-4">ہمارا ورثہ</h2>
                    <h1 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white tracking-tighter leading-[1.1] mb-8">
                        صحافت کی <br /><span className="text-red-600 italic underline decoration-zinc-900/10 dark:decoration-white/10 decoration-8 underline-offset-[12px]">آواز</span>
                    </h1>
                    <p className="text-zinc-500 text-lg md:text-3xl max-w-2xl mx-auto italic py-6 border-y border-zinc-100 dark:border-zinc-800">
                        "سچائی کے ساتھ معاشرے کو بااختیار بنانا، ایک وقت میں ایک کہانی۔"
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center mt-10 text-right">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="inline-block p-3 bg-zinc-900 dark:bg-red-700 rounded-2xl text-white shadow-xl">
                            <Info size={32} />
                        </div>
                        <h3 className="text-4xl font-black text-zinc-900 dark:text-white uppercase leading-tight">
                            ہمارا سفر <span className="text-red-600">&</span> وژن
                        </h3>
                    </div>
                    <div className="text-zinc-500 text-xl leading-relaxed space-y-6 font-medium">
                        <p>
                            دیانتداری، شفافیت اور بے خوفی کے ستونوں پر مبنی، <span className="text-zinc-900 dark:text-white font-black underline decoration-red-600 decoration-2">عصر حاضر</span> ایک مقامی نیوز ڈیسک سے ایک عالمی ڈیجیٹل پاور ہاؤس بن کر ابھرا ہے۔
                        </p>
                        <p>
                            غلط معلومات کے اس دور میں، ہم تصدیق شدہ سچائی کے مینار کے طور پر کام کرتے ہیں۔ ہمارا مشن ایسی صحافت فراہم کرنا ہے جو صرف واقعات کی اطلاع نہ دے، بلکہ ان کی <span className="italic text-red-600">وجوہات</span> اور <span className="italic text-red-600">اثرات</span> کی وضاحت کرے۔
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { num: "5M+", label: "ماہانہ قارئین" },
                        { num: "24/7", label: "فعال رپورٹنگ" },
                        { num: "50+", label: "ٹارگٹ ممالک" },
                        { num: "100%", label: "حقائق کی جانچ" },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 group hover:bg-black hover:text-white transition-all duration-500 flex flex-col justify-end min-h-[160px] text-right">
                            <h4 className="text-4xl font-black group-hover:scale-110 transition-transform origin-right" dir="ltr">{stat.num}</h4>
                            <p className="text-sm font-black text-red-600 group-hover:text-white transition-colors">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Values Section */}
            <div className="mt-32 max-w-6xl mx-auto px-4">
                <div className="bg-zinc-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden text-right">
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-zinc-900"></div>
                    <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        {[
                            { title: "اصلیت", desc: "ہر ذریعہ ہمارے ایلیٹ ایڈیٹوریل پینل کے ذریعہ کراس تصدیق شدہ ہے۔" },
                            { title: "شمولیت", desc: "معاشرے کے ہر کونے سے متنوع آوازوں کی نمائندگی۔" },
                            { title: "جدت طرازی", desc: "خبروں کو تیزی سے اور صاف ستھرا پہنچانے کے لیے جدید ترین ٹیکنالوجی کا استعمال۔" }
                        ].map((v, i) => (
                            <div key={i} className="space-y-4 border-r border-white/10 pr-8">
                                <span className="text-red-500 font-black italic text-4xl opacity-50">0{i + 1}</span>
                                <h4 className="text-2xl font-black tracking-tight">{v.title}</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AdvertisementsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-serif pb-20 text-right" dir="rtl">
            {/* Hero Section */}
            <div className="pt-32 pb-24 bg-red-600 rounded-b-[4rem] px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <Megaphone size={48} className="text-white mx-auto mb-6 animate-bounce" />
                    <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                        اپنی <span className="italic underline decoration-white/20 decoration-8 underline-offset-[14px]">نشو و نما</span> بڑھائیں
                    </h1>
                    <p className="text-red-100 text-lg md:text-2xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
                        عالمی سطح پر لاکھوں بااثر قارئین تک پہنچنے کے لیے سب سے قابل اعتماد ڈیجیٹل پلیٹ فارم کا فائدہ اٹھائیں۔
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-zinc-900 p-12 rounded-[3.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 hover:border-red-600 transition-colors group">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/10 rounded-[2rem] flex items-center justify-center text-red-600 mb-8 border border-red-100 dark:border-red-900/20 group-hover:rotate-12 transition-transform">
                            <Globe size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight mb-4">ڈیجیٹل رئیل اسٹیٹ</h3>
                        <p className="text-zinc-500 mb-8 font-medium">ہماری ویب اور موبائل ایپس میں اعلیٰ نمائش والے بینر سلاٹس اور نیٹو انٹیگریشن۔</p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "پریمیم ہیڈر بینرز (970x90)",
                                "سائیڈ بار ہائی CTR سلاٹس (300x250)",
                                "موبائل ایپلی کیشن اسٹکی اشتہارات",
                                "ان آرٹیکل نیٹو پلیسمنٹس"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-md font-bold text-zinc-700 dark:text-zinc-300 items-baseline">
                                    <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-1" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-zinc-900 p-12 rounded-[3.5rem] shadow-2xl border border-white/5 group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] -ml-32 -mt-32"></div>
                        <div className="w-16 h-16 bg-white/5 rounded-[2rem] flex items-center justify-center text-red-600 mb-8 border border-white/10 group-hover:rotate-12 transition-transform">
                            <PenTool size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4 text-white">مواد کا اشتراک</h3>
                        <p className="text-zinc-500 mb-8 font-medium">پیشہ ورانہ طور پر تیار کردہ سپانسر شدہ کہانیوں کے ذریعے ہمارے قارئین کے ساتھ براہ راست مشغول ہوں۔</p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "نمایاں برانڈ کہانیاں",
                                "خصوصی پریس کوریج",
                                "مصنوعات کے جائزے اور لانچ اسپاٹ لائٹس",
                                "نیوز لیٹر اسپانسر سیکشن"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-md font-bold text-zinc-400 items-baseline">
                                    <CheckCircle2 size={16} className="text-red-600 shrink-0 mt-1" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-20 p-12 md:p-20 bg-zinc-50 dark:bg-zinc-900 rounded-[4rem] text-center border-2 border-dashed border-gray-200 dark:border-zinc-800">
                    <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6">ہمارے ساتھ <span className="text-red-600 italic">شراکت داری کریں</span></h2>
                    <p className="text-zinc-500 max-w-xl mx-auto mb-10 text-xl font-medium">دنیا کو اپنا برانڈ دکھانے کے لیے تیار ہیں؟ اپنی مرضی کے مطابق میڈیا کٹ اور قیمتوں کے پلان کے لیے ہمارے سیلز ڈیسک سے رابطہ کریں۔</p>
                    <a href="mailto:asrehazir.web@gmail.com" className="inline-flex items-center gap-3 bg-red-600 text-white font-black px-12 py-5 rounded-2xl uppercase tracking-widest text-sm hover:bg-black transition-all shadow-xl shadow-red-600/20 active:scale-95">
                        <Mail size={18} /> میڈیا کٹ اور قیمتیں حاصل کریں
                    </a>
                </div>
            </div>
        </div>
    );
}

export function GuestColumnsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-serif pb-20 text-right" dir="rtl">
            <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-4">
                            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-sm flex items-center gap-2">
                                <div className="w-10 h-0.5 bg-red-600"></div> اپنی تحریر ارسال کریں
                            </span>
                            <h1 className="text-6xl font-black text-zinc-900 dark:text-white uppercase leading-none tracking-tighter">
                                عالمی <span className="text-red-600 italic underline decoration-zinc-100 dark:decoration-zinc-800 decoration-8 underline-offset-8">آرکائیو</span> کے لیے لکھیں
                            </h1>
                        </div>
                        <div className="prose prose-zinc dark:prose-invert lg:prose-xl italic text-zinc-500 leading-relaxed font-bold">
                            "سوچنا آسان ہے، عمل کرنا مشکل ہے، اور اپنے خیالات کو عمل میں لانا دنیا کا سب سے مشکل کام ہے۔"
                        </div>
                        <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                            عصر حاضر نئے تناظر، جرات مندانہ تحقیقاتی تحریروں اور گہری تجزیاتی مضامین کی تلاش میں ہے۔ اگر آپ کے پاس کوئی ایسی کہانی ہے جسے بیان کرنے کی ضرورت ہے، تو ہمارا ڈیسک گذارشات کے لیے کھلا ہے۔
                        </p>

                        <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 space-y-6">
                            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">ارسال کرنے کے ضوابط</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { icon: <CheckCircle2 size={24} className="text-red-600" />, t: "الفاظ کی تعداد", d: "800 - 1500 الفاظ" },
                                    { icon: <CheckCircle2 size={24} className="text-red-600" />, t: "اصلیت", d: "100% منفرد مواد" },
                                    { icon: <CheckCircle2 size={24} className="text-red-600" />, t: "میڈیا", d: "مصنف کی تصویر" },
                                    { icon: <CheckCircle2 size={24} className="text-red-600" />, t: "فارمیٹ", d: "ورڈ یا گوگل ڈاک" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 items-center">
                                        {item.icon}
                                        <div>
                                            <p className="text-[12px] font-black uppercase text-zinc-400">{item.t}</p>
                                            <p className="text-md font-bold text-zinc-900 dark:text-white">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5 w-full sticky top-32">
                        <div className="bg-zinc-900 rounded-[3rem] p-10 text-white shadow-3xl relative overflow-hidden">
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
                            <h3 className="text-3xl font-black uppercase italic mb-8 border-b border-white/5 pb-4">اپنی تحریر بھیجیں</h3>
                            <div className="space-y-6">
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    ہماری ادارتی ٹیم ہر گذارش کا بغور جائزہ لیتی ہے۔ براہ کرم ڈیسک کی طرف سے جواب کے لیے 3-5 کاروباری دنوں کا وقت دیں۔
                                </p>
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                                    <p className="text-[12px] font-black uppercase tracking-[0.2em] text-red-500 mb-2">ایڈیٹر کا ان باکس</p>
                                    <a href="mailto:asrehazir.web@gmail.com" className="text-xl font-bold hover:text-red-500 transition-colors">asrehazir.web@gmail.com</a>
                                </div>
                                <div className="pt-4 text-right">
                                    <h4 className="text-[12px] font-black uppercase tracking-widest text-zinc-500 mb-4">مقبول موضوعات</h4>
                                    <div className="flex flex-wrap gap-2 justify-end">
                                        {["جغرافیائی سیاست", "معیشت", "ٹیک اخلاقیات", "سماجی اصلاحات", "مشرق وسطیٰ", "جدت طرازی"].map(t => (
                                            <span key={t} className="px-3 py-1.5 bg-white/5 rounded-lg text-sm font-bold border border-white/5">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-serif pb-20 text-right" dir="rtl">
            <div className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-zinc-900 dark:bg-red-700 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <Shield size={24} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">رازداری کا <span className="text-red-600">چارٹر</span></h1>
                </div>

                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                    <section className="space-y-4">
                        <h3 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                            <div className="w-6 h-1 bg-red-600"></div> صارف کے ڈیٹا کی سالمیت
                        </h3>
                        <p>عصر حاضر میں، آپ کی عددی اور ذاتی شناخت کو انکرپشن کے اعلیٰ ترین درجے کے ساتھ رکھا جاتا ہے۔ ہم نیوز لیٹر سبسکرپشنز کے لیے ای میل ایڈریس اور آپ کے فنکشنل تجربے کو بہتر بنانے کے لیے بنیادی براؤزنگ ٹیلی میٹری جیسی ضروری معلومات جمع کرتے ہیں۔</p>
                    </section>

                    <section className="space-y-4 p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 text-right">
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">معلومات کا اطلاق</h3>
                        <ul className="space-y-3 list-none p-0">
                            {[
                                "ذاتی نوعیت کی خبروں کی فیڈ کو ہم آہنگ کرنا۔",
                                "پورٹل کی بہتری کے لیے تجزیاتی تحقیق۔",
                                "سیکیورٹی الرٹس کے لیے اہم مواصلت۔",
                                "تصدیق شدہ اشتہارات کی ذاتی نوعیت۔"
                            ].map((li, i) => (
                                <li key={i} className="flex gap-3 items-center text-md font-bold">
                                    <CheckCircle2 size={18} className="text-red-600 shrink-0" /> {li}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                            <div className="w-6 h-1 bg-red-600"></div> سائبر سیکیورٹی اور تحفظ
                        </h3>
                        <p>ہمارا سرور آرکیٹیکچر ملٹی لیئر فائر والز اور انڈسٹری کے معروف SSL سرٹیفکیٹ استعمال کرتا ہے۔ ہم کبھی بھی انفرادی صارف پروفائلز کو تھرڈ پارٹی ڈیٹا بروکرز کو فروخت نہیں کرتے ہیں۔ آپ کی رازداری کوئی فیچر نہیں ہے؛ یہ ایک بنیادی حق ہے۔</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export function TermsOfUsePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-serif pb-20 text-right" dir="rtl">
            <div className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-zinc-900 dark:bg-red-700 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <Scale size={24} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">استعمال کے <span className="text-red-600">پروٹوکولز</span></h1>
                </div>

                <div className="space-y-12 text-right">
                    {[
                        { t: "01. مواد کا دائرہ اختیار", d: "عصر حاضر پر دکھائے جانے والے تمام نشریات، میڈیا ریکارڈنگز اور کہانیاں بین الاقوامی کاپی رائٹ قوانین کے تحت محفوظ ہیں۔ غیر مجاز اسکریپنگ یا عکس بندی کی سختی سے نگرانی کی جاتی ہے۔" },
                        { t: "02. بیانیے کی درستگی", d: "اگرچہ ہمارا نیوز روم ریئل ٹائم میں کام کرتا ہے، لیکن ہم مکمل درستگی کا ارادہ رکھتے ہیں۔ تاہم، خبر متحرک ہے؛ ہم تصدیق کے عمل مکمل ہونے پر بیانیے کو اپ ڈیٹ کرنے کا حق محفوظ رکھتے ہیں۔" },
                        { t: "03. اخلاقی طرز عمل", d: "ہمارے پلیٹ فارم پر شمولیت (تبصروں یا فورمز کے ذریعے) نفرت انگیز تقریر، ہتک عزت، یا بدنیتی پر مبنی غلط معلومات کے خلاف ہماری زیرو ٹالرنس پالیسی کی پابندی کرنی چاہیے۔" },
                        { t: "04. دعووں کی حد", d: "عصر حاضر ایک معلوماتی پورٹل کے طور پر کام کرتا ہے۔ ہم اپنے خبروں کے تجزیے کی بنیاد پر کیے گئے آزادانہ اقدامات یا انفرادی تشریحات کے ذمہ دار نہیں ہیں۔" }
                    ].map((item, idx) => (
                        <div key={idx} className="group p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 hover:border-red-600 transition-all duration-500">
                            <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase mb-4 group-hover:text-red-600 transition-colors tracking-tight">{item.t}</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-lg">{item.d}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-8 bg-zinc-900 rounded-3xl text-center text-white/50 text-sm font-black uppercase tracking-[0.2em]" dir="ltr">
                    Effective Cycle: February 2026 — Present
                </div>
            </div>
        </div>
    );
}
