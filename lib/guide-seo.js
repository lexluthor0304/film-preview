export const localizedSourceTitles = {
  en: "Sources and further reading",
  zh: "资料来源与延伸阅读",
  ru: "Источники и дополнительное чтение",
  es: "Fuentes y lecturas recomendadas",
  fr: "Sources et lectures complémentaires",
  it: "Fonti e approfondimenti",
  el: "Πηγές και περαιτέρω ανάγνωση",
  vi: "Nguồn tham khảo và đọc thêm",
  id: "Sumber dan bacaan lanjutan",
  ja: "出典と参考資料",
  hi: "स्रोत और अतिरिक्त पठन",
  ko: "출처 및 참고 자료",
  uk: "Джерела та додаткові матеріали",
  ar: "المصادر وقراءات إضافية",
  he: "מקורות וקריאה נוספת",
};

const guideSeo = {
  "/guides/film-negatives": {
    schemaReadTime: "PT6M",
    keywords: [
      "film negatives",
      "color negative film",
      "orange mask",
      "35mm negatives",
      "negative viewer",
    ],
    about: ["film negatives", "film formats", "film storage", "orange mask"],
  },
  "/guides/digitize-35mm": {
    schemaReadTime: "PT6M",
    keywords: [
      "digitize 35mm negatives",
      "scan film negatives",
      "phone film scanning",
      "DSLR scanning",
      "flatbed scanner",
    ],
    about: ["film scanning", "35mm negatives", "camera scanning", "home archiving"],
  },
  "/guides/film-vs-digital": {
    schemaReadTime: "PT5M",
    keywords: [
      "film vs digital photography",
      "film dynamic range",
      "film resolution",
      "film cost per frame",
      "photo archive",
    ],
    about: ["film photography", "digital photography", "photo archives"],
  },
};

const guideKeyByPath = {
  "/guides/film-negatives": "filmNegatives",
  "/guides/digitize-35mm": "digitize35mm",
  "/guides/film-vs-digital": "filmVsDigital",
};

