
export function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-serif text-right">
            <h1 className="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-700 pb-4 text-gray-900 dark:text-white uppercase tracking-tight">ہم سے رابطہ کریں</h1>

            <div className="grid md:grid-cols-2 gap-12 text-gray-700 dark:text-gray-300">
                <div className="space-y-6">
                    <p className="text-lg leading-relaxed">
                        کیا آپ کے پاس کوئی کہانی ہے یا کوئی سوال؟ ہمارے ادارتی عملے سے رابطہ کریں۔ ہم اپنے قارئین کی رائے اور تعاون کی قدر کرتے ہیں۔
                    </p>

                    <div>
                        <h3 className="font-bold tracking-widest text-sm text-red-700 mb-2 font-sans">ادارتی عملہ</h3>
                        <p>ای میل: editor@asrehazir.com</p>
                        <p>فون: +91 40 1234 5678</p>
                    </div>

                    <div>
                        <h3 className="font-bold tracking-widest text-sm text-red-700 mb-2 font-sans">مرکزی دفتر</h3>
                        <p>عصر حاضر میڈیا گروپس</p>
                        <p>بنجارہ ہلز، روڈ نمبر 12</p>
                        <p>حیدرآباد، تلنگانہ - 500034</p>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-xl border border-gray-100 dark:border-zinc-800">
                    <h3 className="text-2xl font-black mb-6 tracking-tight text-gray-900 dark:text-white">پیغام بھیجیں</h3>
                    <form className="space-y-4 font-sans">
                        <div>
                            <label className="block text-xs font-bold mb-1">نام</label>
                            <input type="text" className="w-full p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-red-700/20" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1">ای میل</label>
                            <input type="email" className="w-full p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-red-700/20" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1">پیغام</label>
                            <textarea rows={4} className="w-full p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-red-700/20"></textarea>
                        </div>
                        <button className="w-full bg-red-700 text-white font-bold py-4 rounded-lg tracking-widest text-sm hover:bg-black transition-colors shadow-lg">پیغام روانہ کریں</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-serif text-center text-right">
            <h1 className="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-700 pb-4 inline-block mx-auto text-gray-900 dark:text-white uppercase tracking-tight">عصر حاضر کے بارے میں</h1>

            <div className="space-y-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                <p className="italic font-bold text-2xl text-red-700">"جدید صحافت کی آواز"</p>

                <p>
                    مستند اور غیر جانبدار خبریں فراہم کرنے کے وژن کے ساتھ قائم کیا گیا، عصر حاضر ایک معروف ڈیجیٹل نیوز پورٹل بن چکا ہے۔ ہم اعلیٰ ادارتی معیارات کو برقرار رکھتے ہوئے حقیقی وقت میں اپ ڈیٹ فراہم کرنے پر توجہ مرکوز کرتے ہیں۔
                </p>

                <p>
                    حیدرآباد کی گلیوں سے لے کر عالمی طاقت کے راہداریوں تک، ہمارے نامہ نگاروں کا نیٹ ورک آپ تک ایسی کہانیاں پہنچانے کے لیے انتھک محنت کرتا ہے جو اہمیت رکھتی ہیں۔ ہم ایسی صحافت پر یقین رکھتے ہیں جو معاشرے کو مطلع، متاثر اور بااختیار بنائے۔
                </p>

                <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-gray-50 dark:bg-zinc-900/50 rounded-xl">
                        <h4 className="font-black text-gray-900 dark:text-white uppercase mb-2">مستند</h4>
                        <p className="text-sm">قابل اعتماد ذرائع سے تصدیق شدہ خبریں۔</p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-zinc-900/50 rounded-xl">
                        <h4 className="font-black text-gray-900 dark:text-white uppercase mb-2">عالمی</h4>
                        <p className="text-sm">بھارتی نظر سے عالمی خبریں۔</p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-zinc-900/50 rounded-xl">
                        <h4 className="font-black text-gray-900 dark:text-white uppercase mb-2">بے خوف</h4>
                        <p className="text-sm">بغیر کسی سمجھوتے کے غیر جانبدارانہ رپورٹنگ۔</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AdvertisementsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-serif text-center text-right">
            <h1 className="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-700 pb-4 inline-block mx-auto text-gray-900 dark:text-white uppercase tracking-tight">ہمارے ساتھ اشتہار دیں</h1>

            <div className="space-y-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                    ہمارے اعلیٰ معیار کے اشتہاری حل کے ذریعے متنوع اور متحرک سامعین تک پہنچیں۔ عصر حاضر برانڈز کو قارئین سے جڑنے کے لیے متعدد پلیٹ فارمز پیش کرتا ہے۔
                </p>

                <div className="grid md:grid-cols-2 gap-6 pt-8 text-right">
                    <div className="p-8 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:border-red-700 transition-colors">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white underline decoration-red-700 decoration-2">ڈیجیٹل ڈسپلے</h3>
                        <ul className="space-y-2 text-sm font-sans">
                            <li>• ہوم پیج بینر (970x90)</li>
                            <li>• سائیڈ بار ان آرٹیکل (300x250)</li>
                            <li>• موبائل اسٹکی فوٹر</li>
                        </ul>
                    </div>
                    <div className="p-8 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:border-red-700 transition-colors">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white underline decoration-red-700 decoration-2">سپانسر شدہ مواد</h3>
                        <ul className="space-y-2 text-sm font-sans">
                            <li>• برانڈڈ مضامین</li>
                            <li>• پریس ریلیز کی تقسیم</li>
                            <li>• ایونٹ کوریج</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 bg-black dark:bg-red-700 text-white p-10 rounded-3xl">
                    <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">کیا آپ ترقی کے لیے تیار ہیں؟</h2>
                    <p className="mb-6 font-sans text-sm tracking-widest uppercase opacity-80">ہمارا میڈیا کٹ ڈاؤن لوڈ کریں یا ہماری سیلز ٹیم سے رابطہ کریں</p>
                    <a href="mailto:ads@asrehazir.com" className="inline-block bg-white text-black font-black px-10 py-4 rounded-full uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">سیلز ٹیم سے رابطہ کریں</a>
                </div>
            </div>
        </div>
    );
}
