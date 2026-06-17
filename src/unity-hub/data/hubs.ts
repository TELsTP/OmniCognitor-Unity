import { Language } from '../contexts/LanguageContext';

// Hieroglyphic representations for each pillar (simplified SVG paths or Unicode approximations)
// These will be used in the cartouches
export interface HubPillar {
  id: string;
  key: string;
  hieroglyphs: string; // Unicode hieroglyphs for cartouche
  icon: string; // Emoji or icon identifier
  
  // Translations for all languages
  translations: {
    en: {
      name: string;
      shortName: string;
      description: string;
      demoPreview: string[];
    };
    ar: {
      name: string;
      shortName: string;
      description: string;
      demoPreview: string[];
    };
    fr: {
      name: string;
      shortName: string;
      description: string;
      demoPreview: string[];
    };
    es: {
      name: string;
      shortName: string;
      description: string;
      demoPreview: string[];
    };
    zh: {
      name: string;
      shortName: string;
      description: string;
      demoPreview: string[];
    };
    ur: {
      name: string;
      shortName: string;
      description: string;
      demoPreview: string[];
    };
  };
  
  // Link to live Vercel deployment (or internal route)
  liveUrl: string;
  
  // Color theme for the pillar
  color: {
    primary: string;
    secondary: string;
    glow: string;
  };
  
  // Position in the semicircle (0-5, with 5 being Global Network)
  position: number;
  
  // Whether this pillar is initially locked
  initiallyLocked: boolean;
}

// Hieroglyphic cartouches (using Unicode Egyptian Hieroglyphs block)
// Note: Full hieroglyphic rendering would use SVG, but these are placeholders
const HIEROGLYPHS = {
  education: '𓏲𓏳𓏴𓏱𓈖', // Simplified representation
  research: '𓊪𓏏𓈖𓏠𓈗',
  healthcare: '𓋹𓏥𓎟𓏏',
  media: '𓃀𓅱𓏸𓈖',
  wisdom: '𓎟𓏏𓊪𓏭',
  global: '𓇋𓈗𓏏𓊖',
};

