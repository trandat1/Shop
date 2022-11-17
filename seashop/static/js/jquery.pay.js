/**
 * jQuery TWzipcode plugin
 * https://code.essoduke.org/twzipcode/
 * Copyright 2016 essoduke.org, Licensed MIT.
 *
 * Changelog
 * -------------------------------
 *
 * @author essoduke.org
 * @version 1.7.10
 * @license MIT License
 */
;(function ($, window, document, undefined) {

    'use strict';

    // Zipcode JSON data
    var data = {"Hà Nội":{"HUYỆN BA VÌ":"268","HUYỆN CHƯƠNG MỸ":"272","HUYỆN GIA LÂM":"274","HUYỆN HOÀI ĐỨC":"269","HUYỆN MÊ LINH":"277","HUYỆN MỸ ĐỨC":"283","HUYỆN PHÚ XUYÊN":"293","HUYỆN PHÚC THỌ":"281","HUYỆN QUỐC OAI":"287","HUYỆN SÓC SƠN":"273","HUYỆN THẠCH THẤT":"271","HUYỆN THANH OAI":"282","HUYỆN THANH TRÌ":"278","HUYỆN THƯỜNG TÍN":"297","HUYỆN ỨNG HÒA":"279","HUYỆN ĐAN PHƯỢNG":"285","HUYỆN ĐÔNG ANH":"294","QUẬN BA ĐÌNH":"288","QUẬN BẮC TỪ LIÊM":"292","QUẬN CẦU GIẤY":"280","QUẬN HAI BÀ TRƯNG":"275","QUẬN HOÀN KIẾM":"267","QUẬN HOÀNG MAI":"270","QUẬN LONG BIÊN":"286","QUẬN NAM TỪ LIÊM":"291","QUẬN TÂY HỒ":"276","QUẬN THANH XUÂN":"289","QUẬN ĐỐNG ĐA":"290","THỊ XÃ SƠN TÂY":"284","TP HÀ ĐÔNG":"296"},"Hồ Chí Minh":{"HUYỆN BÌNH CHÁNH":"237","HUYỆN CẦN GIỜ":"230","HUYỆN CỦ CHI":"224","HUYỆN HÓC MÔN":"243","HUYỆN NHÀ BÈ":"225","QUẬN 1":"231","QUẬN 10":"226","QUẬN 11":"233","QUẬN 12":"228","QUẬN 2":"241","QUẬN 3":"222","QUẬN 4":"236","QUẬN 5":"221","QUẬN 6":"220","QUẬN 7":"227","QUẬN 8":"235","QUẬN 9":"229","QUẬN BÌNH TÂN":"234","QUẬN BÌNH THẠNH":"239","QUẬN GÒ VẤP":"232","QUẬN PHÚ NHUẬN":"240","QUẬN TÂN BÌNH":"223","QUẬN TÂN PHÚ":"242","QUẬN THỦ ĐỨC":"238"},"An Giang":{"HUYỆN AN PHÚ":"4","HUYỆN CHÂU PHÚ":"6","HUYỆN CHÂU THÀNH":"10","HUYỆN CHỢ MỚI":"5","HUYỆN PHÚ TÂN":"2","HUYỆN THOẠI SƠN":"11","HUYỆN TỊNH BIÊN":"8","HUYỆN TRI TÔN":"9","THÀNH PHỐ LONG XUYÊN":"3","THỊ XÃ CHÂU ĐỐC":"1","THỊ XÃ TÂN CHÂU":"7"},"Bắc Giang":{"HUYỆN HIỆP HÒA":"33","HUYỆN LẠNG GIANG":"37","HUYỆN LỤC NAM":"39","HUYỆN LỤC NGẠN":"36","HUYỆN SƠN ĐỘNG":"40","HUYỆN TÂN YÊN":"38","HUYỆN VIỆT YÊN":"34","HUYỆN YÊN DŨNG":"41","HUYỆN YÊN THẾ":"35","THÀNH PHỐ BẮC GIANG":"32"},"Bắc Kạn":{"HUYỆN BA BỂ":"48","HUYỆN BẠCH THÔNG":"47","HUYỆN CHỢ MỚI":"42","HUYỆN CHỢ ĐỒN":"43","HUYỆN NA RÌ":"46","HUYỆN NGÂN SƠN":"44","HUYỆN PẮC NẶM":"49","THỊ XÃ BẮC KẠN":"45"},"Bạc Liêu":{"HUYỆN GIÁ RAI":"53","HUYỆN HÒA BÌNH":"50","HUYỆN HỒNG DÂN":"55","HUYỆN PHƯỚC LONG":"56","HUYỆN VĨNH LỢI":"54","HUYỆN ĐÔNG HẢI":"51","THỊ XÃ BẠC LIÊU":"52"},"Bắc Ninh":{"HUYỆN GIA BÌNH":"59","HUYỆN LƯƠNG TÀI":"57","HUYỆN QUẾ VÕ":"61","HUYỆN THUẬN THÀNH":"60","HUYỆN TIÊN DU":"63","HUYỆN TỪ SƠN":"64","HUYỆN YÊN PHONG":"62","THÀNH PHỐ BẮC NINH":"58"},"Bà Rịa Vũng Tàu":{"HUYỆN CHÂU ĐỨC":"697","HUYỆN CÔN ĐẢO":"701","HUYỆN LONG THÀNH":"700","HUYỆN LONG ĐIỀN":"702","HUYỆN TÂN THÀNH":"695","HUYỆN XUYÊN MỘC":"696","HUYỆN ĐẤT ĐỎ":"699","THÀNH PHỐ VŨNG TÀU":"698","THỊ XÃ BÀ RỊA":"694"},"Bến Tre":{"HUYỆN BA TRI":"75","HUYỆN BÌNH ĐẠI":"77","HUYỆN CHÂU THÀNH":"82","HUYỆN CHỢ LÁCH":"76","HUYỆN GIỒNG TRÔM":"81","HUYỆN MỎ CÀY BẮC":"79","HUYỆN MỎ CÀY NAM":"78","HUYỆN THẠNH PHÚ":"80","THÀNH PHỐ BẾN TRE":"83"},"Bình Ðịnh":{"HUYỆN AN LÃO":"26","HUYỆN AN NHƠN":"24","HUYỆN HOÀI ÂN":"22","HUYỆN HOÀI NHƠN":"25","HUYỆN PHÙ CÁT":"31","HUYỆN PHÙ MỸ":"29","HUYÊN TÂY SƠN":"21","HUYỆN TUY PHƯỚC":"28","HUYỆN VÂN CANH":"23","HUYỆN VĨNH THẠNH":"27","THÀNH PHỐ QUY NHƠN":"30"},"Bình Dương":{"HUYỆN BẮC TÂN UYÊN":"16","HUYỆN BÀU BÀNG":"15","HUYỆN DẦU TIẾNG":"19","HUYỆN PHÚ GIÁO":"18","THỊ XÃ BẾN CÁT":"14","THỊ XÃ DĨ AN":"13","THỊ XÃ TÂN UYÊN":"12","THỊ XÃ THỦ DẦU MỘT":"20","THỊ XÃ THUẬN AN":"17"},"Bình Phước":{"HUYỆN BÙ GIA MẬP":"74","HUYỆN BÙ ĐĂNG":"72","HUYỆN BÙ ĐỐP":"65","HUYỆN CHƠN THÀNH":"71","HUYỆN HỚN QUẢN":"69","HUYỆN LỘC NINH":"66","HUYỆN PHÚ RIỀNG":"75","HUYỆN ĐỒNG PHÚ":"68","THỊ XÃ BÌNH LONG":"70","THỊ XÃ PHƯỚC LONG":"73","THỊ XÃ ĐỒNG XOÀI":"67"},"Bình Thuận":{"HUYỆN BẮC BÌNH":"92","HUYỆN HÀM TÂN":"90","HUYỆN HÀM THUẬN BẮC":"84","HUYỆN HÀM THUẬN NAM":"91","HUYỆN PHÚ QUÝ":"85","HUYỆN TÁNH LINH":"87","HUYỆN TUY PHONG":"86","HUYỆN ĐỨC LINH":"88","THÀNH PHỐ PHAN THIẾT":"93","THỊ XÃ LA GI":"89"},"Cần Thơ":{"HUYỆN CỜ ĐỎ":"126","HUYỆN PHONG ĐIỀN":"123","HUYỆN THỚI LAI":"117","HUYỆN VĨNH THẠNH":"121","QUẬN BÌNH THỦY":"127","QUẬN CÁI RĂNG":"125","QUẬN NINH KIỀU":"118","QUẬN Ô MÔN":"116","QUẬN THỐT NỐT":"119"},"Cao Bằng":{"HUYỆN BẢO LẠC":"97","HUYỆN BẢO LÂM":"101","HUYỆN HẠ LANG":"95","HUYỆN HÀ QUẢNG":"103","HUYỆN HÒA AN":"105","HUYỆN NGUYÊN BÌNH":"96","HUYỆN PHỤC HÒA":"98","HUYỆN QUẢNG UYÊN":"106","HUYỆN THẠCH AN":"94","HUYỆN THÔNG NÔNG":"100","HUYỆN TRÀ LĨNH":"104","HUYỆN TRÙNG KHÁNH":"99","THỊ XÃ CAO BẰNG":"102"},"Cà Mau":{"HUYỆN CÁI NƯỚC":"107","HUYỆN NĂM CĂN":"108","HUYỆN NGỌC HIỂN":"110","HUYỆN PHÚ TÂN":"113","HUYỆN THỚI BÌNH":"115","HUYỆN TRẦN VĂN THỜI":"112","HUYỆN U MINH":"111","HUYỆN ĐẦM DƠI":"109","THÀNH PHỐ CÀ MAU":"114"},"Đắk Lắk":{"HUYỆN BUÔN ĐÔN":"154","HUYỆN CƯ KUIN":"159","HUYỆN CƯ M'GAR":"153","HUYỆN EA H'LEO":"158","HUYỆN EA KAR":"149","HUYỆN EA SÚP":"155","HUYỆN KRÔNG A NA":"151","HUYỆN KRÔNG BÔNG":"156","HUYỆN KRÔNG BÚK":"146","HUYỆN KRÔNG NĂNG":"147","HUYỆN KRÔNG PẮK":"160","HUYỆN LẮK":"152","HUYỆN M'ĐRẮK":"157","THÀNH PHỐ BUÔN MA THUỘT":"150","THỊ XÃ BUÔN HỒ":"148"},"Đăk Nông":{"HUYỆN CƯ JÚT":"141","HUYỆN KRÔNG NÔ":"142","HUYỆN TUY ĐỨC":"139","HUYỆN ĐẮK GLONG":"138","HUYỆN ĐẮK MIL":"144","HUYỆN ĐẮK RLẤP":"145","HUYỆN ĐẮK SONG":"143","THỊ XÃ GIA NGHĨA":"140"},"Đà Nẵng":{"HUYỆN HÒA VANG":"169","HUYỆN HOÀNG SA":"167","QUẬN CẨM LỆ":"161","QUẬN HẢI CHÂU":"164","QUẬN LIÊN CHIỂU":"166","QUẬN NGŨ HÀNH SƠN":"163","QUẬN SƠN TRÀ":"165","QUẬN THANH KHÊ":"162"},"Điện Biên":{"HUYỆN MƯỜNG ÁNG":"133","HUYỆN MƯỜNG CHÀ":"135","HUYỆN MƯỜNG NHÉ":"132","HUYỆN NẬM PỒ":"134","HUYỆN TỦA CHÙA":"136","HUYỆN TUẦN GIÁO":"137","HUYỆN ĐIỆN BIÊN":"129","HUYỆN ĐIỆN BIÊN ĐÔNG":"130","THÀNH PHỐ ĐIỆN BIÊN PHỦ":"128","THỊ XÃ MƯỜNG LAY":"131"},"Đồng Nai":{"HUYỆN CẨM MỸ":"176","HUYỆN LONG THÀNH":"179","HUYỆN NHƠN TRẠCH":"174","HUYỆN TÂN PHÚ":"171","HUYỆN THỐNG NHẤT":"172","HUYỆN TRẢNG BOM":"170","HUYỆN VĨNH CỬU":"173","HUYỆN XUÂN LỘC":"177","HUYỆN ĐỊNH QUÁN":"178","THÀNH PHỐ BIÊN HÒA":"175","THỊ XÃ LONG KHÁNH":"180"},"Ðồng Tháp":{"HUYỆN CAO LÃNH":"187","HUYỆN CHÂU THÀNH":"185","HUYỆN HỒNG NGỰ":"186","HUYỆN LAI VUNG":"184","HUYỆN LẤP VÒ":"182","HUYỆN TAM NÔNG":"191","HUYỆN TÂN HỒNG":"181","HUYỆN THANH BÌNH":"190","HUYỆN THÁP MƯỜI":"189","THÀNH PHỐ CAO LÃNH":"183","THỊ XÃ SA ĐÉC":"188"},"Gia Lai":{"HUYỆN CHƯ PĂH":"204","HUYỆN CHƯ PRÔNG":"192","HUYỆN CHƯ PƯH":"206","HUYỆN CHƯ SÊ":"200","HUYỆN IA GRAI":"198","HUYỆN IA PA":"205","HUYỆN KBANG":"201","HUYỆN KÔNG CHRO":"202","HUYỆN KRÔNG PA":"193","HUYỆN MANG YANG":"203","HUYỆN PHÚ THIỆN":"194","HUYỆN ĐĂK PƠ":"197","HUYỆN ĐĂK ĐOA":"196","HUYỆN ĐỨC CƠ":"199","THÀNH PHỐ PLEIKU":"195","THỊ XÃ AN KHÊ":"207","THỊ XÃ AYUN PA":"208"},"Hải Dương":{"HUYỆN BÌNH GIANG":"253","HUYỆN CẨM GIÀNG":"248","HUYỆN CHÍ LINH":"252","HUYỆN GIA LỘC":"254","HUYỆN KIM THÀNH ":"255","HUYỆN KINH MÔN":"251","HUYỆN NAM SÁCH":"250","HUYỆN NINH GIANG":"245","HUYỆN THANH HÀ ":"247","HUYỆN THANH MIỆN":"249","HUYỆN TỨ KỲ":"246","TP HẢI DƯƠNG":"244"},"Hải Phòng":{"HUYỆN AN DƯƠNG":"307","HUYỆN AN LÃO":"311","HUYỆN KIẾN THỤY":"309","HUYỆN THỦY NGUYÊN":"315","HUYỆN TIÊN LÃNG":"317","HUYỆN VĨNH BẢO":"312","HUYỆN ĐẢO BẠCH LONG VĨ":"308","HUYỆN ĐẢO CÁT HẢI":"314","QUẬN DƯƠNG KINH":"310","QUẬN HẢI AN":"318","QUẬN HỒNG BÀNG":"304","QUẬN KIẾN AN":"313","QUẬN LÊ CHÂN":"306","QUẬN NGÔ QUYỀN":"316","QUẬN ĐỒ SƠN":"305"},"Hậu Giang":{"HUYỆN CHÂU THÀNH ":"343","HUYỆN CHÂU THÀNH A":"341","HUYỆN LONG MỸ":"342","HUYỆN PHỤNG HIỆP":"346","HUYỆN VỊ THỦY":"344","THỊ XÃ LONG MỸ":"347","THỊ XÃ NGÃ BẢY":"345","TP. VỊ THANH":"340"},"Hà Giang":{"HUYỆN BẮC MÊ":"259","HUYỆN BẮC QUANG":"261","HUYỆN HOÀNG SU PHÌ":"256","HUYỆN MÈO VẠC":"265","HUYỆN QUẢN BẠ":"257","HUYỆN QUANG BÌNH":"266","HUYỆN VỊ XUYÊN":"258","HUYỆN XÍN MẦN":"260","HUYỆN YÊN MINH":"264","HUYỆN ĐỒNG VĂN":"263","THỊ XÃ HÀ GIANG":"262"},"Hà Nam":{"HUYỆN BÌNH LỤC":"303","HUYỆN DUY TIÊN":"298","HUYỆN KIM BẢNG":"299","HUYỆN LÝ NHÂN":"300","HUYỆN THANH LIÊM":"302","THỊ XÃ PHỦ LÝ":"301"},"Hà Tĩnh":{"HUYỆN CẨM XUYÊN":"326","HUYỆN CAN LỘC":"321","HUYỆN HƯƠNG KHÊ":"325","HUYỆN HƯƠNG SƠN":"324","HUYỆN KỲ ANH":"329","HUYỆN LỘC HÀ":"322","HUYỆN NGHI XUÂN":"323","HUYỆN THẠCH HÀ":"328","HUYỆN VŨ QUANG":"319","HUYỆN ĐỨC THỌ":"320","THÀNH PHỐ HÀ TĨNH":"327","THỊ XÃ HỒNG LĨNH":"330","THỊ XÃ KỲ ANH":"331"},"Hòa Bình":{"HUYỆN CAO PHONG":"215","HUYỆN KIM BÔI":"211","HUYỆN KỲ SƠN":"209","HUYỆN LẠC SƠN":"217","HUYỆN LẠC THỦY":"210","HUYỆN LƯƠNG SƠN":"213","HUYỆN MAI CHÂU":"219","HUYỆN TÂN LẠC":"212","HUYỆN YÊN THỦY":"214","HUYỆN ĐÀ BẮC":"216","THỊ XÃ HÒA BÌNH":"218"},"Hưng Yên":{"HUYỆN ÂN THI":"350","HUYỆN KHOÁI CHÂU":"349","HUYỆN KIM ĐỘNG":"353","HUYỆN MỸ HÀO":"352","HUYỆN PHÙ CỪ":"347","HUYỆN TIÊN LỮ ":"354","HUYỆN VĂN GIANG":"351","HUYỆN VĂN LÂM":"348","HUYỆN YÊN MỸ":"355","THỊ XÃ HƯNG YÊN":"356"},"Khánh Hòa":{"HUYỆN CAM LÂM":"379","HUYỆN DIÊN KHÁNH":"376","HUYỆN KHÁNH SƠN":"374","HUYỆN KHÁNH VĨNH":"377","HUYỆN NINH HÒA":"373","HUYỆN TRƯỜNG SA":"378","HUYỆN VẠN NINH":"380","THÀNH PHỐ CAM RANH":"375","THÀNH PHỐ NHA TRANG":"372"},"Kiên Giang":{"HUYỆN AN BIÊN":"357","HUYỆN AN MINH":"371","HUYỆN CHÂU THÀNH":"361","HUYÊN GIANG THÀNH":"363","HUYỆN GIỒNG RIỀNG":"358","HUYỆN GÒ QUAO":"368","HUYỆN HÒN ĐẤT":"362","HUYỆN KIÊN HẢI":"370","HUYỆN KIÊN LƯƠNG":"360","HUYỆN PHÚ QUỐC":"367","HUYỆN TÂN HIỆP":"366","HUYỆN U MINH THƯỢNG":"359","HUYỆN VĨNH THUẬN":"364","THÀNH PHỐ RẠCH GIÁ":"365","THỊ XÃ HÀ TIÊN":"369"},"Kon Tum":{"HUYỆN IA H'DRAI":"390","HUYỆN KON PLÔNG":"384","HUYỆN KON RẪY":"388","HUYỆN NGỌC HỒI":"387","HUYỆN SA THẦY":"382","HUYỆN TU MƠ RÔNG":"383","HUYỆN ĐẮK GLEI":"389","HUYỆN ĐẮK HÀ":"381","HUYỆN ĐẮK TÔ":"386","THÀNH PHỐ KON TUM":"385"},"Lai Châu":{"HUYỆN MƯỜNG TÈ":"417","HUYỆN NẬM NHÙN":"419","HUYỆN PHONG THỔ":"414","HUYỆN SÌN HỒ":"415","HUYỆN TAM ĐƯỜNG":"413","HUYỆN TÂN UYÊN":"418","HUYỆN THAN UYÊN":"416","THỊ XÃ LAI CHÂU":"420"},"Lâm Ðồng":{"HUYỆN BẢO LÂM":"422","HUYỆN CÁT TIÊN":"423","HUYỆN DI LINH":"424","HUYỆN LẠC DƯƠNG":"421","HUYỆN LÂM HÀ":"426","HUYỆN ĐẠ HUOAI":"425","HUYỆN ĐẠ TẺH":"428","HUYỆN ĐAM RÔNG":"429","HUYỆN ĐƠN DƯƠNG":"431","HUYỆN ĐỨC TRỌNG":"432","THÀNH PHỐ ĐÀ LẠT":"427","THỊ XÃ BẢO LỘC":"430"},"Lạng Sơn":{"HUYỆN BẮC SƠN":"436","HUYỆN BÌNH GIA":"441","HUYỆN CAO LỘC":"439","HUYỆN CHI LĂNG":"435","HUYỆN HỮU LŨNG":"434","HUYỆN LỘC BÌNH":"438","HUYỆN TRÀNG ĐỊNH":"443","HUYỆN VĂN LÃNG":"437","HUYỆN VĂN QUAN":"433","HUYỆN ĐÌNH LẬP":"440","THÀNH PHỐ LẠNG SƠN":"442"},"Lào Cai":{"HUYỆN BẮC HÀ":"409","HUYỆN BẢO THẮNG":"412","HUYỆN BẢO YÊN":"411","HUYỆN BÁT XÁT":"407","HUYỆN MƯỜNG KHƯƠNG":"406","HUYỆN SA PA":"405","HUYỆN SI MA CAI":"410","HUYỆN VĂN BÀN":"408","THÀNH PHỐ LÀO CAI":"404"},"Long An":{"HUYỆN BẾN LỨC":"397","HUYỆN CẦN GUỘC":"392","HUYỆN CẦN ĐƯỚC":"393","HUYỆN CHÂU THÀNH":"396","HUYỆN MỘC HÓA":"400","HUYỆN TÂN HƯNG":"395","HUYỆN TÂN THẠNH":"398","HUYỆN TÂN TRỤ":"390","HUYỆN THẠNH HÓA":"399","HUYỆN THỦ THỪA":"403","HUYỆN VĨNH HƯNG":"402","HUYỆN ĐỨC HÒA":"401","HUYỆN ĐỨC HUỆ":"391","THỊ XÃ KIẾN TƯỜNG":"404","THỊ XÃ TÂN AN":"394"},"Nam Ðịnh":{"HUYỆN GIAO THỦY":"476","HUYỆN HẢI HẬU":"479","HUYỆN MỸ LỘC":"475","HUYỆN NAM TRỰC":"473","HUYỆN NGHĨA HƯNG":"477","HUYỆN TRỰC NINH":"474","HUYỆN VỤ BẢN":"480","HUYỆN XUÂN TRƯỜNG":"481","HUYỆN Ý YÊN":"482","THÀNH PHỐ NAM ĐỊNH":"478"},"Nghệ An":{"HUYỆN ANH SƠN":"444","HUYỆN CON CUÔNG":"445","HUYỆN DIỄN CHÂU":"453","HUYỆN HƯNG NGUYÊN":"446","HUYỆN KỲ SƠN":"454","HUYỆN NAM ĐÀN":"460","HUYỆN NGHI LỘC":"457","HUYỆN NGHĨA ĐÀN":"461","HUYỆN QUẾ PHONG":"451","HUYỆN QUỲ CHÂU":"448","HUYỆN QUỲ HỢP":"463","HUYỆN QUỲNH LƯU":"459","HUYỆN TÂN KỲ":"452","HUYỆN THANH CHƯƠNG":"462","HUYỆN TƯƠNG DƯƠNG":"450","HUYỆN YÊN THÀNH":"458","HUYỆN ĐÔ LƯƠNG":"456","THÀNH PHỐ VINH":"455","THỊ XÃ CỬA LÒ":"449","THỊ XÃ HOÀNG MAI":"464","THỊ XÃ THÁI HÒA":"447"},"Ninh Bình":{"HUYỆN GIA VIỄN":"467","HUYỆN HOA LƯ":"471","HUYỆN KIM SƠN":"465","HUYỆN NHO QUAN":"466","HUYỆN YÊN KHÁNH":"470","HUYỆN YÊN MÔ":"468","THÀNH PHỐ NINH BÌNH":"464","THỊ XÃ TAM ĐIỆP":"472"},"Ninh Thuận":{"HUYỆN BÁC ÁI":"483","HUYỆN NINH HẢI":"487","HUYỆN NINH PHƯỚC":"484","HUYỆN NINH SƠN":"485","HUYỆN THUẬN BẮC":"488","HUYỆN THUẬN NAM":"486","TP.PHAN RANG - THÁP CHÀM":"489"},"Phú Thọ":{"HUYỆN CẨM KHÊ":"498","HUYỆN HẠ HÒA":"501","HUYỆN LÂM THAO":"500","HUYỆN PHÙ NINH":"502","HUYỆN TAM NÔNG":"499","HUYỆN TÂN SƠN":"496","HUYỆN THANH BA":"491","HUYỆN THANH SƠN":"495","HUYỆN THANH THỦY":"494","HUYỆN YÊN LẬP":"497","HUYỆN ĐOAN HÙNG":"493","THÀNH PHỐ VIỆT TRÌ":"492","THI XÃ PHÚ THỌ":"490"},"Phú Yên":{"HUYỆN PHÚ HÒA":"509","HUYỆN SƠN HÒA":"510","HUYỆN SÔNG HINH":"511","HUYỆN TÂY HÒA":"505","HUYỆN TUY AN":"504","HUYỆN ĐÔNG HÒA":"506","HUYỆN ĐỒNG XUÂN":"508","THÀNH PHỐ TUY HÒA":"507","THỊ XÃ SÔNG CẦU":"503"},"Quảng Bình":{"HUYỆN BỐ TRẠCH":"518","HUYỆN LỆ THỦY":"512","HUYỆN MINH HÓA":"516","HUYỆN QUẢNG NINH":"517","HUYỆN QUẢNG TRẠCH":"515","HUYỆN TUYÊN HÓA":"513","THÀNH PHỐ ĐỒNG HỚI":"514","THỊ XÃ BA ĐỒN":"519"},"Quảng Nam":{"HUYỆN BẮC TRÀ MY":"554","HUYỆN DUY XUYÊN":"564","HUYỆN HIỆP ĐỨC":"563","HUYỆN NAM GIANG":"550","HUYỆN NAM TRÀ MY":"562","HUYỆN NÔNG SƠN":"559","HUYỆN NÚI THÀNH":"560","HUYỆN PHÚ NINH":"547","HUYỆN PHƯỚC SƠN":"548","HUYỆN QUẾ SƠN":"558","HUYỆN TÂY GIANG":"555","HUYỆN THĂNG BÌNH":"551","HUYỆN TIÊN PHƯỚC":"556","HUYỆN ĐẠI LỘC":"549","HUYỆN ĐIỆN BÀN":"557","HUYỆN ĐÔNG GIANG":"553","THÀNH PHỐ HỘI AN":"561","THÀNH PHỐ TAM KỲ":"552"},"Quảng Ngãi":{"HUYỆN BA TƠ":"545","HUYỆN BÌNH SƠN":"536","HUYỆN LÝ SƠN":"541","HUYỆN MINH LONG":"535","HUYỆN MỘ ĐỨC":"538","HUYỆN NGHĨA HÀNH":"533","HUYỆN SƠN HÀ":"542","HUYỆN SƠN TÂY":"546","HUYỆN SƠN TỊNH":"544","HUYỆN TÂY TRÀ":"540","HUYỆN TRÀ BỒNG":"539","HUYỆN TƯ NGHĨA":"534","HUYỆN ĐỨC PHỔ":"543","THÀNH PHỐ QUẢNG NGÃI":"537"},"Quảng Ninh":{"HUYỆN BA CHẼ":"523","HUYỆN BÌNH LIÊU":"524","HUYỆN CÔ TÔ":"528","HUYỆN HẢI HÀ":"530","HUYỆN HOÀNH BỒ":"532","HUYỆN TIÊN YÊN":"519","HUYỆN VÂN ĐỒN":"526","HUYỆN YÊN HƯNG":"521","HUYỆN ĐẦM HÀ":"525","HUYỆN ĐÔNG TRIỀU":"522","THÀNH PHỐ HẠ LONG":"531","THỊ XÃ CẨM PHẢ":"527","THỊ XÃ MÓNG CÁI":"529","THỊ XÃ UÔNG BÍ":"520"},"Quảng Trị":{"HUYỆN CAM LỘ":"569","HUYỆN GIO LINH":"574","HUYỆN HẢI LĂNG":"572","HUYỆN HƯỚNG HÓA":"567","HUYỆN TRIỆU PHONG":"565","HUYỆN VĨNH LINH":"573","HUYỆN ĐA KRÔNG":"571","THÀNH PHỐ ĐÔNG HÀ":"566","THỊ XÃ QUẢNG TRỊ":"568"},"Sóc Trăng":{"HUYỆN CHÂU THÀNH":"589","HUYỆN CÙ LAO DUNG":"592","HUYỆN KẾ SÁCH":"591","HUYỆN LONG PHÚ":"587","HUYỆN MỸ TÚ":"596","HUYỆN MỸ XUYÊN":"595","HUYỆN NGÃ NĂM":"590","HUYỆN THẠNH TRỊ":"588","HUYỆN TRẦN ĐỀ":"593","HUYỆN VĨNH CHÂU":"597","THÀNH PHỐ SÓC TRĂNG":"594"},"Sơn La":{"HUYỆN BẮC YÊN":"585","HUYỆN MAI SƠN":"579","HUYỆN MỘC CHÂU":"582","HUYỆN MƯỜNG LA":"576","HUYỆN PHÙ YÊN":"580","HUYỆN QUỲNH NHAI":"575","HUYỆN SÔNG MÃ":"577","HUYỆN SỐP CỘP":"586","HUYỆN THUẬN CHÂU":"581","HUYỆN VÂN HỒ":"584","HUYỆN YÊN CHÂU":"583","THỊ XÃ SƠN LA":"578"},"Tây Ninh":{"HUYỆN BẾN CẦU":"652","HUYỆN CHÂU THÀNH":"645","HUYỆN DƯƠNG MINH CHÂU":"651","HUYỆN GÒ DẦU":"649","HUYỆN HÒA THÀNH":"647","HUYỆN TÂN BIÊN":"648","HUYỆN TÂN CHÂU":"644","HUYỆN TRẢNG BÀNG":"650","THỊ XÃ TÂY NINH":"646"},"Thái Bình":{"HUYỆN HƯNG HÀ":"601","HUYỆN KIẾN XƯƠNG":"606","HUYỆN QUỲNH CÔI":"602","HUYỆN QUỲNH PHỤ":"600","HUYỆN THÁI THỤY":"598","HUYỆN TIỀN HẢI":"605","HUYỆN VŨ THƯ":"599","HUYỆN ĐÔNG HƯNG":"604","THÀNH PHỐ THÁI BÌNH":"603"},"Thái Nguyên":{"HUYỆN PHỔ YÊN":"653","HUYỆN PHÚ BÌNH":"657","HUYỆN PHÚ LƯƠNG ":"654","HUYỆN VÕ NHAI":"655","HUYỆN ĐẠI TỪ":"659","HUYỆN ĐỊNH HÓA":"660","HUYỆN ĐỒNG HỶ":"658","THÀNH PHỐ THÁI NGUYÊN":"656","THỊ XÃ SÔNG CÔNG":"661"},"Thanh Hóa":{"HUYỆN BÁ THƯỚC":"638","HUYỆN CẨM THỦY":"636","HUYỆN HÀ TRUNG":"634","HUYỆN HẬU LỘC":"632","HUYỆN HOẰNG HÓA":"618","HUYỆN LANG CHÁNH":"625","HUYỆN MƯỜNG LÁT":"635","HUYỆN NGA SƠN":"622","HUYỆN NGỌC LẶC":"617","HUYỆN NHƯ THANH":"633","HUYỆN NHƯ XUÂN":"631","HUYỆN NÔNG CỐNG":"628","HUYỆN QUAN HÓA":"637","HUYỆN QUAN SƠN":"619","HUYỆN QUẢNG XƯƠNG":"621","HUYỆN THẠCH THÀNH":"620","HUYỆN THIỆU HÓA":"642","HUYỆN THỌ XUÂN":"640","HUYỆN THƯỜNG XUÂN":"630","HUYỆN TĨNH GIA":"629","HUYỆN TRIỆU SƠN":"627","HUYỆN VĨNH LỘC":"624","HUYỆN YÊN ĐỊNH":"639","HUYỆN ĐÔNG SƠN":"623","THÀNH PHỐ THANH HÓA":"626","THỊ XÃ BỈM SƠN":"641","THỊ XÃ SẦM SƠN":"643"},"Thừa Thiên Huế":{"HUYỆN A LƯỚI":"334","HUYỆN HƯƠNG TRÀ":"338","HUYỆN NAM ĐÔNG":"337","HUYỆN PHONG ĐIỀN":"335","HUYỆN PHÚ LỘC":"332","HUYỆN PHÚ VANG":"331","HUYỆN QUẢNG ĐIỀN":"336","THÀNH PHỐ HUẾ":"339","THỊ XÃ HƯƠNG THỦY":"333"},"Tiền Giang":{"HUYỆN CÁI BÈ":"610","HUYỆN CAI LẬY":"615","HUYỆN CHÂU THÀNH":"612","HUYỆN CHỢ GẠO":"608","HUYỆN GÒ CÔNG TÂY":"609","HUYỆN GÒ CÔNG ĐÔNG":"611","HUYỆN TÂN PHÚ ĐÔNG":"607","HUYỆN TÂN PHƯỚC":"613","THÀNH PHỐ MỸ THO":"616","THỊ XÃ GÒ CÔNG":"614"},"Trà Vinh":{"HUYỆN CÀNG LONG":"672","HUYỆN CẦU KÈ":"671","HUYỆN CẦU NGANG":"674","HUYỆN CHÂU THÀNH":"673","HUYỆN DUYÊN HẢI":"670","HUYỆN TIỂU CẦN":"676","HUYỆN TRÀ CÚ":"669","THỊ XÃ TRÀ VINH":"675"},"Tuyên Quang":{"HUYỆN CHIÊM HÓA":"665","HUYỆN HÀM YÊN":"668","HUYỆN LÂM BÌNH":"667","HUYỆN NÀ HANG":"666","HUYỆN SƠN DƯƠNG":"664","HUYỆN YÊN SƠN":"663","THỊ XÃ TUYÊN QUANG":"662"},"Vĩnh Long":{"HUYỆN BÌNH MINH":"677","HUYỆN BÌNH TÂN":"679","HUYỆN LONG HỒ":"678","HUYỆN MANG THÍT":"684","HUYỆN TAM BÌNH":"681","HUYỆN TRÀ ÔN":"683","HUYỆN VŨNG LIÊM":"680","THÀNH PHỐ VĨNH LONG":"682"},"Vĩnh Phúc":{"HUYỆN BÌNH XUYÊN":"687","HUYỆN LẬP THẠCH":"693","HUYỆN SÔNG LÔ":"688","HUYỆN TAM DƯƠNG":"686","HUỴÊN TAM ĐẢO":"691","HUYỆN VĨNH TƯỜNG":"692","HUYÊN YÊN LẠC":"685","THÀNH PHỐ VĨNH YÊN":"690","THỊ XÃ PHÚC YÊN":"689"},"Yên Bái":{"HUYỆN LỤC YÊN":"707","HUYỆN MÙ CĂNG CHẢI":"709","HUYỆN TRẠM TẤU":"706","HUYỆN TRẤN YÊN":"710","HUYỆN VĂN CHẤN":"703","HUYỆN VĂN YÊN":"704","HUYỆN YÊN BÌNH":"705","THÀNH PHỐ YÊN BÁI":"711","THỊ XÃ NGHĨA LỘ":"708"}};
    /**
     * twzipcode Constructor
     * @param {Object} container HTML element
     * @param {(Object|string)} options User settings
     * @constructor
     */
    function TWzipcode (container, options) {
        /**
         * Default settings
         * @type {Object}
         */
        var defaults = {
            'countyName': 'province',
            'css': [],
            'detect': false,             // v1.6.7
            'districtName': 'city',
            'googleMapsKey': '', // v1.6.9
            'hideCounty': [], // v1.7.9
            'hideDistrict': [], // v1.7.9
            'onCountySelect': null,      // v1.5
            'onDistrictSelect': null,    // v1.5
            'onZipcodeKeyUp': null,      // v1.5
            'readonly': false,
            'zipcodeName': 'zipcode',
            'zipcodePlaceholder': '',
            'zipcodeIntoDistrict': false, // v1.6.6
        };
        /**
         * DOM of selector
         * @type {Object}
         */
        this.container = $(container);
        /**
         * Merge the options
         * @type {Object}
         */
        this.options = $.extend({}, defaults, options);
        // initialize
        this.init();
    }
    /**
     * TWzipcode prototype
     */
    TWzipcode.prototype = {

        VERSION: '1.7.10',

        /**
         * Method: Get all post data
         * @return {Object}
         */
        data: function () {
            var wrap = this.wrap;
            return 'undefined' !== typeof data[wrap.county.val()] ?
                   data[wrap.county.val()] :
                   data;
        },
        /**
         * Method: Serialize the data
         * @return {string}
         */
        serialize: function () {
            var result = [],
                obj = {},
                ele = {},
                s = {};
            obj = this.container.find('select,input');
            if (obj.length) {
                obj.each(function () {
                    ele = $(this);
                    result.push(ele.attr('name') + '=' + ele.val());
                });
            } else {
                $(this).children().each(function () {
                    s = $(this);
                    result.push(s.attr('name') + '=' + s.val());
                });
            }
            return result.join('&');
        },
        /**
         * Method: Destroy the container.
         * @this {TWzipcode}
         */
        destroy: function () {
            $.data(this.container.get(0), 'twzipcode', null);
            if (this.container.length) {
                return this.container.empty().off('change.twzipcode keyup.twzipcode blur.twzipcode');
            }
        },
        /**
         * Method: Get elements of instance
         * @param {(string|Array)} opts Type name
         * @param {Function} callback Function callback
         */
        get: function (callback) {
            if ('function' === typeof callback) {
                callback.call(this, this.wrap);
            } else {
                return this.wrap;
            }
        },
        /**
         * Method: Set value for elements.
         * @param {(string|number|Object)} opts Input value
         */
        set: function (opts) {

            var self = this,
                def = {
                    'county': '',
                    'district': '',
                    'zipcode': ''
                },
                opt = $.extend({}, def, opts);

            try {
                if ('string' === typeof opts || 'number' === typeof opts) {
                    self.wrap.zipcode.val(opts).trigger('blur.twzipcode');
                } else {
                    if (opt.zipcode) {
                        self.wrap.zipcode.val(opt.zipcode).trigger('blur.twzipcode');
                    }
                    if (opt.county) {
                        self.wrap.county.val(opt.county).trigger('change.twzipcode');
                    }
                    if (opt.district) {
                        self.wrap.district.val(opt.district).trigger('change.twzipcode');
                    }
                }
            } catch (ignore) {
                console.warn(ignore.message);
            } finally {
                return self.container;
            }
        },
        /**
         * Method: Reset the selected items to default.
         * @this {TWzipcode}
         */
        reset: function (container, obj) {
            var self = this,
                wrap = self.wrap,
                opts = self.options,
                county = '',
                list = {
                    'county': '<option value="">Thành Phố / Tỉnh</option>',
                    'district': '<option value="">Quận / Huyện</option>'
                },
                tpl = [];

            switch (obj) {
            case 'district':
                wrap.district.html(list.district);
                break;
            default:
                wrap.county.html(list.county);
                wrap.district.html(list.district);
                for (county in data) {
                    if ('undefined' !== typeof data[county] && -1 === opts.hideCounty.indexOf(county)) {
                        tpl.push('<option value="' + county + '">' + county + '</option>');
                    }
                }
                $(tpl.join('')).appendTo(wrap.county);
                break;
            }
            wrap.zipcode.val('');
        },
        /**
         * Binding the event of the elements
         * @this {TWzipcode}
         */
        bindings: function () {

            var self = this,
                opts = self.options,
                wrap = self.wrap,
                dz   = '',
                dc   = '',
                dd   = '';

            // county
            wrap.county.on('change.twzipcode', function () {
                var val = $(this).val(),
                    district = '',
                    tpl = [];

                wrap.district.empty();

                if (val) {
                    if (true === opts.zipcodeIntoDistrict) {
                        for (district in data[val]) {
                            if ('undefined' !== typeof data[val][district] &&
                                (-1 === opts.hideDistrict.indexOf(district) && -1 === opts.hideDistrict.indexOf(data[val][district]))
                            ) {
                                tpl.push('<option value="' + district + '">');
                                tpl.push(data[val][district] + ' ' + district);
                                tpl.push('</option>');
                            }
                        }
                    } else {
						tpl.push('<option value="">');
                        tpl.push('Hãy chọn');
                        tpl.push('</option>');
                        for (district in data[val]) {
                            if ('undefined' !== typeof data[val][district] &&
                                (-1 === opts.hideDistrict.indexOf(district) && -1 === opts.hideDistrict.indexOf(data[val][district]))
                            ) {
                                tpl.push('<option value="' + district + '">');
                                tpl.push(district);
                                tpl.push('</option>');
                            }
                        }
                    }
                    wrap.district.append(tpl.join('')).trigger('change.twzipcode');
                } else {
                    wrap.county.find('option:first').prop('selected', true);
                    self.reset('district');
                }
                // County callback binding
                if ('function' === typeof opts.onCountySelect) {
                    opts.onCountySelect.call(this);
                }
            });
            // District
            wrap.district.on('change.twzipcode', function () {
                var val = $(this).val();
                if (wrap.county.val()) {
                    wrap.zipcode.val(data[wrap.county.val()][val]);
                }
                // District callback binding
                if ('function' === typeof opts.onDistrictSelect) {
                    opts.onDistrictSelect.call(this);
                }
            });
            // Zipcode
            wrap.zipcode.on('keyup.twzipcode blur.twzipcode', function () {

                var obj = $(this),
                    val = '',
                    i   = '',
                    j   = '';
                obj.val(obj.val().replace(/[^0-9]/g, ''));
                val = obj.val().toString();

                if (3 === val.length) {
                    for (i in data) {
                        if ('undefined' !== typeof data[i]) {
                            for (j in data[i]) {
                                if ('undefined' !== typeof data[i][j] &&
                                    val === data[i][j]
                                ) {
                                    wrap.county.val(i).trigger('change.twzipcode');
                                    wrap.district.val(j).trigger('change.twzipcode');
                                    break;
                                }
                            }
                        }
                    }
                }
                // Zipcode callback binding
                if ('function' === typeof opts.onZipcodeKeyUp) {
                    opts.onZipcodeKeyUp.call(this);
                }
            });

            dz = 'undefined' !== typeof opts.zipcodeSel ?
                 opts.zipcodeSel :
                 (
                    'undefined' !== typeof self.role.zipcode.data('value') ?
                    self.role.zipcode.data('value') :
                    opts.zipcodeSel
                 );

            dc = 'undefined' !== typeof opts.countySel ?
                 opts.countySel :
                 (
                    'undefined' !== typeof self.role.county.data('value') ?
                    self.role.county.data('value') :
                    opts.countySel
                 );

            dd = 'undefined' !== typeof opts.districtSel ?
                 opts.districtSel :
                 (
                    'undefined' !== typeof self.role.district.data('value') ?
                    self.role.district.data('value') :
                    opts.districtSel
                 );

            // Default value
            if (dc) {
                self.wrap.county.val(dc).trigger('change.twzipcode');
                if ('undefined' !== typeof data[dc][dd]) {
                    self.wrap.district.val(dd).trigger('change.twzipcode');
                }
            }
            if (dz && 3 === dz.toString().length) {
                self.wrap.zipcode.val(dz).trigger('blur.twzipcode');
            }
        },
        /**
         * Geolocation detect
         * @this {TWzipcode}
         */
        geoLocation: function () {

			var self = this,
                geolocation = navigator.geolocation,
                options = {
                    'maximumAge': 600000,
                    'timeout': 3000,
                    'enableHighAccuracy': false
                },
                opts = self.options;

            if (!geolocation) {
                return;
            }

            geolocation.getCurrentPosition(
                function (loc) {

                    var latlng = {};
                    if (('coords' in loc) &&
                        ('latitude' in loc.coords) &&
                        ('longitude' in loc.coords)
                    ) {
                        latlng = [loc.coords.latitude, loc.coords.longitude];
                        $.getJSON(
                            'https://maps.googleapis.com/maps/api/geocode/json',
                            {
                                'key': opts.googleMapsKey,
                                'sensor': false,
                                'latlng': latlng.join(',')
                            },
                            function (data) {
                                var postal = '';
                                if (data &&
                                    'undefined' !== typeof data.results &&
                                    'undefined' !== typeof data.results[0].address_components &&
                                    'undefined' !== typeof data.results[0].address_components[0]
                                ) {
                                    postal = data.results[0]
                                                 .address_components[data.results[0].address_components.length - 1]
                                                 .long_name;
                                    if (postal) {
                                        self.wrap.zipcode.val(postal.toString()).trigger('blur.twzipcode');
                                    }
                                }
                            });
                    }
                },
                function (error) {
                    console.error(error);
                },
                options
            );
        },
        /**
         * twzipcode Initialize
         * @this {TWzipcode}
         */
        init: function () {

            var self = this,
                container = self.container,
                opts = self.options,
                role = {
                    county: container.find('[data-role=county]:first'),
                    district: container.find('[data-role=district]:first'),
                    zipcode: container.find('[data-role=zipcode]:first')
                },
                countyName = role.county.data('name') || opts.countyName,
                districtName = role.district.data('name') || opts.districtName,
                zipcodeName = role.zipcode.data('name') || opts.zipcodeName,
                zipcodePlaceholder = role.zipcode.data('placeholder') || opts.zipcodePlaceholder,
                readonly = role.zipcode.data('readonly') || opts.readonly;

            // Elements create
            $('<select/>')
                .attr('name', countyName)
                .addClass(role.county.data('style') || ('undefined' !== typeof opts.css[0] ? opts.css[0] : ''))
                .appendTo(role.county.length ? role.county : container);

            $('<select/>')
                .attr('name', districtName)
                .addClass(role.district.data('style') || ('undefined' !== typeof opts.css[1] ? opts.css[1] : ''))
                .appendTo(role.district.length ? role.district : container);

            $('<input/>')
                .attr({'type': 'text', 'name': zipcodeName, 'placeholder': zipcodePlaceholder})
                .prop('readonly', readonly)
                .addClass(role.zipcode.data('style') || ('undefined' !== typeof opts.css[2] ? opts.css[2] : ''))
                .appendTo(role.zipcode.length ? role.zipcode : container);

            self.wrap = {
                'county': container.find('select[name="' + countyName + '"]:first'),
                'district': container.find('select[name="' + districtName + '"]:first'),
                'zipcode': container.find('input[type=text][name="' + zipcodeName + '"]:first')
            };

            if (true === opts.zipcodeIntoDistrict) {
                self.wrap.zipcode.hide();
            }

            self.role = role;
            // Reset the elements
            self.reset();
            // Elements events binding
            self.bindings();
            // Geolocation
            if (true === opts.detect) {
                self.geoLocation();
            }
        }
    };
    /**
     * jQuery twzipcode instance
     * @param {Object} options Plugin settings
     * @public
     */
    $.fn.twzipcode = function (options) {
        var instance = {},
            result = [],
            args = arguments,
            id  = 'twzipcode';
        if ('string' === typeof options) {
            this.each(function () {
                instance = $.data(this, id);
                if (instance instanceof TWzipcode && 'function' === typeof instance[options]) {
                    result = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
            return 'undefined' !== typeof result ? result : this;
        } else {
            return this.each(function () {
                if (!$.data(this, id)) {
                    $.data(this, id, new TWzipcode(this, options));
                }
            });
        }
    };

})(window.jQuery || {}, window, document);
//#EOF
