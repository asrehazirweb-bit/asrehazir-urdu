
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="w-full bg-secondary dark:bg-[#0a0807] text-white pt-16 pb-8 mt-16 px-8 border-t-4 border-accent transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <h2 className="text-2xl font-serif font-bold mb-6 text-accent">عصر حاضر</h2>
                    <p className="text-sm text-gray-400 leading-relaxed font-sans mb-6">
                        ایک نمایاں ادارتی آواز جو مقامی اور عالمی معاملات پر گہرائی سے تجزیہ، بریکنگ نیوز، اور تناظر پیش کرتی ہے۔ سچائی اور صحافتی سالمیت کے لیے وقف۔
                    </p>
                    <div className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} عصر حاضر۔ جملہ حقوق محفوظ ہیں۔
                    </div>
                </div>

                <div className="col-span-1 border-t border-gray-700 pt-6 md:pt-0 md:border-t-0">
                    <h3 className="font-sans font-bold uppercase tracking-wider text-accent mb-6 text-sm">سیکشنز</h3>
                    <ul className="flex flex-col gap-4">
                        {[
                            { name: 'عالمی خبریں', path: '/world', img: '/images/city_night.png' },
                            { name: 'قومی خبریں', path: '/national', img: '/images/assembly.png' },
                            { name: 'دکن نیوز', path: '/deccan', img: '/images/charminar_traffic.png' },
                            { name: 'مضامین اور مقالہ جات', path: '/articles-essays', img: '/images/hero.png' },
                            { name: 'کھیل اور تفریح', path: '/sports-entertainment', img: '/images/numaish.png' },
                            { name: 'جرائم اور حادثات', path: '/crime-accidents', img: '/images/rain_traffic.png' }
                        ].map((sec) => (
                            <li key={sec.name}>
                                <Link to={sec.path} className="flex items-center gap-3 group">
                                    <div className="w-10 h-10 bg-gray-800 flex-shrink-0 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-300">
                                        <img src={sec.img} alt={sec.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-sm text-gray-300 font-serif group-hover:text-white transition-colors">
                                        {sec.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-span-1 border-t border-gray-700 pt-6 md:pt-0 md:border-t-0">
                    <h3 className="font-sans font-bold uppercase tracking-wider text-accent mb-6 text-sm">ہمارے بارے میں اور سروسز</h3>
                    <ul className="space-y-3 text-sm text-gray-300 font-serif">
                        <li><Link to="/about-us" className="hover:text-white transition-colors">ہمارے بارے میں</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">رابطہ کریں</Link></li>
                        <li><Link to="/advertisements" className="hover:text-white transition-colors">اشتہارات</Link></li>
                        <li><a href="#" className="hover:text-white transition-colors">گیسٹ کالمز</a></li>
                    </ul>
                </div>

                <div className="col-span-1 border-t border-gray-700 pt-6 md:pt-0 md:border-t-0">
                    <h3 className="font-sans font-bold uppercase tracking-wider text-accent mb-6 text-sm">سبسکرائب</h3>
                    <p className="text-sm text-gray-400 mb-4">تازہ ترین خبریں روزانہ اپنے ان باکس میں حاصل کریں۔</p>
                    <div className="flex flex-col gap-2">
                        <input type="email" placeholder="آپ کا ای میل ایڈریس" className="bg-gray-800 border-none text-white text-sm p-3 focus:outline-none focus:ring-1 focus:ring-accent" />
                        <button className="bg-accent text-white font-bold text-sm uppercase p-3 hover:bg-white hover:text-accent transition-colors">
                            سبسکرائب
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-sans uppercase tracking-wide">
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white">پرائیویسی پالیسی</a>
                    <a href="#" className="hover:text-white">استعمال کی شرائط</a>
                    <a href="#" className="hover:text-white">ہم سے رابطہ کریں</a>
                </div>
                <div>
                    استحکام کے لیے ڈیزائن اور تیار کیا گیا۔
                </div>
            </div>
        </footer>
    );
}
