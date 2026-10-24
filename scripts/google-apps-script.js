/**
 * Google Apps Script for VN to You Tour & Rent A Car Vietnam
 * File: Code.gs (Copy & Paste toàn bộ vào script.google.com)
 * 
 * HỖ TRỢ ĐA DỊCH VỤ & ĐA THƯƠNG HIỆU (MULTI-BRAND):
 * 1. VN TO YOU TOUR:
 *    - Tour Booking / Tailor-made Tour (May đo lịch trình)
 *    - Vietnam Visa & VIP Fast Track sân bay
 *    - Thuê xe du lịch có tài xế riêng
 * 2. RENT A CAR VIETNAM (Thương hiệu xe trực thuộc VN to You Tour):
 *    - Tự động nhận diện khi có tham số site: 'rentacarvietnam' hoặc page chứa 'rentacarvietnam'
 *    - Gửi email khách hàng dưới danh nghĩa: "Rent A Car Vietnam (a specialized fleet brand operated by VN to You Tour)"
 *    - Giao diện email chuẩn màu thương hiệu Rent A Car Vietnam (Deep Navy #091e3a & Royal Blue #1a56db)
 *    - Chữ ký email chuyên nghiệp: Rent A Car Vietnam – Fleet Dispatch Team (A division of VN TO YOU TOUR CO., LTD)
 * 
 * Hỗ trợ 6 ngôn ngữ tự động: EN, ZH, KO, TH, ES, VI
 */

/**
 * HÀM CẤP QUYỀN (BẮT BUỘC CHẠY 1 LẦN KHI ĐỔI CODE):
 * Chọn hàm "testAuth" ở thanh công cụ phía trên và nhấn nút "Chạy" (Run)
 * Google sẽ hiện popup "Cần cấp quyền" (Review Permissions) -> Chọn tài khoản -> Nâng cao -> Cho phép.
 */
function testAuth() {
  Logger.log('Quota gửi email còn lại trong ngày: ' + MailApp.getRemainingDailyQuota());
}

