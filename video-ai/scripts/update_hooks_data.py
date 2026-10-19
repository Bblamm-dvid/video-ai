import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

# ==============================================================================
# 1. UPDATE DATA.JS: Add trendingHookVault matching Screenshot 1 & 3
# ==============================================================================
print("Updating data.js...")
with open('prototype/data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

hooks_data = '''
  // KHO CÂU HOOK TIKTOK VIRAL (THEO PHONG CÁCH XCORP & ẢNH 1, ẢNH 3)
  trendingHookVault: [
    {
      id: "HOOK_01",
      type: "Bóc Phốt / Cảnh Báo",
      sku: "Farmstay Retinol Revive Cream",
      skuCode: "SKU-05",
      skuId: "FARMSTAY_RETINOL_CREAM",
      hookText: "Dừng lại ngay nếu bạn đang thoa kem phục hồi mà da càng ngày càng khô sạm và nổi mụn!",
      visualCue: "Cận cảnh soi gương biểu cảm giật mình, zoom nhanh vào hũ kem Retinol.",
      targetPersona: "Nữ 25–40 tuổi",
      soundTrend: "Dramatic Whoosh"
    },
    {
      id: "HOOK_02",
      type: "Chuyên Gia Da Liễu",
      sku: "Farmstay Toner Rau Má",
      skuCode: "SKU-01",
      skuId: "FARMSTAY_CICA_SERUM",
      hookText: "3 Sai lầm kinh điển khi trị mụn khiến hàng rào bảo vệ da sụp đổ hoàn toàn!",
      visualCue: "Bác sĩ chỉ tay vào mô hình 3D lớp biểu bì da viêm đỏ, kính hiển vi điện tử.",
      targetPersona: "Sinh viên & Dân văn phòng 18–30 tuổi",
      soundTrend: "Science Explanation Ambient"
    },
    {
      id: "HOOK_03",
      type: "Visual Glass Skin",
      sku: "Collagen Ampoule",
      skuCode: "SKU-02",
      skuId: "FARMSTAY_HYALURONIC_AMPOULE",
      hookText: "Nhìn cận cảnh giọt serum collagen tươi óng ánh tan chảy trên da sau đúng 3 giây!",
      visualCue: "Góc quay macro 4K giọt tinh chất chạm vào gò má mướt mịn phát sáng Glass Skin.",
      targetPersona: "Nữ 22–35 tuổi chuộng phong cách da căng bóng",
      soundTrend: "ASMR Water Droplet & Soft Whisper"
    },
    {
      id: "HOOK_04",
      type: "Hài Hước Gen Z",
      sku: "Collagen Ampoule",
      skuCode: "SKU-02",
      skuId: "FARMSTAY_HYALURONIC_AMPOULE",
      hookText: "Một hũ kem to bằng cái bát ăn cơm! Dùng cả năm không hết có thật không các bà?",
      visualCue: "Model ôm hũ kem 250ml to ngang mặt với biểu cảm trố mắt cười nghiêng ngả.",
      targetPersona: "Gen Z & Khách hàng săn deal dung tích lớn",
      soundTrend: "Meme Pop Funny Beat"
    },
    {
      id: "HOOK_05",
      type: "POV Trải Nghiệm",
      sku: "Sehwa Sunscreen",
      skuCode: "SKU-03",
      skuId: "SEHWA_SUN_BLOCK",
      hookText: "POV: Bạn vừa bước ra đường nắng 39 độ thì phát hiện con bạn thân quên bôi kem chống nắng!",
      visualCue: "Model quay sang nhìn bạn thân hốt hoảng dưới ánh nắng gắt, rút tuýp Sehwa xanh cứu nguy.",
      targetPersona: "Học sinh, sinh viên, người di chuyển ngoài trời",
      soundTrend: "Dramatic Heartbeat Meme"
    },
    {
      id: "HOOK_06",
      type: "Night Routine",
      sku: "Farmstay Retinol Revive Cream",
      skuCode: "SKU-05",
      skuId: "FARMSTAY_RETINOL_CREAM",
      hookText: "Đêm dưỡng da căng bóng thủy tinh trước khi ngủ - Đánh bay mọi mệt mỏi ngày dài!",
      visualCue: "Ánh đèn ngủ ấm cúng, thoa lớp kem mỏng vỗ nhẹ thư giãn trước gương.",
      targetPersona: "Chị em công sở chăm sóc da ban đêm",
      soundTrend: "Lo-Fi Chill Night Beats"
    },
    {
      id: "HOOK_07",
      type: "Chuyên Gia Da Liễu",
      sku: "Farmstay Clear",
      skuCode: "SKU-04",
      skuId: "FARMSTAY_CICA_SERUM",
      hookText: "Tại sao dùng BHA mà da vẫn không hề rát? Bí mật nằm ở tỷ lệ Cica rau má kết hợp này!",
      visualCue: "Cận cảnh bảng thành phần chứng nhận KFDA và tem phụ tiếng Việt Mỹ Nguyên TSC.",
      targetPersona: "Người có da nhạy cảm muốn tẩy tế bào chết an toàn",
      soundTrend: "Tech Medical Ambient"
    },
    {
      id: "HOOK_08",
      type: "Bóc Phốt / Cảnh Báo",
      sku: "Sehwa Sunscreen",
      skuCode: "SKU-03",
      skuId: "SEHWA_SUN_BLOCK",
      hookText: "Đừng mua kem chống nắng nâng tông nếu bạn chưa biết cách phân biệt vệt trắng mốc meo!",
      visualCue: "Thử kem chống nắng thường loang lổ vs Sehwa tệp da tự nhiên không vệt trắng.",
      targetPersona: "Khách hàng sợ kem chống nắng bí da hay để lại vệt mốc",
      soundTrend: "Alert Danger Warning SFX"
    }
  ],
'''

# Insert trendingHookVault before contentKits or aliases
if "trendingHookVault:" not in data_content:
    data_content = data_content.replace('  // KHO VIDEO ĐÃ HOÀN THIỆN', hooks_data + '\n  // KHO VIDEO ĐÃ HOÀN THIỆN')

with open('prototype/data.js', 'w', encoding='utf-8') as f:
    f.write(data_content)
print("data.js updated successfully.")
