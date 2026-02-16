

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
                        <p>ای میل: <a href="mailto:asrehazir.web@gmail.com" className="text-red-600 hover:underline">asrehazir.web@gmail.com</a></p>
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
                    <h3 className="text-2xl font-black mb-6 tracking-tight text-gray-900 dark:text-white">ہماری موجودگی</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-sans text-right">
                        آپ ہمیں متعدد پلیٹ فارمز پر تلاش کر سکتے ہیں۔ فوری خبروں کے لیے، براہ کرم ہماری ادارتی ای میل یا درج فون نمبر استعمال کریں۔ ہمارا ڈیسک آپ تک تازہ ترین تصدیق شدہ رپورٹس پہنچانے کے لیے 24/7 فعال ہے۔
                    </p>
                    <div className="space-y-4 font-sans">
                        <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-100 dark:border-zinc-700 text-right">
                            <h4 className="text-[12px] font-black uppercase tracking-widest text-red-600 mb-1 leading-none">واٹس ایپ براڈکاسٹ</h4>
                            <p className="text-lg font-bold">+91 40 1234 5678</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-100 dark:border-zinc-700 text-right">
                            <h4 className="text-[12px] font-black uppercase tracking-widest text-red-600 mb-1 leading-none">دفتر کے اوقات</h4>
                            <p className="text-lg font-bold">پیر - ہفتہ: صبح 10:00 بجے تا رات 08:00 بجے</p>
                        </div>
                    </div>
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
                <p className="italic font-bold text-2xl text-red-700 text-center">"جدید صحافت کی آواز"</p>

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
                    <a href="mailto:asrehazir.web@gmail.com" className="inline-block bg-white text-black font-black px-10 py-4 rounded-full uppercase tracking-widest text-[10px] hover:scale-105 transition-transform text-center">سیلز ٹیم سے رابطہ کریں</a>
                </div>
            </div>
        </div>
    );
}

export function GuestColumnsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-serif text-right">
            <h1 className="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-700 pb-4 text-gray-900 dark:text-white uppercase tracking-tight">مہمان کالم</h1>
            <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                    عصر حاضر مختلف شعبوں سے تعلق رکھنے والے مصنفین، اسکالرز اور ماہرین کے تعاون کا خیرمقدم کرتا ہے۔ ہمارے مہمان کالم عصری مسائل پر متنوع تناظر کے لیے ایک پلیٹ فارم فراہم کرتے ہیں۔
                </p>
                <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800">
                    <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-gray-900 dark:text-white">ارسال کرنے کی ہدایات</h3>
                    <ul className="space-y-4 list-disc pr-5 font-sans text-sm">
                        <li>مواد اصل اور غیر مطبوعہ ہونا چاہیے۔</li>
                        <li>مضامین 800 سے 1200 الفاظ کے درمیان ہونے چاہئیں۔</li>
                        <li>مصنف کا مختصر تعارف اور ایک اعلیٰ ریزولیوشن تصویر شامل کریں۔</li>
                        <li>تحاریر ورڈ یا گوگل ڈاک فارمیٹ میں بھیجی جانی چاہئیں۔</li>
                    </ul>
                </div>
                <p>
                    دلچسپی رکھنے والے حضرات اپنی تحاریر <a href="mailto:asrehazir.web@gmail.com" className="text-red-700 font-bold hover:underline">asrehazir.web@gmail.com</a> پر بھیج سکتے ہیں۔ ہماری ادارتی ٹیم آپ کی تحریر کا جائزہ لے گی اور آپ سے رابطہ کرے گی۔
                </p>
            </div>
        </div>
    );
}

export function PrivacyPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-serif text-right text-right">
            <h1 className="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-700 pb-4 text-gray-900 dark:text-white uppercase tracking-tight">رازداری کی پالیسی</h1>
            <div className="space-y-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-sans">
                <p>عصر حاضر میں، ہم آپ کی رازداری کو سنجیدگی سے لیتے ہیں۔ یہ پالیسی بتاتی ہے کہ ہم آپ کی ذاتی معلومات کو کس طرح جمع، استعمال اور محفوظ کرتے ہیں۔</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">1. معلومات کا مجموعہ</h3>
                <p>ہم وہ معلومات جمع کر سکتے ہیں جو آپ براہ راست فراہم کرتے ہیں، جیسے کہ جب آپ ہمارے نیوز لیٹر کو سبسکرائب کرتے ہیں یا ہم سے رابطہ کرتے ہیں۔ اس میں آپ کا نام، ای میل پتہ، اور آپ کے بھیجے گئے پیغامات شامل ہو سکتے ہیں۔</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">2. معلومات کا استعمال</h3>
                <p>آپ کی معلومات ہماری خدمات فراہم کرنے اور بہتر بنانے، آپ کے ساتھ بات چیت کرنے، اور ہماری ویب سائٹ پر آپ کے تجربے کو ذاتی بنانے کے لیے استعمال کی جاتی ہیں۔</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">3. ڈیٹا سیکیورٹی</h3>
                <p>ہم آپ کے ڈیٹا کو غیر مجاز رسائی یا افشاء سے بچانے کے لیے صنعت کے معیاری حفاظتی اقدامات نافذ کرتے ہیں۔</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">4. کوکیز</h3>
                <p>ہم سائٹ کی نیویگیشن کو بہتر بنانے، سائٹ کے استعمال کا تجزیہ کرنے اور اپنی مارکیٹنگ کی کوششوں میں مدد کے لیے کوکیز کا استعمال کرتے ہیں۔</p>
            </div>
        </div>
    );
}

export function TermsOfUsePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-serif text-right text-right">
            <h1 className="text-4xl md:text-5xl font-black mb-8 border-b-4 border-red-700 pb-4 text-gray-900 dark:text-white uppercase tracking-tight">استعمال کی شرائط</h1>
            <div className="space-y-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-sans">
                <p>عصر حاضر تک رسائی یا استعمال کر کے، آپ ان استعمال کی شرائط کی پابندی کرنے اور ان کے پابند ہونے سے اتفاق کرتے ہیں۔</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">1. مواد کی درستگی</h3>
                <p>اگرچہ ہم درستگی کے لیے کوشش کرتے ہیں، ہم اس بات کی ضمانت نہیں دیتے کہ سائٹ پر موجود تمام مواد مکمل، موجودہ، یا غلطیوں سے پاک ہے۔</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">2. دانشورانہ ملکیت</h3>
                <p>عصر حاضر پر موجود تمام مواد کاپی رائٹ اور دیگر دانشورانہ ملکیت کے قوانین کے ذریعے محفوظ ہے۔ آپ پیشگی تحریری اجازت کے بغیر کسی بھی مواد کو دوبارہ تیار یا تقسیم نہیں کر سکتے۔</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">3. صارف کا طرز عمل</h3>
                <p>صارفین کو سائٹ کو کسی بھی غیر قانونی مقصد کے لیے یا کسی بھی ایسے طریقے سے استعمال کرنے سے منع کیا گیا ہے جس سے اس کے آپریشن میں نقصان یا مداخلت ہو سکے۔</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">4. ذمہ داری کی حد</h3>
                <p>عصر حاضر ہماری خدمات کے استعمال، یا استعمال کرنے میں ناکامی کے نتیجے میں ہونے والے کسی بھی نقصان کا ذمہ دار نہیں ہوگا۔</p>
            </div>
        </div>
    );
}