// Bộ từ điển đa ngôn ngữ hoàn chỉnh cho Email
var I18N = {
  en: {
    // Tour
    subject: '[VN to You Tour] We have received your trip inquiry!',
    tagline: 'Direct Local Operator & Tailor-Made Specialist in Vietnam',
    greeting: 'Thank you for contacting <strong>VN to You Tour</strong>! We have successfully received your custom itinerary request and our local specialists are reviewing your travel details.',
    summaryTitle: '📋 YOUR TRIP DETAILS',
    fieldTour: 'Tour / Destination:',
    fieldDuration: 'Duration:',
    fieldDate: 'Travel Date:',
    fieldPax: 'Group Size:',
    fieldHotel: 'Standard / Pick-up:',
    fieldNotes: 'Special Requests:',
    nextStepsTitle: '⚡ What happens next?',
    nextStepsDesc: 'Our destination specialist is crafting your customized day-by-day plan with transparent pricing. You will receive a detailed proposal within <strong>2 to 12 hours</strong>.',
    plainText: function (name) {
      return 'Dear ' + name + ',\n\nThank you for contacting VN to You Tour. We have successfully received your trip inquiry. Our specialists will send you a personalized itinerary and quote within 2 to 12 hours.\n\nWhatsApp: +84 934 615 595\nWebsite: https://vntoyoutour.com';
    },

    // Car Rental
    carSubject: '[VN to You Tour] Private Car Rental Quotation Request Received!',
    carTagline: 'Direct Local Fleet Operator & Private Chauffeur Specialist',
    carGreeting: 'Thank you for contacting <strong>VN to You Tour</strong>! We have successfully received your private car rental and driver quotation request. Our fleet operations team is reviewing your route and vehicle availability.',
    carSummaryTitle: '🚗 YOUR CAR RENTAL DETAILS',
    fieldCarRoute: 'Pickup City / Route:',
    fieldCarDuration: 'Rental Duration:',
    fieldCarDate: 'Service Date:',
    fieldCarPax: 'Passenger Group:',
    fieldCarNotes: 'Special Requests / Luggage:',
    carNextStepsTitle: '⚡ What happens next?',
    carNextStepsDesc: 'Our dispatch team is selecting the best modern vehicle models (2024–2026 fleet) and calculating an all-inclusive quote (driver, fuel, highway tolls). You will receive our proposal within <strong>2 to 12 hours</strong>.',
    carPlainText: function (name) {
      return 'Dear ' + name + ',\n\nThank you for choosing VN to You Tour! We have received your private car rental request. Our dispatch team will send you our recommended vehicles and an all-inclusive quote within 2 to 12 hours.\n\nWhatsApp: +84 934 615 595\nWebsite: https://vntoyoutour.com';
    },

    // Visa
    visaSubject: '[VN to You Tour] Vietnam Visa Service Request Received!',
    visaTagline: 'Direct Local Visa & VIP Fast-Track Assistance in Vietnam',
    visaGreeting: 'Thank you for contacting <strong>VN to You Tour</strong>! We have successfully received your Vietnam Visa service request. Our visa documentation specialists are reviewing your passport information and entry schedule.',
    visaSummaryTitle: '🛂 YOUR VISA REQUEST DETAILS',
    fieldVisaService: 'Visa Service:',
    fieldVisaNationality: 'Passport Nationality:',
    fieldVisaPort: 'Arrival Port:',
    fieldVisaDate: 'Expected Arrival:',
    fieldVisaApplicants: 'Applicants:',
    fieldVisaNotes: 'Registration Code / Notes:',
    visaNextStepsTitle: '⚡ What happens next?',
    visaNextStepsDesc: 'Our visa specialist is verifying your passport entry timeline and documentation. We will send you step-by-step guidance and fee breakdown within <strong>1 to 4 hours</strong>.',
    visaPlainText: function (name) {
      return 'Dear ' + name + ',\n\nThank you for choosing VN to You Tour! We have received your Vietnam Visa request. Our visa specialists will contact you within 1 to 4 hours with detailed processing instructions.\n\nWhatsApp: +84 934 615 595\nWebsite: https://vntoyoutour.com';
    },

    // Fast Track
    ftSubject: '[VN to You Tour] VIP Airport Fast Track Request Received!',
    ftTagline: 'Official VIP Airport Fast Track & Meet & Greet Specialist in Vietnam',
    ftGreeting: 'Thank you for choosing <strong>VN to You Tour</strong>! We have received your VIP Airport Fast Track request. Our airport operations coordinator is reviewing your flight schedule and airport gate logistics.',
    ftSummaryTitle: '⚡ YOUR VIP FAST TRACK DETAILS',
    fieldFtDirection: 'Service Direction:',
    fieldFtAirport: 'Airport:',
    fieldFtPackage: 'Service Package:',
    fieldFtFlight: 'Flight Number & Time:',
    fieldFtDate: 'Date of Service:',
    fieldFtPax: 'Number of Passengers:',
    fieldFtNotes: 'Special Requests / Notes:',
    ftNextStepsTitle: '⚡ What happens next?',
    ftNextStepsDesc: 'Our airport coordinator will assign your dedicated greeter and send you the exact terminal meeting point, greeting photos, and WhatsApp liaison contact within <strong>1 to 4 hours</strong>.',
    ftPlainText: function (name) {
      return 'Dear ' + name + ',\n\nThank you for choosing VN to You Tour! We have received your VIP Airport Fast Track booking. Our airport coordinator will contact you within 1 to 4 hours with terminal meeting point details.\n\nWhatsApp: +84 934 615 595\nWebsite: https://vntoyoutour.com';
    },

    // Common
    defaultName: 'Valued Guest',
    dear: 'Dear ',
    comma: ',',
    btnWhatsApp: '💬 Chat on WhatsApp (+84 934 615 595)',
    replyNote: 'Feel free to reply directly to this email at any time if you have any questions or updates.'
  },
  zh: {
    // Tour
    subject: '[VN to You Tour] 我们已收到您的行程预订与定制需求！',
    tagline: '越南本土一手地接社 • 专属私家定制专家',
    greeting: '感谢您联系 <strong>VN to You Tour</strong>！我们已成功收到您的行程咨询与定制需求，专属旅游顾问正在核对服务细节。',
    summaryTitle: '📋 您的行程需求概览',
    fieldTour: '路线 / 预订项目:',
    fieldDuration: '预计游玩天数:',
    fieldDate: '出行日期:',
    fieldPax: '出行人数:',
    fieldHotel: '酒店标准 / 接送:',
    fieldNotes: '特殊要求与备注:',
    nextStepsTitle: '⚡ 下一步安排：',
    nextStepsDesc: '我们的行程定制专家正在为您量身制作详细的每日行程方案与全包透明报价，将在 <strong>2 至 12 小时内</strong> 发送至您的邮箱。',
    plainText: function (name) {
      return '尊敬的 ' + name + ' 您好，\n\n感谢您联系 VN to You Tour！我们已成功收到您的行程需求，专属定制顾问将在2至12小时内发送详细方案与准确报价。\n\nWhatsApp: +84 934 615 595\n官网: https://vntoyoutour.com';
    },

    // Car Rental
    carSubject: '[VN to You Tour] 我们已收到您的专车包车与定制行程需求！',
    carTagline: '越南本土一手车队 • 专属商务与旅游包车专家',
    carGreeting: '感谢您选择 <strong>VN to You Tour</strong>！我们已成功收到您的专车包车及行程定制需求，专属车队调度顾问正在核对路线与车辆安排。',
    carSummaryTitle: '🚗 您的包车需求明细',
    fieldCarRoute: '出发城市 / 接送路线:',
    fieldCarDuration: '包车天数 / 时长:',
    fieldCarDate: '用车日期:',
    fieldCarPax: '乘车人数:',
    fieldCarNotes: '特殊需求 / 航班与行李:',
    carNextStepsTitle: '⚡ 下一步安排：',
    carNextStepsDesc: '我们的车队调度主管正在为您匹配最新车款（2024–2026年出厂新车），并将在 <strong>2 至 12 小时内</strong> 将全包透明报价（含油费、路桥费、司机餐宿）发送至您的邮箱。',
    carPlainText: function (name) {
      return '尊敬的 ' + name + ' 您好，\n\n感谢您选择 VN to You Tour！我们已成功收到您的包车需求，专属调度顾问将在2至12小时内发送全包透明报价。\n\nWhatsApp: +84 934 615 595\n官网: https://vntoyoutour.com';
    },

    // Visa
    visaSubject: '[VN to You Tour] 我们已收到您的越南签证服务办理需求！',
    visaTagline: '越南本土一手加急签证与VIP快速通关服务',
    visaGreeting: '感谢您联系 <strong>VN to You Tour</strong>！我们已成功收到您的越南签证服务申请，专属签证顾问正在核对您的护照信息与入境时间。',
    visaSummaryTitle: '🛂 您的签证办理需求明细',
    fieldVisaService: '办理项目:',
    fieldVisaNationality: '护照国籍 / 签发地:',
    fieldVisaPort: '入境口岸 / 机场:',
    fieldVisaDate: '预计到达日期:',
    fieldVisaApplicants: '办理人数:',
    fieldVisaNotes: '申请码 / 特殊备注:',
    visaNextStepsTitle: '⚡ 下一步安排：',
    visaNextStepsDesc: '我们的签证专员正在核对入境政策与审批时效，将在 <strong>1 至 4 小时内</strong> 将材料要求与办理流程发送给您。',
    visaPlainText: function (name) {
      return '尊敬的 ' + name + ' 您好，\n\n感谢您选择 VN to You Tour！我们已成功收到您的越南签证申请，专属签证专员将在1至4小时内联系您指导办理。\n\nWhatsApp: +84 934 615 595\n官网: https://vntoyoutour.com';
    },

    // Fast Track
    ftSubject: '[VN to You Tour] 我们已收到您的 VIP 机场快速通关预订请求！',
    ftTagline: '越南官方 VIP 机场快速通关与专人迎接专家',
    ftGreeting: '感谢您选择 <strong>VN to You Tour</strong>！我们已成功收到您的 VIP 机场快速通关服务预订。机场地勤协调团队正在核对您的航班时间与廊桥迎接安排。',
    ftSummaryTitle: '⚡ 您的 VIP 快速通关预订详情',
    fieldFtDirection: '通关类型:',
    fieldFtAirport: '服务机场:',
    fieldFtPackage: '服务方案:',
    fieldFtFlight: '航班号与抵离时间:',
    fieldFtDate: '服务日期:',
    fieldFtPax: '乘客人数:',
    fieldFtNotes: '特殊需求与备注:',
    ftNextStepsTitle: '⚡ 下一步安排：',
    ftNextStepsDesc: '我们的机场主管将为您指派专职地勤迎宾人员，并在 <strong>1 至 4 小时内</strong> 向您发送机场航站楼接应点指引与 WhatsApp 现场联络方式。',
    ftPlainText: function (name) {
      return '尊敬的 ' + name + ' 您好，\n\n感谢您选择 VN to You Tour！我们已收到您的 VIP 机场快速通关预订，机场协调团队将在 1 至 4 小时内向您发送详细接应信息。\n\nWhatsApp: +84 934 615 595\n官网: https://vntoyoutour.com';
    },

    // Common
    defaultName: '贵宾',
    dear: '尊敬的 ',
    comma: ' 您好，',
    btnWhatsApp: '💬 微信 / WhatsApp 咨询 (+84 934 615 595)',
    replyNote: '您也可以随时直接回复此邮件，补充您的出行想法或任何疑问。'
  },
  ko: {
    // Tour
    subject: '[VN to You Tour] 고객님의 베트남 투어 문의가 정상 접수되었습니다!',
    tagline: '베트남 현지 직영 여행사 • 단독 맞춤 프라이빗 투어 전문',
    greeting: '<strong>VN to You Tour</strong>를 찾아주셔서 진심으로 감사드립니다! 고객님의 여행 문의가 정상 접수되었으며, 전담 플래너가 맞춤 일정을 검토하고 있습니다.',
    summaryTitle: '📋 선택하신 여행 정보 요약',
    fieldTour: '투어 / 여행지:',
    fieldDuration: '예정 일정:',
    fieldDate: '출발 희망일:',
    fieldPax: '여행 인원:',
    fieldHotel: '호텔 등급 / 픽업:',
    fieldNotes: '요청사항 및 메모:',
    nextStepsTitle: '⚡ 안내 절차:',
    nextStepsDesc: '전담 여행 전문가가 고객님만을 위한 맞춤 일정표와 투명한 견적서를 작성 중이며, <strong>2~12시간 이내</strong>에 상세 안내를 발송해 드립니다.',
    plainText: function (name) {
      return name + ' 고객님 안녕하세요,\n\nVN to You Tour에 문의해 주셔서 감사합니다. 고객님의 맞춤 일정표와 투명한 견적서를 2~12시간 이내에 안내해 드리겠습니다.\n\nWhatsApp: +84 934 615 595\n홈페이지: https://vntoyoutour.com';
    },

    // Car Rental
    carSubject: '[VN to You Tour] 고객님의 베트남 차량 렌트/대절 견적 요청이 정상 접수되었습니다!',
    carTagline: '베트남 현지 직영 배차팀 • 전용 차량 및 기사 서비스 전문',
    carGreeting: '<strong>VN to You Tour</strong>를 찾아주셔서 진심으로 감사드립니다! 고객님의 베트남 전용차량(기사 포함) 대절 견적 요청이 정상 접수되었으며, 현지 배차팀이 일정과 차량 배정을 확인하고 있습니다.',
    carSummaryTitle: '🚗 선택하신 차량 대절 정보 요약',
    fieldCarRoute: '출발 도시 / 픽업 장소:',
    fieldCarDuration: '이용 기간:',
    fieldCarDate: '탑승 희망일:',
    fieldCarPax: '탑승 인원:',
    fieldCarNotes: '요청사항 / 항공편 / 수하물:',
    carNextStepsTitle: '⚡ 안내 절차:',
    carNextStepsDesc: '전담 배차 매니저가 최신 연식(2024~2026년식) 차량을 기반으로 톨게이트비, 유류비, 기사 수고비가 모두 포함된 투명한 올인클루시브 견적서를 <strong>2~12시간 이내</strong>에 발송해 드립니다.',
    carPlainText: function (name) {
      return name + ' 고객님 안녕하세요,\n\nVN to You Tour에 차량 대절 문의를 주셔서 감사합니다. 담당 배차팀이 2~12시간 이내에 최적의 차량 추천과 정찰제 견적서를 안내해 드리겠습니다.\n\nWhatsApp: +84 934 615 595\n홈페이지: https://vntoyoutour.com';
    },

    // Visa
    visaSubject: '[VN to You Tour] 고객님의 베트남 비자 서비스 신청이 정상 접수되었습니다!',
    visaTagline: '베트남 현지 직영 비자 발급 지원 및 VIP 패스트트랙 서비스',
    visaGreeting: '<strong>VN to You Tour</strong>를 찾아주셔서 진심으로 감사드립니다! 고객님의 베트남 비자 서비스 요청이 정상 접수되었으며, 전담 비자 담당자가 여권 정보 및 입국 일정을 검토하고 있습니다.',
    visaSummaryTitle: '🛂 신청하신 비자 서비스 정보 요약',
    fieldVisaService: '신청 서비스:',
    fieldVisaNationality: '여권 국적:',
    fieldVisaPort: '도착 공항 / 입국 관문:',
    fieldVisaDate: '도착 예정일:',
    fieldVisaApplicants: '신청 인원:',
    fieldVisaNotes: '신청번호(G코드) / 메모:',
    visaNextStepsTitle: '⚡ 안내 절차:',
    visaNextStepsDesc: '전담 비자 플래너가 고객님의 여권 발급 요건을 확인한 후 <strong>1~4시간 이내</strong>에 필요 서류와 상세 진행 절차를 안내해 드립니다.',
    visaPlainText: function (name) {
      return name + ' 고객님 안녕하세요,\n\nVN to You Tour에 베트남 비자 문의를 주셔서 감사합니다. 비자 전담팀이 1~4시간 이내에 상세 신청 안내를 발송해 드리겠습니다.\n\nWhatsApp: +84 934 615 595\n홈페이지: https://vntoyoutour.com';
    },

    // Fast Track
    ftSubject: '[VN to You Tour] VIP 공항 패스트트랙 예약 접수 완료 안내',
    ftTagline: '베트남 전 공항 공식 VIP 패스트트랙 및 전담 에스코트 서비스',
    ftGreeting: '<strong>VN to You Tour</strong>를 찾아주셔서 진심으로 감사드립니다! 고객님의 VIP 공항 패스트트랙 예약 요청이 정상 접수되었으며, 공항 현장 운항팀이 항공편 스케줄과 게이트 영접을 확인하고 있습니다.',
    ftSummaryTitle: '⚡ 고객님의 VIP 패스트트랙 신청 내역',
    fieldFtDirection: '서비스 구분:',
    fieldFtAirport: '이용 공항:',
    fieldFtPackage: '신청 패키지:',
    fieldFtFlight: '항공편명 및 도착/출발 시간:',
    fieldFtDate: '이용 예정일:',
    fieldFtPax: '이용 인원:',
    fieldFtNotes: '요청사항 및 메모:',
    ftNextStepsTitle: '⚡ 향후 진행 안내:',
    ftNextStepsDesc: '공항 전담 코디네이터가 배정되어 <strong>1~4시간 이내</strong>에 터미널 상세 미팅 포인트, 영접 안내 사진 및 카카오톡/WhatsApp 현장 연락처를 안내해 드립니다.',
    ftPlainText: function (name) {
      return '고객님(' + name + ') 안녕하세요,\n\nVN to You Tour를 이용해 주셔서 감사합니다. VIP 공항 패스트트랙 신청이 성공적으로 접수되었습니다. 1~4시간 이내에 상세 미팅 안내를 전송해 드리겠습니다.\n\nWhatsApp: +84 934 615 595\n웹사이트: https://vntoyoutour.com';
    },

    // Common
    defaultName: '고객',
    dear: '',
    comma: ' 고객님 안녕하세요,',
    btnWhatsApp: '💬 WhatsApp 실시간 상담 (+84 934 615 595)',
    replyNote: '추가 문의사항이나 변경 사항이 있으시면 본 메일에 바로 답장해 주셔도 좋습니다.'
  },
  th: {
    // Tour
    subject: '[VN to You Tour] เราได้รับข้อมูลการจองและสอบถามทัวร์ของคุณเรียบร้อยแล้ว!',
    tagline: 'ผู้ให้บริการทัวร์ท้องถิ่นโดยตรงในเวียดนาม • เชี่ยวชาญทัวร์ส่วนตัว',
    greeting: 'ขอขอบคุณที่ติดต่อ <strong>VN to You Tour</strong>! ทีมงานได้รับคำขอจัดโปรแกรมการเดินทางของคุณเรียบร้อยแล้ว และเจ้าหน้าที่กำลังตรวจสอบข้อมูลบริการเพื่อจัดสรรสิ่งที่ดีที่สุดให้คุณค่ะ',
    summaryTitle: '📋 สรุปรายละเอียดการเดินทางของคุณ',
    fieldTour: 'โปรแกรมทัวร์ / เส้นทาง:',
    fieldDuration: 'ระยะเวลาทัวร์:',
    fieldDate: 'วันที่ต้องการเดินทาง:',
    fieldPax: 'จำนวนผู้ร่วมเดินทาง:',
    fieldHotel: 'ระดับโรงแรม / จุดรับส่ง:',
    fieldNotes: 'ความต้องการพิเศษ:',
    nextStepsTitle: '⚡ ขั้นตอนถัดไป:',
    nextStepsDesc: 'เจ้าหน้าที่ผู้เชี่ยวชาญกำลังจัดทำแผนการเดินทางแบบละเอียดพร้อมใบเสนอราคาที่โปร่งใส และจะจัดส่งให้คุณทางอีเมลภายใน <strong>2 ถึง 12 ชั่วโมง</strong> ค่ะ',
    plainText: function (name) {
      return 'เรียน คุณ' + name + ',\n\nขอขอบคุณที่ติดต่อ VN to You Tour! เจ้าหน้าที่จะจัดทำแผนการเดินทางและใบเสนอราคาจัดส่งให้คุณภายใน 2-12 ชั่วโมงค่ะ\n\nWhatsApp: +84 934 615 595\nเว็บไซต์: https://vntoyoutour.com';
    },

    // Car Rental
    carSubject: '[VN to You Tour] เราได้รับข้อมูลขอใบเสนอราคาเช่ารถพร้อมคนขับของคุณเรียบร้อยแล้ว!',
    carTagline: 'ผู้ให้บริการรถเช่าท้องถิ่นโดยตรง • เชี่ยวชาญรถพร้อมคนขับในเวียดนาม',
    carGreeting: 'ขอขอบคุณที่เลือกใช้บริการ <strong>VN to You Tour</strong>! เราได้รับคำขอเช่ารถส่วนตัวพร้อมคนขับของคุณเรียบร้อยแล้ว ทีมงานฝ่ายจัดสรรยานพาหนะกำลังตรวจสอบเส้นทางและสถานะรถเพื่อจัดสรรสิ่งที่ดีที่สุดให้คุณค่ะ',
    carSummaryTitle: '🚗 สรุปรายละเอียดการเช่ารถของคุณ',
    fieldCarRoute: 'เมืองเริ่มต้น / จุดรับส่ง:',
    fieldCarDuration: 'ระยะเวลาใช้รถ:',
    fieldCarDate: 'วันที่ต้องการใช้รถ:',
    fieldCarPax: 'จำนวนผู้โดยสาร:',
    fieldCarNotes: 'คำขอพิเศษ / กระเป๋า / ไฟล์ทบิน:',
    carNextStepsTitle: '⚡ ขั้นตอนถัดไป:',
    carNextStepsDesc: 'ผู้จัดการฝ่ายยานพาหนะกำลังจัดเตรียมรถรุ่นใหม่ (ปี 2024–2026) พร้อมใบเสนอราคาสุทธิที่รวมค่าน้ำมัน ค่าทางด่วน และคนขับเรียบร้อย โดยจะส่งให้คุณทางอีเมลภายใน <strong>2 ถึง 12 ชั่วโมง</strong> ค่ะ',
    carPlainText: function (name) {
      return 'เรียน คุณ' + name + ',\n\nขอขอบคุณที่ติดต่อ VN to You Tour! ทีมงานฝ่ายรถยนต์จะจัดทำใบเสนอราคาค่าเช่ารถพร้อมคนขับส่งให้คุณภายใน 2-12 ชั่วโมงค่ะ\n\nWhatsApp: +84 934 615 595\nเว็บไซต์: https://vntoyoutour.com';
    },

    // Visa
    visaSubject: '[VN to You Tour] เราได้รับข้อมูลขอรับบริการวีซ่าเวียดนามของคุณเรียบร้อยแล้ว!',
    visaTagline: 'ผู้ให้บริการวีซ่าและ VIP Fast Track ท้องถิ่นโดยตรงในเวียดนาม',
    visaGreeting: 'ขอขอบคุณที่ติดต่อ <strong>VN to You Tour</strong>! เราได้รับคำขอบริการวีซ่าเวียดนามของคุณเรียบร้อยแล้ว ทีมงานผู้เชี่ยวชาญด้านวีซ่ากำลังตรวจสอบข้อมูลหนังสือเดินทางและกำหนดการเดินทางของคุณค่ะ',
    visaSummaryTitle: '🛂 สรุปรายละเอียดการขอรับบริการวีซ่า',
    fieldVisaService: 'ประเภทบริการวีซ่า:',
    fieldVisaNationality: 'สัญชาติตามหนังสือเดินทาง:',
    fieldVisaPort: 'ด่านตรวจคนเข้าเมือง / สนามบิน:',
    fieldVisaDate: 'วันที่คาดว่าจะเดินทางถึง:',
    fieldVisaApplicants: 'จำนวนผู้ยื่นคำขอ:',
    fieldVisaNotes: 'รหัสคำขอ (G-code) / หมายเหตุ:',
    visaNextStepsTitle: '⚡ ขั้นตอนถัดไป:',
    visaNextStepsDesc: 'เจ้าหน้าที่ผู้เชี่ยวชาญกำลังตรวจสอบเงื่อนไขและจะส่งคำแนะนำพร้อมขั้นตอนการยื่นเอกสารให้คุณภายใน <strong>1 ถึง 4 ชั่วโมง</strong> ค่ะ',
    visaPlainText: function (name) {
      return 'เรียน คุณ' + name + ',\n\nขอขอบคุณที่เลือกใช้บริการ VN to You Tour! ทีมงานฝ่ายวีซ่าจะส่งคำแนะนำขั้นตอนการดำเนินการให้คุณภายใน 1-4 ชั่วโมงค่ะ\n\nWhatsApp: +84 934 615 595\nเว็บไซต์: https://vntoyoutour.com';
    },

    // Fast Track
    ftSubject: '[VN to You Tour] เราได้รับคำขอจองบริการ VIP Airport Fast Track เรียบร้อยแล้ว!',
    ftTagline: 'ผู้เชี่ยวชาญบริการ VIP Airport Fast Track และต้อนรับพิเศษในสนามบินเวียดนาม',
    ftGreeting: 'ขอขอบคุณที่เลือกใช้บริการ <strong>VN to You Tour</strong>! เราได้รับคำขอจองบริการ VIP Airport Fast Track ของท่านเรียบร้อยแล้ว ทีมปฏิบัติการประจำสนามบินกำลังตรวจสอบตารางบินและจุดต้อนรับ',
    ftSummaryTitle: '⚡ รายละเอียดการจอง VIP FAST TRACK ของคุณ',
    fieldFtDirection: 'ประเภทบริการ:',
    fieldFtAirport: 'สนามบิน:',
    fieldFtPackage: 'แพ็กเกจบริการ:',
    fieldFtFlight: 'เที่ยวบินและเวลา:',
    fieldFtDate: 'วันที่รับบริการ:',
    fieldFtPax: 'จำนวนผู้โดยสาร:',
    fieldFtNotes: 'คำขอเพิ่มเติม:',
    ftNextStepsTitle: '⚡ ขั้นตอนต่อไป:',
    ftNextStepsDesc: 'เจ้าหน้าที่ผู้ประสานงานสนามบินจะจัดเตรียมเจ้าหน้าที่ต้อนรับและส่งจุดนัดพบบริเวณอาคารผู้โดยสาร พร้อมช่องทางติดต่อ WhatsApp ให้คุณภายใน <strong>1 ถึง 4 ชั่วโมง</strong>',
    ftPlainText: function (name) {
      return 'เรียนคุณ ' + name + ',\n\nขอขอบคุณที่เลือก VN to You Tour เราได้รับคำขอจอง VIP Airport Fast Track เรียบร้อยแล้ว เจ้าหน้าที่สนามบินจะติดต่อกลับพร้อมข้อมูลจุดนัดพบภายใน 1 ถึง 4 ชั่วโมง\n\nWhatsApp: +84 934 615 595\nเว็บไซต์: https://vntoyoutour.com';
    },

    // Common
    defaultName: 'ท่าน',
    dear: 'เรียน คุณ',
    comma: ',',
    btnWhatsApp: '💬 แชทผ่าน WhatsApp (+84 934 615 595)',
    replyNote: 'คุณสามารถตอบกลับอีเมลนี้ได้โดยตรงตลอดเวลาหากต้องการแก้ไขหรือเพิ่มเติมข้อมูลค่ะ'
  },
  es: {
    // Tour
    subject: '[VN to You Tour] ¡Hemos recibido su solicitud de viaje!',
    tagline: 'Operador Local Directo y Especialista en Tours Privados en Vietnam',
    greeting: '¡Gracias por contactar con <strong>VN to You Tour</strong>! Hemos recibido correctamente su solicitud de itinerario personalizado y nuestros asesores locales están revisando los detalles de su viaje.',
    summaryTitle: '📋 RESUMEN DE SU SOLICITUD',
    fieldTour: 'Tour / Destino:',
    fieldDuration: 'Duración:',
    fieldDate: 'Fecha de viaje:',
    fieldPax: 'Número de personas:',
    fieldHotel: 'Categoría / Recogida:',
    fieldNotes: 'Peticiones especiales:',
    nextStepsTitle: '⚡ ¿Qué sucede ahora?',
    nextStepsDesc: 'Nuestros especialistas están diseñando su itinerario personalizado día a día con tarifas claras y transparentes. Recibirá su propuesta en un plazo de <strong>2 a 12 horas</strong>.',
    plainText: function (name) {
      return 'Estimado/a ' + name + ',\n\nGracias por contactar con VN to You Tour. Hemos recibido su solicitud y le enviaremos su propuesta detallada en un plazo de 2 a 12 horas.\n\nWhatsApp: +84 934 615 595\nSitio web: https://vntoyoutour.com';
    },

    // Car Rental
    carSubject: '[VN to You Tour] ¡Hemos recibido su solicitud de presupuesto de coche privado!',
    carTagline: 'Operador Local Directo de Flota y Vehículos Privados con Conductor',
    carGreeting: '¡Gracias por elegir <strong>VN to You Tour</strong>! Hemos recibido con éxito su solicitud de alquiler de coche privado con conductor en Vietnam. Nuestro equipo de operaciones está revisando su ruta y la disponibilidad de flota.',
    carSummaryTitle: '🚗 RESUMEN DE ALQUILER DE VEHÍCULO',
    fieldCarRoute: 'Ciudad de Salida / Recogida:',
    fieldCarDuration: 'Duración del Servicio:',
    fieldCarDate: 'Fecha del Viaje:',
    fieldCarPax: 'Número de Pasajeros:',
    fieldCarNotes: 'Peticiones Especiales / Vuelo / Equipaje:',
    carNextStepsTitle: '⚡ ¿Cuál es el siguiente paso?',
    carNextStepsDesc: 'Nuestro responsable de flota revisará su ruta y le enviará la recomendación de vehículos modernos (flota 2024–2026) junto con un presupuesto transparente con todo incluido en un plazo de <strong>2 a 12 horas</strong>.',
    carPlainText: function (name) {
      return 'Estimado/a ' + name + ',\n\nGracias por contactar con VN to You Tour. Hemos recibido su solicitud de coche privado con conductor. Le enviaremos un presupuesto con todo incluido en un plazo de 2 a 12 horas.\n\nWhatsApp: +84 934 615 595\nSitio web: https://vntoyoutour.com';
    },

    // Visa
    visaSubject: '[VN to You Tour] ¡Hemos recibido su solicitud de visado para Vietnam!',
    tagline: 'Asistencia Local Directa de Visados y VIP Fast Track en Vietnam',
    visaGreeting: '¡Gracias por contactar con <strong>VN to You Tour</strong>! Hemos recibido con éxito su solicitud de visado para Vietnam. Nuestros especialistas en trámites consulares están revisando los datos de su pasaporte.',
    visaSummaryTitle: '🛂 RESUMEN DE SU SOLICITUD DE VISADO',
    fieldVisaService: 'Servicio de Visado:',
    fieldVisaNationality: 'Nacionalidad del Pasaporte:',
    fieldVisaPort: 'Punto de Entrada / Aeropuerto:',
    fieldVisaDate: 'Fecha Prevista de Llegada:',
    fieldVisaApplicants: 'Número de Solicitantes:',
    fieldVisaNotes: 'Código de Registro / Notas:',
    visaNextStepsTitle: '⚡ ¿Qué sucede ahora?',
    visaNextStepsDesc: 'Nuestro equipo consular está comprobando los requisitos de su país y le enviará las instrucciones detalladas en un plazo de <strong>1 a 4 horas</strong>.',
    visaPlainText: function (name) {
      return 'Estimado/a ' + name + ',\n\nGracias por elegir VN to You Tour. Hemos recibido su solicitud de visado para Vietnam y nos pondremos en contacto con usted en un plazo de 1 a 4 horas.\n\nWhatsApp: +84 934 615 595\nSitio web: https://vntoyoutour.com';
    },

    // Fast Track
    ftSubject: '[VN to You Tour] ¡Solicitud de VIP Airport Fast Track Recibida!',
    ftTagline: 'Especialistas en VIP Fast Track y Asistencia Preferente en Aeropuertos de Vietnam',
    ftGreeting: '¡Gracias por contactar con <strong>VN to You Tour</strong>! Hemos recibido correctamente su solicitud de servicio VIP Airport Fast Track. Nuestro equipo de operaciones aeroportuarias está revisando su vuelo y la logística de bienvenida.',
    ftSummaryTitle: '⚡ DETALLES DE SU RESERVA VIP FAST TRACK',
    fieldFtDirection: 'Sentido del Servicio:',
    fieldFtAirport: 'Aeropuerto:',
    fieldFtPackage: 'Paquete de Servicio:',
    fieldFtFlight: 'Número de Vuelo y Hora:',
    fieldFtDate: 'Fecha del Servicio:',
    fieldFtPax: 'Número de Pasajeros:',
    fieldFtNotes: 'Peticiones Especiales:',
    ftNextStepsTitle: '⚡ Próximos pasos:',
    ftNextStepsDesc: 'Nuestro coordinador asignará a su asistente personal y le enviará el punto de encuentro exacto en la terminal y el contacto de WhatsApp en <strong>1 a 4 horas</strong>.',
    ftPlainText: function (name) {
      return 'Estimado/a ' + name + ',\n\n¡Gracias por elegir VN to You Tour! Hemos recibido su reserva de VIP Airport Fast Track. Nuestro equipo le contactará en 1 a 4 horas con las instrucciones de encuentro en la terminal.\n\nWhatsApp: +84 934 615 595\nSitio web: https://vntoyoutour.com';
    },

    // Common
    defaultName: 'Estimado/a Viajero/a',
    dear: 'Estimado/a ',
    comma: ',',
    btnWhatsApp: '💬 Chatear por WhatsApp (+84 934 615 595)',
    replyNote: 'Puede responder directamente a este correo electrónico en cualquier momento si desea realizar algún cambio.'
  },
  vi: {
    // Tour
    subject: '[VN to You Tour] Chúng tôi đã tiếp nhận yêu cầu chuyến đi của bạn!',
    tagline: 'Đơn vị lữ hành địa phương chuyên nghiệp tại Việt Nam',
    greeting: 'Cảm ơn bạn đã liên hệ với <strong>VN to You Tour</strong>! Chúng tôi đã tiếp nhận yêu cầu chuyến đi của bạn và chuyên viên đang tiến hành kiểm tra dịch vụ để sắp xếp hành trình tốt nhất.',
    summaryTitle: '📋 TÓM TẮT YÊU CẦU CHUYẾN ĐI',
    fieldTour: 'Tuyến điểm / Tour:',
    fieldDuration: 'Thời gian dự kiến:',
    fieldDate: 'Ngày khởi hành:',
    fieldPax: 'Số lượng khách:',
    fieldHotel: 'Hạng khách sạn / Điểm đón:',
    fieldNotes: 'Ghi chú riêng:',
    nextStepsTitle: '⚡ Bước tiếp theo:',
    nextStepsDesc: 'Chuyên viên điều hành của chúng tôi đang hoàn thiện lịch trình theo yêu cầu và sẽ gửi bản chào giá minh bạch, tốt nhất đến bạn trong vòng <strong>2 đến 12 giờ</strong>.',
    plainText: function (name) {
      return 'Xin chào ' + name + ',\n\nCảm ơn bạn đã liên hệ VN to You Tour. Chuyên viên sẽ gửi báo giá chi tiết trong vòng 2-12 giờ.\n\nHotline/WhatsApp: +84 934 615 595\nWebsite: https://vntoyoutour.com';
    },

    // Car Rental
    carSubject: '[VN to You Tour] Chúng tôi đã nhận được yêu cầu báo giá thuê xe của bạn!',
    carTagline: 'Đội xe du lịch trực tiếp & dịch vụ xe riêng có tài xế tại Việt Nam',
    carGreeting: 'Cảm ơn bạn đã liên hệ <strong>VN to You Tour</strong>! Chúng tôi đã tiếp nhận yêu cầu báo giá thuê xe du lịch có tài xế riêng. Đội ngũ điều hành xe đang kiểm tra lộ trình và sắp xếp phương tiện phù hợp nhất.',
    carSummaryTitle: '🚗 CHI TIẾT YÊU CẦU THUÊ XE CỦA BẠN',
    fieldCarRoute: 'Điểm đón / Thành phố khởi hành:',
    fieldCarDuration: 'Thời gian thuê:',
    fieldCarDate: 'Ngày khởi hành:',
    fieldCarPax: 'Số lượng khách:',
    fieldCarNotes: 'Ghi chú riêng / Hành lý / Chuyến bay:',
    carNextStepsTitle: '⚡ Bước tiếp theo:',
    carNextStepsDesc: 'Điều hành xe sẽ tư vấn dòng xe đời mới (2024–2026) và gửi bảng báo giá trọn gói (đã bao gồm xăng dầu, phí cầu đường cao tốc, tài xế) đến bạn trong vòng <strong>2 đến 12 giờ</strong>.',
    carPlainText: function (name) {
      return 'Xin chào ' + name + ',\n\nCảm ơn bạn đã liên hệ VN to You Tour. Chúng tôi đã nhận được yêu cầu thuê xe và sẽ gửi báo giá trọn gói trong vòng 2-12 giờ.\n\nHotline/WhatsApp: +84 934 615 595\nWebsite: https://vntoyoutour.com';
    },

    // Visa
    visaSubject: '[VN to You Tour] Chúng tôi đã tiếp nhận yêu cầu dịch vụ Visa Việt Nam của bạn!',
    visaTagline: 'Hỗ trợ E-Visa khẩn & VIP Fast Track sân bay uy tín tại Việt Nam',
    visaGreeting: 'Cảm ơn bạn đã liên hệ <strong>VN to You Tour</strong>! Chúng tôi đã tiếp nhận yêu cầu tư vấn / làm E-Visa Việt Nam. Chuyên viên hồ sơ đang kiểm tra thông tin hộ chiếu và thời gian nhập cảnh của bạn.',
    visaSummaryTitle: '🛂 CHI TIẾT YÊU CẦU DỊCH VỤ VISA CỦA BẠN',
    fieldVisaService: 'Dịch vụ Visa yêu cầu:',
    fieldVisaNationality: 'Quốc tịch hộ chiếu:',
    fieldVisaPort: 'Cửa khẩu / Sân bay nhập cảnh:',
    fieldVisaDate: 'Ngày dự kiến đến:',
    fieldVisaApplicants: 'Số lượng hồ sơ:',
    fieldVisaNotes: 'Mã hồ sơ DVC / Ghi chú:',
    visaNextStepsTitle: '⚡ Bước tiếp theo:',
    visaNextStepsDesc: 'Chuyên viên visa của chúng tôi đang kiểm tra điều kiện xuất nhập cảnh và sẽ liên hệ hướng dẫn các bước tiếp theo đến bạn trong vòng <strong>1 đến 4 giờ</strong>.',
    visaPlainText: function (name) {
      return 'Xin chào ' + name + ',\n\nCảm ơn bạn đã liên hệ VN to You Tour! Chúng tôi đã nhận được yêu cầu dịch vụ Visa và sẽ hỗ trợ chi tiết trong vòng 1-4 giờ.\n\nHotline/WhatsApp: +84 934 615 595\nWebsite: https://vntoyoutour.com';
    },

    // Fast Track
    ftSubject: '[VN to You Tour] Đã tiếp nhận yêu cầu đặt dịch vụ VIP Fast Track Sân Bay!',
    ftTagline: 'Dịch vụ Đón Tiễn VIP Fast Track Sân Bay & Hỗ Trợ Thủ Tục Chuyên Nghiệp',
    ftGreeting: 'Cảm ơn quý khách đã tin chọn <strong>VN to You Tour</strong>! Chúng tôi đã tiếp nhận yêu cầu đặt dịch vụ VIP Airport Fast Track. Đội ngũ điều phối sân bay đang kiểm tra lịch trình chuyến bay và phân bổ nhân sự đón tiếp.',
    ftSummaryTitle: '⚡ CHI TIẾT ĐẶT DỊCH VỤ VIP FAST TRACK',
    fieldFtDirection: 'Chiều dịch vụ:',
    fieldFtAirport: 'Sân bay áp dụng:',
    fieldFtPackage: 'Gói dịch vụ:',
    fieldFtFlight: 'Số hiệu chuyến bay & Giờ:',
    fieldFtDate: 'Ngày phục vụ:',
    fieldFtPax: 'Số lượng hành khách:',
    fieldFtNotes: 'Yêu cầu đặc biệt:',
    ftNextStepsTitle: '⚡ Quy trình xử lý tiếp theo:',
    ftNextStepsDesc: 'Điều phối viên sân bay sẽ phân công nhân sự đón tiếp tận cửa và gửi ảnh vị trí hẹn gặp tại nhà ga cùng số liên hệ WhatsApp/Hotline trong vòng <strong>1 đến 4 giờ</strong>.',
    ftPlainText: function (name) {
      return 'Kính gửi ' + name + ',\n\nCảm ơn quý khách đã liên hệ VN to You Tour! Chúng tôi đã tiếp nhận yêu cầu đặt VIP Airport Fast Track. Điều phối viên sân bay sẽ liên hệ gửi vị trí đón chi tiết trong vòng 1 đến 4 giờ.\n\nWhatsApp: +84 934 615 595\nWebsite: https://vntoyoutour.com';
    },

    // Common
    defaultName: 'Quý khách',
    dear: 'Xin chào ',
    comma: ',',
    btnWhatsApp: '💬 Chat trực tiếp qua WhatsApp (+84 934 615 595)',
    replyNote: 'Bạn có thể trả lời trực tiếp email này bất cứ lúc nào nếu cần bổ sung thông tin chuyến đi.'
  }
};

