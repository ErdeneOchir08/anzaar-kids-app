import { AgeGroup, ArchetypeId } from '../types';

export interface AgeSpecificGuidance {
  ageGroup: AgeGroup;
  archetypeId: ArchetypeId;
  ageTitle: string;
  developmentalFocus: string;
  topChallenge: string;
  actionableTip: string;
  communicationScript: {
    situation: string;
    whatToSay: string;
  };
}

export const AGE_SPECIFIC_ADVICE: Record<AgeGroup, Record<ArchetypeId, AgeSpecificGuidance>> = {
  toddler: {
    gentle_observer: {
      ageGroup: 'toddler',
      archetypeId: 'gentle_observer',
      ageTitle: '1–3 нас (Балчир нас)',
      developmentalFocus: 'Мэдрэхүйн аюулгүй байдал & Салалтын айдас',
      topChallenge: 'Хөл ихтэй газар, шинэ хүмүүсээс айж зууралдах, чанга дуунаас цочих.',
      actionableTip: 'Айлд очих эсвэл цэцэрлэгт өгөхөөс өмнө түүний дуртай тоглоом эсвэл үнэртэй алчуурыг нь хамт явуулаарай.',
      communicationScript: {
        situation: 'Танихгүй хүн хараад уйлах үед',
        whatToSay: '«Ээж нь хажууд чинь байна. Чи эндээс хамтдаа харж болно шүү, айх хэрэггүй.»',
      },
    },
    energetic_pioneer: {
      ageGroup: 'toddler',
      archetypeId: 'energetic_pioneer',
      ageTitle: '1–3 нас (Балчир нас)',
      developmentalFocus: 'Биеийн эрч хүч & "Үгүй" гэх үе шат',
      topChallenge: 'Юм шидэх, хазах, хориглосон зүйл рүү шууд дайрах.',
      actionableTip: '"Битгий шид" гэхийн оронд "Шидмээр байвал энэ бөмбөгийг сагс руу шид" гэж эрч хүчийг нь аюулгүй зүйл рүү чиглүүл.',
      communicationScript: {
        situation: 'Бухимдаад цохих/хазах гэх үед',
        whatToSay: '«Чи ууртай байна, гэхдээ цохиж болохгүй. Ээжийнхээ гарыг чанга атгаж болно.»',
      },
    },
    focused_inquirer: {
      ageGroup: 'toddler',
      archetypeId: 'focused_inquirer',
      ageTitle: '1–3 нас (Балчир нас)',
      developmentalFocus: 'Эд зүйлсийн байрлал & Дэглэмийн дараалал',
      topChallenge: 'Гутал нь заасан байрандаа байхгүй эсвэл аяга солигдоход бухимдах.',
      actionableTip: 'Гэрийн эд зүйлсийг аль болох тогтсон байранд нь байлгаж, дарааллыг нь алдагдуулахгүй байх.',
      communicationScript: {
        situation: 'Аяга солигдоход уурлах үед',
        whatToSay: '«Цэнхэр аяга чинь угаагдаж байна. Одоо ногооноор уугаад, дараа нь цэнхэрийг нь авъя.»',
      },
    },
    social_radiant: {
      ageGroup: 'toddler',
      archetypeId: 'social_radiant',
      ageTitle: '1–3 нас (Балчир нас)',
      developmentalFocus: 'Анхаарал халамж & Хамт тоглох хүсэл',
      topChallenge: 'Ганцаараа 2 минут ч тоглож чадахгүй ээжийнхээ араас уйлж дагах.',
      actionableTip: 'Түүний хажууд суугаад "Би энд ажлаа хийж байна, чи энд тоглоомоо эвлүүл" гэж харцаараа холбогдоорой.',
      communicationScript: {
        situation: 'Ажил хийлгэхгүй зууралдах үед',
        whatToSay: '«Ээж нь 5 минут аяга угаачихаад чамайг үнсье. Цаг дуугарахаар хоёулаа тэврэлдэнэ.»',
      },
    },
    calm_harmonizer: {
      ageGroup: 'toddler',
      archetypeId: 'calm_harmonizer',
      ageTitle: '1–3 нас (Балчир нас)',
      developmentalFocus: 'Өөрийн хүслийг илэрхийлэх чадвар',
      topChallenge: 'Өлссөн, ядарснаа хэлэлгүй тэсэж байгаад гэнэт шалтгаангүй уйлах.',
      actionableTip: 'Түүнийг асуухаас өмнө "Ус уух уу?", "Ядарч байна уу?" гэж тогтмол шалгаж байгаарай.',
      communicationScript: {
        situation: 'Чимээгүй суусаар байгаад гэнэт уйлах үед',
        whatToSay: '«Миний хүүгийн гэдэс өлсөж байна уу? Надад хуруугаараа заагаад өгөөрэй.»',
      },
    },
  },

  preschool: {
    gentle_observer: {
      ageGroup: 'preschool',
      archetypeId: 'gentle_observer',
      ageTitle: '4–6 нас (Сургуулийн өмнөх)',
      developmentalFocus: 'Сэтгэл хөдлөлөө үгээр нэрлэх & Өөртөө итгэх итгэл',
      topChallenge: 'Шүүмжлэл сонсоод бүтэн өдөржин дуугаа хурааж гомдох, шинэ хүүхэдтэй нийлэхээс эмээх.',
      actionableTip: 'Сэтгэл хөдлөлийн картууд ашиглаж (баярласан, гомдсон, айсан) мэдрэмжээ нэрлэж сургаарай.',
      communicationScript: {
        situation: 'Цэцэрлэгт бусадтай тоглохоос татгалзах үед',
        whatToSay: '«Чи эхлээд ажигламаар байна уу? Хүссэн цагтаа найзууд дээрээ очоорой, ээж нь дэмжинэ.»',
      },
    },
    energetic_pioneer: {
      ageGroup: 'preschool',
      archetypeId: 'energetic_pioneer',
      ageTitle: '4–6 нас (Сургуулийн өмнөх)',
      developmentalFocus: 'Хил хязгаарыг хүлээн зөвшөөрөх & Дүрэм дагах',
      topChallenge: 'Дэлгүүрт тоглоом нэхэх, хувцсаа өмсөхгүй зугтах, хориг тавихад эсэргүүцэх.',
      actionableTip: 'Хязгаарлагдмал 2 сонголт өг: "Гуталнаасаа эхлэх үү, цамцнаасаа эхлэх үү?"',
      communicationScript: {
        situation: 'Дэлгүүрт тоглоом нэхэж уурлах үед',
        whatToSay: '«Энэ машин үнэхээр гоё юм байна. Бид өнөөдөр авахгүй, харин зургийг нь аваад хадгалчихъя.»',
      },
    },
    focused_inquirer: {
      ageGroup: 'preschool',
      archetypeId: 'focused_inquirer',
      ageTitle: '4–6 нас (Сургуулийн өмнөх)',
      developmentalFocus: 'Шилжилтийн үеийн уян хатан байдал',
      topChallenge: 'Хийж буй тоглоом, бүтээлээ дуусгаж чадаагүй үед гарах гэхэд бухимдах.',
      actionableTip: '5 минут, 2 минутын өмнө цагийн сэрүүлэг тавьж "Сэрүүлэг дуугарахаар гарна" гэж тохир.',
      communicationScript: {
        situation: 'Тоглоомоо хураахгүй гэж зүтгэх үед',
        whatToSay: '«Чиний барьсан цамхаг үнэхээр мундаг байна. Зургийг нь дараад маргааш эндээсээ үргэлжлүүлье.»',
      },
    },
    social_radiant: {
      ageGroup: 'preschool',
      archetypeId: 'social_radiant',
      ageTitle: '4–6 нас (Сургуулийн өмнөх)',
      developmentalFocus: 'Бусдын үнэлэмжид хэт найдахгүй байх',
      topChallenge: 'Найздаа гологдох вий гэхээс эмээх, эцэг эхийн анхаарлыг татах гэж худлаа ярих.',
      actionableTip: 'Зөвхөн үр дүнг бус хичээл зүтгэлийг нь магтаж, өөрийнхөөрөө байхыг нь урамшуул.',
      communicationScript: {
        situation: 'Найз нь тоглохгүй гэснээс болж гутрах үед',
        whatToSay: '«Найз нь ядарсан байж магадгүй. Чиний үнэ цэн буураагүй шүү дээ, хоёулаа өөр тоглоом тоглоё.»',
      },
    },
    calm_harmonizer: {
      ageGroup: 'preschool',
      archetypeId: 'calm_harmonizer',
      ageTitle: '4–6 нас (Сургуулийн өмнөх)',
      developmentalFocus: '"Үгүй" гэж хэлж өөрийн хил хязгаараа хамгаалах',
      topChallenge: 'Бусдад тоглоомоо булаалгаад чимээгүй өнгөрөөх, дургүй зүйлээ тэвчиж суух.',
      actionableTip: 'Гэртээ дүрд тоглох тоглоомоор "Үгүй, би одоо тоглож байна" гэж чанга хэлэх дасгал хийлгээрэй.',
      communicationScript: {
        situation: 'Тоглоомоо булаалгаад зогсох үед',
        whatToSay: '«Чи "Энэ минийх, одоо би тоглож байна" гэж хэлж болно. Хамтдаа хэлье.»',
      },
    },
  },

  school: {
    gentle_observer: {
      ageGroup: 'school',
      archetypeId: 'gentle_observer',
      ageTitle: '7–10 нас (Бага анги)',
      developmentalFocus: 'Сургуулийн стресс & Нийгмийн харилцааны ачаалал',
      topChallenge: 'Сургуулийн олон хүүхэд дунд сэтгэл зүйн ядаргаанд орж, гэртээ ирээд уурлах.',
      actionableTip: 'Сургуулиас ирэхэд нь шууд хичээл асуулгүй, 30 минут тайван амрах цаг олго.',
      communicationScript: {
        situation: 'Сургуулиас ирээд бухимдах үед',
        whatToSay: '«Өнөөдөр их ядарсан бололтой. Эхлээд дуртай цайгаа уугаад, дараа нь ярилцъя.»',
      },
    },
    energetic_pioneer: {
      ageGroup: 'school',
      archetypeId: 'energetic_pioneer',
      ageTitle: '7–10 нас (Бага анги)',
      developmentalFocus: 'Даалгавар хийх тэвчээр & Эрх мэдлийн хуваарилалт',
      topChallenge: 'Ширээний ард удаан сууж хичээл хийхээс татгалзах, багшийн шаардлагыг эсэргүүцэх.',
      actionableTip: 'Хичээлийг 20 минутын жижиг хэсгүүдэд хувааж, дундуур нь хөдөлгөөнт түр завсарлага хийлгэ.',
      communicationScript: {
        situation: 'Даалгавраа хийхгүй зүтгэх үед',
        whatToSay: '«Математикаа түрүүлж дуусгах уу, Монгол хэлээ юу? Чи өөрөө дарааллаа сонго.»',
      },
    },
    focused_inquirer: {
      ageGroup: 'school',
      archetypeId: 'focused_inquirer',
      ageTitle: '7–10 нас (Бага анги)',
      developmentalFocus: 'Төгс төгөлдөр байх хүсэл (Perfectionism) & Алдааг хүлээж авах',
      topChallenge: 'Дүн муу авах эсвэл даалгавар буруу болоход өөрийгөө хүчтэй буруутгах.',
      actionableTip: 'Алдаа бол суралцах хамгийн том боломж гэдгийг өөрийнхөө бодит жишээгээр харуул.',
      communicationScript: {
        situation: 'Даалгавраа буруу хийгээд уурлах үед',
        whatToSay: '«Энэ алдаа чамд шинэ зүйл зааж өглөө. Хаана алдсанаа хоёулаа хамт олж нээе.»',
      },
    },
    social_radiant: {
      ageGroup: 'school',
      archetypeId: 'social_radiant',
      ageTitle: '7–10 нас (Бага анги)',
      developmentalFocus: 'Үе тэнгийнхний нөлөө & Бие даасан байр суурь',
      topChallenge: 'Найзууддаа таалагдахын тулд буруу үйлдэл дагах, дэлгэцэнд хэт автах.',
      actionableTip: 'Гэртээ итгэлтэй ярилцаж, өөрийн гэсэн үнэт зүйлтэй байхын чухлыг ойлгуул.',
      communicationScript: {
        situation: 'Найзуудынхаа үгэнд орж дүрэм зөрчих үед',
        whatToSay: '«Бусад хүүхдүүд тэгсэн ч, манай гэр бүлийн дүрэм бол энэ. Чи өөрийн толгойгоор шийдэж чадна.»',
      },
    },
    calm_harmonizer: {
      ageGroup: 'school',
      archetypeId: 'calm_harmonizer',
      ageTitle: '7–10 нас (Бага анги)',
      developmentalFocus: 'Өөрийн үзэл бодлоо хамгаалах & Манлайлал',
      topChallenge: 'Багийн ажил дээр өөрийн санааг хэлэлгүй бусдын үгээр явах, дотроо шаналах.',
      actionableTip: 'Гэрийн төлөвлөгөө гаргахдаа түүний саналыг тусгайлан асууж шийдвэрт оролцуул.',
      communicationScript: {
        situation: 'Сургууль дээр юу болсныг асуухад "Зүгээр" гэх үед',
        whatToSay: '«Өнөөдөр чамд таалагдаагүй нэг зүйл юу байсан бэ? Ээж/аавдаа хуваалцаж болно шүү.»',
      },
    },
  },

  preteen: {
    gentle_observer: {
      ageGroup: 'preteen',
      archetypeId: 'gentle_observer',
      ageTitle: '11+ нас (Өсвөр нас)',
      developmentalFocus: 'Хувийн орон зай & Дотоод ертөнц',
      topChallenge: 'Өрөөндөө түгжигдэх, эцэг эхтэйгээ ярихаас зайлсхийх, сэтгэл түгших.',
      actionableTip: 'Түүний хувийн орон зайг хүндэтгэж, шүүмжлэхгүйгээр зөвхөн сонсогч байж өг.',
      communicationScript: {
        situation: 'Өрөөнөөсөө гарахгүй байх үед',
        whatToSay: '«Чамд ганцаараа байх цаг хэрэгтэйг ойлгож байна. Хүссэн үедээ намайг дуудаарай, би энд байна.»',
      },
    },
    energetic_pioneer: {
      ageGroup: 'preteen',
      archetypeId: 'energetic_pioneer',
      ageTitle: '11+ нас (Өсвөр нас)',
      developmentalFocus: 'Бие даасан эрх мэдэл & Хариуцлага',
      topChallenge: 'Эцэг эхийн хоригийг ил тод эсэргүүцэх, үг сөргөх, эрсдэлтэй үйлдэл хийх.',
      actionableTip: 'Тушаахаа больж, гэрээ хэлэлцээрийн аргаар дүрэм, хариуцлагыг хамт тогтоо.',
      communicationScript: {
        situation: 'Дүрэм эсэргүүцэж маргах үед',
        whatToSay: '«Бид хоёр хоёулаа сэтгэл хөдлөлөө баръя. 1 цагийн дараа тайван суугаад тохиролцоо хийе.»',
      },
    },
    focused_inquirer: {
      ageGroup: 'preteen',
      archetypeId: 'focused_inquirer',
      ageTitle: '11+ нас (Өсвөр нас)',
      developmentalFocus: 'Ирээдүйн чиг баримжаа & Гүн сонирхол',
      topChallenge: 'Зөвхөн дуртай 1 зүйлдээ автаж бусад хичээл, үүргээ орхих.',
      actionableTip: 'Түүний сонирхлыг (програмчлал, дизайн, шинжлэх ухаан) мэргэжлийн түвшинд хөгжүүлэхийг дэмж.',
      communicationScript: {
        situation: 'Өөр хичээлээ хийхгүй ганц зүйлд суух үед',
        whatToSay: '«Чиний энэ сонирхол маш гайхалтай. Энэ зорилгодоо хүрэхийн тулд суурь хичээлээ тэнцвэртэй авч явъя.»',
      },
    },
    social_radiant: {
      ageGroup: 'preteen',
      archetypeId: 'social_radiant',
      ageTitle: '11+ нас (Өсвөр нас)',
      developmentalFocus: 'Сошиал медиа & Үе тэнгийн харилцаа',
      topChallenge: 'Инстаграм/TikTok-ийн үнэлэмжид автах, найзуудынхаа төлөө гэр бүлээ үл тоох.',
      actionableTip: 'Түүний нийгмийн харилцааг хориглох биш, сошиал медиагийн бодит бус стандартын талаар илэн далангүй ярилц.',
      communicationScript: {
        situation: 'Утаснаасаа салахгүй байх үед',
        whatToSay: '«Оройн хоолны 30 минут утсаа өөр өрөөнд тавиад, өнөөдөр юу болсон тухай сонирхолтой яриа өрнүүлье.»',
      },
    },
    calm_harmonizer: {
      ageGroup: 'preteen',
      archetypeId: 'calm_harmonizer',
      ageTitle: '11+ нас (Өсвөр нас)',
      developmentalFocus: 'Өөрийн хүсэл мөрөөдлийг илэрхийлэх',
      topChallenge: 'Бусдад саад болохгүй гэж өөрийн зорилго, хүслийг илэрхийлэхгүй дарах.',
      actionableTip: 'Түүнд юу мэдрэгдэж байгааг "Шүүмжлэхгүй сонсоно" гэж батлан харуулж дотно ярилц.',
      communicationScript: {
        situation: 'Ямар нэг зүйлд гомдсон ч нууж байх үед',
        whatToSay: '«Чиний нүдэнд гуниг харагдаж байна. Юу ч болсон бай ээж/аав нь чамайг ойлгож сонсоно.»',
      },
    },
  },
};