const hubs: HubPillar[] = [
  {
    id: 'education',
    key: 'education',
    hieroglyphs: HIEROGLYPHS.education,
    icon: '🎓',
    position: 0,
    initiallyLocked: true,
    liveUrl: 'https://education-telstp.vercel.app',
    color: {
      primary: '#10B981', // Emerald
      secondary: '#059669',
      glow: '#A7F3D0',
    },
    translations: {
      en: {
        name: 'Education Hub',
        shortName: 'Education',
        description: 'Empowering the next generation of life science leaders through comprehensive academic programs and AI-augmented learning.',
        demoPreview: [
          'University Programs',
          'Curriculum Development',
          'Student Enrollment',
          'Virtual Campus',
          'Interactive Labs',
          'Certification Courses',
        ],
      },
      ar: {
        name: 'مركز التعليم',
        shortName: 'التعليم',
        description: 'تمكين الجيل القادم من قادة علوم الحياة من خلال برامج أكاديمية شاملة وتعلم معزز بالذكاء الاصطناعي.',
        demoPreview: [
          'برامج جامعية',
          'تطوير المناهج',
          'التسجيل الطلابي',
          'الحرم الافتراضي',
          'المختبرات التفاعلية',
          'دورات الاعتماد',
        ],
      },
      fr: {
        name: 'Centre Éducation',
        shortName: 'Éducation',
        description: 'Autonomiser la prochaine génération de leaders en sciences de la vie grâce à des programmes académiques complets.',
        demoPreview: [
          'Programmes Universitaires',
          'Développement Curriculaire',
          'Inscription Étudiante',
          'Campus Virtuel',
          'Laboratoires Interactifs',
          'Cours de Certification',
        ],
      },
      es: {
        name: 'Centro de Educación',
        shortName: 'Educación',
        description: 'Capacitar a la próxima generación de líderes en ciencias de la vida a través de programas académicos integrales.',
        demoPreview: [
          'Programas Universitarios',
          'Desarrollo Curricular',
          'Matrícula Estudiantil',
          'Campus Virtual',
          'Laboratorios Interactivos',
          'Cursos de Certificación',
        ],
      },
      zh: {
        name: '教育中心',
        shortName: '教育',
        description: '通过全面的学术项目和人工智能增强的学习，赋能下一代生命科学领导者。',
        demoPreview: [
          '大学项目',
          '课程开发',
          '学生入学',
          '虚拟校园',
          '互动实验室',
          '认证课程',
        ],
      },
      ur: {
        name: 'تعلیمی مرکز',
        shortName: 'تعلیم',
        description: 'AI سے مدد یافتہ سیکھنے اور جامع تعلیمی پروگراموں کے ذریعے زندگی سائنس کے اگلے لیڈروں کو بااختیار بنانا۔',
        demoPreview: [
          'یونیورسٹی پروگرام',
          'نصابی ترقی',
          'طلاب کی داخلہ',
          'ورچوئل کیمپس',
          'انٹریکٹیو لیبز',
          'سرٹیفیکیشن کورسز',
        ],
      },
    },
  },
  
  {
    id: 'research',
    key: 'research',
    hieroglyphs: HIEROGLYPHS.research,
    icon: '🔬',
    position: 1,
    initiallyLocked: true,
    liveUrl: 'https://research-telstp.vercel.app',
    color: {
      primary: '#3B82F6', // Blue
      secondary: '#2563EB',
      glow: '#93C5FD',
    },
    translations: {
      en: {
        name: 'Research Hub',
        shortName: 'Research',
        description: 'The scientific engine of TELSTP, aggregating and analyzing complex medical and life science data to drive innovation.',
        demoPreview: [
          'M2-3M System',
          'Blockchain Integration',
          'Biotechnology',
          'Biobank',
          'Biostatistics',
          'Next-Gen Sequencing',
          'Neural Networks',
        ],
      },
      ar: {
        name: 'مركز الأبحاث',
        shortName: 'الأبحاث',
        description: 'المحرك العلمي لـ TELSTP، يجمع ويحلل البيانات الطبية وعلوم الحياة المعقدة لدفع الابتكار.',
        demoPreview: [
          'نظام M2-3M',
          'تكامل البلوكشين',
          'التكنولوجيا الحيوية',
          'بنك الأحياء',
          'الإحصاء الحيوي',
          'تسلسل الجيل التالي',
          'الشبكات العصبية',
        ],
      },
      fr: {
        name: 'Centre de Recherche',
        shortName: 'Recherche',
        description: 'Le moteur scientifique de TELSTP, agrégeant et analysant des données médicales et de sciences de la vie complexes.',
        demoPreview: [
          'Système M2-3M',
          'Intégration Blockchain',
          'Biotechnologie',
          'Biobanque',
          'Biostatistiques',
          'Séquençage Nouvelle Génération',
          'Réseaux de Neurones',
        ],
      },
      es: {
        name: 'Centro de Investigación',
        shortName: 'Investigación',
        description: 'El motor científico de TELSTP, agregando y analizando datos médicos y de ciencias de la vida complejos.',
        demoPreview: [
          'Sistema M2-3M',
          'Integración Blockchain',
          'Biotecnología',
          'Biobanco',
          'Bioestadística',
          'Secuenciación de Nueva Generación',
          'Redes Neuronales',
        ],
      },
      zh: {
        name: '研究中心',
        shortName: '研究',
        description: 'TELSTP的科学引擎，聚合和分析复杂的医学和生命科学数据以推动创新。',
        demoPreview: [
          'M2-3M 系统',
          '区块链集成',
          '生物技术',
          '生物库',
          '生物统计学',
          '下一代测序',
          '神经网络',
        ],
      },
      ur: {
        name: 'ریسرچ سینٹر',
        shortName: 'ریسرچ',
        description: 'TELSTP کا سائنسی انجن، پیچیدہ طبی اور زندگی سائنس ڈیٹا کو جمع اور تجزیہ کر کے ایجاد کو آگے بڑھاتا ہے۔',
        demoPreview: [
          'M2-3M سسٹم',
          'بلاک چین انٹیگریشن',
          'بایو ٹیکنالوجی',
          'بایو بینک',
          'بایو اسٹاٹسٹکس',
          'نیکسٹ جنریشن سیکوینسنگ',
          'نیورل نیٹ ورکس',
        ],
      },
    },
  },
  
  {
    id: 'healthcare',
    key: 'healthcare',
    hieroglyphs: HIEROGLYPHS.healthcare,
    icon: '🏥',
    position: 2,
    initiallyLocked: true,
    liveUrl: 'https://healthcare-telstp.vercel.app',
    color: {
      primary: '#EF4444', // Red
      secondary: '#DC2626',
      glow: '#FCA5A5',
    },
    translations: {
      en: {
        name: 'Healthcare Hub',
        shortName: 'Healthcare',
        description: 'Connecting urban medical centers with rural communities through advanced telemedicine and AI-driven diagnostic support.',
        demoPreview: [
          'Hospitals Network',
          'Telemedicine Platform',
          'Medical Registry',
          'Wearable Devices',
          'Electronic Health Records',
          'AI Diagnostic Assistant',
          'Remote Consultations',
        ],
      },
      ar: {
        name: 'مركز الرعاية الصحية',
        shortName: 'الرعاية الصحية',
        description: 'ربط المراكز الطبية الحضرية بالمجتمعات الريفية من خلال الطب عن بعد المتطور ودعم التشخيص المدعوم بالذكاء الاصطناعي.',
        demoPreview: [
          'شبكة المستشفيات',
          'منصة الطب عن بعد',
          'سجل طبي',
          'الأجهزة القابلة للارتداء',
          'السجلات الصحية الإلكترونية',
          'مساعد تشخيصي مدعوم بالذكاء الاصطناعي',
          'استشارات عن بعد',
        ],
      },
      fr: {
        name: 'Centre de Santé',
        shortName: 'Santé',
        description: 'Connecter les centres médicaux urbains aux communautés rurales grâce à la télémédecine avancée.',
        demoPreview: [
          'Réseau Hospitalier',
          'Plateforme de Télémédecine',
          'Registre Médical',
          'Appareils Portables',
          'Dossiers Médicaux Électroniques',
          'Assistant Diagnostique IA',
          'Consultations à Distance',
        ],
      },
      es: {
        name: 'Centro de Salud',
        shortName: 'Salud',
        description: 'Conectar centros médicos urbanos con comunidades rurales a través de telemedicina avanzada.',
        demoPreview: [
          'Red de Hospitales',
          'Plataforma de Telemedicina',
          'Registro Médico',
          'Dispositivos Portátiles',
          'Historiales Clínicos Electrónicos',
          'Asistente de Diagnóstico con IA',
          'Consultas Remotas',
        ],
      },
      zh: {
        name: '医疗中心',
        shortName: '医疗',
        description: '通过先进的远程医疗和AI驱动的诊断支持，连接城市医疗中心与农村社区。',
        demoPreview: [
          '医院网络',
          '远程医疗平台',
          '医疗登记',
          '可穿戴设备',
          '电子健康记录',
          'AI诊断助手',
          '远程会诊',
        ],
      },
      ur: {
        name: 'صحت کا مرکز',
        shortName: 'صحت',
        description: 'AI سے چلنے والے تشخیصی سپورٹ اور ایڈوانس ٹیلی میڈیسین کے ذریعے شہری میڈیکل سینٹرز کو دیہاتی کمیونٹیز سے جوڑنا۔',
        demoPreview: [
          'ہسپتالوں کا نیٹ ورک',
          'ٹیلی میڈیسین پلیٹ فارم',
          'طبی رجسٹری',
          'پہننے کے قابل آلات',
          'الیکٹرانک ہیلتھ ریکارڈز',
          'AI تشخیصی مددگار',
          'دور درست مشاورت',
        ],
      },
    },
  },
  
  {
    id: 'media',
    key: 'media',
    hieroglyphs: HIEROGLYPHS.media,
    icon: '🎙️',
    position: 3,
    initiallyLocked: true,
    liveUrl: 'https://media-telstp.vercel.app',
    color: {
      primary: '#8B5CF6', // Purple
      secondary: '#7C3AED',
      glow: '#C4B5FD',
    },
    translations: {
      en: {
        name: 'Media Hub',
        shortName: 'Media',
        description: 'Sharing the stories of discovery and impact through live broadcasts, documentaries, and educational content.',
        demoPreview: [
          'Medical Radio',
          'Science Radio',
          'Podcasts',
          'Broadcasts',
          'Interviews',
          'Programs',
          'Hosts',
          'Documentary Series',
        ],
      },
      ar: {
        name: 'مركز الإعلام',
        shortName: 'الإعلام العلمي',
        description: 'مشاركة قصص الاكتشاف والتأثير من خلال البث المباشر والوثائقيات والمحتوى التعليمي.',
        demoPreview: [
          'راديو طبي',
          'راديو علمي',
          'بودكاست',
          'بث مباشر',
          'مقابلات',
          'برامج',
          'مقدمين',
          'سلسلة وثائقية',
        ],
      },
      fr: {
        name: 'Centre Médias',
        shortName: 'Médias',
        description: 'Partager les histoires de découverte et d\'impact grâce à des diffusions en direct.',
        demoPreview: [
          'Radio Médicale',
          'Radio Scientifique',
          'Podcasts',
          'Diffusions',
          'Interviews',
          'Programmes',
          'Animateurs',
          'Séries Documentaires',
        ],
      },
      es: {
        name: 'Centro de Medios',
        shortName: 'Medios',
        description: 'Compartir las historias de descubrimiento e impacto a través de transmisiones en vivo.',
        demoPreview: [
          'Radio Médica',
          'Radio Científica',
          'Podcasts',
          'Transmisiones',
          'Entrevistas',
          'Programas',
          'Presentadores',
          'Series Documentales',
        ],
      },
      zh: {
        name: '媒体中心',
        shortName: '媒体',
        description: '通过直播、纪录片和教育内容分享发现和影响的故事。',
        demoPreview: [
          '医学广播',
          '科学广播',
          '播客',
          '直播',
          '采访',
          '节目',
          '主持人',
          '纪录片系列',
        ],
      },
      ur: {
        name: 'میڈیا سینٹر',
        shortName: 'میڈیا',
        description: 'لائیو براڈکاسٹس، دستاویزی سیریز، اور تعلیمی مواد کے ذریعے دریافت اور اثرات کی کہانیاں شیئر کرنا۔',
        demoPreview: [
          'طبی ریڈیو',
          'سائنس ریڈیو',
          'پوڈکاسٹ',
          'براڈکاسٹ',
          'انٹرویز',
          'پروگرام',
          'ہوسٹ',
          'دستاویزی سیریز',
        ],
      },
    },
  },
  
  {
    id: 'wisdom',
    key: 'wisdom',
    hieroglyphs: HIEROGLYPHS.wisdom,
    icon: '🧠',
    position: 4,
    initiallyLocked: true,
    liveUrl: 'https://wisdom-telstp.vercel.app',
    color: {
      primary: '#F59E0B', // Amber
      secondary: '#D97706',
      glow: '#FCD34D',
    },
    translations: {
      en: {
        name: 'Wisdom Hub',
        shortName: 'Wisdom',
        description: 'Access ancient and modern knowledge through AI companions and the OmniCognitor hub.',
        demoPreview: [
          'Ibn Sina Companion',
          'Imhotep Companion',
          'Personal AI Companions',
          'OmniCognitor Hub',
          'Ancient Wisdom',
          'Modern Insights',
          'Knowledge Integration',
        ],
      },
      ar: {
        name: 'مركز الحكمة',
        shortName: 'الحكمة',
        description: 'الوصول إلى المعرفة القديمة والحديثة من خلال رفقاء الذكاء الاصطناعي ومركز OmniCognitor.',
        demoPreview: [
          'رفيق ابن سينا',
          'رفيق إيمحتب',
          'رفاق الذكاء الاصطناعي الشخصي',
          'مركز OmniCognitor',
          'الحكمة القديمة',
          'الرؤى الحديثة',
          'تكامل المعرفة',
        ],
      },
      fr: {
        name: 'Centre de Sagesse',
        shortName: 'Sagesse',
        description: 'Accéder aux connaissances anciennes et modernes grâce à des compagnons IA.',
        demoPreview: [
          'Compagnon Ibn Sina',
          'Compagnon Imhotep',
          'Compagnons IA Personnels',
          'Hub OmniCognitor',
          'Sagesse Ancienne',
          'Perspectives Modernes',
          'Intégration des Connaissances',
        ],
      },
      es: {
        name: 'Centro de Sabiduría',
        shortName: 'Sabiduría',
        description: 'Acceder al conocimiento antiguo y moderno a través de compañeros de IA.',
        demoPreview: [
          'Compañero Ibn Sina',
          'Compañero Imhotep',
          'Compañeros de IA Personales',
          'Hub OmniCognitor',
          'Sabiduría Antigua',
          'Perspectivas Modernas',
          'Integración del Conocimiento',
        ],
      },
      zh: {
        name: '智慧中心',
        shortName: '智慧',
        description: '通过AI伙伴和OmniCognitor中心访问古代和现代知识。',
        demoPreview: [
          '伊本·西纳伙伴',
          '伊姆霍特普伙伴',
          '个人AI伙伴',
          'OmniCognitor中心',
          '古代智慧',
          '现代见解',
          '知识整合',
        ],
      },
      ur: {
        name: 'حکمت کا مرکز',
        shortName: 'حکمت',
        description: 'AI کمپانیوں اور OmniCognitor ہب کے ذریعے قدیم اور جدید علم تک رسائی۔',
        demoPreview: [
          'ابن سینا کمپانیون',
          'امحوتپ کمپانیون',
          'ذاتی AI کمپانیون',
          'OmniCognitor ہب',
          'قدیم حکمت',
          'جدید بصیرتیں',
          'علم کی یکجہتی',
        ],
      },
    },
  },
  
  {
    id: 'global',
    key: 'global',
    hieroglyphs: HIEROGLYPHS.global,
    icon: '🌍',
    position: 5,
    initiallyLocked: false, // Only active pillar initially
    liveUrl: 'https://global-telstp.vercel.app',
    color: {
      primary: '#D4AF37', // Gold
      secondary: '#B8860B',
      glow: '#FDE68A',
    },
    translations: {
      en: {
        name: 'Global Network Hub',
        shortName: 'Global Network',
        description: 'The central interactive globe showing TELSTP\'s worldwide network of partners, research collaborations, and telemedicine access points.',
        demoPreview: [
          'Interactive Globe',
          'Global Partners',
          'Research Collaborations',
          'Telemedicine Nodes',
          'Real-time Impact Tracking',
          'Strategic Alliances',
        ],
      },
      ar: {
        name: 'مركز الشبكة العالمية',
        shortName: 'الشبكة العالمية',
        description: 'الكرة التفاعلية المركزية التي تعرض شبكة TELSTP العالمية من الشركاء والتعاون البحثي ونقاط الوصول إلى الطب عن بعد.',
        demoPreview: [
          'كرة تفاعلية',
          'شركاء عالميون',
          'تعاون بحثي',
          'نقاط الطب عن بعد',
          'تتبع التأثير في الوقت الفعلي',
          'تحالفات استراتيجية',
        ],
      },
      fr: {
        name: 'Centre Réseau Mondial',
        shortName: 'Réseau Mondial',
        description: 'Le globe interactif central montrant le réseau mondial de TELSTP.',
        demoPreview: [
          'Globe Interactif',
          'Partenaires Mondiaux',
          'Collaborations de Recherche',
          'Points de Télémédecine',
          'Suivi d\'Impact en Temps Réel',
          'Alliances Stratégiques',
        ],
      },
      es: {
        name: 'Centro de Red Global',
        shortName: 'Red Global',
        description: 'El globo interactivo central que muestra la red mundial de TELSTP.',
        demoPreview: [
          'Globo Interactivo',
          'Socios Globales',
          'Colaboraciones de Investigación',
          'Puntos de Telemedicina',
          'Seguimiento de Impacto en Tiempo Real',
          'Alianzas Estratégicas',
        ],
      },
      zh: {
        name: '全球网络中心',
        shortName: '全球网络',
        description: '显示TELSTP全球合作伙伴、研究合作和远程医疗访问点的交互式地球仪。',
        demoPreview: [
          '交互式地球仪',
          '全球合作伙伴',
          '研究合作',
          '远程医疗节点',
          '实时影响跟踪',
          '战略联盟',
        ],
      },
      ur: {
        name: 'گلوبل نیٹ ورک ہب',
        shortName: 'گلوبل نیٹ ورک',
        description: 'TELSTP کے عالمی شراکت داروں، تحقیقی تعاون، اور ٹیلی میڈیسین تک رسائی کے نقاط کو دکھانے والا مرکزی تعاملی گلوب۔',
        demoPreview: [
          'تعاملی گلوب',
          'عالمی شراکت دار',
          'تحقیقی تعاون',
          'ٹیلی میڈیسین نوڈز',
          'ریل ٹائم اثرات ٹریکنگ',
          'اسٹریٹجک اتحاد',
        ],
      },
    },
  },
];

export default hubs;