function sendMailHelper(to, subject, plainText, htmlText, senderName) {
  var name = senderName || 'VN to You Tour';
  try {
    MailApp.sendEmail({
      to: to,
      subject: subject,
      body: plainText,
      htmlBody: htmlText,
      name: name
    });
  } catch (err) {
    GmailApp.sendEmail(to, subject, plainText, {
      htmlBody: htmlText,
      name: name
    });
  }
}

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var serviceType = (data.service_type || data.type || '').toLowerCase();
    var name = (data.name || '').trim();
    var email = (data.email || '').trim();
    var phone = (data.phone_whatsapp || data.phone || '').trim();
    var destination = (data.destination || data.starting_city || data.city || '').trim();
    var departureDate = (data.departure_date || data.travel_date || data.arrival_date || data.date || '').trim();
    var duration = (data.duration || data.days || '').trim();
    var passengers = (data.passengers || data.group || data.applicants || data.pax || '').trim();
    var hotelStyle = (data.hotel_style || data.style || '').trim();
    var specialRequests = (data.special_requests || data.notes || data.message || '').trim();
    var tourId = (data.tour_id || '').trim();
    var tourTitle = (data.tour_title || '').trim();
    var tripRequest = (data.trip_request || data.car_rental_request || data.visa_request_summary || '').trim();
    var locale = (data.locale || 'en').toLowerCase();
    var pageUrl = data.page || '';

    // ==========================================================
    // NHẬN DIỆN THƯƠNG HIỆU (VN to You Tour vs Rent A Car Vietnam)
    // ==========================================================
    var site = (data.site || data.source_site || '').toLowerCase();
    var isRentACarVN = site === 'rentacarvietnam' ||
      site === 'rentacar' ||
      Boolean(data.is_rentacar_site) ||
      (pageUrl && pageUrl.indexOf('rentacarvietnam') !== -1);

    // Tham số Visa chuyên biệt
    var visaService = (data.visa_service || '').trim();
    var nationality = (data.nationality || '').trim();
    var entryPort = (data.entry_port || '').trim();
    var regCode = (data.reg_code || '').trim();

    // Tham số Fast Track chuyên biệt
    var ftDirection = (data.ft_direction || data.direction || '').trim();
    var ftAirport = (data.airport || '').trim();
    var ftPackage = (data.ft_package || data.package_name || '').trim();
    var flightNumber = (data.flight_number || data.flight || '').trim();
    var flightDate = (data.flight_date || '').trim();
    var flightTime = (data.flight_time || data.time || '').trim();

    // Nhận diện dịch vụ
    var isFastTrack = Boolean(data.isFastTrack) ||
      serviceType === 'fast-track' ||
      Boolean(ftPackage) ||
      (pageUrl && pageUrl.indexOf('/fast-track') !== -1) ||
      (tripRequest && tripRequest.indexOf('Fast Track') !== -1);

    var isVisa = !isFastTrack && (serviceType === 'visa' ||
      Boolean(visaService) ||
      (pageUrl && pageUrl.indexOf('/visa') !== -1) ||
      (tripRequest && tripRequest.indexOf('Visa') !== -1));

    var isCarRental = isRentACarVN || (!isFastTrack && !isVisa && (
      serviceType === 'car_rental' ||
      (pageUrl && pageUrl.indexOf('car-rental') !== -1) ||
      Boolean(data.starting_city) ||
      Boolean(data.car_rental_request) ||
      (tripRequest && (tripRequest.indexOf('Car Rental') !== -1 || tripRequest.indexOf('Route: Start ') !== -1))
    ));

    // Lấy gói ngôn ngữ tương ứng (mặc định EN nếu không khớp)
    var t = I18N[locale] || I18N.en;
    var clientName = name || t.defaultName;

    // Tên hiển thị người gửi email
    var senderName = isRentACarVN ? 'Rent A Car Vietnam (by VN to You)' : 'VN to You Tour';

    // 1. GỬI EMAIL HTML XÁC NHẬN CHO KHÁCH HÀNG (KHI CÓ EMAIL)
    if (email) {
      var clientSubject = isFastTrack ? t.ftSubject : (isVisa ? t.visaSubject : (isCarRental ? t.carSubject : t.subject));
      if (isRentACarVN) {
        clientSubject = clientSubject.replace(/\[VN to You Tour\]/g, '[Rent A Car Vietnam]');
      }

      var htmlBody = buildClientHtmlEmail({
        isFastTrack: isFastTrack,
        isVisa: isVisa,
        isCarRental: isCarRental,
        isRentACarVN: isRentACarVN,
        clientName: clientName,
        destination: destination,
        departureDate: departureDate || flightDate,
        duration: duration,
        passengers: passengers,
        hotelStyle: hotelStyle,
        specialRequests: specialRequests,
        tourId: tourId,
        tourTitle: tourTitle,
        visaService: visaService,
        nationality: nationality,
        entryPort: entryPort,
        regCode: regCode,
        ftDirection: ftDirection,
        ftAirport: ftAirport,
        ftPackage: ftPackage,
        flightNumber: flightNumber,
        flightDate: flightDate,
        flightTime: flightTime,
        tripRequest: tripRequest,
        locale: locale
      }, t);

      var signaturePlainText = isRentACarVN
        ? ('\n\nThanks & Best Regards,\n' +
          'Rent A Car Vietnam – Fleet Dispatch Team\n' +
          '(A Specialized Fleet Brand of VN TO YOU TOUR CO., LTD)\n' +
          'Mr. Thong | Fleet Operations Manager\n' +
          'Mr. Thong: +84 977 632 673 (WhatsApp – Text Only)\n' +
          'Ms. Ruby: +84 934 615 595 (WhatsApp)\n' +
          'Line ID: vntoyou1 (https://line.me/ti/p/FNf-ArKG1M)\n' +
          'E: Sales@vntoyoutour.com\n' +
          'W: rentacarvietnam.com | vntoyoutour.com\n' +
          'A: 537 Bat Khoi – Thach Ban – Long Bien – Hanoi')
        : ('\n\nThanks & Best Regards,\n' +
          'VN To You Tour – Sales Team\n' +
          'Mr. Thong | Sales Manager\n' +
          'Mr. Thong: +84 977 632 673 (WhatsApp – Text Only)\n' +
          'Ms. Ruby: +84 934 615 595 (WhatsApp)\n' +
          'Line ID: vntoyou1 (https://line.me/ti/p/FNf-ArKG1M)\n' +
          'E: Sales@vntoyoutour.com\n' +
          'W: vntoyoutour.com | vntoyou.net | vntoyou.asia\n' +
          'A: 537 Bat Khoi – Thach Ban – Long Bien – Hanoi');

      var rawPlainText = '';
      if (isRentACarVN) {
        var rentACarPlainMap = {
          en: 'Dear ' + clientName + ',\n\nThank you for choosing Rent A Car Vietnam (a specialized fleet service operated by VN to You Tour)! We have received your private car rental quotation request. Our dispatch team will send you our recommended vehicles and an all-inclusive quote within 2 to 12 hours.\n\nWhatsApp: +84 934 615 595\nWebsite: https://rentacarvietnam.com | https://vntoyoutour.com',
          vi: 'Xin chào ' + clientName + ',\n\nCảm ơn bạn đã liên hệ Rent A Car Vietnam (thương hiệu dịch vụ xe du lịch trực thuộc VN to You Tour). Chúng tôi đã nhận được yêu cầu thuê xe và sẽ gửi báo giá trọn gói trong vòng 2-12 giờ.\n\nHotline/WhatsApp: +84 934 615 595\nWebsite: https://rentacarvietnam.com',
          zh: '尊敬的 ' + clientName + ' 您好，\n\n感谢您选择 Rent A Car Vietnam（VN to You Tour 旗下专属车队服务）！专属调度顾问将在2至12小时内发送全包透明报价。\n\nWhatsApp: +84 934 615 595\n官网: https://rentacarvietnam.com',
          ko: clientName + ' 고객님 안녕하세요,\n\nRent A Car Vietnam(VN to You Tour 직영 전용차량 서비스)에 문의해 주셔서 감사합니다. 현지 배차팀이 2~12시간 이내에 안내해 드리겠습니다.\n\nWhatsApp: +84 934 615 595\n홈페이지: https://rentacarvietnam.com',
          th: 'เรียนคุณ ' + clientName + ',\n\nขอขอบคุณที่เลือก Rent A Car Vietnam (ดำเนินการโดย VN to You Tour) เจ้าหน้าที่จะส่งใบเสนอราคาให้ท่านภายใน 2-12 ชั่วโมง\n\nWhatsApp: +84 934 615 595\nWebsite: https://rentacarvietnam.com',
          es: 'Estimado/a ' + clientName + ',\n\n¡Gracias por elegir Rent A Car Vietnam (operado por VN to You Tour)! Nuestro equipo le enviará una cotización en 2 a 12 horas.\n\nWhatsApp: +84 934 615 595\nSitio web: https://rentacarvietnam.com'
        };
        rawPlainText = rentACarPlainMap[locale] || rentACarPlainMap.en;
      } else {
        rawPlainText = isFastTrack ? t.ftPlainText(clientName) : (isVisa ? t.visaPlainText(clientName) : (isCarRental ? t.carPlainText(clientName) : t.plainText(clientName)));
      }

      var plainTextBody = rawPlainText + signaturePlainText;
      sendMailHelper(email, clientSubject, plainTextBody, htmlBody, senderName);
    }

    // 2. GỬI EMAIL THÔNG BÁO CHO QUẢN TRỊ VIÊN (ADMIN GMAIL)
    var adminEmail = Session.getActiveUser().getEmail() || 'sales@vntoyoutour.com';
    var adminSubject = '';
    if (isFastTrack) {
      adminSubject = '⚡ [ĐẶT VIP FAST TRACK - ' + locale.toUpperCase() + '] ' + clientName + ' - ' + (ftAirport || 'Airport') + ' (' + (ftDirection || 'Arrival') + ', ' + (ftPackage || 'VIP') + (flightNumber ? ', ' + flightNumber : '') + ')';
    } else if (isVisa) {
      adminSubject = '🛂 [HỒ SƠ VISA MỚI - ' + locale.toUpperCase() + '] ' + clientName + ' - ' + (visaService || 'Vietnam Visa') + ' (' + (nationality || 'Intl') + ', ' + (entryPort || 'Airport') + ')';
    } else if (isCarRental) {
      var adminSiteTag = isRentACarVN ? 'RENT A CAR VN - ' : '';
      adminSubject = '🚗 [' + adminSiteTag + 'BÁO GIÁ THUÊ XE - ' + locale.toUpperCase() + '] ' + clientName + ' - ' + (destination || 'Vietnam') + ' (' + (duration || '1 Day') + ', ' + (passengers || 'Pax') + ')';
    } else {
      adminSubject = '🔥 [ĐƠN ĐẶT TOUR MỚI - ' + locale.toUpperCase() + '] ' + (tourId ? tourId.toUpperCase() + ' - ' : '') + clientName + ' (' + (destination || 'Vietnam') + ')';
    }

    var adminHtml = buildAdminHtmlEmail({
      isFastTrack: isFastTrack,
      isVisa: isVisa,
      isCarRental: isCarRental,
      isRentACarVN: isRentACarVN,
      name: name,
      email: email,
      phone: phone,
      destination: destination,
      departureDate: departureDate || flightDate,
      duration: duration,
      passengers: passengers,
      hotelStyle: hotelStyle,
      specialRequests: specialRequests,
      tourId: tourId,
      tourTitle: tourTitle,
      visaService: visaService,
      nationality: nationality,
      entryPort: entryPort,
      regCode: regCode,
      ftDirection: ftDirection,
      ftAirport: ftAirport,
      ftPackage: ftPackage,
      flightNumber: flightNumber,
      flightDate: flightDate,
      flightTime: flightTime,
      tripRequest: tripRequest,
      pageUrl: pageUrl,
      locale: locale
    });

    sendMailHelper(
      adminEmail,
      adminSubject,
      (isFastTrack ? 'Có đơn đặt VIP Fast Track mới từ ' : (isVisa ? 'Có hồ sơ visa mới từ ' : (isCarRental ? (isRentACarVN ? 'Có yêu cầu thuê xe mới [Rent A Car VN] từ ' : 'Có yêu cầu thuê xe mới từ ') : 'Có đơn đặt tour mới từ '))) + clientName + ' (' + (email || phone) + '). Chi tiết: ' + tripRequest,
      adminHtml,
      senderName
    );

    return ContentService.createTextOutput(JSON.stringify({ ok: true, message: 'Processed successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Tạo Email HTML sang trọng gửi cho Khách hàng (Tour, Thuê xe, Visa hoặc Fast Track)
 */
function buildClientHtmlEmail(params, t) {
  var isFastTrack = params.isFastTrack;
  var isVisa = params.isVisa;
  var isCar = params.isCarRental;
  var isRentACarVN = params.isRentACarVN;

  // Lời chào & Định vị thương hiệu
  var mainTagline = isFastTrack ? t.ftTagline : (isVisa ? t.visaTagline : (isCar ? t.carTagline : t.tagline));
  if (isRentACarVN) {
    mainTagline = 'Private Fleet & Chauffeur Services • Operated by VN to You Tour';
  }

  var greetingText = isFastTrack ? t.ftGreeting : (isVisa ? t.visaGreeting : (isCar ? t.carGreeting : t.greeting));
  if (isRentACarVN) {
    var rentACarGreetingMap = {
      en: 'Thank you for contacting <strong>Rent A Car Vietnam</strong> (a specialized fleet & chauffeur brand operated by <strong>VN to You Tour</strong>)! We have successfully received your private car rental and driver quotation request. Our fleet operations team is reviewing your route and vehicle availability.',
      vi: 'Cảm ơn bạn đã liên hệ <strong>Rent A Car Vietnam</strong> (thương hiệu dịch vụ xe du lịch và tài xế chuyên nghiệp trực thuộc <strong>VN to You Tour</strong>)! Chúng tôi đã tiếp nhận yêu cầu báo giá thuê xe du lịch của bạn. Đội ngũ điều hành xe đang kiểm tra lộ trình và sắp xếp phương tiện phù hợp nhất.',
      zh: '感谢您联系 <strong>Rent A Car Vietnam</strong>（<strong>VN to You Tour</strong> 旗下专属车队与包车服务品牌）！我们已成功收到您的专车包车与定制行程需求，专属车队调度顾问正在核对路线与车辆安排。',
      ko: '<strong>Rent A Car Vietnam</strong>(<strong>VN to You Tour</strong> 직영 전용차량/대절 서비스)을 찾아주셔서 진심으로 감사드립니다! 고객님의 베트남 전용차량(기사 포함) 대절 견적 요청이 정상 접수되었으며, 현지 배차팀이 일정과 차량 배정을 확인하고 있습니다.',
      th: 'ขอขอบคุณที่ติดต่อ <strong>Rent A Car Vietnam</strong> (บริการรถเช่าพร้อมคนขับระดับพรีเมียม ดำเนินการโดย <strong>VN to You Tour</strong>)! ทางทีมงานได้รับข้อมูลการขอใบเสนอราคาของท่านเรียบร้อยแล้ว',
      es: '¡Muchas gracias por contactar a <strong>Rent A Car Vietnam</strong> (división de flota privada operada por <strong>VN to You Tour</strong>)! Hemos recibido su solicitud de cotización de alquiler de vehículos privados con chófer.'
    };
    greetingText = rentACarGreetingMap[params.locale] || rentACarGreetingMap.en;
  }

  var summaryHeading = isFastTrack ? t.ftSummaryTitle : (isVisa ? t.visaSummaryTitle : (isCar ? t.carSummaryTitle : t.summaryTitle));
  var nextTitle = isFastTrack ? t.ftNextStepsTitle : (isVisa ? t.visaNextStepsTitle : (isCar ? t.carNextStepsTitle : t.nextStepsTitle));
  var nextDesc = isFastTrack ? t.ftNextStepsDesc : (isVisa ? t.visaNextStepsDesc : (isCar ? t.carNextStepsDesc : t.nextStepsDesc));

  var summaryRowsHtml = '';

  if (isFastTrack) {
    summaryRowsHtml += 
      '<tr>' +
      '  <td style="padding: 10px 0 6px 0; font-size: 13px; color: #64748b; width: 42%; font-weight: 600;">' + t.fieldFtAirport + '</td>' +
      '  <td style="padding: 10px 0 6px 0; font-size: 13px; color: #0f172a; font-weight: 700;">' + (params.ftAirport || 'Vietnam International Airport') + '</td>' +
      '</tr>' +
      (params.ftDirection ? 
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldFtDirection + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + params.ftDirection + ' Fast Track</td>' +
      '</tr>' : '') +
      (params.ftPackage ? 
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldFtPackage + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0284c7; font-weight: 700;">' + params.ftPackage + '</td>' +
      '</tr>' : '') +
      ((params.flightNumber || params.flightTime) ? 
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldFtFlight + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + (params.flightNumber || 'TBD') + (params.flightTime ? ' (' + params.flightTime + ')' : '') + '</td>' +
      '</tr>' : '') +
      ((params.flightDate || params.departureDate) ? 
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldFtDate + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + (params.flightDate || params.departureDate) + '</td>' +
      '</tr>' : '') +
      (params.passengers ? 
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldFtPax + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + params.passengers + '</td>' +
      '</tr>' : '') +
      (params.specialRequests ? 
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldFtNotes + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-style: italic;">' + params.specialRequests + '</td>' +
      '</tr>' : '');
  } else if (isVisa) {
    summaryRowsHtml += 
      '<tr>' +
      '  <td style="padding: 10px 0 6px 0; font-size: 13px; color: #64748b; width: 42%; font-weight: 600;">' + t.fieldVisaService + '</td>' +
      '  <td style="padding: 10px 0 6px 0; font-size: 13px; color: #0f172a; font-weight: 700;">' + (params.visaService || 'Vietnam E-Visa Assistance') + '</td>' +
      '</tr>' +
      (params.nationality ? 
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldVisaNationality + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + params.nationality + '</td>' +
      '</tr>' : '') +
      (params.entryPort ? 
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldVisaPort + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + params.entryPort + '</td>' +
      '</tr>' : '') +
      (params.departureDate ? 
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldVisaDate + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + params.departureDate + '</td>' +
      '</tr>' : '') +
      (params.passengers ? 
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldVisaApplicants + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + params.passengers + '</td>' +
      '</tr>' : '') +
      (params.regCode ? 
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldVisaNotes + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + params.regCode + '</td>' +
      '</tr>' : '') +
      (params.specialRequests ? 
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldVisaNotes + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-style: italic;">' + params.specialRequests + '</td>' +
      '</tr>' : '');
  } else {
    var primaryFieldLabel = isCar ? t.fieldCarRoute : t.fieldTour;
    var primaryFieldVal = params.destination || (isCar ? 'Vietnam' : 'Vietnam Customized Private Tour');
    if (!isCar && params.tourTitle) {
      primaryFieldVal = (params.tourId ? '[' + params.tourId.toUpperCase() + '] ' : '') + params.tourTitle;
    }
    var durationLabel = isCar ? t.fieldCarDuration : t.fieldDuration;
    var paxLabel = isCar ? t.fieldCarPax : t.fieldPax;
    var notesLabel = isCar ? t.fieldCarNotes : t.fieldNotes;

    summaryRowsHtml += 
      '<tr>' +
      '  <td style="padding: 10px 0 6px 0; font-size: 13px; color: #64748b; width: 42%; font-weight: 600;">' + primaryFieldLabel + '</td>' +
      '  <td style="padding: 10px 0 6px 0; font-size: 13px; color: #0f172a; font-weight: 700;">' + primaryFieldVal + '</td>' +
      '</tr>' +
      (params.duration ?
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + durationLabel + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + params.duration + '</td>' +
      '</tr>' : '') +
      (params.departureDate ?
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldDate + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + params.departureDate + '</td>' +
      '</tr>' : '') +
      (params.passengers ?
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + paxLabel + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + params.passengers + '</td>' +
      '</tr>' : '') +
      (!isCar && params.hotelStyle ?
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + t.fieldHotel + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">' + params.hotelStyle + '</td>' +
      '</tr>' : '') +
      (params.specialRequests ?
      '<tr>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">' + notesLabel + '</td>' +
      '  <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-style: italic;">' + params.specialRequests + '</td>' +
      '</tr>' : '');
  }

  // Header Banner Brand Config
  var bannerBg = isRentACarVN 
    ? 'background: linear-gradient(135deg, #091e3a 0%, #1a56db 100%);' 
    : 'background: linear-gradient(135deg, #0f2744 0%, #0369a1 100%);';
  var brandTitle = isRentACarVN ? 'RENT A CAR VIETNAM' : 'VN TO YOU TOUR';
  var brandAccentColor = isRentACarVN ? '#1a56db' : '#0284c7';

  // Signature Block Brand Config
  var signatureBlockHtml = isRentACarVN ? (
    '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
    '  <tr>' +
    '    <td>' +
    '      <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0f172a;">Thanks &amp; Best Regards,</p>' +
    '      <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 700; color: #1a56db;">Rent A Car Vietnam – Fleet Dispatch Team</p>' +
    '      <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #64748b; font-style: italic;">(A Specialized Private Fleet Brand of VN TO YOU TOUR CO., LTD)</p>' +
    '      <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 600; color: #334155;">Mr. Thong | Fleet Operations Manager</p>' +
    '      <div style="font-size: 13px; color: #475569; line-height: 1.8; background-color: #f8fafc; border-left: 3px solid #1a56db; padding: 12px 16px; border-radius: 4px;">' +
    '        <div style="margin-bottom: 3px;">• <strong>Mr. Thong:</strong> <a href="https://wa.me/84977632673" target="_blank" style="color: #0f172a; text-decoration: none;">+84 977 632 673</a> <span style="color: #64748b; font-size: 11px;">(WhatsApp – Text Only)</span></div>' +
    '        <div style="margin-bottom: 3px;">• <strong>Ms. Ruby:</strong> <a href="https://wa.me/84934615595" target="_blank" style="color: #0f172a; text-decoration: none;">+84 934 615 595</a> <span style="color: #64748b; font-size: 11px;">(WhatsApp)</span></div>' +
    '        <div style="margin-bottom: 3px;">• <strong>Line ID:</strong> <a href="https://line.me/ti/p/FNf-ArKG1M" target="_blank" style="color: #1a56db; text-decoration: none; font-weight: 600;">vntoyou1</a></div>' +
    '        <div style="margin-bottom: 3px;">• <strong>E:</strong> <a href="mailto:Sales@vntoyoutour.com" style="color: #1a56db; text-decoration: none; font-weight: 600;">Sales@vntoyoutour.com</a></div>' +
    '        <div style="margin-bottom: 3px;">• <strong>W:</strong> <a href="https://rentacarvietnam.com" target="_blank" style="color: #1a56db; text-decoration: none; font-weight: 600;">rentacarvietnam.com</a> | <a href="https://vntoyoutour.com" target="_blank" style="color: #64748b; text-decoration: none;">vntoyoutour.com</a></div>' +
    '        <div>• <strong>A:</strong> 537 Bat Khoi – Thach Ban – Long Bien – Hanoi</div>' +
    '      </div>' +
    '    </td>' +
    '  </tr>' +
    '</table>'
  ) : (
    '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
    '  <tr>' +
    '    <td>' +
    '      <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0f172a;">Thanks &amp; Best Regards,</p>' +
    '      <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 700; color: #0369a1;">VN To You Tour – Sales Team</p>' +
    '      <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 600; color: #334155;">Mr. Thong | Sales Manager</p>' +
    '      <div style="font-size: 13px; color: #475569; line-height: 1.8; background-color: #f8fafc; border-left: 3px solid #0284c7; padding: 12px 16px; border-radius: 4px;">' +
    '        <div style="margin-bottom: 3px;">• <strong>Mr. Thong:</strong> <a href="https://wa.me/84977632673" target="_blank" style="color: #0f172a; text-decoration: none;">+84 977 632 673</a> <span style="color: #64748b; font-size: 11px;">(WhatsApp – Text Only)</span></div>' +
    '        <div style="margin-bottom: 3px;">• <strong>Ms. Ruby:</strong> <a href="https://wa.me/84934615595" target="_blank" style="color: #0f172a; text-decoration: none;">+84 934 615 595</a> <span style="color: #64748b; font-size: 11px;">(WhatsApp)</span></div>' +
    '        <div style="margin-bottom: 3px;">• <strong>Line ID:</strong> <a href="https://line.me/ti/p/FNf-ArKG1M" target="_blank" style="color: #0284c7; text-decoration: none; font-weight: 600;">vntoyou1</a></div>' +
    '        <div style="margin-bottom: 3px;">• <strong>E:</strong> <a href="mailto:Sales@vntoyoutour.com" style="color: #0284c7; text-decoration: none; font-weight: 600;">Sales@vntoyoutour.com</a></div>' +
    '        <div style="margin-bottom: 3px;">• <strong>W:</strong> <a href="https://vntoyoutour.com" target="_blank" style="color: #0284c7; text-decoration: none;">vntoyoutour.com</a> | <a href="https://vntoyou.net" target="_blank" style="color: #0284c7; text-decoration: none;">vntoyou.net</a> | <a href="http://www.vntoyou.asia/" target="_blank" style="color: #0284c7; text-decoration: none;">vntoyou.asia</a></div>' +
    '        <div>• <strong>A:</strong> 537 Bat Khoi – Thach Ban – Long Bien – Hanoi</div>' +
    '      </div>' +
    '    </td>' +
    '  </tr>' +
    '</table>'
  );

  // Footer Brand Config
  var footerHtml = isRentACarVN ? (
    '<p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 700; color: #0f172a;">RENT A CAR VIETNAM — VN TO YOU TOUR CO., LTD</p>' +
    '<p style="margin: 0; font-size: 11px; color: #64748b;">Direct Inbound Fleet Operator • Private Chauffeur Services in Vietnam</p>'
  ) : (
    '<p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 700; color: #0f172a;">VN TO YOU TOUR CO., LTD</p>' +
    '<p style="margin: 0; font-size: 11px; color: #64748b;">Direct Inbound Tour Operator • Chauffeur Fleet • VIP Airport Fast Track</p>'
  );

  return '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '  <meta charset="utf-8">' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '  <title>' + brandTitle + '</title>' +
    '</head>' +
    '<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">' +
    '  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 30px 10px;">' +
    '    <tr>' +
    '      <td align="center">' +
    '        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">' +
    '          ' +
    '          <!-- HEADER BANNER -->' +
    '          <tr>' +
    '            <td style="' + bannerBg + ' padding: 26px 30px; text-align: left;">' +
    '              <span style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px; text-transform: uppercase; display: block;">' + brandTitle + '</span>' +
    '              <div style="font-size: 12px; color: #bae6fd; margin-top: 4px; letter-spacing: 0.3px;">' + mainTagline + '</div>' +
    '            </td>' +
    '          </tr>' +
    '          ' +
    '          <!-- CONTENT BODY -->' +
    '          <tr>' +
    '            <td style="padding: 30px 30px 20px 30px;">' +
    '              <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #0f172a; font-weight: 700;">' +
    '                ' + t.dear + params.clientName + t.comma +
    '              </h2>' +
    '              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #334155;">' +
    '                ' + greetingText +
    '              </p>' +
    '              ' +
    '              <!-- SUMMARY CARD -->' +
    '              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 24px; padding: 16px 20px;">' +
    '                <tr>' +
    '                  <td colspan="2" style="padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">' +
    '                    <span style="font-size: 12px; font-weight: 700; color: ' + brandAccentColor + '; text-transform: uppercase; letter-spacing: 0.5px;">' + summaryHeading + '</span>' +
    '                  </td>' +
    '                </tr>' +
    summaryRowsHtml +
    '              </table>' +
    '              ' +
    '              <!-- NEXT STEPS ALERT BOX -->' +
    '              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px 16px; border-radius: 4px; margin-bottom: 24px;">' +
    '                <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #1e40af;">' +
    '                  <strong>' + nextTitle + '</strong> ' + nextDesc +
    '                </p>' +
    '              </div>' +
    '              ' +
    '              <!-- CTA BUTTONS -->' +
    '              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">' +
    '                <tr>' +
    '                  <td align="center">' +
    '                    <a href="https://wa.me/84934615595" target="_blank" style="display: inline-block; background-color: #25d366; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 6px; box-shadow: 0 2px 6px rgba(37,211,102,0.3);">' +
    '                      ' + t.btnWhatsApp +
    '                    </a>' +
    '                  </td>' +
    '                </tr>' +
    '              </table>' +
    '              ' +
    '              <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5; text-align: center;">' +
    '                ' + t.replyNote +
    '              </p>' +
    '            </td>' +
    '          </tr>' +
    '          ' +
    '          <!-- SIGNATURE & CONTACT DETAILS -->' +
    '          <tr>' +
    '            <td style="background-color: #ffffff; padding: 4px 30px 24px 30px; border-top: 1px solid #f1f5f9;">' +
    signatureBlockHtml +
    '            </td>' +
    '          </tr>' +
    '          ' +
    '          <!-- FOOTER -->' +
    '          <tr>' +
    '            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 30px; text-align: center;">' +
    footerHtml +
    '            </td>' +
    '          </tr>' +
    '        </table>' +
    '      </td>' +
    '    </tr>' +
    '  </table>' +
    '</body>' +
    '</html>';
}

/**
 * Tạo Email HTML thông báo cho Admin (Tour, Thuê Xe, Visa hoặc Fast Track)
 */
function buildAdminHtmlEmail(params) {
  var isFastTrack = params.isFastTrack;
  var isVisa = params.isVisa;
  var isCar = params.isCarRental;
  var isRentACarVN = params.isRentACarVN;

  var headingTitle = isRentACarVN
    ? '🚗 [RENT A CAR VIETNAM] YÊU CẦU BÁO GIÁ THUÊ XE MỚI (' + params.locale.toUpperCase() + ')'
    : (isFastTrack
      ? '⚡ ĐẶT DỊCH VỤ VIP FAST TRACK SÂN BAY (' + params.locale.toUpperCase() + ')'
      : (isVisa
        ? '🛂 YÊU CẦU DỊCH VỤ VISA MỚI (' + params.locale.toUpperCase() + ')'
        : (isCar
          ? '🚗 YÊU CẦU BÁO GIÁ THUÊ XE MỚI (' + params.locale.toUpperCase() + ')'
          : '🔥 ĐƠN ĐẶT TOUR MỚI TỪ WEBSITE (' + params.locale.toUpperCase() + ')')));

  var headerBg = isRentACarVN ? '#091e3a' : '#0f2744';

  if (isFastTrack) {
    return '<div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">' +
      '<div style="background-color: ' + headerBg + '; color: #fff; padding: 16px 20px;">' +
      '  <h2 style="margin: 0; font-size: 18px;">' + headingTitle + '</h2>' +
      '</div>' +
      '<div style="padding: 20px;">' +
      '  <p><strong>Khách hàng:</strong> ' + (params.name || 'Chưa cung cấp') + '</p>' +
      '  <p><strong>Email:</strong> <a href="mailto:' + params.email + '">' + (params.email || 'Không có') + '</a></p>' +
      '  <p><strong>Số điện thoại / WhatsApp:</strong> ' + (params.phone || 'Không có') + '</p>' +
      '  <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">' +
      '  <p><strong>Sân bay:</strong> <span style="color: #0284c7; font-weight: bold;">' + (params.ftAirport || 'Vietnam Airport') + '</span></p>' +
      '  <p><strong>Chiều dịch vụ:</strong> ' + (params.ftDirection || 'Arrival') + ' Fast Track</p>' +
      '  <p><strong>Gói dịch vụ:</strong> <strong>' + (params.ftPackage || 'Package 2: VIP Pro') + '</strong></p>' +
      ((params.flightNumber || params.flightTime) ? ('  <p><strong>Số hiệu chuyến bay:</strong> <code>' + (params.flightNumber || '') + '</code>' + (params.flightTime ? ' (' + params.flightTime + ')' : '') + '</p>') : '') +
      '  <p><strong>Ngày sử dụng dịch vụ:</strong> ' + (params.departureDate || params.flightDate || 'Chưa chọn') + '</p>' +
      '  <p><strong>Số lượng hành khách:</strong> ' + (params.passengers || '1') + '</p>' +
      '  <p><strong>Yêu cầu đặc biệt:</strong> ' + (params.specialRequests || 'Không có') + '</p>' +
      '  <p><strong>Ngôn ngữ:</strong> ' + params.locale.toUpperCase() + ' | <strong>Trang gửi:</strong> ' + params.pageUrl + '</p>' +
      '</div>' +
      '</div>';
  }

  if (isVisa) {
    return '<div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">' +
      '<div style="background-color: ' + headerBg + '; color: #fff; padding: 16px 20px;">' +
      '  <h2 style="margin: 0; font-size: 18px;">' + headingTitle + '</h2>' +
      '</div>' +
      '<div style="padding: 20px;">' +
      '  <p><strong>Khách hàng:</strong> ' + (params.name || 'Chưa cung cấp') + '</p>' +
      '  <p><strong>Email:</strong> <a href="mailto:' + params.email + '">' + (params.email || 'Không có') + '</a></p>' +
      '  <p><strong>Số điện thoại / WhatsApp:</strong> ' + (params.phone || 'Không có') + '</p>' +
      '  <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">' +
      '  <p><strong>Dịch vụ Visa:</strong> <span style="color: #0284c7; font-weight: bold;">' + (params.visaService || 'Vietnam Visa') + '</span></p>' +
      '  <p><strong>Quốc tịch hộ chiếu:</strong> ' + (params.nationality || 'Chưa cung cấp') + '</p>' +
      '  <p><strong>Cửa khẩu nhập cảnh:</strong> ' + (params.entryPort || 'Chưa chọn') + '</p>' +
      '  <p><strong>Ngày dự kiến đến:</strong> ' + (params.departureDate || 'Chưa chọn') + '</p>' +
      '  <p><strong>Số lượng hồ sơ:</strong> ' + (params.passengers || '1') + '</p>' +
      (params.regCode ? ('  <p><strong>Mã hồ sơ Cổng DVC:</strong> <code>' + params.regCode + '</code></p>') : '') +
      '  <p><strong>Ghi chú / Chuyến bay:</strong> ' + (params.specialRequests || 'Không có') + '</p>' +
      '  <p><strong>Ngôn ngữ:</strong> ' + params.locale.toUpperCase() + ' | <strong>Trang gửi:</strong> ' + params.pageUrl + '</p>' +
      '</div>' +
      '</div>';
  }

  var primaryLabel = isCar ? 'Điểm đón / Khởi hành:' : 'Tour / Tuyến điểm:';
  var primaryValue = params.destination || 'Chưa rõ';
  if (!isCar && params.tourTitle) {
    primaryValue = (params.tourId ? '[' + params.tourId.toUpperCase() + '] ' : '') + params.tourTitle;
  }

  return '<div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">' +
    '<div style="background-color: ' + headerBg + '; color: #fff; padding: 16px 20px;">' +
    '  <h2 style="margin: 0; font-size: 18px;">' + headingTitle + '</h2>' +
    '</div>' +
    '<div style="padding: 20px;">' +
    '  <p><strong>Khách hàng:</strong> ' + (params.name || 'Chưa cung cấp') + '</p>' +
    '  <p><strong>Email:</strong> <a href="mailto:' + params.email + '">' + (params.email || 'Không có') + '</a></p>' +
    '  <p><strong>Số điện thoại / WhatsApp:</strong> ' + (params.phone || 'Không có') + '</p>' +
    '  <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">' +
    '  <p><strong>' + primaryLabel + '</strong> ' + primaryValue + '</p>' +
    '  <p><strong>Ngày khởi hành / Dùng xe:</strong> ' + (params.departureDate || 'Chưa chọn') + '</p>' +
    '  <p><strong>Thời gian:</strong> ' + (params.duration || 'Chưa chọn') + '</p>' +
    '  <p><strong>Số khách:</strong> ' + (params.passengers || 'Chưa chọn') + '</p>' +
    (!isCar ? ('  <p><strong>Khách sạn / Điểm đón:</strong> ' + (params.hotelStyle || 'Chưa chọn') + '</p>') : '') +
    '  <p><strong>Ghi chú / Yêu cầu:</strong> ' + (params.specialRequests || 'Không có') + '</p>' +
    '  <p><strong>Nguồn website:</strong> ' + (isRentACarVN ? '<strong style="color: #1a56db;">Rent A Car Vietnam</strong>' : '<strong>VN to You Tour</strong>') + '</p>' +
    '  <p><strong>Ngôn ngữ:</strong> ' + params.locale.toUpperCase() + ' | <strong>Trang gửi:</strong> ' + params.pageUrl + '</p>' +
    '</div>' +
    '</div>';
}
