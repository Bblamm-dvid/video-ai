import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('prototype/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace scripts in angleVault with the 8 enriched scripts matching Screenshot 1 & 2
scripts_replacement = '''    scripts: [
      {
        id: "ANGLE_01",
        title: "3 Sai Lầm Trị Mụn Khiến Hàng Rào Bảo Vệ Da Sụp Đổ",
        updatedAt: "Hôm nay 10:45 • 3 Hook A/B",
        group: "Giáo Dục",
        sku: "Farmstay Toner (SKU-01)",
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
        title: "Đêm Dưỡng Da Căng Bóng Thủy Tinh (Glass Skin ASMR)",
        updatedAt: "Hôm qua 18:20",
        group: "Trải Nghiệm & ASMR",
        sku: "Collagen Ampoule (SKU-02)",
        skuFullName: "Farmstay All-In-One Collagen & Hyaluronic Acid Ampoule 250ml",
        scenesCount: 4,
        duration: "40s",
        totalDurationSeconds: 40,
        status: "Đang thử nghiệm",
        statusCode: "testing",
        targetAudience: "Khách hàng thích cảm giác thư giãn, mê làn da căng bóng ngậm nước",
        hook: "Nhìn cận cảnh giọt serum collagen tươi óng ánh tan chảy trên da sau đúng 3 giây!",
        hookVariants: [
          { id: "hook_a", name: "Hook A (Visual)", text: "Nhìn cận cảnh giọt serum collagen tươi óng ánh tan chảy trên da sau đúng 3 giây!" },
          { id: "hook_b", name: "Hook B (ASMR)", text: "Âm thanh mở nắp hộp kem 250ml giòn tan khiến bạn muốn dưỡng da ngay lập tức." }
        ],
        scenes: [
          {
            sceneNum: 1,
            title: "Cảnh Mở Đầu (The Hook)",
            timeRange: "0 – 3s",
            duration: "3 giây",
            visual: "Góc quay Macro cận cảnh muỗng lấy serum óng ánh với các hạt collagen vàng tan trên da.",
            voice: "Nhìn cận cảnh giọt serum collagen tươi óng ánh tan chảy trên da sau đúng 3 giây!",
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
        title: "Góc Trend: POV Khi Bạn Thấy Bạn Thân Quên Bôi Kem Chống Nắng",
        updatedAt: "2 ngày trước",
        group: "POV & Trend",
        sku: "Sehwa Sunscreen (SKU-03)",
        skuFullName: "Sehwa Daily UV Sun Shield SPF50+ PA++++ 70ml",
        scenesCount: 3,
        duration: "35s",
        totalDurationSeconds: 35,
        status: "Bản nháp",
        statusCode: "draft",
        targetAudience: "Gen Z & Dân văn phòng thích video hài hước, bắt trend TikTok",
        hook: "POV: Bạn vừa bước ra đường nắng 39 độ thì phát hiện con bạn thân quên bôi kem chống nắng!",
        hookVariants: [
          { id: "hook_a", name: "Hook A (Bắt Trend)", text: "POV: Bạn vừa bước ra đường nắng 39 độ thì phát hiện con bạn thân quên bôi kem chống nắng!" }
        ],
        scenes: [
          {
            sceneNum: 1,
            title: "Cảnh Mở Đầu (The Hook)",
            timeRange: "0 – 3s",
            duration: "3 giây",
            visual: "Model nhìn bạn thân với biểu cảm hoảng hốt tột độ dưới ánh nắng gắt chói chang.",
            voice: "POV: Bạn vừa bước ra đường nắng 39 độ thì phát hiện con bạn thân quên bôi kem chống nắng!",
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
        title: "Bóc Tách Bảng Thành Phần: Tại Sao BHA Farmstay Không Gây Rát Da?",
        updatedAt: "3 ngày trước",
        group: "Giáo Dục",
        sku: "Farmstay Clear (SKU-04)",
        skuFullName: "Farmstay Cica Farm Blemi Clear Ampoule 50ml",
        scenesCount: 5,
        duration: "50s",
        totalDurationSeconds: 50,
        status: "Sẵn sàng",
        statusCode: "ready",
        targetAudience: "Người dùng quan tâm khoa học dược mỹ phẩm, sợ kích ứng BHA",
        hook: "Đừng vội bỏ tiền triệu mua BHA nếu bạn chưa biết tại sao BHA kết hợp Cica lại êm dịu đến thế!",
        hookVariants: [
          { id: "hook_a", name: "Hook A (Khoa học)", text: "Đừng vội bỏ tiền triệu mua BHA nếu bạn chưa biết tại sao BHA kết hợp Cica lại êm dịu đến thế!" }
        ],
        scenes: [
          {
            sceneNum: 1,
            title: "Cảnh Mở Đầu (The Hook)",
            timeRange: "0 – 3s",
            duration: "3 giây",
            visual: "Góc quay cận cảnh bảng thành phần chai serum, ngón tay chỉ vào dòng Cica hữu cơ Jeju.",
            voice: "Đừng vội bỏ tiền triệu mua BHA nếu bạn chưa biết tại sao BHA kết hợp Cica lại êm dịu đến thế!",
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
      },
      {
        id: "ANGLE_05",
        title: "Review Thực Tế: Hũ Kem 250ml To Bằng Cái Bát Ăn Cơm",
        updatedAt: "4 ngày trước",
        group: "Giới Thiệu",
        sku: "Collagen Ampoule (SKU-02)",
        skuFullName: "Farmstay All-In-One Collagen & Hyaluronic Acid Ampoule 250ml",
        scenesCount: 4,
        duration: "38s",
        totalDurationSeconds: 38,
        status: "Sẵn sàng",
        statusCode: "ready",
        targetAudience: "Người mua hàng thực tế, thích sản phẩm dung tích lớn kinh tế",
        hook: "Một hũ kem to bằng cái bát ăn cơm! Dùng cả năm không hết có thật không các bà?",
        hookVariants: [
          { id: "hook_a", name: "Hook A (Hài hước)", text: "Một hũ kem to bằng cái bát ăn cơm! Dùng cả năm không hết có thật không các bà?" }
        ],
        scenes: [
          {
            sceneNum: 1,
            title: "Cảnh Mở Đầu (The Hook)",
            timeRange: "0 – 3s",
            duration: "3 giây",
            visual: "Model cầm hũ kem đặt cạnh mặt, hũ kem to gần bằng cả khuôn mặt.",
            voice: "Một hũ kem to bằng cái bát ăn cơm! Dùng cả năm không hết có thật không các bà?",
            effects: 'Sound effect tiếng cười vui nhộn. Text to: "250ML CỰC ĐẠI?".'
          },
          {
            sceneNum: 2,
            title: "Mở Hộp Trải Nghiệm",
            timeRange: "3 – 18s",
            duration: "15 giây",
            visual: "Dùng muỗng chuyên dụng múc một lượng lớn thoa lên tay và cổ, hạt collagen óng ánh tan chảy.",
            voice: "Không chỉ to mà còn siêu chất lượng: chứa collagen thủy phân và Hyaluronic Acid đậm đặc.",
            effects: 'Zoom cận cảnh muỗng múc gel trong suốt.'
          },
          {
            sceneNum: 3,
            title: "Tính Kinh Tế Cực Cao",
            timeRange: "18 – 30s",
            duration: "12 giây",
            visual: "Đồ họa so sánh 1 hũ 250ml tương đương 5 chai serum thông thường cộng lại.",
            voice: "Tính ra mỗi ngày chỉ tốn chưa tới 1.000 đồng để dưỡng cả mặt, cổ và bàn tay.",
            effects: 'Animation cân đo phép tính tiết kiệm 60% chi phí.'
          },
          {
            sceneNum: 4,
            title: "Kêu Gọi Đặt Hàng",
            timeRange: "30 – 38s",
            duration: "8 giây",
            visual: "Bao bì chính hãng tem phụ Việt, hotline phân phối độc quyền Mỹ Nguyên TSC.",
            voice: "Bấm ngay giỏ hàng nhận deal trợ giá độc quyền hôm nay!",
            effects: 'Hiệu ứng nhấp nháy giỏ hàng.'
          }
        ]
      },
      {
        id: "ANGLE_06",
        title: "Routine 3 Bước Cứu Vãn Da Khô Mốc Sau 8 Tiếng Máy Lạnh",
        updatedAt: "5 ngày trước",
        group: "Trải Nghiệm & ASMR",
        sku: "Farmstay Toner (SKU-01)",
        skuFullName: "Farmstay Cica Farm Blemi Clear Ampoule 50ml",
        scenesCount: 4,
        duration: "42s",
        totalDurationSeconds: 42,
        status: "Đang thử nghiệm",
        statusCode: "testing",
        targetAudience: "Chị em văn phòng da mất nước, mốc meo khi đánh phấn",
        hook: "Routine 3 bước cứu vãn làn da mệt mỏi sau ngày dài máy lạnh, sáng dậy da mướt mát không đổ dầu.",
        hookVariants: [
          { id: "hook_a", name: "Hook A (Routine)", text: "Routine 3 bước cứu vãn làn da mệt mỏi sau ngày dài máy lạnh, sáng dậy da mướt mát không đổ dầu." }
        ],
        scenes: [
          {
            sceneNum: 1,
            title: "Cảnh Mở Đầu (The Hook)",
            timeRange: "0 – 3s",
            duration: "3 giây",
            visual: "Khuôn mặt sau giờ làm việc mệt mỏi, da vùng mũi và cằm tróc vảy mốc nhẹ.",
            voice: "Routine 3 bước cứu vãn làn da mệt mỏi sau ngày dài máy lạnh, sáng dậy da mướt mát không đổ dầu.",
            effects: 'Âm thanh đồng hồ tích tắc tan sở. Text: "DA MỐC SAU GIỜ LÀM?".'
          },
          {
            sceneNum: 2,
            title: "Bước 1: Cấp Nước Tức Thì",
            timeRange: "3 – 18s",
            duration: "15 giây",
            visual: "Vỗ nhẹ serum rau má Cica Farmstay lên da, làn da như được tưới mát dịu lại.",
            voice: "Bước 1: Làm dịu và tưới nước cho biểu bì bằng serum Cica hữu cơ thẩm thấu trong 10 giây.",
            effects: 'Hiệu ứng bọt nước tan êm ái.'
          },
          {
            sceneNum: 3,
            title: "Bước 2 & 3: Khóa Ẩm & Tái Tạo",
            timeRange: "18 – 32s",
            duration: "14 giây",
            visual: "Thoa lớp mỏng kem Retinol khóa ẩm trước khi đi ngủ, gương mặt sáng bừng thư giãn.",
            voice: "Bước 2 và 3: Khóa ẩm bằng kem đêm để da tái tạo collagen tự thân suốt giấc ngủ.",
            effects: 'Ánh sáng đèn ngủ ấm áp, model mỉm cười nhẹ nhõm.'
          },
          {
            sceneNum: 4,
            title: "Kết Quả Sáng Hôm Sau",
            timeRange: "32 – 42s",
            duration: "10 giây",
            visual: "Khung cảnh sáng thức dậy đón ánh nắng, sờ tay lên má mịn màng không chút dầu thừa.",
            voice: "Sáng dậy da căng mướt đánh nền ăn tiệp tự nhiên. Thử ngay tại giỏ hàng nhé!",
            effects: 'Nhạc chuông buổi sáng sảng khoái.'
          }
        ]
      },
      {
        id: "ANGLE_07",
        title: "POV: Bạn Vừa Săn Được Deal Kem Chống Nắng 199K Chính Ngạch",
        updatedAt: "1 tuần trước",
        group: "POV & Trend",
        sku: "Sehwa Sunscreen (SKU-03)",
        skuFullName: "Sehwa Daily UV Sun Shield SPF50+ PA++++ 70ml",
        scenesCount: 3,
        duration: "30s",
        totalDurationSeconds: 30,
        status: "Sẵn sàng",
        statusCode: "ready",
        targetAudience: "Hội săn sale TikTok, chuộng hàng nhập khẩu chính ngạch",
        hook: "POV: Bạn vừa săn được tuýp kem chống nắng Hàn Quốc chính ngạch chỉ 199K và đây là chất kem!",
        hookVariants: [
          { id: "hook_a", name: "Hook A (Săn Sale)", text: "POV: Bạn vừa săn được tuýp kem chống nắng Hàn Quốc chính ngạch chỉ 199K và đây là chất kem!" }
        ],
        scenes: [
          {
            sceneNum: 1,
            title: "Cảnh Mở Đầu (The Hook)",
            timeRange: "0 – 3s",
            duration: "3 giây",
            visual: "Mở hộp unbox hàng giao tới, rút tuýp kem chống nắng Sehwa sáng bóng tem niêm phong.",
            voice: "POV: Bạn vừa săn được tuýp kem chống nắng Hàn Quốc chính ngạch chỉ 199K và đây là chất kem!",
            effects: 'Âm thanh ting ting đơn hàng giao thành công.'
          },
          {
            sceneNum: 2,
            title: "Test Chất Kem Siêu Mỏng",
            timeRange: "3 – 20s",
            duration: "17 giây",
            visual: "Bóp một lượng kem ra tay, tán đều trong 3 giây tiệp màu da tự nhiên không nâng tông lố.",
            voice: "Chất kem dạng sữa mỏng nhẹ, tan nhanh không nhờn dính, màng lọc chống nắng phổ rộng 50+.",
            effects: 'Cận cảnh soi da dưới camera HD cực nét.'
          },
          {
            sceneNum: 3,
            title: "Kêu Gọi Săn Deal",
            timeRange: "20 – 30s",
            duration: "10 giây",
            visual: "Tem phụ tiếng Việt Mỹ Nguyên TSC, chỉ tay vào voucher độc quyền TikTok Shop.",
            voice: "Chớp lấy deal độc quyền 199K số lượng có hạn tại giỏ hàng bên dưới nhé!",
            effects: 'Banner flash sale 199K nhảy số.'
          }
        ]
      },
      {
        id: "ANGLE_08",
        title: "Combo Dưỡng Sáng & Chống Lão Hóa Cấp Tốc Chuẩn Spa",
        updatedAt: "1 tuần trước",
        group: "Giới Thiệu",
        sku: "Farmstay Clear (SKU-04)",
        skuFullName: "Combo Farmstay Cica & Retinol Revive Cream",
        scenesCount: 4,
        duration: "45s",
        totalDurationSeconds: 45,
        status: "Sẵn sàng",
        statusCode: "ready",
        targetAudience: "Khách hàng muốn mua giải pháp trọn bộ, tiết kiệm và hiệu quả toàn diện",
        hook: "Combo dưỡng sáng ban ngày và phục hồi ban đêm giúp da mướt mát chuẩn Spa Hàn Quốc tại nhà.",
        hookVariants: [
          { id: "hook_a", name: "Hook A (Combo)", text: "Combo dưỡng sáng ban ngày và phục hồi ban đêm giúp da mướt mát chuẩn Spa Hàn Quốc tại nhà." }
        ],
        scenes: [
          {
            sceneNum: 1,
            title: "Cảnh Mở Đầu (The Hook)",
            timeRange: "0 – 3s",
            duration: "3 giây",
            visual: "Bộ đôi hũ kem đặt cạnh nhau trên khay đá vân sang trọng, ánh sáng studio lung linh.",
            voice: "Combo dưỡng sáng ban ngày và phục hồi ban đêm giúp da mướt mát chuẩn Spa Hàn Quốc tại nhà.",
            effects: 'Góc lia máy mượt mà 360 độ quanh 2 hũ kem.'
          },
          {
            sceneNum: 2,
            title: "Cica ban ngày - Retinol ban đêm",
            timeRange: "3 – 22s",
            duration: "19 giây",
            visual: "Model trình diễn 2 bước: sáng dùng Cica kiềm dầu mẩn đỏ, tối dùng Retinol tái sinh collagen.",
            voice: "Ban ngày kiềm dầu dịu da với rau má Cica hữu cơ, ban đêm khóa ẩm sâu tái sinh nếp nhăn với Retinol.",
            effects: 'Chia đôi khung hình Ngày / Đêm trực quan.'
          },
          {
            sceneNum: 3,
            title: "Cam Kết Chính Hãng",
            timeRange: "22 – 35s",
            duration: "13 giây",
            visual: "Tem chống giả và giấy công bố mỹ phẩm chính ngạch Mỹ Nguyên TSC.",
            voice: "100% nhập khẩu chính ngạch, có tem phụ và quét mã QR xác thực nguồn gốc.",
            effects: 'Quét tia laser qua mã QR xác nhận chính hãng.'
          },
          {
            sceneNum: 4,
            title: "Deal Ưu Đãi Độc Quyền",
            timeRange: "35 – 45s",
            duration: "10 giây",
            visual: "Khung quà tặng kèm tuýp chống nắng mini, giá combo giảm 45%.",
            voice: "Mua combo tiết kiệm ngay 45% kèm quà tặng giá trị tại giỏ hàng TikTok Shop!",
            effects: 'Pháo hoa chúc mừng ưu đãi combo.'
          }
        ]
      }
    ]'''

import re
# Find start of scripts: [ and end of AngleVault
start_idx = text.find('angleVault: {')
if start_idx != -1:
    # find scripts: [
    s_idx = text.find('scripts: [', start_idx)
    # find matching closing bracket for scripts
    # It ends before 'activeScriptWorkflow:'
    end_idx = text.find('// KỊCH BẢN PHÂN CẢNH HIỆN TẠI', s_idx)
    if end_idx == -1:
        end_idx = text.find('activeScriptWorkflow:', s_idx)
    
    # We can replace from s_idx to the end of scripts array
    # Let's find '],\n  },' or ']' before activeScriptWorkflow
    slice_to_replace = text[s_idx:end_idx]
    # Replace
    text = text[:s_idx] + scripts_replacement + '\n  },\n\n  ' + text[end_idx:]

with open('prototype/data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated data.js with 8 rich scripts matching Screenshot 1 & 2 successfully!")