const localizedGuideFaqs = {
  zh: {
    filmNegatives: [
      {
        q: "旧负片还读得出来吗？",
        a: "多数旧负片仍然可读。即使保存条件不理想，负片通常也保留了足够信息，可以通过背光预览、软件反转和后期白平衡恢复大致画面。",
      },
      {
        q: "负片和反转片有什么区别？",
        a: "负片记录的是明暗和颜色反转后的母版，需要反转才能看到正常照片。反转片或幻灯片本身就是正片，对着光可以直接观看。",
      },
      {
        q: "为什么彩色负片反转后会偏蓝？",
        a: "彩色负片有橙色片基。反转后，橙色会变成蓝青色偏色，所以预览正常但最终照片通常还需要白平衡和色调调整。",
      },
    ],
    digitize35mm: [
      {
        q: "不用扫描仪可以数字化 35mm 吗？",
        a: "可以。最快方式是用浏览器查看器预览背光负片；如果要保存更清晰的图片，可以用手机或相机拍摄静态照片后再反转。",
      },
      {
        q: "手机拍负片和实时预览有什么区别？",
        a: "实时预览适合快速判断画面内容。手机静态照片通常分辨率更高，更适合分享和简单修图，但仍需要后期反转和校色。",
      },
      {
        q: "什么时候需要 DSLR 或微单翻拍？",
        a: "如果目标是大尺寸打印、长期归档或认真修复，使用相机、微距镜头、稳定翻拍架和均匀光源会比实时视频预览更可靠。",
      },
    ],
    filmVsDigital: [
      {
        q: "胶片比数码更清晰吗？",
        a: "35mm 胶片不一定比现代数码相机更清晰。中画幅和大画幅胶片有更多信息量，但最终清晰度取决于镜头、扫描和后期流程。",
      },
      {
        q: "胶片摄影为什么更贵？",
        a: "胶片每拍一张都会产生胶卷、冲洗和扫描成本。数码相机前期投入高，但拍摄后的单张成本接近零，适合高频拍摄。",
      },
      {
        q: "家庭照片应该保留负片还是只保留扫描件？",
        a: "最好两者都保留。负片是实体母版，适合长期保存；扫描件便于分享、备份和在线查看。",
      },
    ],
  },
  ru: {
    filmNegatives: [
      {
        q: "Можно ли прочитать старые негативы?",
        a: "В большинстве случаев да. Даже старые цветные негативы обычно сохраняют достаточно информации для просмотра на просвет, инверсии и последующей коррекции цвета.",
      },
      {
        q: "Чем негатив отличается от слайда?",
        a: "Негатив хранит изображение с инверсией яркости и цвета, поэтому его нужно обратить. Слайд уже является позитивом и виден напрямую на просвет.",
      },
      {
        q: "Почему после инверсии появляется синий оттенок?",
        a: "У цветной негативной пленки есть оранжевая маска. После инверсии она становится голубовато-синей, поэтому для финального изображения обычно нужна коррекция баланса белого.",
      },
    ],
    digitize35mm: [
      {
        q: "Можно ли оцифровать 35 мм без сканера?",
        a: "Да. Для быстрого просмотра используйте браузерный viewer с подсвеченным негативом. Для более четкого файла сфотографируйте негатив телефоном или камерой и затем инвертируйте снимок.",
      },
      {
        q: "Чем фото телефона отличается от живого просмотра?",
        a: "Живой просмотр нужен для быстрой сортировки. Статичное фото с телефона обычно дает больше разрешения и лучше подходит для отправки или простой обработки.",
      },
      {
        q: "Когда нужна DSLR или беззеркальная камера?",
        a: "Камера с макрообъективом лучше подходит для печати, архивирования и серьезной реставрации, потому что дает RAW-файл, больше деталей и стабильную геометрию.",
      },
    ],
    filmVsDigital: [
      {
        q: "Пленка резче цифровой камеры?",
        a: "35 мм пленка не обязательно резче современной цифровой камеры. Средний и большой формат могут дать больше информации, но итог зависит от объектива, сканирования и обработки.",
      },
      {
        q: "Почему пленка дороже в использовании?",
        a: "Каждый кадр требует пленки, проявки и сканирования. У цифровой камеры основные затраты приходятся на корпус и объективы, а дальнейшие кадры почти бесплатны.",
      },
      {
        q: "Для семейного архива лучше негативы или сканы?",
        a: "Лучше хранить оба варианта. Негативы остаются физическим оригиналом, а сканы удобны для резервных копий, поиска и отправки родственникам.",
      },
    ],
  },
  es: {
    filmNegatives: [
      {
        q: "¿Se pueden leer negativos antiguos?",
        a: "Normalmente sí. Incluso negativos de color antiguos suelen conservar información suficiente para verlos con luz de fondo, invertirlos y corregir el color después.",
      },
      {
        q: "¿Cuál es la diferencia entre negativo y diapositiva?",
        a: "El negativo guarda la escena invertida y necesita conversión para verse normal. La diapositiva ya es positiva, por lo que puede verse directamente contra la luz.",
      },
      {
        q: "¿Por qué el negativo invertido queda azulado?",
        a: "La película negativa de color tiene una máscara naranja. Al invertirla, esa base se convierte en un tono azul o cian que normalmente se corrige con balance de blancos.",
      },
    ],
    digitize35mm: [
      {
        q: "¿Puedo digitalizar 35 mm sin escáner?",
        a: "Sí. Para revisar el contenido, usa un visor de navegador con el negativo retroiluminado. Para guardar más detalle, fotografía el negativo con móvil o cámara y luego inviértelo.",
      },
      {
        q: "¿Qué cambia entre usar el móvil y la vista en directo?",
        a: "La vista en directo sirve para clasificar rápido. Una foto estática del móvil suele tener más resolución y funciona mejor para compartir o editar.",
      },
      {
        q: "¿Cuándo conviene usar una cámara con macro?",
        a: "Usa una cámara con macro cuando busques impresión, archivo o restauración seria. Captura más detalle, permite RAW y mantiene mejor la geometría.",
      },
    ],
    filmVsDigital: [
      {
        q: "¿La película tiene más resolución que digital?",
        a: "No siempre. El 35 mm no supera necesariamente a una cámara digital moderna. Formatos medio y grande pueden contener más detalle, según lente, escaneo y proceso.",
      },
      {
        q: "¿Por qué fotografiar en película cuesta más?",
        a: "Cada foto añade coste de película, revelado y escaneo. En digital, el gasto principal está en la cámara y los objetivos; luego cada disparo cuesta casi cero.",
      },
      {
        q: "Para un archivo familiar, ¿negativos o escaneos?",
        a: "Lo mejor es conservar ambos. Los negativos son el original físico; los escaneos son más fáciles de compartir, respaldar y consultar.",
      },
    ],
  },
  fr: {
    filmNegatives: [
      {
        q: "Peut-on encore lire de vieux négatifs ?",
        a: "Oui, dans la plupart des cas. Même des négatifs couleur anciens gardent souvent assez d'information pour être rétroéclairés, inversés puis corrigés.",
      },
      {
        q: "Quelle différence entre négatif et diapositive ?",
        a: "Un négatif stocke l'image inversée et doit être converti. Une diapositive est déjà positive et se regarde directement à la lumière.",
      },
      {
        q: "Pourquoi l'image inversée devient-elle bleutée ?",
        a: "Le négatif couleur possède un masque orange. Une fois inversé, ce masque devient bleu ou cyan, puis se corrige avec la balance des blancs.",
      },
    ],
    digitize35mm: [
      {
        q: "Peut-on numériser du 35 mm sans scanner ?",
        a: "Oui. Pour voir rapidement le contenu, utilisez un viewer dans le navigateur avec le négatif rétroéclairé. Pour plus de détail, photographiez-le puis inversez l'image.",
      },
      {
        q: "Quelle différence entre photo mobile et aperçu direct ?",
        a: "L'aperçu direct sert au tri rapide. Une photo fixe du téléphone offre souvent plus de résolution et convient mieux au partage ou à une retouche simple.",
      },
      {
        q: "Quand utiliser un appareil photo avec macro ?",
        a: "Utilisez une caméra avec objectif macro pour l'impression, l'archivage ou une restauration sérieuse. Elle donne plus de détail, du RAW et une géométrie plus stable.",
      },
    ],
    filmVsDigital: [
      {
        q: "L'argentique est-il plus détaillé que le numérique ?",
        a: "Pas toujours. Le 35 mm ne dépasse pas forcément un boîtier numérique moderne. Le moyen et grand format peuvent contenir plus d'information selon l'optique et le scan.",
      },
      {
        q: "Pourquoi l'argentique coûte-t-il plus cher ?",
        a: "Chaque image ajoute le coût du film, du développement et du scan. En numérique, l'investissement est surtout initial, puis chaque déclenchement coûte presque zéro.",
      },
      {
        q: "Pour les archives familiales, négatifs ou scans ?",
        a: "Conservez les deux. Les négatifs sont l'original physique; les scans sont plus faciles à sauvegarder, rechercher et partager.",
      },
    ],
  },
  it: {
    filmNegatives: [
      {
        q: "I vecchi negativi sono ancora leggibili?",
        a: "Di solito sì. Anche negativi colore datati spesso conservano informazioni sufficienti per essere retroilluminati, invertiti e poi corretti nel colore.",
      },
      {
        q: "Che differenza c'è tra negativo e diapositiva?",
        a: "Il negativo registra luminosità e colori invertiti e va convertito. La diapositiva è già positiva e può essere vista direttamente in controluce.",
      },
      {
        q: "Perché il negativo invertito diventa blu?",
        a: "La pellicola negativa colore ha una maschera arancione. Dopo l'inversione quella base diventa blu-ciano e va rifinita con il bilanciamento del bianco.",
      },
    ],
    digitize35mm: [
      {
        q: "Posso digitalizzare il 35 mm senza scanner?",
        a: "Sì. Per una visione rapida usa un viewer nel browser con il negativo retroilluminato. Per un file più dettagliato, fotografa il negativo e poi inverti l'immagine.",
      },
      {
        q: "Che differenza c'è tra foto del telefono e anteprima live?",
        a: "L'anteprima live serve per selezionare velocemente. Una foto statica del telefono ha spesso più risoluzione ed è migliore per condividere o modificare.",
      },
      {
        q: "Quando serve una fotocamera con macro?",
        a: "Serve per stampa, archivio o restauro accurato. Una fotocamera con macro offre RAW, più dettaglio e una geometria più stabile.",
      },
    ],
    filmVsDigital: [
      {
        q: "La pellicola è più nitida del digitale?",
        a: "Non sempre. Il 35 mm non supera necessariamente una fotocamera digitale moderna. Medio e grande formato possono contenere più dettaglio se scansione e lente sono adeguate.",
      },
      {
        q: "Perché scattare a pellicola costa di più?",
        a: "Ogni fotogramma aggiunge costo di pellicola, sviluppo e scansione. Nel digitale il costo principale è l'attrezzatura, poi ogni scatto è quasi gratuito.",
      },
      {
        q: "Per un archivio familiare, negativi o scansioni?",
        a: "Meglio entrambi. I negativi sono l'originale fisico; le scansioni sono più facili da condividere, cercare e salvare in backup.",
      },
    ],
  },
  el: {
    filmNegatives: [
      {
        q: "Διαβάζονται ακόμα τα παλιά αρνητικά;",
        a: "Συνήθως ναι. Ακόμη και παλιά έγχρωμα αρνητικά κρατούν αρκετή πληροφορία για προβολή με οπίσθιο φως, αντιστροφή και βασική διόρθωση χρώματος.",
      },
      {
        q: "Ποια είναι η διαφορά αρνητικού και slide;",
        a: "Το αρνητικό έχει ανεστραμμένη φωτεινότητα και χρώμα και χρειάζεται μετατροπή. Το slide είναι ήδη θετικό και φαίνεται απευθείας στο φως.",
      },
      {
        q: "Γιατί μετά την αντιστροφή βγαίνει μπλε απόχρωση;",
        a: "Το έγχρωμο αρνητικό έχει πορτοκαλί μάσκα. Όταν αντιστραφεί, η μάσκα γίνεται γαλάζια ή κυανή και διορθώνεται με ισορροπία λευκού.",
      },
    ],
    digitize35mm: [
      {
        q: "Μπορώ να ψηφιοποιήσω 35 mm χωρίς scanner;",
        a: "Ναι. Για γρήγορο έλεγχο χρησιμοποιήστε viewer στο browser με οπίσθιο φωτισμό. Για πιο καθαρό αρχείο, φωτογραφίστε το αρνητικό και αντιστρέψτε την εικόνα.",
      },
      {
        q: "Τι αλλάζει ανάμεσα σε κινητό και live preview;",
        a: "Το live preview είναι για γρήγορη επιλογή. Μια στατική φωτογραφία κινητού έχει συνήθως μεγαλύτερη ανάλυση και ταιριάζει καλύτερα για διαμοιρασμό ή επεξεργασία.",
      },
      {
        q: "Πότε χρειάζεται κάμερα με macro;",
        a: "Για εκτύπωση, αρχείο ή σοβαρή αποκατάσταση. Η κάμερα με macro δίνει RAW, περισσότερη λεπτομέρεια και πιο σταθερή γεωμετρία.",
      },
    ],
    filmVsDigital: [
      {
        q: "Το φιλμ έχει περισσότερη λεπτομέρεια από το digital;",
        a: "Όχι πάντα. Το 35 mm δεν ξεπερνά απαραίτητα μια σύγχρονη ψηφιακή κάμερα. Μεσαίο και μεγάλο φορμά μπορούν να δώσουν περισσότερη πληροφορία με σωστή σάρωση.",
      },
      {
        q: "Γιατί το φιλμ κοστίζει περισσότερο;",
        a: "Κάθε καρέ έχει κόστος φιλμ, εμφάνισης και σάρωσης. Στο digital το κόστος είναι κυρίως αρχικό και μετά κάθε λήψη κοστίζει σχεδόν μηδέν.",
      },
      {
        q: "Για οικογενειακό αρχείο, αρνητικά ή scans;",
        a: "Κρατήστε και τα δύο. Τα αρνητικά είναι το φυσικό πρωτότυπο, ενώ τα scans μοιράζονται, αναζητούνται και αντιγράφονται ευκολότερα.",
      },
    ],
  },
  vi: {
    filmNegatives: [
      {
        q: "Âm bản cũ còn đọc được không?",
        a: "Thường là có. Ngay cả âm bản màu cũ cũng thường còn đủ thông tin để soi bằng đèn nền, đảo màu và chỉnh cân bằng trắng sau đó.",
      },
      {
        q: "Âm bản khác slide ở điểm nào?",
        a: "Âm bản lưu cảnh với sáng tối và màu bị đảo, nên cần chuyển đổi mới thấy ảnh bình thường. Slide đã là ảnh dương và có thể xem trực tiếp trước ánh sáng.",
      },
      {
        q: "Vì sao ảnh sau khi đảo màu bị xanh?",
        a: "Phim âm bản màu có lớp nền cam. Khi đảo màu, lớp cam này thành xanh lam hoặc xanh lục lam, nên ảnh cuối thường cần chỉnh white balance.",
      },
    ],
    digitize35mm: [
      {
        q: "Có thể số hóa 35mm không cần scanner không?",
        a: "Có. Để xem nhanh, dùng trình xem trong trình duyệt với âm bản được chiếu sáng từ sau. Để có file rõ hơn, chụp âm bản rồi đảo màu ảnh.",
      },
      {
        q: "Khác nhau giữa ảnh điện thoại và preview trực tiếp là gì?",
        a: "Preview trực tiếp phù hợp để lọc nhanh. Ảnh tĩnh từ điện thoại thường có độ phân giải cao hơn và tốt hơn cho chia sẻ hoặc chỉnh sửa đơn giản.",
      },
      {
        q: "Khi nào nên dùng máy ảnh với ống macro?",
        a: "Khi cần in, lưu trữ lâu dài hoặc phục hồi nghiêm túc. Máy ảnh macro cho RAW, nhiều chi tiết hơn và hình học ổn định hơn.",
      },
    ],
    filmVsDigital: [
      {
        q: "Phim có chi tiết hơn máy ảnh số không?",
        a: "Không phải lúc nào cũng vậy. 35mm không nhất thiết vượt máy ảnh số hiện đại. Trung khổ và đại khổ có thể chứa nhiều chi tiết hơn nếu quét đúng cách.",
      },
      {
        q: "Vì sao chụp phim tốn kém hơn?",
        a: "Mỗi khung hình đều có chi phí phim, tráng và quét. Với máy số, chi phí chính nằm ở thiết bị, còn mỗi lần chụp sau đó gần như miễn phí.",
      },
      {
        q: "Lưu trữ gia đình nên giữ âm bản hay file quét?",
        a: "Nên giữ cả hai. Âm bản là bản gốc vật lý; file quét dễ chia sẻ, tìm kiếm và sao lưu hơn.",
      },
    ],
  },
  id: {
    filmNegatives: [
      {
        q: "Apakah negatif lama masih bisa dibaca?",
        a: "Biasanya bisa. Bahkan negatif warna lama sering masih menyimpan cukup informasi untuk dilihat dengan cahaya belakang, dibalik warnanya, lalu dikoreksi.",
      },
      {
        q: "Apa bedanya negatif dan slide?",
        a: "Negatif menyimpan terang-gelap dan warna dalam keadaan terbalik sehingga perlu dikonversi. Slide sudah berupa gambar positif dan bisa dilihat langsung ke arah cahaya.",
      },
      {
        q: "Mengapa hasil inversi terlihat kebiruan?",
        a: "Negatif warna memiliki dasar oranye. Setelah dibalik, dasar ini menjadi biru atau sian, sehingga hasil akhir biasanya perlu white balance.",
      },
    ],
    digitize35mm: [
      {
        q: "Bisakah mendigitalisasi 35mm tanpa scanner?",
        a: "Bisa. Untuk melihat cepat, gunakan penampil browser dengan negatif yang diterangi dari belakang. Untuk file lebih detail, foto negatif lalu balik warnanya.",
      },
      {
        q: "Apa beda foto ponsel dan preview langsung?",
        a: "Preview langsung cocok untuk seleksi cepat. Foto statis dari ponsel biasanya punya resolusi lebih tinggi dan lebih baik untuk dibagikan atau diedit.",
      },
      {
        q: "Kapan perlu kamera dengan lensa makro?",
        a: "Gunakan kamera makro untuk cetak, arsip, atau restorasi serius. Hasilnya memberi RAW, detail lebih tinggi, dan geometri lebih stabil.",
      },
    ],
    filmVsDigital: [
      {
        q: "Apakah film lebih tajam daripada digital?",
        a: "Tidak selalu. 35mm belum tentu melampaui kamera digital modern. Format medium dan besar bisa menyimpan lebih banyak detail jika pemindaian dan lensa tepat.",
      },
      {
        q: "Mengapa memotret film lebih mahal?",
        a: "Setiap frame menambah biaya film, cuci, dan scan. Pada digital, biaya utama ada di kamera dan lensa, lalu setiap jepretan hampir gratis.",
      },
      {
        q: "Untuk arsip keluarga, simpan negatif atau scan?",
        a: "Simpan keduanya. Negatif adalah sumber fisik; file scan lebih mudah dibagikan, dicari, dan dicadangkan.",
      },
    ],
  },
  ja: {
    filmNegatives: [
      {
        q: "古いネガはまだ読み取れますか？",
        a: "多くの場合は読み取れます。保存状態が悪いカラーネガでも、バックライトで確認し、反転とホワイトバランス補正で内容を復元できることがよくあります。",
      },
      {
        q: "ネガとスライドの違いは何ですか？",
        a: "ネガは明暗と色が反転した原版なので変換が必要です。スライドは最初からポジ画像で、光にかざすだけで見られます。",
      },
      {
        q: "反転後に青く見えるのはなぜですか？",
        a: "カラーネガにはオレンジ色のベースがあります。反転すると青やシアンの色かぶりになり、最終画像ではホワイトバランス調整が必要です。",
      },
    ],
    digitize35mm: [
      {
        q: "スキャナーなしで35mmをデジタル化できますか？",
        a: "できます。内容確認ならバックライトとブラウザビューワーが最速です。より高解像度で残すなら、スマホやカメラで撮影してから反転します。",
      },
      {
        q: "スマホ撮影とライブプレビューの違いは？",
        a: "ライブプレビューは素早い選別向きです。スマホの静止画は通常より高解像度で、共有や簡単な編集に向いています。",
      },
      {
        q: "いつマクロレンズ付きカメラが必要ですか？",
        a: "印刷、長期保存、本格的な補正が目的なら有効です。RAW、細部、安定したジオメトリを得やすくなります。",
      },
    ],
    filmVsDigital: [
      {
        q: "フィルムはデジタルより高精細ですか？",
        a: "常にそうではありません。35mmは現代のデジタルカメラを必ず上回るわけではありません。中判や大判は適切なスキャンで多くの情報を持てます。",
      },
      {
        q: "フィルム撮影はなぜ高くなりやすいですか？",
        a: "1コマごとにフィルム、現像、スキャンの費用が発生します。デジタルは機材費が中心で、その後の1枚あたりの費用はほぼゼロです。",
      },
      {
        q: "家族写真の保存はネガとスキャンのどちらが良いですか？",
        a: "両方を残すのが現実的です。ネガは物理的な原版で、スキャンは共有、検索、バックアップに向いています。",
      },
    ],
  },
  hi: {
    filmNegatives: [
      {
        q: "क्या पुराने नेगेटिव से अब भी तस्वीरें देखी जा सकती हैं?",
        a: "ज़्यादातर मामलों में हाँ। ठीक से न रखे गए पुराने रंगीन नेगेटिव में भी आमतौर पर इतनी जानकारी बची रहती है कि उन्हें बैकलाइट पर देखा जा सके, उलटा जा सके और बाद में व्हाइट बैलेंस से उनके रंग ठीक किए जा सकें।",
      },
      {
        q: "नेगेटिव और स्लाइड में क्या अंतर है?",
        a: "नेगेटिव पर दृश्य की चमक और रंग उलटे रूप में रिकॉर्ड होते हैं, इसलिए सामान्य फ़ोटो देखने के लिए इमेज को उलटना पड़ता है। स्लाइड (रिवर्सल फिल्म) पहले से पॉज़िटिव होती है, इसलिए उसे बस रोशनी के सामने रखकर सीधे देखा जा सकता है।",
      },
      {
        q: "रंगीन नेगेटिव को उलटने पर नीलापन क्यों आता है?",
        a: "रंगीन नेगेटिव फिल्म का बेस नारंगी होता है (ऑरेंज मास्क), जो सीधे उलटने पर नीला-सियान कलर कास्ट बन जाता है। Negative Viewer का लाइव प्रीव्यू फिल्म का खाली किनारा ढूँढ़कर बेस के रंग का अनुमान लगाता है और यह कास्ट अपने-आप हटा देता है। फिर भी सेव की गई अंतिम फ़ाइलों का व्हाइट बैलेंस किसी एडिटर में थोड़ा ठीक करना पड़ सकता है।",
      },
    ],
    digitize35mm: [
      {
        q: "क्या स्कैनर के बिना 35mm फिल्म डिजिटाइज़ की जा सकती है?",
        a: "हाँ। नेगेटिव में क्या है, यह जानने का सबसे तेज़ तरीका है उसे बैकलाइट पर रखकर ब्राउज़र व्यूअर में देखना। ज़्यादा स्पष्ट इमेज सेव करनी हो, तो फ़ोन या कैमरे से नेगेटिव की स्टिल फ़ोटो लें और फिर उसे उलटें।",
      },
      {
        q: "फ़ोन से ली गई फ़ोटो और लाइव प्रीव्यू में क्या अंतर है?",
        a: "लाइव प्रीव्यू नेगेटिव को जल्दी छाँटने और यह देखने के लिए है कि उनमें क्या है। फ़ोन की स्टिल फ़ोटो का रिज़ॉल्यूशन आमतौर पर ज़्यादा होता है, इसलिए वह शेयर करने और हल्की एडिटिंग के लिए बेहतर है, लेकिन उसे बाद में उलटना और उसका रंग ठीक करना पड़ता है।",
      },
      {
        q: "DSLR या मिररलेस कैमरे की ज़रूरत कब पड़ती है?",
        a: "अगर बड़े प्रिंट बनाने हैं, लंबे समय के लिए आर्काइव करना है या बारीकी से रिस्टोरेशन करना है, तो मैक्रो लेंस वाले कैमरे, स्थिर कॉपी स्टैंड और एक समान रोशनी वाला सेटअप लाइव वीडियो प्रीव्यू से कहीं ज़्यादा भरोसेमंद है। ऐसे सेटअप से RAW फ़ाइल मिलती है, ज़्यादा विवरण कैप्चर होता है और इमेज में परिप्रेक्ष्य विकृति नहीं आती।",
      },
    ],
    filmVsDigital: [
      {
        q: "क्या फिल्म डिजिटल से ज़्यादा शार्प होती है?",
        a: "ज़रूरी नहीं। 35mm फिल्म किसी आधुनिक डिजिटल कैमरे से हमेशा ज़्यादा शार्प नहीं होती। मीडियम और लार्ज फ़ॉर्मेट में कहीं अधिक जानकारी हो सकती है, लेकिन अंतिम शार्पनेस लेंस, स्कैनिंग और एडिटिंग पर निर्भर करती है।",
      },
      {
        q: "फिल्म फ़ोटोग्राफ़ी महँगी क्यों पड़ती है?",
        a: "फिल्म में हर फ़्रेम के साथ रोल, डेवलपमेंट और स्कैनिंग का खर्च जुड़ता है। डिजिटल में ज़्यादातर पैसा शुरुआत में कैमरा बॉडी और लेंस पर लगता है, उसके बाद हर शॉट लगभग मुफ़्त होता है।",
      },
      {
        q: "पारिवारिक फ़ोटो के लिए नेगेटिव रखें या सिर्फ़ स्कैन काफ़ी हैं?",
        a: "सबसे अच्छा है दोनों रखना। नेगेटिव भौतिक मूल हैं और लंबे समय तक सहेजकर रखे जा सकते हैं, जबकि स्कैन शेयर करने, बैकअप लेने और रिश्तेदारों को भेजने में आसान होते हैं।",
      },
    ],
  },
  ko: {
    filmNegatives: [
      {
        q: "오래된 네거티브에서도 아직 사진을 살려낼 수 있나요?",
        a: "대부분은 가능합니다. 보관 상태가 좋지 않았던 오래된 컬러 네거티브라도 보통 백라이트에 비춰 보고, 반전한 뒤 화이트 밸런스를 보정할 수 있을 만큼의 정보는 남아 있습니다.",
      },
      {
        q: "네거티브와 슬라이드는 무엇이 다른가요?",
        a: "네거티브에는 밝기와 색이 반전된 상태로 기록되어 있어, 정상적인 사진으로 보려면 반전이 필요합니다. 슬라이드(리버설 필름)는 처음부터 포지티브이므로 빛에 비추기만 하면 바로 볼 수 있습니다.",
      },
      {
        q: "컬러 네거티브를 반전하면 왜 푸른빛이 도나요?",
        a: "컬러 네거티브에는 주황색 베이스(컬러 마스크)가 있어서, 그대로 반전하면 이 주황색이 파랑·시안 색조로 바뀝니다. Negative Viewer의 라이브 미리보기는 필름 가장자리의 빈 부분을 찾아 베이스 색을 추정하고 이 색조를 자동으로 제거합니다. 다만 저장한 최종 파일은 편집기에서 화이트 밸런스를 조금 손봐야 할 수도 있습니다.",
      },
    ],
    digitize35mm: [
      {
        q: "스캐너 없이 35mm를 디지털화할 수 있나요?",
        a: "네. 무엇이 찍혀 있는지 확인만 하려면 백라이트에 비춘 네거티브를 브라우저 뷰어로 보는 것이 가장 빠릅니다. 더 선명한 파일로 남기려면 스마트폰이나 카메라로 정지 이미지를 촬영한 뒤 반전하세요.",
      },
      {
        q: "스마트폰 촬영과 라이브 미리보기는 무엇이 다른가요?",
        a: "라이브 미리보기는 컷을 빠르게 선별하는 데 적합합니다. 스마트폰으로 찍은 정지 이미지는 보통 해상도가 더 높아 공유나 간단한 편집에 알맞지만, 따로 반전하고 색을 보정해야 합니다.",
      },
      {
        q: "DSLR이나 미러리스 카메라는 언제 필요한가요?",
        a: "큰 프린트, 장기 아카이브, 본격적인 복원이 목적이라면 매크로 렌즈를 장착한 카메라를 복사 스탠드에 고정하고 균일한 광원으로 촬영하는 편이 라이브 영상 미리보기보다 훨씬 안정적입니다. RAW 파일과 더 많은 디테일, 원근 왜곡 없는 이미지를 얻을 수 있습니다.",
      },
    ],
    filmVsDigital: [
      {
        q: "필름이 디지털보다 더 선명한가요?",
        a: "꼭 그렇지는 않습니다. 35mm 필름이 현대 디지털 카메라보다 반드시 선명하다고는 할 수 없습니다. 중형·대형 포맷은 더 많은 정보를 담을 수 있지만, 최종 선명도는 렌즈와 스캔, 후보정에 따라 달라집니다.",
      },
      {
        q: "필름 촬영은 왜 비용이 더 많이 드나요?",
        a: "필름은 한 컷을 찍을 때마다 필름값, 현상비, 스캔비가 듭니다. 디지털은 카메라 바디와 렌즈에 드는 초기 비용이 크지만, 그 뒤로는 한 장당 비용이 거의 들지 않습니다.",
      },
      {
        q: "가족 사진은 네거티브를 보관해야 하나요, 스캔본만 있으면 되나요?",
        a: "둘 다 보관하는 것이 가장 좋습니다. 네거티브는 오래 보관할 수 있는 물리적 오리지널이고, 스캔한 디지털 사본은 공유와 백업, 가족에게 보내기에 편리합니다.",
      },
    ],
  },
  uk: {
    filmNegatives: [
      {
        q: "Чи можна прочитати старі негативи?",
        a: "Здебільшого так. Навіть старі кольорові негативи, які зберігалися в неідеальних умовах, зазвичай містять достатньо інформації, щоб переглянути їх на просвіт, інвертувати й потім відкоригувати колір.",
      },
      {
        q: "Чим негатив відрізняється від слайда?",
        a: "У негативі яскравість і кольори обернені, тому, щоб побачити звичайне фото, його треба інвертувати. Слайд (реверсивна плівка) уже є позитивом, тож його можна роздивитися просто на просвіт.",
      },
      {
        q: "Чому після інверсії з’являється синій відтінок?",
        a: "Кольорові негативи мають помаранчеву маску, і після простої інверсії вона перетворюється на синьо-блакитний відтінок. Negative Viewer автоматично прибирає його ще під час перегляду: знаходить чистий край плівки й оцінює колір основи. Збережені файли все ж можуть потребувати невеликого коригування балансу білого в редакторі.",
      },
    ],
    digitize35mm: [
      {
        q: "Чи можна оцифрувати 35-мм плівку без сканера?",
        a: "Так. Щоб швидко переглянути вміст, піднесіть негатив до підсвічування й відкрийте браузерний переглядач. Для чіткішого файлу сфотографуйте негатив смартфоном або камерою, а потім інвертуйте знімок.",
      },
      {
        q: "Чим фото смартфоном відрізняється від живого перегляду?",
        a: "Живий перегляд зручний для швидкого відбору кадрів. Нерухомий знімок смартфоном зазвичай має вищу роздільну здатність і краще підходить для обміну чи простої обробки, але його ще треба інвертувати й відкоригувати колір у редакторі.",
      },
      {
        q: "Коли знадобиться DSLR чи бездзеркальна камера?",
        a: "Для друку, архівування чи серйозної реставрації. Камера з макрооб’єктивом на штативі чи копіювальній стійці дає файли RAW, більше деталей і кадр без перспективних спотворень.",
      },
    ],
    filmVsDigital: [
      {
        q: "Чи плівка різкіша за цифру?",
        a: "Не завжди: плівка 35 мм не обов’язково перевершує сучасну цифрову камеру. Середній і великий формати можуть містити більше інформації, але результат залежить від об’єктива, сканування й обробки.",
      },
      {
        q: "Чому знімати на плівку дорожче?",
        a: "Кожен кадр потребує витрат на плівку, проявлення й сканування. У цифровій фотографії основні витрати припадають на камеру й об’єктиви, а кожен наступний кадр майже нічого не коштує.",
      },
      {
        q: "Що краще для родинного архіву: негативи чи скани?",
        a: "Найкраще зберігати обидва варіанти. Негативи — це фізичний оригінал, а скани зручні для резервних копій, пошуку й пересилання родичам.",
      },
    ],
  },
  ar: {
    filmNegatives: [
      {
        q: "هل ما زال بالإمكان قراءة النيجاتيف القديم؟",
        a: "في معظم الحالات نعم. فحتى النيجاتيف الملوّن القديم الذي لم يُحفظ في ظروف مثالية يحتفظ عادةً بمعلومات كافية لمعاينته بإضاءة خلفية وعكسه ثم تصحيح ألوانه.",
      },
      {
        q: "ما الفرق بين النيجاتيف والشريحة؟",
        a: "يسجّل النيجاتيف السطوع والألوان معكوسةً، لذا يجب عكسه لرؤية الصورة الطبيعية. أما الشريحة (الفيلم الانعكاسي) فهي صورة موجبة أصلًا، ويمكن مشاهدتها مباشرةً أمام الضوء.",
      },
      {
        q: "لماذا يظهر ميل أزرق بعد العكس؟",
        a: "للنيجاتيف الملوّن قناع برتقالي يتحول عند العكس المباشر إلى ميل أزرق مخضرّ. يزيل Negative Viewer هذا الميل تلقائيًا أثناء المعاينة، إذ يبحث عن حافة نظيفة من الفيلم ويقدّر لون قاعدته. أما الملفات المحفوظة فقد تحتاج إلى ضبط بسيط لتوازن اللون الأبيض في محرر صور.",
      },
    ],
    digitize35mm: [
      {
        q: "هل يمكن رقمنة أفلام 35 مم دون ماسح ضوئي؟",
        a: "نعم. لمعاينة المحتوى بسرعة، ضع النيجاتيف أمام إضاءة خلفية واستخدم عارضًا يعمل في المتصفح. وإن أردت ملفًا أوضح، فصوّر النيجاتيف بالهاتف أو بالكاميرا ثم اعكس الصورة.",
      },
      {
        q: "ما الفرق بين التصوير بالهاتف والمعاينة المباشرة؟",
        a: "المعاينة المباشرة مناسبة للفرز السريع. أما الصورة الثابتة الملتقطة بالهاتف فدقتها أعلى عادةً، وهي أنسب للمشاركة أو للتعديل البسيط، لكنها تحتاج بعد ذلك إلى العكس وتصحيح الألوان في محرر.",
      },
      {
        q: "متى أحتاج إلى كاميرا DSLR أو كاميرا بلا مرآة؟",
        a: "عندما يكون هدفك الطباعة أو الأرشفة أو الترميم الجاد. فالكاميرا المزوّدة بعدسة ماكرو والمثبّتة على حامل ثلاثي أو حامل نسخ تمنحك ملفات RAW وتفاصيل أكثر وصورة خالية من تشوّه المنظور.",
      },
    ],
    filmVsDigital: [
      {
        q: "هل الفيلم أكثر حدّة من الكاميرا الرقمية؟",
        a: "ليس دائمًا؛ ففيلم 35 مم لا يتفوق بالضرورة على كاميرا رقمية حديثة. وقد يحمل القياسان المتوسط والكبير معلومات أكثر، لكن النتيجة تتوقف على العدسة والمسح والمعالجة.",
      },
      {
        q: "لماذا يكلّف التصوير بالفيلم أكثر؟",
        a: "كل لقطة تضيف تكلفة الفيلم والتحميض والمسح. أما في التصوير الرقمي فتتركّز النفقات الأساسية في الكاميرا والعدسات، ثم تكاد تكلفة كل لقطة إضافية تكون صفرًا.",
      },
      {
        q: "أيهما أفضل للأرشيف العائلي: النيجاتيف أم المسوحات؟",
        a: "الأفضل الاحتفاظ بالاثنين معًا. فالنيجاتيف هو الأصل المادي، أما المسوحات فتسهّل النسخ الاحتياطي والبحث والمشاركة مع الأقارب.",
      },
    ],
  },
  he: {
    filmNegatives: [
      {
        q: "האם אפשר עדיין לקרוא נגטיבים ישנים?",
        a: "ברוב המקרים כן. גם נגטיבים צבעוניים ישנים שנשמרו בתנאים לא אידיאליים מכילים בדרך כלל מספיק מידע כדי לצפות בהם בתאורה אחורית, להפוך אותם ואחר כך לתקן את הצבע.",
      },
      {
        q: "מה ההבדל בין נגטיב לשקופית?",
        a: "בנגטיב הבהירות והצבעים רשומים בהיפוך, ולכן צריך להפוך אותו כדי לראות תמונה רגילה. שקופית (פילם היפוך) היא כבר תמונה חיובית, ואפשר לראות אותה ישירות מול האור.",
      },
      {
        q: "למה מופיעה הטיה כחולה אחרי ההיפוך?",
        a: "לנגטיב צבעוני יש מסכה כתומה, ואחרי היפוך פשוט היא הופכת להטיה כחלחלה-ירקרקה. Negative Viewer מסיר את ההטיה הזו אוטומטית כבר בתצוגה המקדימה: הוא מאתר קטע נקי בשולי הפילם ומעריך את צבע הבסיס. בקבצים השמורים ייתכן שעדיין יידרש כוונון קל של איזון הלבן בעורך תמונות.",
      },
    ],
    digitize35mm: [
      {
        q: "אפשר לבצע דיגיטציה לפילם 35 מ״מ בלי סורק?",
        a: "כן. כדי לראות במהירות מה יש בנגטיב, הצמידו אותו לתאורה אחורית והשתמשו במציג שפועל בדפדפן. לקובץ חד יותר, צלמו את הנגטיב בטלפון או במצלמה ואז הפכו את התמונה.",
      },
      {
        q: "מה ההבדל בין צילום בטלפון לתצוגה מקדימה חיה?",
        a: "תצוגה מקדימה חיה נועדה למיון מהיר. לתמונת סטילס מהטלפון יש בדרך כלל רזולוציה גבוהה יותר, והיא מתאימה יותר לשיתוף או לעריכה פשוטה, אבל עדיין צריך להפוך אותה ולתקן את הצבע בעורך.",
      },
      {
        q: "מתי צריך מצלמת DSLR או מצלמה ללא מראה?",
        a: "כשהמטרה היא הדפסה, ארכוב לטווח ארוך או שחזור רציני. מצלמה עם עדשת מאקרו על חצובה או על מעמד העתקה נותנת קובצי RAW, יותר פרטים ותמונה בלי עיוות פרספקטיבה.",
      },
    ],
    filmVsDigital: [
      {
        q: "האם פילם חד יותר מדיגיטל?",
        a: "לא תמיד. פילם 35 מ״מ אינו עולה בהכרח על מצלמה דיגיטלית עדכנית. הפורמטים הבינוני והגדול יכולים לשאת יותר מידע, אבל התוצאה תלויה בעדשה, בסריקה ובעיבוד.",
      },
      {
        q: "למה צילום בפילם יקר יותר?",
        a: "כל פריים כרוך בעלות של פילם, פיתוח וסריקה. בדיגיטל רוב ההוצאה היא על המצלמה והעדשות, ואחר כך כל תמונה נוספת כמעט אינה עולה דבר.",
      },
      {
        q: "מה עדיף לארכיון משפחתי: נגטיבים או סריקות?",
        a: "כדאי לשמור את שניהם. הנגטיבים הם המקור הפיזי, והסריקות נוחות לגיבוי, לחיפוש ולשליחה לבני המשפחה.",
      },
    ],
  },
};

export function getGuideSeo(path) {
  return guideSeo[path] || { schemaReadTime: undefined, keywords: [], about: [] };
}

export function getLocalizedGuideFaqs(path, locale) {
  const guideKey = guideKeyByPath[path];
  return localizedGuideFaqs[locale]?.[guideKey] || [];
}

export function getLocalizedSourceTitle(locale = "en") {
  return localizedSourceTitles[locale] || localizedSourceTitles.en;
}
