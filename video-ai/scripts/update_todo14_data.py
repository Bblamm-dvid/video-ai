import sys

sys.stdout.reconfigure(encoding='utf-8')

print("1. Updating data.js...")
with open('prototype/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

# ------------------------------------------------------------------------------
# 1. Update scripts in angleVault to strictly match Image 1 & only 2 statuses (Sẵn sàng & Bản nháp)
# ------------------------------------------------------------------------------
new_scripts_code = '''    scripts: [
      {
        id: "ANGLE_01",
        title: "3 Sai Lầm Trị Mụn Khiến Hàng Rào Bảo Vệ Da Sụp Đổ",
        updatedAt: "Hôm nay 10:45 • 3 Hook A/B",
        group: "Giáo Dục",
        sku: "Farmstay Toner Rau Má (SKU-01)",
        skuFullName: "Farmstay Cica Farm Blemi Clear Ampoule 50ml",
        scenesCount: 4,
        duration: "45s",
        totalDurationSeconds: 45,
        status: "Sẵn sàng",
        statusCode: "ready",
        targetAudience: "Nữ 22–35 tuổi, da mụn nhạy cảm, dễ kích ứng mẩn đỏ",
        hook: "Dừng lại ngay nếu da bạn càng trị mụn lại càng bùng phát chi chít!",
        hookVariants: [
          { id: "hook_a", name: "Hook A (Nỗi sợ)", text: "Dừng lại ngay nếu da bạn càng trị mụn lại càng bùng phát chi chít!" },
          { id: "hook_b", name: "Hook B (Tò mò)", text: "Có bao giờ bạn thắc mắc tại sao thoa đủ loại kem mà mụn vẫn thi nhau biểu tình?" },
          { id: "hook_c", name: "Hook C (Trực diện)", text: "Cảnh báo: 90% chị em đang trị mụn sai cách khiến hàng rào bảo vệ da sụp đổ!" }
        ],
        scenes: [
          {
            sceneNum: 1,
            title: "Cảnh Mở Đầu (The Hook)",
            timeRange: "0 – 3s",
            duration: "3 giây",
            visual: "Cận cảnh khuôn mặt nữ hoảng hốt nhìn nốt mụn sưng đỏ trước gương, camera zoom nhanh 1.2x.",
            voice: "Dừng lại ngay nếu da bạn càng trị mụn lại càng bùng phát chi chít!",
            effects: 'Text to: "CÀNG TRỊ CÀNG MỤN?". Âm thanh: Tiếng cảnh báo giật mình.'
          },
          {
            sceneNum: 2,
            title: "Phân Tích Cơ Chế Khoa Học",
            timeRange: "3 – 15s",
            duration: "12 giây",
            visual: "Mô hình 3D biểu bì da bị mất nước và vi khuẩn xâm nhập khi hàng rào lipid bị bào mòn.",
            voice: "Khi hàng rào lipid tự nhiên bị phá vỡ do dùng chất tẩy mạnh, vi khuẩn xâm nhập gây viêm dai dẳng.",
            effects: 'Đồ họa 3D zoom xuyên lớp biểu bì. Text nhấp nháy: "MÀNG LIPID TỔN THƯƠNG".'
          },
          {
            sceneNum: 3,
            title: "Giải Pháp & Trải Nghiệm Thực Tế",
            timeRange: "15 – 35s",
            duration: "20 giây",
            visual: "Model lấy một lượng toner Farmstay vỗ nhẹ lên da, giọt dưỡng chất ngậm nước thẩm thấu tức thì.",
            voice: "Chỉ cần cấp ẩm cân bằng dịu nhẹ với chiết xuất rau má Cica hữu cơ, da sẽ tự làm dịu và phục hồi sau 20 phút.",
            effects: 'Hiệu ứng nước bắn 3D điện ảnh. Nhạc nền nhẹ nhàng thư thái.'
          },
          {
            sceneNum: 4,
            title: "Kêu Gọi Mua Hàng (CTA)",
            timeRange: "35 – 45s",
            duration: "10 giây",
            visual: "Cận cảnh chai sản phẩm có tem phụ tiếng Việt Mỹ Nguyên TSC, trỏ tay xuống góc dưới màn hình.",
            voice: "Bấm ngay vào giỏ hàng góc trái để nhận ưu đãi độc quyền trợ giá 40% chỉ có trên phiên livestream này!",
            effects: 'Hiệu ứng mũi tên nhấp nháy trỏ vào giỏ hàng TikTok Shop. Text: "DEAL ĐỘC QUYỀN -40%".'
          }
        ]
      },
      {
        id: "ANGLE_02",
        title: "Đêm Dưỡng Da Căng Bóng Thủy Tinh (Glass Skin Routine ASMR)",
        updatedAt: "Hôm qua 18:20",
        group: "Trải Nghiệm & ASMR",
        sku: "Farmstay Collagen Ampoule (SKU-02)",
        skuFullName: "Farmstay All-In-One Collagen & Hyaluronic Acid Ampoule 250ml",
        scenesCount: 4,
        duration: "40s",
        totalDurationSeconds: 40,
        status: "Bản nháp",
        statusCode: "draft",
        targetAudience: "Khách hàng thích cảm giác thư giãn, mê làn da căng bóng ngậm nước",
        hook: "Nhìn cận cảnh kết cấu chất kem Retinol mềm mịn tan chảy trên da sau đúng 5 giây!",
        hookVariants: [
          { id: "hook_a", name: "Hook A (Visual)", text: "Nhìn cận cảnh kết cấu chất kem Retinol mềm mịn tan chảy trên da sau đúng 5 giây!" },
          { id: "hook_b", name: "Hook B (ASMR)", text: "Âm thanh mở nắp hộp kem 250ml giòn tan khiến bạn muốn dưỡng da ngay lập tức." }
        ],
        scenes: [
          {
            sceneNum: 1,
            title: "Cảnh Mở Đầu (The Hook)",
            timeRange: "0 – 3s",
            duration: "3 giây",
            visual: "Góc quay Macro cận cảnh muỗng lấy serum óng ánh với các hạt collagen vàng tan trên da.",
            voice: "Nhìn cận cảnh kết cấu chất kem Retinol mềm mịn tan chảy trên da sau đúng 5 giây!",
            effects: 'Hiệu ứng Slow-motion 120fps. Âm thanh ASMR giọt nước tan chảy.'
          },
          {
            sceneNum: 2,
            title: "Cảm Giác Chất Kem",
            timeRange: "3 – 18s",
            duration: "15 giây",
            visual: "Model thoa nhẹ lên gò má, hạt collagen vỡ bung tạo màng nước mỏng phát sáng.",
            voice: "Hạt collagen tươi vỡ tan ngay khi tiếp xúc nhiệt độ da, khóa ẩm tầng sâu màng TEWL.",
            effects: 'Hiệu ứng phát sáng Glass skin căng bóng phản chiếu ánh đèn.'
          },
          {
            sceneNum: 3,
            title: "Quy Mô Dung Tích Khủng",
            timeRange: "18 – 30s",
            duration: "12 giây",
            visual: "Model cầm hũ đại 250ml cạnh cốc nước 500ml để so sánh kích cỡ to bất ngờ.",
            voice: "Dung tích cực đại 250ml thoa cả mặt và cổ suốt nửa năm không lo hao hụt.",
            effects: 'Text nổi: "250ML CỰC ĐẠI - DƯỠNG CẢ MẶT & BODY".'
          },
          {
            sceneNum: 4,
            title: "Chốt Deal Flash Sale",
            timeRange: "30 – 40s",
            duration: "10 giây",
            visual: "Hũ sản phẩm đặt cạnh hộp tem phụ chính ngạch, nhãn voucher nhảy số từ 315K xuống 249K.",
            voice: "Deal độc quyền tại TikTok Shop hôm nay chỉ 249K. Mua ngay kẻo hết quà!",
            effects: 'Sticker chốt đơn nhấp nháy: "VOUCHER 249K".'
          }
        ]
      },
      {
        id: "ANGLE_03",
        title: "POV: Bạn Vừa Thử Kem Chống Nắng Kiềm Dầu 8 Tiếng Và Tìm Thấy Chân Ái",
        updatedAt: "2 ngày trước",
        group: "POV & Trend",
        sku: "Sehwa Kem Chống Nắng (SKU-03)",
        skuFullName: "Sehwa Daily UV Sun Shield SPF50+ PA++++ 70ml",
        scenesCount: 3,
        duration: "35s",
        totalDurationSeconds: 35,
        status: "Bản nháp",
        statusCode: "draft",
        targetAudience: "Gen Z & Dân văn phòng thích video hài hước, bắt trend TikTok",
        hook: "POV: Bạn vừa thử kem chống nắng kiềm dầu 8 tiếng không bí bách và tìm thấy chân ái!",
        hookVariants: [
          { id: "hook_a", name: "Hook A (Bắt Trend)", text: "POV: Bạn vừa thử kem chống nắng kiềm dầu 8 tiếng không bí bách và tìm thấy chân ái!" }
        ],
        scenes: [
          {
            sceneNum: 1,
            title: "Cảnh Mở Đầu (The Hook)",
            timeRange: "0 – 3s",
            duration: "3 giây",
            visual: "Model nhìn bạn thân với biểu cảm hoảng hốt tột độ dưới ánh nắng gắt chói chang.",
            voice: "POV: Bạn vừa thử kem chống nắng kiềm dầu 8 tiếng không bí bách và tìm thấy chân ái!",
            effects: 'Meme sound effect giật mình. Text rung lắc: "QUÊN KEM CHỐNG NẮNG???".'
          },
          {
            sceneNum: 2,
            title: "Giải Cứu Cấp Tốc",
            timeRange: "3 – 20s",
            duration: "17 giây",
            visual: "Rút ngay tuýp Sehwa Sunscreen màu xanh từ túi xách ra thoa đều lên mặt bạn trong 5 giây.",
            voice: "Chữa cháy ngay với Sehwa UV Shield: mỏng nhẹ ráo mịn như tơ, không vệt trắng, chống nắng SPF50+ PA++++.",
            effects: 'Chuyển cảnh nhanh tốc độ cao. Test giấy thấm dầu áp lên da khô ráo.'
          },
          {
            sceneNum: 3,
            title: "Kêu Gọi Chốt Đơn",
            timeRange: "20 – 35s",
            duration: "15 giây",
            visual: "Hai bạn cùng giơ ngón tay like trước ống kính, nụ cười tươi tắn tự tin dưới nắng.",
            voice: "Sắm ngay tuýp chống nắng kiềm dầu quốc dân đang trợ giá dưới 200K tại giỏ hàng nhé!",
            effects: 'Hiệu ứng chuyển màu rực rỡ. Bấm vào link giỏ hàng.'
          }
        ]
      },
      {
        id: "ANGLE_04",
        title: "Bóc Tách Bảng Thành Phần: Tại Sao BHA Farmstay Không Gây Khô Rát?",
        updatedAt: "3 ngày trước",
        group: "Giáo Dục",
        sku: "Farmstay Sữa Rửa Mặt (SKU-04)",
        skuFullName: "Farmstay Cica Farm Blemi Clear Cleanser 150ml",
        scenesCount: 5,
        duration: "50s",
        totalDurationSeconds: 50,
        status: "Sẵn sàng",
        statusCode: "ready",
        targetAudience: "Người dùng quan tâm khoa học dược mỹ phẩm, sợ kích ứng BHA",
        hook: "Rửa mặt xong mà da sạch kin kít là bạn đang tự tay phá nát hàng rào bảo vệ da!",
        hookVariants: [
          { id: "hook_a", name: "Hook A (Khoa học)", text: "Rửa mặt xong mà da sạch kin kít là bạn đang tự tay phá nát hàng rào bảo vệ da!" }
        ],
        scenes: [
          {
            sceneNum: 1,
            title: "Cảnh Mở Đầu (The Hook)",
            timeRange: "0 – 3s",
            duration: "3 giây",
            visual: "Góc quay cận cảnh bảng thành phần chai sữa rửa mặt, ngón tay chỉ vào dòng Cica hữu cơ Jeju.",
            voice: "Rửa mặt xong mà da sạch kin kít là bạn đang tự tay phá nát hàng rào bảo vệ da!",
            effects: 'Hiệu ứng phóng to kính lúp điện tử. Sound effect chuông khoa học.'
          },
          {
            sceneNum: 2,
            title: "Cơ Chế BHA Tự Nhiên",
            timeRange: "3 – 18s",
            duration: "15 giây",
            visual: "Mô phỏng 3D lỗ chân lông bị bít tắc bởi bã nhờn được acid salicylic nhẹ nhàng làm sạch.",
            voice: "BHA hữu cơ tan trong dầu giúp dọn sạch bã nhờn sâu trong lỗ chân lông mà không bào mòn màng bảo vệ.",
            effects: 'Animation 3D lỗ chân lông thông thoáng sạch mịn.'
          },
          {
            sceneNum: 3,
            title: "Tác Động Kép Từ Rau Má Jeju",
            timeRange: "18 – 35s",
            duration: "17 giây",
            visual: "Hình ảnh lá rau má Cica xanh mướt chuyển hóa thành tinh chất làm dịu vết đỏ tức thì.",
            voice: "Song song đó, tinh chất rau má Cica hữu cơ Jeju làm dịu vết đỏ và ngăn chặn phản ứng châm chích.",
            effects: 'Màu sắc chuyển sang tông xanh dịu mát tự nhiên.'
          },
          {
            sceneNum: 4,
            title: "So Sánh Trước & Sau",
            timeRange: "35 – 45s",
            duration: "10 giây",
            visual: "Hình ảnh chia đôi màn hình: ngày 1 và ngày 14 với bề mặt da mịn màng, giảm rõ rệt sợi bã nhờn.",
            voice: "Kết quả kiểm nghiệm thực tế sau 14 ngày: giảm 78% sợi bã nhờn mà da vẫn ẩm mượt.",
            effects: 'Thanh trượt so sánh Before / After trực quan.'
          },
          {
            sceneNum: 5,
            title: "Kêu Gọi Mua Hàng",
            timeRange: "45 – 50s",
            duration: "5 giây",
            visual: "Tem phụ tiếng Việt Mỹ Nguyên TSC rõ nét trên thân hộp, nút voucher TikTok Shop.",
            voice: "Trải nghiệm ngay serum BHA êm dịu chính ngạch Mỹ Nguyên tại góc trái nhé!",
            effects: 'Mũi tên nhấp nháy giỏ hàng.'
          }
        ]
      }
    ]'''

# Replace scripts in data_js
import re
data_js = re.sub(
    r'scripts:\s*\[.*?\]\s*\}\s*,\s*// KỊCH BẢN PHÂN CẢNH HIỆN TẠI',
    new_scripts_code + '\n  },\n\n  // KỊCH BẢN PHÂN CẢNH HIỆN TẠI',
    data_js,
    flags=re.DOTALL
)

# ------------------------------------------------------------------------------
# 2. Update trendingHookVault to match Image 2 (7 items)
# ------------------------------------------------------------------------------
new_hooks_code = '''  trendingHookVault: [
    {
      id: "HOOK_01",
      hookText: "Dừng lại ngay nếu bạn đang thoa kem phục hồi mà da càng ngày càng khô sạm và nổi mụn!",
      type: "Cảnh Báo",
      sku: "Farmstay Retinol Cream",
      skuCode: "SKU-05",
      visualCue: "Cận cảnh soi gương biểu cảm giật mình, zoom nhanh vào hũ kem Retinol.",
      targetPersona: "Nữ 25–40 tuổi",
      soundTrend: "Dramatic Whoosh"
    },
    {
      id: "HOOK_02",
      hookText: "Đừng vội mua serum tiền triệu nếu bạn chưa biết cơ chế khóa ẩm TEWL này của da!",
      type: "Chuyên Gia",
      sku: "Farmstay Toner Rau Má",
      skuCode: "SKU-01",
      visualCue: "Bác sĩ chỉ tay vào mô hình 3D lớp biểu bì da viêm đỏ, kính hiển vi điện tử.",
      targetPersona: "Sinh viên & Dân văn phòng 18–30 tuổi",
      soundTrend: "Science Explanation Ambient"
    },
    {
      id: "HOOK_03",
      hookText: "Nhìn cận cảnh kết cấu chất kem Retinol mềm mịn tan chảy trên da sau đúng 5 giây!",
      type: "Glass Skin",
      sku: "Farmstay Collagen Ampoule",
      skuCode: "SKU-02",
      visualCue: "Góc quay macro 4K giọt tinh chất chạm vào gò má mướt mịn phát sáng Glass Skin.",
      targetPersona: "Nữ 22–35 tuổi chuộng phong cách da căng bóng",
      soundTrend: "ASMR Water Droplet & Soft Whisper"
    },
    {
      id: "HOOK_04",
      hookText: "Một hũ kem to bằng cái bát ăn cơm! Dùng cả năm không hết có thật không hả các bà?",
      type: "Hài Hước",
      sku: "Farmstay Collagen Hũ 250ml",
      skuCode: "SKU-02",
      visualCue: "Model ôm hũ kem 250ml to ngang mặt với biểu cảm trố mắt cười nghiêng ngả.",
      targetPersona: "Gen Z & Khách hàng săn deal dung tích lớn",
      soundTrend: "Meme Pop Funny Beat"
    },
    {
      id: "HOOK_05",
      hookText: "POV: Bạn vừa thử kem chống nắng kiềm dầu 8 tiếng không bí bách và tìm thấy chân ái!",
      type: "POV",
      sku: "Sehwa Kem Chống Nắng Kiềm Dầu",
      skuCode: "SKU-03",
      visualCue: "Model quay sang nhìn bạn thân hốt hoảng dưới ánh nắng gắt, rút tuýp Sehwa xanh cứu nguy.",
      targetPersona: "Học sinh, sinh viên, người di chuyển ngoài trời",
      soundTrend: "Dramatic Heartbeat Meme"
    },
    {
      id: "HOOK_06",
      hookText: "Rửa mặt xong mà da sạch kin kít là bạn đang tự tay phá nát hàng rào bảo vệ da!",
      type: "Cảnh Báo",
      sku: "Farmstay Sữa Rửa Mặt BHA",
      skuCode: "SKU-04",
      visualCue: "Thử miết tay lên da rít phát ra tiếng cọt kẹt, chuyển cảnh da bị khô tróc nứt nẻ.",
      targetPersona: "Người dùng có thói quen rửa mặt bằng sữa tạo bọt quá mạnh",
      soundTrend: "Squeaky Clean SFX & Alert"
    },
    {
      id: "HOOK_07",
      hookText: "Routine 3 bước cứu vãn làn da mệt mỏi sau 8 tiếng điều hòa văn phòng cùng mình nhé!",
      type: "Glass Skin",
      sku: "Farmstay Kem Phục Hồi Ban Đêm",
      skuCode: "SKU-05",
      visualCue: "Ánh đèn ngủ ấm cúng, thoa lớp kem mỏng vỗ nhẹ thư giãn trước gương.",
      targetPersona: "Chị em công sở chăm sóc da ban đêm",
      soundTrend: "Lo-Fi Chill Night Beats"
    }
  ],'''

data_js = re.sub(
    r'trendingHookVault:\s*\[.*?\]\s*,',
    new_hooks_code,
    data_js,
    flags=re.DOTALL
)

with open('prototype/data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print("data.js updated.")
