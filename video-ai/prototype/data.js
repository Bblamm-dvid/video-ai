/**
 * MỸ NGUYÊN TSC & XCORP VIDEO AI STUDIO - DATASET ĐA DỰ ÁN (MULTI-PROJECT & SESSIONS)
 * Kiến trúc tái cấu trúc chuẩn Doanh Nghiệp / SaaS:
 * - Cấp 1: Projects (Dự án theo Lĩnh Vực / Nhãn Hàng: Mỹ Phẩm, Đồ Ăn Vặt F&B, Thời Trang)
 * - Cấp 2: Kho Tài Nguyên Riêng Biệt của từng Lĩnh Vực (SKU, Model đa góc, Kịch bản, Hook, Media Drive, Thành phẩm)
 * - Cấp 3: Sessions (Mỗi phiên prompt làm video là 1 Session có lịch sử Prompt Iterations v1, v2...)
 */

window.PROTOTYPE_PROJECTS = [
  // =========================================================================
  // PROJECT 1: MỸ PHẨM & SKINCARE CHÍNH NGẠCH (MỸ NGUYÊN TSC)
  // =========================================================================
  {
    id: "proj_cosmetics",
    name: "Mỹ Phẩm Mỹ Nguyên TSC",
    shortName: "Mỹ Nguyên TSC",
    category: "Mỹ Phẩm & Skincare",
    categoryBadge: "Dược Mỹ Phẩm",
    icon: "",
    description: "Nhà nhập khẩu & phân phối độc quyền mỹ phẩm Hàn Quốc chính ngạch Farmstay, Sehwa",
    stats: { completedVideos: 4, sessionsCount: 3, skusCount: 4 },
    brand: {
      name: "CÔNG TY TNHH TM & DV MỸ NGUYÊN (MỸ NGUYÊN TSC)",
      tagline: "Nhà nhập khẩu & phân phối độc quyền mỹ phẩm Hàn Quốc chính ngạch",
      policy: "Product Lock: Tuyệt đối giữ 100% bao bì, logo, tem phụ tiếng Việt nguyên bản",
      skus: [
        {
          id: "FARMSTAY_RETINOL_CREAM",
          name: "Farmstay Retinol Revive Cream 100ml",
          category: "Kem dưỡng Retinol tái tạo, chống lão hóa",
          origin: "Hàn Quốc (Chính Ngạch Mỹ Nguyên TSC)",
          price: "450.000đ",
          dealPrice: "299.000đ",
          badge: "Sản Phẩm Thật",
          image: "media/image/farmstay_retinol_box.jpg",
          usp: [
            "Retinyl Palmitate 0.1% chống lão hóa êm dịu không kích ứng",
            "Tocopheryl Acetate + Panthenol phục hồi hàng rào da",
            "100% hình ảnh & tem phụ tiếng Việt độc quyền Mỹ Nguyên TSC"
          ]
        },
        {
          id: "FARMSTAY_CICA_SERUM",
          name: "Farmstay Cica Farm Blemi-Clear Serum 50ml",
          category: "Tinh chất phục hồi, mờ thâm mụn",
          origin: "Hàn Quốc (Chính Ngạch)",
          price: "349.000đ",
          dealPrice: "249.000đ",
          badge: "Best Seller",
          image: "media/image/farmstay_retinol_water.jpg",
          usp: [
            "Chiết xuất rau má Cica hữu cơ Jeju",
            "Làm dịu da mẩn đỏ cấp tốc sau 20p",
            "Tem phụ tiếng Việt độc quyền Mỹ Nguyên TSC"
          ]
        },
        {
          id: "SEHWA_SUN_BLOCK",
          name: "Sehwa UV Perfect Daily Sun Shield SPF50+ PA++++",
          category: "Kem chống nắng quang phổ rộng",
          origin: "Hàn Quốc (Chính Ngạch)",
          price: "290.000đ",
          dealPrice: "199.000đ",
          badge: "Hot Deal Live",
          image: "media/image/farmstay_retinol_box.jpg",
          usp: [
            "Kiềm dầu 8 tiếng không bí bách",
            "Không để lại vệt trắng, không cay mắt",
            "Lớp finish căng bóng chuẩn Glass Skin"
          ]
        },
        {
          id: "FARMSTAY_HYALURONIC_AMPOULE",
          name: "Farmstay All-In-One Collagen & Hyaluronic Acid Ampoule 250ml",
          category: "Ampoule siêu cấp ẩm size khổng lồ",
          origin: "Hàn Quốc (Chính Ngạch)",
          price: "420.000đ",
          dealPrice: "315.000đ",
          badge: "Size Đại 250ml",
          image: "media/image/farmstay_retinol_hand.jpg",
          usp: [
            "Dung tích cực đại 250ml dùng cả năm",
            "Hạt collagen tươi vỡ tan trên da",
            "Thấm sâu khóa ẩm TEWL không nhờn dính"
          ]
        }
      ]
    },

    faceLibrary: [
      {
        id: "FACE_01",
        name: "Dược sĩ Mai Lan (Chính Chủ Kênh)",
        role: "Đại diện thương hiệu / Chuyên môn da liễu",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80",
        status: "Đã xác thực bản quyền khuôn mặt",
        description: "Nữ 30 tuổi, phong thái dược sĩ tri thức, nét mặt phúc hậu tin cậy"
      },
      {
        id: "FACE_02",
        name: "Reviewer Thu Trang (KOC Da Khô)",
        role: "KOC Trải Nghiệm Thực Tế",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        status: "Đã xác thực bản quyền",
        description: "Nữ 25 tuổi, trẻ trung năng động, da sáng bóng chuẩn Hàn"
      },
      {
        id: "FACE_03",
        name: "Bác Sĩ Nguyễn Hoàng (Da Liễu)",
        role: "Cố vấn Y khoa",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80",
        status: "Đã xác thực bản quyền",
        description: "Nam 35 tuổi, áo blouse trắng, uy tín phân tích thành phần"
      }
    ],

    modelVault: {
      modelFolders: [
        {
          id: "model_all",
          name: "Tất Cả Model Mỹ Phẩm",
          isPublic: true
        },
        {
          id: "model_mailan",
          name: "Dược Sĩ Mai Lan",
          role: "Đại Diện Kênh / Chuyên Gia Dược Liệu",
          age: "30 tuổi",
          style: "Trang nhã, chuyên nghiệp, uy tín y khoa",
          description: "Nữ 30 tuổi, phong thái dược sĩ tri thức, nét mặt phúc hậu tin cậy, giọng truyền cảm ấm áp.",
          coverThumb: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80",
          angles: [
            { id: "ang_ml_1", label: "Chính Diện (Portrait 9:16)", thumb: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80", angleDesc: "Nhìn thẳng camera, nụ cười nhẹ chuẩn chuyên gia" },
            { id: "ang_ml_2", label: "Góc Nghiêng 45° Phải", thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80", angleDesc: "Góc 3/4 khoe đường nét thanh lịch và làn da" },
            { id: "ang_ml_3", label: "Cận Cảnh Nụ Cười (Close-up)", thumb: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop&q=80", angleDesc: "Cận cảnh biểu cảm tươi sáng và ánh mắt thân thiện" },
            { id: "ang_ml_4", label: "Tương Tác Cầm Sản Phẩm", thumb: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=80", angleDesc: "Cầm hũ kem ngang ngực giới thiệu khách hàng" }
          ]
        },
        {
          id: "model_thutrang",
          name: "KOC Thu Trang",
          role: "Beauty Creator / Reviewer Da Khô",
          age: "25 tuổi",
          style: "Trẻ trung, năng động, phong cách Gen Z",
          description: "Nữ 25 tuổi, làn da căng bóng mịn màng chuẩn Hàn Quốc, biểu cảm tự nhiên giàu năng lượng.",
          coverThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
          angles: [
            { id: "ang_tt_1", label: "Chính Diện Rạng Rỡ", thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", angleDesc: "Trang điểm tự nhiên căng mướt Glass Skin" },
            { id: "ang_tt_2", label: "Góc Nghiêng 45° Trái", thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80", angleDesc: "Ánh sáng tự nhiên, góc nghiêng thanh thoát" },
            { id: "ang_tt_3", label: "Cận Cảnh Làn Da (Macro Skin)", thumb: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80", angleDesc: "Cận cảnh biểu bì má căng bóng mướt" },
            { id: "ang_tt_4", label: "Biểu Cảm Bất Ngờ (Hook Viral)", thumb: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80", angleDesc: "Gương mặt há hốc ngạc nhiên khi thấy deal giá sốc" }
          ]
        },
        {
          id: "model_nguyenhoang",
          name: "Bác Sĩ Nguyễn Hoàng",
          role: "Bác Sĩ Chuyên Khoa Da Liễu",
          age: "35 tuổi",
          style: "Uy tín y khoa, khoa học, phân tích chuyên sâu",
          description: "Nam 35 tuổi, trang phục áo blouse trắng bác sĩ, phân tích cơ chế thành phần khoa học chuẩn chỉ.",
          coverThumb: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80",
          angles: [
            { id: "ang_nh_1", label: "Chính Diện Áo Blouse", thumb: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80", angleDesc: "Áo blouse bác sĩ, ánh nhìn nghiêm túc uy tín" },
            { id: "ang_nh_2", label: "Góc Nghiêng Thuyết Trình", thumb: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80", angleDesc: "Góc nghiêng giải thích sơ đồ biểu bì da" },
            { id: "ang_nh_3", label: "Cận Cảnh Phân Tích Kính Lúp", thumb: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80", angleDesc: "Cầm bảng kết quả kiểm nghiệm lâm sàng" }
          ]
        }
      ]
    },

    assetVault: {
      productFolders: [
        { id: "folder_all", name: "Tất Cả Thư Mục", isPublic: true },
        {
          id: "folder_cica",
          name: "Farmstay Toner Rau Má (SKU-01)",
          price: "249.000đ",
          description: "Chiết xuất rau má Cica hữu cơ Jeju, làm dịu da mẩn đỏ cấp tốc sau 20 phút",
          coverThumb: "media/image/farmstay_retinol_water.jpg",
          skuInfo: {
            code: "SKU-01",
            name: "Farmstay Toner Rau Má (SKU-01)",
            origin: "Phân phối chính ngạch bởi Mỹ Nguyên TSC • Xuất xứ: Hàn Quốc",
            price: "249.000đ",
            description: "Chiết xuất rau má Cica hữu cơ Jeju, làm dịu da mẩn đỏ cấp tốc sau 20 phút",
            uspList: [
              "Rau má Cica hữu cơ Jeju",
              "Dịu da sau 20 phút",
              "Tem phụ chính ngạch Mỹ Nguyên TSC"
            ]
          }
        },
        {
          id: "folder_collagen",
          name: "Farmstay Collagen Ampoule (SKU-02)",
          price: "315.000đ",
          description: "Ampoule siêu cấp ẩm size khổng lồ 250ml, collagen tươi vỡ tan trên da",
          coverThumb: "media/image/farmstay_retinol_hand.jpg",
          skuInfo: {
            code: "SKU-02",
            name: "Farmstay Collagen Ampoule (SKU-02)",
            origin: "Phân phối chính ngạch bởi Mỹ Nguyên TSC • Xuất xứ: Hàn Quốc",
            price: "315.000đ",
            description: "Ampoule siêu cấp ẩm size khổng lồ 250ml, collagen tươi vỡ tan trên da",
            uspList: [
              "Collagen tươi thủy phân",
              "Cấp ẩm sâu 72 giờ",
              "Dung tích cực đại 250ml"
            ]
          }
        },
        {
          id: "folder_sehwa",
          name: "Sehwa Kem Chống Nắng (SKU-03)",
          price: "199.000đ",
          description: "Kem chống nắng quang phổ rộng SPF50+ PA++++, kiềm dầu 8 tiếng",
          coverThumb: "media/image/farmstay_retinol_box.jpg",
          skuInfo: {
            code: "SKU-03",
            name: "Sehwa Kem Chống Nắng Kiềm Dầu (SKU-03)",
            origin: "Phân phối chính ngạch bởi Mỹ Nguyên TSC • Xuất xứ: Hàn Quốc",
            price: "199.000đ",
            description: "Kem chống nắng quang phổ rộng SPF50+ PA++++, kiềm dầu 8 tiếng",
            uspList: [
              "Kiềm dầu 8 tiếng",
              "Không vệt trắng không cay mắt",
              "Chống nắng SPF50+ PA++++"
            ]
          }
        },
        {
          id: "folder_cleanser",
          name: "Farmstay Sữa Rửa Mặt (SKU-04)",
          price: "189.000đ",
          description: "BHA dịu nhẹ kết hợp Cica hữu cơ Jeju, làm sạch sâu không khô căng",
          coverThumb: "media/image/farmstay_retinol_texture.jpg",
          skuInfo: {
            code: "SKU-04",
            name: "Farmstay Sữa Rửa Mặt BHA (SKU-04)",
            origin: "Phân phối chính ngạch bởi Mỹ Nguyên TSC • Xuất xứ: Hàn Quốc",
            price: "189.000đ",
            description: "BHA dịu nhẹ kết hợp Cica hữu cơ Jeju, làm sạch sâu không khô căng",
            uspList: [
              "BHA 0.5% dịu nhẹ",
              "Độ pH 5.5 chuẩn da",
              "Làm sạch sâu ngừa mụn"
            ]
          }
        }
      ],
      driveFiles: [
        { id: "DF_01", folderId: "folder_cica", name: "Chai_Chinh_Dien_90deg.jpg", type: "image", thumb: "media/image/farmstay_retinol_water.jpg", size: "2.4 MB" },
        { id: "DF_02", folderId: "folder_cica", name: "Tem_Phu_Tieng_Viet.jpg", type: "image", thumb: "media/image/farmstay_retinol_box.jpg", size: "3.1 MB" },
        { id: "DF_03", folderId: "folder_cica", name: "Goc_Nghieng_45deg.jpg", type: "image", thumb: "media/image/farmstay_retinol_hand.jpg", size: "2.8 MB" },
        { id: "DF_04", folderId: "folder_cica", name: "Texture_Chat_Kem.jpg", type: "image", thumb: "media/image/farmstay_retinol_texture.jpg", size: "4.0 MB" },
        { id: "DF_V01", folderId: "folder_cica", name: "Cica_Toner_Quay_Can_Chai_Raw.mp4", type: "video", thumb: "media/image/farmstay_retinol_water.jpg", videoSrc: "media/video/final_final.mp4", size: "14.2 MB", duration: "00:24", createdAt: "15/09/2026" },
        { id: "DF_V02", folderId: "folder_cica", name: "Cica_Test_Texture_Nuoc_Raw.mp4", type: "video", thumb: "media/image/farmstay_retinol_texture.jpg", videoSrc: "media/video/loi_text.mp4", size: "18.6 MB", duration: "00:32", createdAt: "16/09/2026" },

        { id: "DF_05", folderId: "folder_collagen", name: "Hu_250ml_Chinh_Dien.jpg", type: "image", thumb: "media/image/farmstay_retinol_hand.jpg", size: "2.5 MB" },
        { id: "DF_06", folderId: "folder_collagen", name: "Tem_Chinh_Ngach_TSC.jpg", type: "image", thumb: "media/image/farmstay_retinol_box.jpg", size: "2.1 MB" },
        { id: "DF_07", folderId: "folder_collagen", name: "Collagen_Ampoule_Goc_Nghieng.jpg", type: "image", thumb: "media/image/farmstay_retinol_water.jpg", size: "3.3 MB" },
        { id: "DF_08", folderId: "folder_collagen", name: "Texture_Hat_Collagen.jpg", type: "image", thumb: "media/image/farmstay_retinol_texture.jpg", size: "3.9 MB" },
        { id: "DF_V03", folderId: "folder_collagen", name: "Collagen_Mo_Nap_Hu_Kem_Raw.mp4", type: "video", thumb: "media/image/farmstay_retinol_hand.jpg", videoSrc: "media/video/final_final.mp4", size: "22.1 MB", duration: "00:45", createdAt: "14/09/2026" },

        { id: "DF_09", folderId: "folder_sehwa", name: "Tuyp_Sehwa_Chinh_Dien.jpg", type: "image", thumb: "media/image/farmstay_retinol_box.jpg", size: "2.2 MB" },
        { id: "DF_10", folderId: "folder_sehwa", name: "Tem_Phu_Bo_Y_Te.jpg", type: "image", thumb: "media/image/farmstay_retinol_water.jpg", size: "1.9 MB" },
        { id: "DF_11", folderId: "folder_sehwa", name: "Goc_Nghieng_Tuyp_45.jpg", type: "image", thumb: "media/image/farmstay_retinol_hand.jpg", size: "2.7 MB" },
        { id: "DF_12", folderId: "folder_sehwa", name: "Test_Kiem_Dau_8H.jpg", type: "image", thumb: "media/image/farmstay_retinol_texture.jpg", size: "3.5 MB" },
        { id: "DF_V05", folderId: "folder_sehwa", name: "Sehwa_Test_Kiem_Dau_8H_Raw.mp4", type: "video", thumb: "media/image/farmstay_retinol_box.jpg", videoSrc: "media/video/loi_text.mp4", size: "19.4 MB", duration: "00:35", createdAt: "12/09/2026" },

        { id: "DF_13", folderId: "folder_cleanser", name: "Chai_Sua_Rua_Mat.jpg", type: "image", thumb: "media/image/farmstay_retinol_texture.jpg", size: "2.1 MB" },
        { id: "DF_14", folderId: "folder_cleanser", name: "Tem_Tieng_Viet_Chinh_Hang.jpg", type: "image", thumb: "media/image/farmstay_retinol_box.jpg", size: "2.4 MB" },
        { id: "DF_15", folderId: "folder_cleanser", name: "Bong_Bot_Cica_Jeju.jpg", type: "image", thumb: "media/image/farmstay_retinol_water.jpg", size: "3.0 MB" },
        { id: "DF_16", folderId: "folder_cleanser", name: "Texture_Gel_BHA.jpg", type: "image", thumb: "media/image/farmstay_retinol_hand.jpg", size: "3.6 MB" },
        { id: "DF_V07", folderId: "folder_cleanser", name: "Cleanser_Tao_Bot_Min_Mang_Raw.mp4", type: "video", thumb: "media/image/farmstay_retinol_texture.jpg", videoSrc: "media/video/loi_giong_doc.mp4", size: "25.0 MB", duration: "00:40", createdAt: "10/09/2026" }
      ]
    },

    angleVault: {
      scripts: [
        {
          id: "ANGLE_01",
          title: "3 Sai Lầm Trị Mụn Khiến Hàng Rào Bảo Vệ Da Sụp Đổ",
          updatedAt: "Hôm nay 10:45",
          group: "Giáo Dục",
          sku: "Farmstay Toner Rau Má (SKU-01)",
          skuFullName: "Farmstay Cica Farm Blemi Clear Ampoule 50ml",
          scenesCount: 4,
          duration: "45s",
          status: "Sẵn sàng",
          statusCode: "ready",
          targetAudience: "Nữ 22–35 tuổi, da mụn nhạy cảm, dễ kích ứng mẩn đỏ",
          hook: "Dừng lại ngay nếu da bạn càng trị mụn lại càng bùng phát chi chít!",
          scenes: [
            {
              sceneNum: 1,
              title: "Cảnh Mở Đầu (The Hook)",
              timeRange: "0 – 3s",
              visual: "Cận cảnh khuôn mặt hoảng hốt nhìn nốt mụn sưng đỏ trước gương, zoom nhanh 1.2x.",
              voice: "Dừng lại ngay nếu da bạn càng trị mụn lại càng bùng phát chi chít!"
            },
            {
              sceneNum: 2,
              title: "Cơ Chế Khoa Học",
              timeRange: "3 – 15s",
              visual: "Mô hình 3D biểu bì da bị mất nước và vi khuẩn xâm nhập khi màng lipid bị tổn thương.",
              voice: "Khi hàng rào lipid tự nhiên bị phá vỡ, vi khuẩn xâm nhập gây viêm dai dẳng."
            },
            {
              sceneNum: 3,
              title: "Giải Pháp Cica Hữu Cơ",
              timeRange: "15 – 35s",
              visual: "Model vỗ nhẹ toner Farmstay lên da, giọt dưỡng chất ngậm nước thẩm thấu tức thì.",
              voice: "Chỉ cần cấp ẩm cân bằng dịu nhẹ với Cica Jeju, da sẽ tự làm dịu sau 20 phút."
            },
            {
              sceneNum: 4,
              title: "Kêu Gọi CTA",
              timeRange: "35 – 45s",
              visual: "Cận cảnh chai sản phẩm có tem phụ tiếng Việt Mỹ Nguyên TSC, trỏ tay xuống giỏ hàng.",
              voice: "Bấm ngay vào giỏ hàng góc trái nhận ưu đãi độc quyền 249K hôm nay!"
            }
          ]
        },
        {
          id: "ANGLE_02",
          title: "Đêm Dưỡng Da Căng Bóng Thủy Tinh (Glass Skin Routine ASMR)",
          updatedAt: "Hôm qua 18:20",
          group: "Trải Nghiệm & ASMR",
          sku: "Farmstay Collagen Ampoule (SKU-02)",
          scenesCount: 4,
          duration: "40s",
          status: "Sẵn sàng",
          statusCode: "ready",
          targetAudience: "Khách hàng thích cảm giác thư giãn, mê làn da căng bóng ngậm nước",
          hook: "Nhìn cận cảnh kết cấu chất kem Retinol mềm mịn tan chảy trên da sau đúng 5 giây!",
          scenes: [
            {
              sceneNum: 1,
              title: "Cảnh Mở Đầu (The Hook)",
              timeRange: "0 – 3s",
              visual: "Góc quay Macro cận cảnh muỗng lấy serum óng ánh với hạt collagen vàng tan trên da.",
              voice: "Nhìn cận cảnh kết cấu chất kem mềm mịn tan chảy trên da sau đúng 5 giây!"
            }
          ]
        }
      ]
    },

    trendingHookVault: [
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
        id: "HOOK_07",
        hookText: "Routine 3 bước cứu vãn làn da mệt mỏi sau 8 tiếng điều hòa văn phòng cùng mình nhé!",
        type: "Glass Skin",
        sku: "Farmstay Kem Phục Hồi Ban Đêm",
        skuCode: "SKU-05",
        visualCue: "Ánh đèn ngủ ấm cúng, thoa lớp kem mỏng vỗ nhẹ thư giãn trước gương.",
        targetPersona: "Chị em công sở chăm sóc da ban đêm",
        soundTrend: "Lo-Fi Chill Night Beats"
      }
    ],

    contentKits: [
      {
        id: "MN_KIT_001",
        title: "TVC Farmstay Retinol - Giải Quyết Nỗi Sợ Lão Hóa 3D",
        sku: "Farmstay Retinol Revive Cream 100ml",
        sourceType: "script_ai",
        sourceLabel: "Từ Kịch Bản AI",
        hook: "Da lúc nào cũng thô ráp, nếp nhăn li ti xuất hiện ngày càng rõ?",
        duration: "24s",
        caption: "Cảnh báo sai lầm khi dưỡng da lão hóa! Xem ngay cơ chế phục hồi 3D độc quyền cùng Farmstay Retinol chính ngạch Mỹ Nguyên TSC 👇 #mynguyentsc #farmstay #retinolrevive",
        hashtags: ["#mynguyentsc", "#farmstay", "#retinolrevive"],
        thumb: "media/image/farmstay_retinol_box.jpg",
        videoUrl: "media/video/final_final.mp4"
      },
      {
        id: "MN_KIT_002",
        title: "Highlight Live - Thử Thách Kiềm Dầu Sehwa UV Shield",
        sku: "Sehwa Daily Sun Shield SPF50+",
        sourceType: "livestream",
        sourceLabel: "Từ Cắt Livestream",
        hook: "Test thật giấy thấm dầu sau 3 tiếng dưới đèn cao áp!",
        duration: "32s",
        caption: "Chân ái chống nắng mùa hè cho team da dầu mụn! Kiềm dầu đỉnh chóp cùng Sehwa UV Shield ☀️ #mynguyentsc #sehwasuncream",
        hashtags: ["#mynguyentsc", "#sehwasuncream", "#kemchongnang"],
        thumb: "media/image/farmstay_retinol_hand.jpg",
        videoUrl: "media/video/loi_giong_doc.mp4"
      }
    ],

    livestreamSession: {
      id: "LIVE_2026_09_15",
      title: "Livestream Mega Sale 15/09 - Mỹ Nguyên TSC Chính Ngạch",
      duration: "02:15:30",
      goldenMoments: [
        {
          id: "LS_CLIP_01",
          title: "Đoạn 1: Báo Giá & Flash Deal Retinol 299K",
          group: "Nhóm 2 - Báo Giá & Khuyến Mãi (Deal)",
          timestamp: "00:14:20 - 00:14:55",
          duration: "35s",
          trimStart: "00:14:20",
          trimEnd: "00:14:55",
          trimSec: 35,
          summary: "Host chốt deal 299k, giải thích công thức Retinyl Palmitate 0.1% chống lão hóa êm dịu, chốt 85 đơn trong 30s.",
          recommendedHook: "Duy nhất phiên live hôm nay, Retinol Farmstay trợ giá 299k!",
          videoSrc: "media/video/final_final.mp4",
          thumb: "media/image/farmstay_retinol_box.jpg",
          caption: "Duy nhất trong phiên live hôm nay, hũ kem Retinol Farmstay 100ml trợ giá còn 299k. Mua ngay trên giỏ hàng!",
          status: "Chờ duyệt"
        },
        {
          id: "LS_CLIP_02",
          title: "Đoạn 2: Test Chất Serum Cica Farmstay Lên Da",
          group: "Nhóm 3 - Trải Nghiệm & Test Mỹ Phẩm",
          timestamp: "00:42:10 - 00:42:48",
          duration: "38s",
          trimStart: "00:42:10",
          trimEnd: "00:42:48",
          trimSec: 38,
          summary: "Host thoa tinh chất serum Cica lên mu bàn tay, test độ thẩm thấu nhanh không nhờn dính, mẩn đỏ dịu tức thì.",
          recommendedHook: "Thoa serum Cica lên tay cho cả nhà xem chất kem nhé, thẩm thấu cực nhanh!",
          videoSrc: "media/video/loi_giong_doc.mp4",
          thumb: "media/image/farmstay_retinol_water.jpg",
          caption: "Bây giờ em thoa serum Cica lên tay cho cả nhà xem chất kem nhé, thẩm thấu cực kỳ nhanh sau 20 phút.",
          status: "Chờ duyệt"
        },
        {
          id: "LS_CLIP_03",
          title: "Đoạn 3: Tư Vấn Chuyên Sâu Da Dầu Mụn Dùng Retinol",
          group: "Nhóm 1 - Tư Vấn Chuyên Sâu SP",
          timestamp: "01:15:05 - 01:15:45",
          duration: "40s",
          trimStart: "01:15:05",
          trimEnd: "01:15:45",
          trimSec: 40,
          summary: "Dược sĩ giải đáp thắc mắc da dầu mụn dùng Retinol có bị bùng viêm không, phân tích thành phần Panthenol làm dịu hàng rào da.",
          recommendedHook: "Da dầu mụn có dùng được Retinol không? Câu trả lời từ Dược sĩ!",
          videoSrc: "media/video/final_final.mp4",
          thumb: "media/image/farmstay_retinol_hand.jpg",
          caption: "Nhiều bạn hỏi da dầu mụn có dùng được Retinol không, câu trả lời là cực kỳ cần thiết nếu có Panthenol phục hồi.",
          status: "Chờ duyệt"
        }
      ]
    },

    // KHO LIVESTREAM NGUỒN (Mục 1 Todo25: File video live thô 1-3h + Dữ liệu bóc băng ASR)
    livestreamsVault: [
      {
        id: "LIVE_2026_09_15",
        title: "Livestream Mega Sale 15/09 - Mỹ Nguyên TSC Chính Ngạch",
        date: "15/09/2026",
        time: "19:30 – 21:45",
        duration: "02:15:30",
        streamer: "Thùy Tiên & Dược sĩ Minh",
        format: ".mp4",
        resolution: "1080p 60fps",
        fileSize: "2.84 GB",
        asrStatus: "completed",
        asrWordCount: 14250,
        rawClipCount: 10,
        thumb: "media/image/farmstay_retinol_box.jpg",
        videoSrc: "media/video/final_final.mp4",
        summary: "Phiên live Mega Sale chốt deal Retinol 299k, tư vấn da dầu mụn và giải đáp thắc mắc phục hồi hàng rào da.",
        asrTranscript: [
          { time: "00:00:15", text: "Chào cả nhà đã đến với phiên livestream tối 15/09 của Mỹ Nguyên TSC!" },
          { time: "00:05:40", text: "Hôm nay tụi mình mang đến dòng Retinol Farmstay chính ngạch Hàn Quốc có tem phụ Bộ Y Tế." },
          { time: "00:14:20", text: "Duy nhất phiên live hôm nay, Retinol Farmstay trợ giá 299k! Mua ngay trên giỏ hàng góc trái." },
          { time: "00:14:45", text: "Vô kênh của mình mà theo dõi follow up mình sẽ được giảm giá thêm 20k voucher độc quyền nha." },
          { time: "00:42:10", text: "Bây giờ em thoa serum Cica lên mu bàn tay cho cả nhà xem chất kem nhé, thẩm thấu cực nhanh." },
          { time: "01:15:05", text: "Nhiều bạn hỏi da dầu mụn có dùng được Retinol không, câu trả lời từ Dược sĩ là cực kỳ cần thiết." }
        ]
      },
      {
        id: "LIVE_2026_09_20",
        title: "Live 20/09 - Tâm Sự Đêm Khuya & Tri Ân Khách Hàng Thân Thiết",
        date: "20/09/2026",
        time: "21:00 – 23:15",
        duration: "02:15:00",
        streamer: "Minh Thư (Founder)",
        format: ".mov",
        resolution: "1080p 30fps",
        fileSize: "3.15 GB",
        asrStatus: "completed",
        asrWordCount: 16800,
        rawClipCount: 8,
        thumb: "media/image/farmstay_retinol_water.jpg",
        videoSrc: "media/video/loi_giong_doc.mp4",
        summary: "Buổi live tâm sự mộc mạc chuyện nghề kinh doanh mỹ phẩm, những lần vấp ngã và nguyên tắc chỉ bán hàng chính ngạch.",
        asrTranscript: [
          { time: "00:00:25", text: "Chào các chị em cú đêm nha, hôm nay không bán hàng nặng nề đâu, ngồi trò chuyện chút thôi." },
          { time: "00:18:10", text: "Hồi mới mở tiệm bị lừa mất 200 triệu tiền kem trộn, khóc 3 ngày 3 đêm mới thấm thía bài học." },
          { time: "00:25:00", text: "Mỹ phẩm hay nhập khẩu mỹ phẩm không có chính sách giấy tờ pháp lý là không bao giờ em nhận phân phối." },
          { time: "00:32:15", text: "Thì có thể tham khảo cái shop bên em nha, xin kinh doanh về đường dài cần cái tâm." }
        ]
      },
      {
        id: "LIVE_2026_09_05",
        title: "Live 05/09 - Ra Mắt & Test Trực Tiếp Dòng Phục Hồi Cica Farmstay",
        date: "05/09/2026",
        time: "14:00 – 15:45",
        duration: "01:45:00",
        streamer: "Dược sĩ Minh & Chuyên viên Da liễu",
        format: ".mkv",
        resolution: "1080p 60fps",
        fileSize: "1.92 GB",
        asrStatus: "completed",
        asrWordCount: 11200,
        rawClipCount: 6,
        thumb: "media/image/farmstay_retinol_hand.jpg",
        videoSrc: "media/video/final_final.mp4",
        summary: "Soi da vi phẫu trực tiếp dưới máy phân tích da, chứng minh độ làm dịu kích ứng của chiết xuất Centella Asiatica.",
        asrTranscript: [
          { time: "00:00:30", text: "Hôm nay chúng tôi đặt máy soi da độ phóng đại 200 lần ngay tại studio để làm thí nghiệm trực quan." },
          { time: "00:15:20", text: "Vùng da ửng đỏ sau khi thoa tinh chất Cica 10 phút đã hạ nhiệt độ và giảm mao mạch sung huyết rõ rệt." }
        ]
      }
    ],

    // KHO CLIP THÔ (Chuẩn 5 cột theo yêu cầu Todo25)
    rawClipsVault: [
      {
        id: "RAW_01",
        quote: "Hồi mới mở tiệm bị lừa mất 200 triệu tiền kem trộn...",
        summary: "Host xúc động kể bài học xương máu ngày đầu khởi nghiệp và lý do chỉ chọn nhập khẩu chính ngạch.",
        topic: "Tâm sự đời thường",
        liveName: "Live 20/09 - Tâm sự đêm khuya",
        liveDate: "20/09/2026",
        liveId: "LIVE_2026_09_20",
        duration: "00:35",
        durationSec: 35,
        usageStatus: "Đã chọn / Đang dựng",
        assignedTo: "Nguyễn Văn Hùng",
        contextNote: "Streamer mặc áo dài trắng, không khí trầm lắng, rất hợp dựng video chia sẻ triết lý kinh doanh.",
        timestamp: "00:18:10 - 00:18:45",
        trimStart: "00:18:10",
        trimEnd: "00:18:45",
        trimSec: 35,
        product: "—",
        videoSrc: "media/video/loi_giong_doc.mp4",
        thumb: "media/image/farmstay_retinol_water.jpg"
      },
      {
        id: "RAW_02",
        quote: "Vô kênh của mình mà theo dõi follow up mình sẽ được giảm giá...",
        summary: "Host kêu gọi bấm theo dõi kênh để nhận voucher 20k giảm giá trực tiếp trong phiên live.",
        topic: "Hài hước / Tương tác",
        liveName: "Live 15/09 - Mega Sale Mỹ Nguyên",
        liveDate: "15/09/2026",
        liveId: "LIVE_2026_09_15",
        duration: "00:25",
        durationSec: 25,
        usageStatus: "Đã bỏ",
        assignedTo: "—",
        contextNote: "Âm thanh bị lọt tiếng quạt gió ở hậu trường, đã đánh dấu bỏ để không dựng trùng.",
        timestamp: "00:14:20 - 00:14:45",
        trimStart: "00:14:20",
        trimEnd: "00:14:45",
        trimSec: 25,
        product: "Farmstay Retinol Cream",
        videoSrc: "media/video/final_final.mp4",
        thumb: "media/image/farmstay_retinol_box.jpg"
      },
      {
        id: "RAW_03",
        quote: "Chào bạn Long Nguyễn nè chào bạn CD nè chào bạn Tâm Hương nè...",
        summary: "Host tương tác chào hỏi dồn dập người xem vào xem livestream và tạo không khí thân thiện.",
        topic: "Hài hước / Tương tác",
        liveName: "Live 15/09 - Mega Sale Mỹ Nguyên",
        liveDate: "15/09/2026",
        liveId: "LIVE_2026_09_15",
        duration: "00:28",
        durationSec: 28,
        usageStatus: "Đã hoàn thiện",
        assignedTo: "Phạm Quốc Bảo",
        contextNote: "Đã dựng xong video TikTok mã KIT_FINAL_LS_01, video đã lên xu hướng.",
        timestamp: "00:18:10 - 00:18:38",
        trimStart: "00:18:10",
        trimEnd: "00:18:38",
        trimSec: 28,
        product: "—",
        videoSrc: "media/video/loi_giong_doc.mp4",
        thumb: "media/image/farmstay_retinol_water.jpg"
      },
      {
        id: "RAW_04",
        quote: "Mỹ phẩm hay nhập khẩu mỹ phẩm không có chính sách giấy tờ pháp lý...",
        summary: "Dược sĩ khẳng định tầm quan trọng của tem phụ và giấy kiểm định Bộ Y Tế khi mua mỹ phẩm.",
        topic: "Tư vấn chuyên sâu SP",
        liveName: "Live 15/09 - Mega Sale Mỹ Nguyên",
        liveDate: "15/09/2026",
        liveId: "LIVE_2026_09_15",
        duration: "00:30",
        durationSec: 30,
        usageStatus: "Đã chọn / Đang dựng",
        assignedTo: "Trần Minh Đức",
        contextNote: "Dược sĩ cầm hũ kem chỉ rõ tem chống giả, ánh sáng studio nét căng.",
        timestamp: "00:25:00 - 00:25:30",
        trimStart: "00:25:00",
        trimEnd: "00:25:30",
        trimSec: 30,
        product: "Farmstay Retinol Cream",
        videoSrc: "media/video/final_final.mp4",
        thumb: "media/image/farmstay_retinol_hand.jpg"
      },
      {
        id: "RAW_05",
        quote: "Thì có thể tham khảo cái shop bên em nha xin kinh doanh về đường dài...",
        summary: "Host chia sẻ cam kết đồng hành cùng khách hàng, hỗ trợ đổi trả nếu không ưng ý.",
        topic: "Chia sẻ kinh nghiệm",
        liveName: "Live 20/09 - Tâm sự đêm khuya",
        liveDate: "20/09/2026",
        liveId: "LIVE_2026_09_20",
        duration: "00:33",
        durationSec: 33,
        usageStatus: "Chưa duyệt",
        assignedTo: "—",
        contextNote: "Tư liệu mới cắt từ live tối qua, chưa có editor nào nhận dựng.",
        timestamp: "00:32:15 - 00:32:48",
        trimStart: "00:32:15",
        trimEnd: "00:32:48",
        trimSec: 33,
        product: "—",
        videoSrc: "media/video/loi_giong_doc.mp4",
        thumb: "media/image/farmstay_retinol_box.jpg"
      },
      {
        id: "RAW_06",
        quote: "Duy nhất phiên live hôm nay, Retinol Farmstay trợ giá 299k!",
        summary: "Khoảnh khắc chốt deal Flash Sale bùng nổ, host giơ bảng giá và đếm ngược chốt đơn.",
        topic: "Báo giá / Deal",
        liveName: "Live 15/09 - Mega Sale Mỹ Nguyên",
        liveDate: "15/09/2026",
        liveId: "LIVE_2026_09_15",
        duration: "00:35",
        durationSec: 35,
        usageStatus: "Đã hoàn thiện",
        assignedTo: "Nguyễn Văn Hùng",
        contextNote: "Khí thế bán hàng sôi động, chốt 85 đơn trong 30 giây.",
        timestamp: "00:14:20 - 00:14:55",
        trimStart: "00:14:20",
        trimEnd: "00:14:55",
        trimSec: 35,
        product: "Farmstay Retinol Cream",
        videoSrc: "media/video/final_final.mp4",
        thumb: "media/image/farmstay_retinol_box.jpg"
      },
      {
        id: "RAW_07",
        quote: "Chị em nào thật sự mà yêu thích cái dòng mỹ phẩm hàn quốc có...",
        summary: "Host phân tích lý do mỹ phẩm Hàn Quốc phù hợp với làn da và khí hậu Việt Nam.",
        topic: "Giải đáp thắc mắc",
        liveName: "Live 05/09 - Ra mắt Cica Farmstay",
        liveDate: "05/09/2026",
        liveId: "LIVE_2026_09_05",
        duration: "00:28",
        durationSec: 28,
        usageStatus: "Chưa duyệt",
        assignedTo: "—",
        contextNote: "Chưa duyệt, có thể dùng làm clip giáo dục thị trường.",
        timestamp: "00:41:00 - 00:41:28",
        trimStart: "00:41:00",
        trimEnd: "00:41:28",
        trimSec: 28,
        product: "Farmstay Toner Rau Má",
        videoSrc: "media/video/final_final.mp4",
        thumb: "media/image/farmstay_retinol_water.jpg"
      },
      {
        id: "RAW_08",
        quote: "Mình là mình bóp cho nó ra luôn chị em nào yêu thích á chị em...",
        summary: "Host test độ đàn hồi và kết cấu chất kem mềm tan trên da mặt trực tiếp trước camera.",
        topic: "Trải nghiệm & Test mỹ phẩm",
        liveName: "Live 05/09 - Ra mắt Cica Farmstay",
        liveDate: "05/09/2026",
        liveId: "LIVE_2026_09_05",
        duration: "00:30",
        durationSec: 30,
        usageStatus: "Chưa duyệt",
        assignedTo: "—",
        contextNote: "Góc quay cận cảnh giọt serum tan chảy rất hấp dẫn, thích hợp làm hook thị giác.",
        timestamp: "00:54:10 - 00:54:40",
        trimStart: "00:54:10",
        trimEnd: "00:54:40",
        trimSec: 30,
        product: "Farmstay Collagen Ampoule",
        videoSrc: "media/video/loi_giong_doc.mp4",
        thumb: "media/image/farmstay_retinol_hand.jpg"
      },
      {
        id: "RAW_09",
        quote: "Chăm da lâu dài mà da đẹp da xinh như là bên Hàn Quốc thì...",
        summary: "Chia sẻ routine 3 bước phục hồi da tối giản cho phụ nữ bận rộn sau giờ làm.",
        topic: "Tư vấn chuyên sâu SP",
        liveName: "Live 20/09 - Tâm sự đêm khuya",
        liveDate: "20/09/2026",
        liveId: "LIVE_2026_09_20",
        duration: "00:23",
        durationSec: 23,
        usageStatus: "Đang dựng",
        assignedTo: "Phạm Quốc Bảo",
        contextNote: "Đang được ghép phụ đề chữ động chuẩn TikTok Safe Zone.",
        timestamp: "01:18:00 - 01:18:23",
        trimStart: "01:18:00",
        trimEnd: "01:18:23",
        trimSec: 23,
        product: "Farmstay Toner Rau Má",
        videoSrc: "media/video/loi_giong_doc.mp4",
        thumb: "media/image/farmstay_retinol_water.jpg"
      },
      {
        id: "RAW_10",
        quote: "Nhiều bạn hỏi da dầu mụn có dùng được Retinol không, câu trả lời từ Dược sĩ...",
        summary: "Dược sĩ giải đáp cặn kẽ cơ chế của Retinyl Palmitate kết hợp Vitamin B5 để không bị bong tróc.",
        topic: "Giải đáp thắc mắc",
        liveName: "Live 15/09 - Mega Sale Mỹ Nguyên",
        liveDate: "15/09/2026",
        liveId: "LIVE_2026_09_15",
        duration: "00:40",
        durationSec: 40,
        usageStatus: "Chưa duyệt",
        assignedTo: "—",
        contextNote: "Đoạn giải đáp chuyên môn rất thuyết phục, có thể cắt thành 1 video dài 40s.",
        timestamp: "01:15:05 - 01:15:45",
        trimStart: "01:15:05",
        trimEnd: "01:15:45",
        trimSec: 40,
        product: "Farmstay Retinol Cream",
        videoSrc: "media/video/final_final.mp4",
        thumb: "media/image/farmstay_retinol_hand.jpg"
      }
    ],

    bgmLibrary: [
      {
        id: "BGM_01",
        title: "K-Beauty Soft Glow Ambient",
        category: "Nhẹ Nhàng / Skincare",
        duration: "00:45",
        bpm: "85 BPM",
        usedCount: "38 video",
        safetyBadge: "100% An Toàn Bản Quyền",
        audioSrc: "media/video/final_final.mp4"
      },
      {
        id: "BGM_02",
        title: "Seoul Flash Deal Countdown Beat",
        category: "Sôi Động / Bán Hàng",
        duration: "01:10",
        bpm: "128 BPM",
        usedCount: "62 video",
        safetyBadge: "100% An Toàn Bản Quyền",
        audioSrc: "media/video/loi_giong_doc.mp4"
      },
      {
        id: "BGM_03",
        title: "Chill Lo-Fi Night Skincare Routine",
        category: "Lo-Fi Thư Giãn",
        duration: "01:30",
        bpm: "75 BPM",
        usedCount: "45 video",
        safetyBadge: "100% An Toàn Bản Quyền",
        audioSrc: "media/video/final_final.mp4"
      },
      {
        id: "BGM_04",
        title: "Viral TikTok Drop Sparkle Bass",
        category: "Trending TikTok",
        duration: "00:30",
        bpm: "120 BPM",
        usedCount: "89 video",
        safetyBadge: "100% An Toàn Bản Quyền",
        audioSrc: "media/video/loi_giong_doc.mp4"
      }
    ],

    // =======================================================================
    // QUẢN LÝ CÁC PHIÊN PROMPT (SESSIONS) CỦA PROJECT NÀY
    // =======================================================================
    sessions: [
      {
        id: "sess_cos_1",
        title: "Session 1: TVC Macro 3D Farmstay Retinol",
        type: "img2vid",
        typeLabel: "Dựng từ ảnh",
        createdAt: "Hôm nay 09:30",
        updatedAt: "Hôm nay 10:15",
        status: "completed",
        folderId: "folder_cica",
        modelFolderId: "model_mailan",
        hookId: "HOOK_01",
        scriptId: "ANGLE_01",
        promptText: "Làm video TikTok 15–25 giây cho sản phẩm Farmstay Cica Serum. Đối tượng nữ 25–40 tuổi da mẩn đỏ, nhấn mạnh chiết xuất rau má Cica hữu cơ Jeju làm dịu da mẩn đỏ cấp tốc sau 20 phút, hiệu ứng nước bắn 3D điện ảnh.",
        iterations: [
          {
            version: "Run #1",
            time: "09:35",
            prompt: "Góc quay macro cận cảnh hũ kem trên mặt nước gợn sóng.",
            previewUrl: "media/video/loi_giong_doc.mp4",
            status: "done",
            notes: "Màu hơi trầm, ánh sáng studio chưa nổi hạt collagen"
          },
          {
            version: "Run #2",
            time: "10:15",
            prompt: "Góc quay macro 4K, hũ kem Farmstay Retinol đặt trên mặt nước gợn sóng, hạt collagen vỡ bung phản chiếu ánh sáng tự nhiên.",
            previewUrl: "media/video/final_final.mp4",
            status: "approved",
            notes: "Đạt chuẩn 9:16 - Đã chốt xuất thành phẩm ⭐"
          }
        ]
      },
      {
        id: "sess_cos_2",
        title: "Session 2: Highlight Live Bán Kem Chống Nắng Sehwa",
        type: "livestream",
        typeLabel: "Cắt Highlight Live",
        createdAt: "Hôm qua 15:20",
        updatedAt: "Hôm qua 16:00",
        status: "completed",
        folderId: "folder_sehwa",
        modelFolderId: "model_thutrang",
        hookId: "HOOK_02",
        scriptId: "ANGLE_02",
        promptText: "Cắt mốc 00:42:10 test giấy thấm dầu trực tiếp dưới đèn cao áp, chèn hook 3s giữ chân.",
        iterations: [
          {
            version: "Run #1",
            time: "15:45",
            prompt: "Cắt mốc 00:42:10 - 00:42:42 test giấy thấm dầu",
            previewUrl: "media/video/loi_giong_doc.mp4",
            status: "approved",
            notes: "Đã bóc tách 32s mượt mà"
          }
        ]
      },
      {
        id: "sess_cos_3",
        title: "Session 3: POV Dân Văn Phòng Dưỡng Da Sau 8h Điều Hòa",
        type: "img2vid",
        typeLabel: "Dựng từ ảnh",
        createdAt: "Hôm nay 11:00",
        updatedAt: "Hôm nay 11:20",
        status: "draft",
        folderId: "folder_collagen",
        modelFolderId: "model_thutrang",
        hookId: "HOOK_07",
        scriptId: "ANGLE_01",
        promptText: "Góc quay POV phong cách TikTok, KOC Thu Trang thoa serum Collagen hũ 250ml làm dịu da cấp tốc sau giờ làm.",
        iterations: [
          {
            version: "Run #1",
            time: "11:15",
            prompt: "Góc quay POV phong cách TikTok thoa serum Collagen 250ml.",
            previewUrl: "media/video/loi_text.mp4",
            status: "in_progress",
            notes: "Đang tinh chỉnh b-roll bàn làm việc"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // PROJECT 2: F&B & ĐỒ ĂN VẶT MUKBANG (BẾP NHÀ NGOẠI)
  // =========================================================================
  {
    id: "proj_food",
    name: "Bếp Nhà Ngoại - Đồ Ăn Vặt & Mukbang",
    shortName: "Bếp Nhà Ngoại",
    category: "F&B & Đồ Ăn Vặt",
    categoryBadge: "Ăn Vặt & Mukbang",
    icon: "",
    description: "Thương hiệu đồ ăn vặt đóng gói cay ngon đậm đà: Khô Bò Cay Tê, Cơm Cháy Chà Bông, Bánh Tráng Phơi Sương",
    stats: { completedVideos: 3, sessionsCount: 2, skusCount: 3 },
    brand: {
      name: "BẾP NHÀ NGOẠI - ĐỒ ĂN VẶT & MUKBANG",
      tagline: "Đồ ăn vặt đóng gói cay ngon đậm đà, chuẩn vệ sinh an toàn thực phẩm",
      policy: "Food Safe: 100% video phải thể hiện tem nhãn đóng hộp nguyên seal, ngày sản xuất rõ ràng",
      skus: [
        {
          id: "FOOD_KHO_BO",
          name: "Khô Bò Cay Tê Tỏi Ớt Thượng Hạng 250g",
          category: "Thịt khô cay nồng đóng hũ",
          origin: "Việt Nam (Bếp Nhà Ngoại)",
          price: "120.000đ",
          dealPrice: "89.000đ",
          badge: "Best Seller",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80",
          usp: [
            "100% thịt bò bắp tươi nguyên thớ sợi",
            "Vị cay tê tỏi ớt thơm nồng không ngấy",
            "Đóng hũ pet nắp nhôm giật kín khí"
          ]
        },
        {
          id: "FOOD_COM_CHAY",
          name: "Cơm Cháy Mắm Hành Chà Bông Giòn Rụm 300g",
          category: "Ăn vặt giòn rụm",
          origin: "Ninh Bình / Việt Nam",
          price: "75.000đ",
          dealPrice: "55.000đ",
          badge: "Giòn Tan",
          image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80",
          usp: [
            "Gạo nếp cái hoa vàng chiên phồng xốp giòn tan",
            "Nước sốt mắm ớt kẹo dẻo đậm vị",
            "Chà bông heo sạch xơ tơi bông"
          ]
        },
        {
          id: "FOOD_BANH_TRANG",
          name: "Bánh Tráng Phơi Sương Cuộn Sốt Me Bơ Béo",
          category: "Đặc sản Tây Ninh",
          origin: "Tây Ninh / Việt Nam",
          price: "60.000đ",
          dealPrice: "45.000đ",
          badge: "Cực Dính",
          image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=80",
          usp: [
            "Bánh tráng phơi sương mềm dẻo êm răng",
            "Sốt me chua ngọt cay nồng sánh kẹo",
            "Bơ trứng gà béo ngậy thơm nức"
          ]
        }
      ]
    },

    faceLibrary: [
      {
        id: "FACE_FOOD_01",
        name: "Bé Mập Mukbang",
        role: "KOC Đồ Ăn / Food Reviewer Triệu View",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        status: "Đã ký hợp đồng độc quyền",
        description: "Nữ 23 tuổi, ăn ngon miệng, biểu cảm cuốn hút khi cắn đồ ăn giòn rụm"
      },
      {
        id: "FACE_FOOD_02",
        name: "Đầu Bếp Tuấn (Anh Ba Bếp)",
        role: "Bếp Trưởng & Sáng Tạo Hương Vị",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&auto=format&fit=crop&q=80",
        status: "Đại diện bếp",
        description: "Nam 32 tuổi, áo tạp dề đen, phong thái chuyên nghiệp giải thích cách tẩm ướp sốt"
      }
    ],

    modelVault: {
      modelFolders: [
        {
          id: "model_all",
          name: "Tất Cả Model Đồ Ăn",
          isPublic: true
        },
        {
          id: "model_bemap",
          name: "Bé Mập Mukbang",
          role: "Reviewer Đồ Ăn Vặt / Mukbang",
          age: "23 tuổi",
          style: "Vui vẻ, biểu cảm ăn ngon, âm thanh nhai cuốn hút",
          description: "Nữ 23 tuổi, chuyên review đồ ăn vặt đêm khuya, biểu cảm há to miệng cắn giòn tan.",
          coverThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
          angles: [
            { id: "ang_bm_1", label: "Chính Diện Cầm Hộp Khô Bò", thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", angleDesc: "Nhìn camera cười tươi cầm hũ khô bò" },
            { id: "ang_bm_2", label: "Góc Cận Cắn Bánh Tráng", thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80", angleDesc: "Cận cảnh chấm đẫm sốt me đưa vào miệng" },
            { id: "ang_bm_3", label: "Biểu Cảm Mắt Sáng Rực", thumb: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80", angleDesc: "Mắt mở to thích thú khi miếng cơm cháy giòn rụm" }
          ]
        },
        {
          id: "model_cheftuan",
          name: "Đầu Bếp Tuấn",
          role: "Nghệ Nhân Sốt Cay Bếp Nhà Ngoại",
          age: "32 tuổi",
          style: "Chuyên môn ẩm thực, sạch sẽ vệ sinh",
          description: "Nam 32 tuổi, tạp dề đen, giải thích quy trình sấy lạnh và tẩm ướp bò tươi.",
          coverThumb: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=80",
          angles: [
            { id: "ang_ct_1", label: "Chính Diện Áo Bếp", thumb: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop&q=80", angleDesc: "Đứng cạnh bàn nguyên liệu thịt bò tươi xé sợi" },
            { id: "ang_ct_2", label: "Góc Nghiêng Rưới Sốt Mắm Cay", thumb: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80", angleDesc: "Cận cảnh bàn tay rưới sốt mắm ớt lên cơm cháy" }
          ]
        }
      ]
    },

    assetVault: {
      productFolders: [
        { id: "folder_all", name: "Tất Cả Thư Mục Đồ Ăn", isPublic: true },
        {
          id: "folder_kho_bo",
          name: "Khô Bò Cay Tê Tỏi Ớt 250g",
          price: "89.000đ",
          description: "Bò bắp tươi xé sợi cay tê nồng nàn, thơm nức mùi tỏi phi giòn rụm",
          coverThumb: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80",
          skuInfo: {
            code: "FOOD-01",
            name: "Khô Bò Cay Tê Tỏi Ớt 250g",
            origin: "Bếp Nhà Ngoại • Xuất xứ: Việt Nam",
            price: "89.000đ",
            description: "Thịt bò bắp tươi nguyên thớ, sấy lạnh giữ trọn độ ngọt và cay tê",
            uspList: [
              "100% Thịt bò bắp tươi",
              "Cay tê tỏi ớt thơm lừng",
              "Hũ pet nắp nhôm kín khí"
            ]
          }
        },
        {
          id: "folder_com_chay",
          name: "Cơm Cháy Mắm Hành Chà Bông",
          price: "55.000đ",
          description: "Gạo nếp chiên phồng xốp giòn rụm, phủ chà bông heo sạch và sốt mắm ớt kẹo",
          coverThumb: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80",
          skuInfo: {
            code: "FOOD-02",
            name: "Cơm Cháy Mắm Hành Chà Bông (FOOD-02)",
            origin: "Bếp Nhà Ngoại • Xuất xứ: Ninh Bình",
            price: "55.000đ",
            description: "Nhai giòn tan vui tai, sốt mắm kẹo đậm đà cay ngọt cực dính",
            uspList: [
              "Gạo nếp giòn xốp",
              "Sốt mắm ớt kẹo dẻo",
              "Chà bông phủ kín mặt"
            ]
          }
        },
        {
          id: "folder_banh_trang",
          name: "Bánh Tráng Phơi Sương Cuộn Me Bơ",
          price: "45.000đ",
          description: "Bánh tráng phơi sương Tây Ninh dẻo mềm, chấm đẫm sốt me bơ béo ngậy",
          coverThumb: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=80",
          skuInfo: {
            code: "FOOD-03",
            name: "Bánh Tráng Phơi Sương Cuộn Me Bơ",
            origin: "Tây Ninh • Bếp Nhà Ngoại",
            price: "45.000đ",
            description: "Bánh tráng phơi sương dẻo mịn, chấm đẫm sốt me bơ béo ngậy",
            uspList: [
              "Phơi sương Tây Ninh",
              "Sốt me chua ngọt cay",
              "Bơ trứng gà béo thơm"
            ]
          }
        }
      ],
      driveFiles: [
        { id: "DF_F01", folderId: "folder_kho_bo", name: "Hu_Kho_Bo_Chinh_Dien.jpg", type: "image", thumb: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80", size: "3.2 MB" },
        { id: "DF_F02", folderId: "folder_kho_bo", name: "Xe_Soi_Bo_Do_Au.jpg", type: "image", thumb: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80", size: "2.8 MB" },
        { id: "DF_F03", folderId: "folder_com_chay", name: "Com_Chay_Be_Doi_Gion_Tan.jpg", type: "image", thumb: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80", size: "3.5 MB" },
        { id: "DF_F04", folderId: "folder_banh_trang", name: "Banh_Trang_Cham_Sot_Me.jpg", type: "image", thumb: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=80", size: "2.9 MB" },
        { id: "DF_FV01", folderId: "folder_com_chay", name: "ASMR_Be_Com_Chay_Nhai_Gion_Raw.mp4", type: "video", thumb: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80", videoSrc: "media/video/final_final.mp4", size: "18.2 MB", duration: "00:30", createdAt: "20/09/2026" }
      ]
    },

    angleVault: {
      scripts: [
        {
          id: "SCRIPT_FOOD_01",
          title: "ASMR Nhai Giòn Rụm Cơm Cháy Chà Bông Sốt Mắm Cay",
          updatedAt: "Hôm nay 10:15",
          group: "ASMR & Trải Nghiệm",
          sku: "Cơm Cháy Mắm Hành",
          scenesCount: 3,
          duration: "30s",
          status: "Sẵn sàng",
          statusCode: "ready",
          targetAudience: "Học sinh, sinh viên, dân văn phòng thèm ăn vặt giờ chiều",
          hook: "Cảnh báo: Đừng mở âm lượng tối đa nếu bạn chưa có gì bỏ bụng lúc này!",
          scenes: [
            {
              sceneNum: 1,
              title: "Cảnh Mở Đầu (The Hook)",
              timeRange: "0 – 3s",
              visual: "Bẻ đôi miếng cơm cháy chà bông dày cộm, âm thanh RẮC giòn tan cực đã tai.",
              voice: "Cảnh báo: Đừng mở âm lượng tối đa nếu bạn chưa có gì bỏ bụng lúc này!"
            },
            {
              sceneNum: 2,
              title: "Cận Cảnh Sốt Me & Chà Bông",
              timeRange: "3 – 18s",
              visual: "Model chấm đẫm miếng cơm cháy vào chén sốt mắm ớt kẹo, đưa vào miệng cắn ngập răng.",
              voice: "Gạo nếp chiên phồng xốp, chà bông heo sạch xé sợi phủ kín mặt, quyện sốt mắm ớt cay tê."
            },
            {
              sceneNum: 3,
              title: "Kêu Gọi CTA Combo Deal",
              timeRange: "18 – 30s",
              visual: "Gói combo 3 bịch cơm cháy tặng kèm sốt mắm, nút giỏ hàng chớp số deal 55K.",
              voice: "Chỉ 55K một bịch to đùng, bấm ngay giỏ hàng góc trái nhận voucher freeship hôm nay!"
            }
          ]
        },
        {
          id: "SCRIPT_FOOD_02",
          title: "Khô Bò Bắp Cay Tê: Cứu Cánh Nửa Đêm Của Hội Cày Phim",
          updatedAt: "Hôm qua 14:00",
          group: "POV & Trend",
          sku: "Khô Bò Cay Tê 250g",
          scenesCount: 2,
          duration: "25s",
          status: "Sẵn sàng",
          statusCode: "ready",
          targetAudience: "Cú đêm cày phim, nhóm bạn nhậu lai rai",
          hook: "11h đêm mà vừa xem phim vừa có hũ này nhâm nhi thì quên luôn lối về!",
          scenes: [
            {
              sceneNum: 1,
              title: "Hook Cú Đêm",
              timeRange: "0 – 3s",
              visual: "Phòng tối bật đèn led xanh, màn hình laptop đang chiếu phim, tay mở nắp hũ khô bò.",
              voice: "11h đêm mà vừa xem phim vừa có hũ này nhâm nhi thì quên luôn lối về!"
            }
          ]
        }
      ]
    },

    trendingHookVault: [
      {
        id: "HOOK_FOOD_01",
        hookText: "Cảnh báo: Lướt qua video này sau 11h đêm là bụng bạn sẽ biểu tình ngay lập tức!",
        type: "Cảnh Báo",
        sku: "Cơm Cháy Mắm Hành",
        visualCue: "Góc quay macro cận cảnh miếng cơm cháy bẻ đôi ròn rụm",
        targetPersona: "Dân cày phim & Ăn đêm",
        soundTrend: "Crunchy ASMR Crack"
      },
      {
        id: "HOOK_FOOD_02",
        hookText: "Một hũ khô bò 250g sợi dài miên man, mở nắp là mùi tỏi ớt thơm nức cả phòng!",
        type: "Mô Tả",
        sku: "Khô Bò Cay Tê Tỏi Ớt",
        visualCue: "Mở nắp nhôm giật 'TÁCH', khói hương thơm tỏi ớt bốc lên",
        targetPersona: "Dân văn phòng & Sinh viên",
        soundTrend: "Can Pop & Whoosh"
      },
      {
        id: "HOOK_FOOD_03",
        hookText: "Bánh tráng phơi sương chấm ngập sốt me bơ béo, ăn một miếng là dính luôn không dứt!",
        type: "Review",
        sku: "Bánh Tráng Phơi Sương",
        visualCue: "Cuộn tròn miếng bánh dẻo chấm sâu vào chén sốt me óng ánh",
        targetPersona: "Tín đồ ăn vặt bánh tráng",
        soundTrend: "Chill Pop Beat"
      }
    ],

    contentKits: [
      {
        id: "FOOD_KIT_001",
        title: "TVC Cơm Cháy Chà Bông ASMR Nhai Giòn Tan 4K",
        sku: "Cơm Cháy Mắm Hành Chà Bông",
        sourceType: "script_ai",
        sourceLabel: "Từ Kịch Bản AI",
        hook: "Cảnh báo: Đừng mở âm lượng tối đa nếu chưa có gì bỏ bụng!",
        duration: "30s",
        caption: "Nhai giòn rụm cùng Bếp Nhà Ngoại! Cơm cháy mắm hành chà bông dày cộm sốt kẹo dẻo #bepnhangoai #comchay #anvat",
        hashtags: ["#bepnhangoai", "#comchay", "#anvat"],
        thumb: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80",
        videoUrl: "media/video/final_final.mp4"
      },
      {
        id: "FOOD_KIT_002",
        title: "Review Hũ Khô Bò Cay Tê Nửa Đêm Cùng Bé Mập",
        sku: "Khô Bò Cay Tê Tỏi Ớt",
        sourceType: "image_to_video",
        sourceLabel: "Dựng Từ Ảnh",
        hook: "11h đêm mà có hũ này nhâm nhi thì quên luôn lối về!",
        duration: "25s",
        caption: "Bò bắp tươi xé sợi cay tê thơm lừng góc phố! #khobo #bepnhangoai #mukbang",
        hashtags: ["#khobo", "#bepnhangoai", "#mukbang"],
        thumb: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80",
        videoUrl: "media/video/loi_giong_doc.mp4"
      }
    ],

    livestreamSession: {
      id: "LIVE_FOOD_01",
      title: "Livestream Đại Tiệc Đồ Ăn Vặt - Flash Sale 19K",
      duration: "01:45:00",
      goldenMoments: [
        {
          id: "LS_FOOD_CLIP_01",
          title: "Đoạn 1: Cắn Miếng Cơm Cháy Phát Ra Tiếng Rắc Vang Phòng",
          group: "Nhóm 3 - Trải Nghiệm & Test Đồ Ăn",
          timestamp: "00:22:15 - 00:22:45",
          duration: "30s",
          trimStart: "00:22:15",
          trimEnd: "00:22:45",
          trimSec: 30,
          summary: "Host bẻ miếng cơm cháy trước micro, khách ùa vào chốt 120 đơn trong 1 phút.",
          recommendedHook: "Tiếng nhai này đố ai nhịn được nước miếng!",
          videoSrc: "media/video/final_final.mp4",
          thumb: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80",
          caption: "Chỉ 55K một bịch to đùng, bấm ngay giỏ hàng góc trái nhận voucher freeship hôm nay!",
          status: "Chờ duyệt"
        },
        {
          id: "LS_FOOD_CLIP_02",
          title: "Đoạn 2: Test Sốt Cay Tê Khô Bò Với Bánh Tráng",
          group: "Nhóm 2 - Báo Giá & Khuyến Mãi (Deal)",
          timestamp: "00:45:10 - 00:45:45",
          duration: "35s",
          trimStart: "00:45:10",
          trimEnd: "00:45:45",
          trimSec: 35,
          summary: "Host chấm đẫm sốt me cay kẹo, test độ dẻo của bánh tráng và thớ bò bắp.",
          recommendedHook: "Combo 3 hũ tặng 1 bịch bánh tráng phơi sương chỉ có trên live!",
          videoSrc: "media/video/loi_giong_doc.mp4",
          thumb: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80",
          caption: "Hũ 250g sợi dài miên man cay tê đã miệng, đặt ngay kẻo hết mã giảm giá!",
          status: "Chờ duyệt"
        },
        {
          id: "LS_FOOD_CLIP_03",
          title: "Đoạn 3: Giới Thiệu Quy Trình Sấy Bò Bắp Sạch Chuẩn VSATTP",
          group: "Nhóm 1 - Tư Vấn Chuyên Sâu SP",
          timestamp: "01:10:00 - 01:10:40",
          duration: "40s",
          trimStart: "01:10:00",
          trimEnd: "01:10:40",
          trimSec: 40,
          summary: "Đầu bếp Tuấn chia sẻ bí quyết tẩm ướp sốt mắm ớt và sấy lạnh vô trùng.",
          recommendedHook: "Thịt bò tươi nguyên thớ, không pha trộn vụn thịt!",
          videoSrc: "media/video/final_final.mp4",
          thumb: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=80",
          caption: "Bò bắp tươi xé sợi sạch 100%, kiểm nghiệm an toàn thực phẩm đầy đủ.",
          status: "Chờ duyệt"
        }
      ]
    },

    bgmLibrary: [
      {
        id: "BGM_FOOD_01",
        title: "Mukbang Crunchy ASMR Beat",
        category: "Trending TikTok",
        duration: "00:30",
        bpm: "115 BPM",
        usedCount: "54 video",
        safetyBadge: "100% An Toàn Bản Quyền",
        audioSrc: "media/video/final_final.mp4"
      },
      {
        id: "BGM_FOOD_02",
        title: "Street Food Chill Acoustic",
        category: "Nhẹ Nhàng / Skincare",
        duration: "01:00",
        bpm: "90 BPM",
        usedCount: "41 video",
        safetyBadge: "100% An Toàn Bản Quyền",
        audioSrc: "media/video/loi_giong_doc.mp4"
      }
    ],

    sessions: [
      {
        id: "sess_food_1",
        title: "Session 1: ASMR Cơm Cháy Nhai Giòn Tan",
        type: "img2vid",
        typeLabel: "Dựng từ ảnh",
        createdAt: "Hôm nay 10:00",
        updatedAt: "Hôm nay 10:45",
        status: "completed",
        folderId: "folder_com_chay",
        modelFolderId: "model_bemap",
        hookId: "HOOK_FOOD_01",
        scriptId: "SCRIPT_FOOD_01",
        promptText: "Góc quay macro 4K, model Bé Mập bẻ đôi miếng cơm cháy giòn tan rắc mắm ớt thơm lừng, âm thanh ASMR chân thực.",
        iterations: [
          {
            version: "Run #1",
            time: "10:15",
            prompt: "Macro cơm cháy bẻ giòn tan, slow-motion sốt me rơi.",
            previewUrl: "media/video/final_final.mp4",
            status: "approved",
            notes: "Video âm thanh giòn rụm rất đạt ⭐"
          }
        ]
      },
      {
        id: "sess_food_2",
        title: "Session 2: Bò Bắp Cay Tê Đêm Khuya Cày Phim",
        type: "img2vid",
        typeLabel: "Dựng từ ảnh",
        createdAt: "Hôm nay 11:30",
        updatedAt: "Hôm nay 11:45",
        status: "draft",
        folderId: "folder_kho_bo",
        modelFolderId: "model_cheftuan",
        hookId: "HOOK_FOOD_02",
        scriptId: "SCRIPT_FOOD_02",
        promptText: "Góc quay cận cảnh mở nắp hũ khô bò, sợi dài đỏ âu tỏi ớt thơm lừng, ánh sáng ấm phòng xem phim.",
        iterations: [
          {
            version: "Run #1",
            time: "11:45",
            prompt: "Cận cảnh mở nắp hũ khô bò trong phòng cày phim.",
            previewUrl: "media/video/loi_text.mp4",
            status: "in_progress",
            notes: "Cần tăng độ tươi của thớ thịt bò"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // PROJECT 3: THỜI TRANG & ĐỜI SỐNG (X-STYLE LOOKBOOK)
  // =========================================================================
  {
    id: "proj_fashion",
    name: "Thời Trang Công Sở X-Style",
    shortName: "X-Style Lookbook",
    category: "Thời Trang & Lifestyle",
    categoryBadge: "Thời Trang Công Sở",
    icon: "",
    description: "Thương hiệu thời trang thiết kế công sở hiện đại: Blazer thanh lịch, Đầm lụa cao cấp, Quần ống suông",
    stats: { completedVideos: 2, sessionsCount: 1, skusCount: 2 },
    brand: {
      name: "X-STYLE FASHION VIỆT NAM",
      tagline: "Định hình phong thái quý cô công sở hiện đại",
      policy: "Fashion Guard: Giữ đúng form dáng, đường may và bảng màu chuẩn pantone thiết kế",
      skus: [
        {
          id: "FASHION_BLAZER",
          name: "Áo Blazer Dáng Rộng Hàn Quốc Cao Cấp",
          category: "Áo khoác công sở",
          origin: "Thiết Kế X-Style",
          price: "650.000đ",
          dealPrice: "499.000đ",
          badge: "New Arrival",
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=80",
          usp: [
            "Chất vải tuyết mưa nhập khẩu đứng form",
            "Đệm vai tự nhiên tôn dáng thanh mảnh",
            "Khuy mạ vàng sang trọng"
          ]
        },
        {
          id: "FASHION_DRESS",
          name: "Đầm Lụa Satin Dáng Xòe Dự Tiệc & Đi Làm",
          category: "Váy đầm thiết kế",
          origin: "Thiết Kế X-Style",
          price: "580.000đ",
          dealPrice: "420.000đ",
          badge: "Best Seller",
          image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=80",
          usp: [
            "Lụa satin óng ả mềm rủ bay bổng",
            "Chiết eo nhẹ tôn vòng 2",
            "Phù hợp cả đi làm và tiệc tối"
          ]
        }
      ]
    },

    faceLibrary: [
      {
        id: "FACE_FASHION_01",
        name: "Người Mẫu Minh Thư",
        role: "Lookbook Model / Fashionista",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        status: "Độc quyền X-Style",
        description: "Nữ 26 tuổi, chiều cao 1m68, thần thái sang chảnh chuẩn lookbook công sở"
      }
    ],

    modelVault: {
      modelFolders: [
        { id: "model_all", name: "Tất Cả Model Thời Trang", isPublic: true },
        {
          id: "model_minhthu",
          name: "Người Mẫu Minh Thư",
          role: "Fashion Model",
          age: "26 tuổi",
          style: "Thanh lịch, hiện đại, khí chất công sở",
          description: "Nữ 26 tuổi, vóc dáng chuẩn, sải bước tự tin trong trang phục công sở.",
          coverThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
          angles: [
            { id: "ang_mt_1", label: "Toàn Thân Sải Bước", thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", angleDesc: "Sải bước trên hành lang văn phòng hiện đại" },
            { id: "ang_mt_2", label: "Cận Cảnh Khuy Áo & Cổ Áo", thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80", angleDesc: "Góc cận tôn đường may sắc sảo" }
          ]
        }
      ]
    },

    assetVault: {
      productFolders: [
        { id: "folder_all", name: "Tất Cả Thư Mục Thời Trang", isPublic: true },
        {
          id: "folder_blazer",
          name: "Áo Blazer Dáng Rộng Hàn Quốc",
          price: "499.000đ",
          description: "Chất tuyết mưa cao cấp, tôn dáng quý cô công sở",
          coverThumb: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=80",
          skuInfo: {
            code: "FASHION-01",
            name: "Áo Blazer Dáng Rộng Hàn Quốc",
            origin: "X-Style Việt Nam",
            price: "499.000đ",
            description: "Chất tuyết mưa cao cấp, tôn dáng quý cô công sở",
            uspList: ["Vải tuyết mưa đứng form", "Đệm vai tự nhiên", "Khuy mạ vàng"]
          }
        }
      ],
      driveFiles: [
        { id: "DF_FASH_01", folderId: "folder_blazer", name: "Blazer_Lookbook_01.jpg", type: "image", thumb: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=80", size: "4.5 MB" }
      ]
    },

    angleVault: {
      scripts: [
        {
          id: "SCRIPT_FASHION_01",
          title: "3 Cách Phối Áo Blazer Đi Làm Chuẩn Khí Chất",
          updatedAt: "Hôm qua",
          group: "Lookbook & Phối Đồ",
          sku: "Áo Blazer Hàn Quốc",
          scenesCount: 3,
          duration: "30s",
          status: "Sẵn sàng",
          statusCode: "ready",
          targetAudience: "Nữ công sở 24–38 tuổi",
          hook: "POV: Bạn bước vào phòng họp và ai cũng phải ngoái nhìn set đồ này!",
          scenes: [
            {
              sceneNum: 1,
              title: "Hook Bước Vào Phòng Họp",
              timeRange: "0 – 3s",
              visual: "Model đẩy cửa kính phòng họp, sải bước tự tin với chiếc blazer đen tôn dáng.",
              voice: "POV: Bạn bước vào phòng họp và ai cũng phải ngoái nhìn set đồ này!"
            }
          ]
        }
      ]
    },

    trendingHookVault: [
      {
        id: "HOOK_FASHION_01",
        hookText: "POV: Bạn bước vào phòng họp và ai cũng phải ngoái nhìn set đồ này!",
        type: "POV",
        sku: "Áo Blazer Hàn Quốc",
        visualCue: "Model sải bước giày cao gót đẩy cửa kính văn phòng",
        targetPersona: "Chị em văn phòng công sở",
        soundTrend: "Runway Boss Chic Beat"
      }
    ],

    contentKits: [
      {
        id: "FASH_KIT_001",
        title: "Lookbook Video Blazer Đen Quyền Lực Mùa Thu",
        sku: "Áo Blazer Hàn Quốc",
        sourceType: "image_to_video",
        sourceLabel: "Dựng Từ Ảnh",
        hook: "Ai cũng phải ngoái nhìn set đồ công sở này!",
        duration: "20s",
        caption: "Nâng tầm phong thái đi làm cùng X-Style Blazer #xstyle #fashion #blazer",
        hashtags: ["#xstyle", "#fashion", "#blazer"],
        thumb: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=80",
        videoUrl: "media/video/final_final.mp4"
      }
    ],

    livestreamSession: {
      id: "LIVE_FASH_01",
      title: "Show Diễn Livestream Bộ Sưu Tập Thu Đông",
      duration: "01:15:00",
      goldenMoments: []
    },

    sessions: [
      {
        id: "sess_fash_1",
        title: "Session 1: Lookbook Áo Blazer Mùa Thu",
        type: "img2vid",
        typeLabel: "Dựng từ ảnh",
        createdAt: "Hôm nay 08:30",
        updatedAt: "Hôm nay 09:00",
        status: "completed",
        folderId: "folder_blazer",
        modelFolderId: "model_minhthu",
        hookId: "HOOK_FASHION_01",
        scriptId: "SCRIPT_FASHION_01",
        promptText: "Video TikTok 20 giây lookbook công sở, model Minh Thư sải bước với áo blazer đen tuyết mưa, ánh sáng tự nhiên studio.",
        iterations: [
          {
            version: "Run #1",
            time: "08:50",
            prompt: "Lookbook model sải bước với blazer đen.",
            previewUrl: "media/video/final_final.mp4",
            status: "approved",
            notes: "Thần thái rất sang"
          }
        ]
      }
    ]
  }
];

// Mặc định nạp Project đầu tiên (Mỹ Phẩm Mỹ Nguyên)
window.PROTOTYPE_ACTIVE_PROJECT_ID = "proj_cosmetics";
window.PROTOTYPE_DATA = window.PROTOTYPE_PROJECTS[0];

// Aliases duy trì tính tương thích ngược cho codebase cũ
window.PROTOTYPE_DATA.angleMatrix = window.PROTOTYPE_DATA.angleVault;
window.PROTOTYPE_DATA.hookMatrix = window.PROTOTYPE_DATA.trendingHookVault;

// =========================================================================
// TO-BE: QUẢN LÝ DỰ ÁN TẬP TRUNG (PROJECT-CENTRIC HUB - MATCHING ẢNH 1 & ẢNH 2)
// Mỗi dự án gom trọn: Nguồn vào, Clip thô đang duyệt, và Video thành phẩm
// =========================================================================
window.PROTOTYPE_PROJECT_FOLDERS = [
  { id: "all", name: "Tất Cả Thư Mục", count: 6 },
  { id: "sale_1010", name: "SALE 10/10", count: 2 },
  { id: "campaign_retinol", name: "Chiến Dịch Retinol Thu Đông", count: 2 },
  { id: "cica_viral", name: "Farmstay Cica Serum Viral", count: 1 },
  { id: "livestream_monthly", name: "Livestream Tháng 10", count: 1 }
];

// =========================================================================
// KHO TƯ LIỆU ĐẦU VÀO (INPUT VAULT - NƠI LƯU CÁC FILE NGUỒN USER ĐÃ TẢI LÊN)
// =========================================================================
window.PROTOTYPE_INPUT_VAULT = [
  {
    id: "INPUT_LIVE_1509",
    title: "session_recording_1509.mp4",
    name: "Livestream Mega Sale 15/09 – Mỹ Nguyên TSC",
    type: "livestream",
    typeLabel: "Video Live Gốc",
    typeBadgeColor: "#ef4444",
    filename: "session_recording_1509.mp4",
    duration: "02:15:30",
    durationSec: 8130,
    size: "3.2 GB",
    resolution: "1080p Full HD",
    fps: "60 fps",
    uploadedAt: "15/10/2026 09:15",
    timeAgo: "2 ngày trước",
    thumbnail: "media/image/farmstay_retinol_table.jpg",
    videoUrl: "media/video/final_final.mp4",
    associatedProjectId: "PRJ_LIVE_1510",
    associatedProjectName: "Livestream 15/10 - Flash Sale Retinol",
    asrStatus: "Đã bóc băng 100% (Syrix ASR)",
    isDriveSaved: true,
    driveFolder: "My Drive/VideoAI_Vault/Livestreams/1509/",
    driveFileId: "DRIVE_FILE_88219"
  },
  {
    id: "INPUT_HW_STREAM",
    title: "hw5MPxb51cU_stream.mp4",
    name: "Review Công Nghệ: Hệ Sinh Thái iPhone 18 & Camera",
    type: "livestream",
    typeLabel: "Video Live Gốc",
    typeBadgeColor: "#ef4444",
    filename: "hw5MPxb51cU_stream.mp4",
    duration: "00:45:00",
    durationSec: 2700,
    size: "1.1 GB",
    resolution: "1080p Full HD",
    fps: "30 fps",
    uploadedAt: "17/10/2026 14:20",
    timeAgo: "Hôm qua",
    thumbnail: "media/image/farmstay_retinol_hand.jpg",
    videoUrl: "media/video/final_final.mp4",
    associatedProjectId: "hw5MPxb51cU",
    associatedProjectName: "hw5MPxb51cU",
    asrStatus: "Đã bóc băng 100%",
    isDriveSaved: true,
    driveFolder: "My Drive/VideoAI_Vault/Livestreams/TechReview/",
    driveFileId: "DRIVE_FILE_77192"
  },
  {
    id: "INPUT_RAW_BROLL_SERUM",
    title: "broll_raw_footage_farmstay_serum.mp4",
    name: "Quay Thô B-Roll Serum Cica Blemi-Clear 4K S-Log3",
    type: "raw_video",
    typeLabel: "Video Quay Thô",
    typeBadgeColor: "#0284c7",
    filename: "broll_raw_footage_farmstay_serum.mp4",
    duration: "00:32:15",
    durationSec: 1935,
    size: "1.8 GB",
    resolution: "4K UHD (3840x2160)",
    fps: "60 fps",
    uploadedAt: "18/10/2026 10:05",
    timeAgo: "2 giờ trước",
    thumbnail: "media/image/farmstay_retinol_water.jpg",
    videoUrl: "media/video/final_final.mp4",
    associatedProjectId: "PRJ_RAW_SERUM",
    associatedProjectName: "Farmstay Cica B-Roll Edit",
    asrStatus: "Không có lời thoại",
    isDriveSaved: false,
    driveFolder: null,
    driveFileId: null
  },
  {
    id: "INPUT_PACKSHOT_CICA",
    title: "farmstay_cica_packshot_kit.zip",
    name: "Bộ 4 Packshot Ảnh 4K Farmstay Cica Serum",
    type: "product_images",
    typeLabel: "Ảnh Packshot SKU",
    typeBadgeColor: "#8b5cf6",
    filename: "farmstay_cica_packshot_kit.zip",
    duration: "4 Ảnh PNG",
    durationSec: 0,
    size: "48 MB",
    resolution: "4K UHD (Product Lock)",
    fps: "-",
    uploadedAt: "18/10/2026 08:30",
    timeAgo: "4 giờ trước",
    thumbnail: "media/image/farmstay_retinol_box.jpg",
    videoUrl: null,
    associatedProjectId: "PRJ_IMG_CICA",
    associatedProjectName: "Farmstay Cica Serum 20 Clips Biến Thể",
    asrStatus: "Tư liệu hình ảnh",
    isDriveSaved: true,
    driveFolder: "My Drive/VideoAI_Vault/Packshots/CicaSerum/",
    driveFileId: "DRIVE_FILE_99341"
  },
  {
    id: "INPUT_AUDIO_PODCAST",
    title: "podcast_duocsi_tuvan_retinol.mp3",
    name: "Audio Thu Âm Dược Sĩ: Sử Dụng Retinol Đúng Cách",
    type: "audio",
    typeLabel: "Audio / Voiceover",
    typeBadgeColor: "#10b981",
    filename: "podcast_duocsi_tuvan_retinol.mp3",
    duration: "00:18:40",
    durationSec: 1120,
    size: "25 MB",
    resolution: "Stereo 320kbps",
    fps: "-",
    uploadedAt: "19/10/2026 07:15",
    timeAgo: "Vừa xong",
    thumbnail: "media/image/farmstay_retinol_table.jpg",
    videoUrl: "media/video/final_final.mp4",
    associatedProjectId: null,
    associatedProjectName: "Chưa gán dự án",
    asrStatus: "Đã bóc băng 100% (Whisper v3)",
    isDriveSaved: false,
    driveFolder: null,
    driveFileId: null
  }
];

window.PROTOTYPE_VIDEO_PROJECTS = [
  {
    id: "P8SZaeu1Ng",
    name: "P8SZaeu1Ng",
    creator: "LÂM",
    category: "ai_clipping",
    categoryLabel: "Instant Highlights",
    tagLabel: "Highlight",
    folderId: "all",
    folderName: "Mặc định",
    status: "Đang xử lý",
    statusCode: "processing",
    progress: 35,
    progressLabel: "35% Rendering",
    currentStep: 4,
    stepLabel: "Đang hậu kỳ 35%",
    isCompleted: false,
    isProcessing: true,
    isDriveSaved: false,
    clipsCount: 3,
    timeAgo: "Chưa xong",
    updatedAt: "Chưa xong",
    updatedDate: "Hôm nay",
    thumbnail: null,
    isRendering: true,
    streamer: "Instant Highlights",
    subtext: "Dự án tạo video tự động bằng AI Clipping từ livestream và media có sẵn.",
    chips: [
      { label: "Nguồn dữ liệu", count: 1, icon: "live" },
      { label: "Clip tự động", count: 3, icon: "film" },
      { label: "Rendering", count: 1, icon: "check" }
    ],
    clips: [
      {
        id: "P8S_CLIP_01",
        title: "Deal Sốc Retinol 299k Độc Quyền",
        score: 85,
        grade: "A+",
        potentialLabel: "High potential",
        duration: "45s",
        durationSec: 45,
        hookQuote: "Hôm nay ai có mặt trong phiên live nhận ngay deal hời...",
        timeAgo: "Vừa xong",
        videoUrl: "media/video/final_final.mp4",
        thumbnail: "media/image/farmstay_retinol_table.jpg"
      }
    ],
    finalVideos: []
  },
  {
    id: "hw5MPxb51cU",
    name: "hw5MPxb51cU",
    creator: "LÂM",
    category: "ai_clipping",
    categoryLabel: "AI Clipping",
    tagLabel: "Highlight",
    folderId: "all",
    folderName: "Mặc định",
    status: "Hoàn tất (6 clips)",
    statusCode: "completed",
    progress: 100,
    progressLabel: "Đã hoàn thành",
    currentStep: 5,
    stepLabel: "6 clips hoàn thiện",
    isCompleted: true,
    isDriveSaved: true,
    clipsCount: 6,
    timeAgo: "4 minutes ago",
    updatedAt: "4 minutes ago",
    updatedDate: "Vừa xong",
    thumbnail: "media/image/farmstay_retinol_table.jpg",
    isRendering: false,
    previewVideo: "media/video/final_final.mp4",
    duration: "00:45",
    streamer: "AI Clipping",
    subtext: "Dự án tạo video tự động bằng AI Clipping từ livestream và media có sẵn.",
    chips: [
      { label: "Nguồn dữ liệu", count: 1, icon: "live" },
      { label: "Clip tự động", count: 6, icon: "film" },
      { label: "Rendering", count: 1, icon: "check" }
    ],
    sourceMedia: {
      title: "hw5MPxb51cU - Livestream Source",
      filename: "hw5MPxb51cU_stream.mp4",
      duration: "00:45:00",
      resolution: "1080p Full HD",
      size: "1.1 GB",
      asrStatus: "Đã bóc băng 100%"
    },
    rawClips: [
      {
        id: "RAW_HW_001",
        title: "Highlight Clip 01",
        topic: "AI Viral Hook",
        hookQuote: "Đoạn hook viral nổi bật nhất được AI nhận diện...",
        timeRange: "00:02:10 – 00:02:45",
        status: "Đang xử lý"
      }
    ],
    clips: [
      {
        id: "HW_CLIP_01",
        title: "Tạm Biệt 'Kính Chiếu Yêu': iPhone Đã Có Filter Làm Đẹp!",
        score: 82,
        grade: "A",
        potentialLabel: "High potential",
        duration: "1min 5s",
        durationSec: 65,
        hookQuote: "À nhưng mà các",
        timeAgo: "11 minutes ago",
        videoUrl: "media/video/final_final.mp4",
        thumbnail: "media/image/farmstay_retinol_table.jpg",
        breakdown: {
          hook: { score: 90, note: "The term 'Kính Chiếu Yêu' (demon-revealing mirror) is a popular local slang that will immediately grab attention." },
          flow: { score: 80, note: "Explains the new feature clearly and why it's different from third-party apps." },
          value: { score: 85, note: "This is a feature many users have wanted for years; knowing it's finally here is high value." },
          trend: { score: 75, note: "Beauty and camera filters are huge on social platforms like TikTok and Reels." }
        },
        transcript: [
          { time: "00:00", text: "À nhưng mà các bạn ơi, tính năng mới này thực sự thay đổi tất cả." },
          { time: "00:08", text: "Camera trước từ nay không còn là kính chiếu yêu đáng sợ nữa." },
          { time: "00:22", text: "Bộ lọc làm đẹp tự nhiên tích hợp sẵn giữ nguyên độ nét của da." },
          { time: "00:45", text: "Cực kỳ phù hợp cho anh em sáng tạo nội dung quay video ngắn!" }
        ]
      },
      {
        id: "HW_CLIP_02",
        title: "Lời Khuyên Cuối Cùng: Ai Nên Mua iPhone 18 Pro Max?",
        score: 76,
        grade: "B+",
        potentialLabel: "Good potential",
        duration: "39s",
        durationSec: 39,
        hookQuote: "Và cơ bản thì",
        timeAgo: "13 minutes ago",
        videoUrl: "media/video/loi_giong_doc.mp4",
        thumbnail: "media/image/farmstay_retinol_water.jpg",
        breakdown: {
          hook: { score: 82, note: "Direct question addressing viewer dilemma on upgrade decision." },
          flow: { score: 78, note: "Concise comparison points without rambling." },
          value: { score: 80, note: "Clear buying advice saves buyers money." },
          trend: { score: 70, note: "Flagship phone purchasing seasonal trend." }
        },
        transcript: [
          { time: "00:00", text: "Và cơ bản thì nếu bạn đang dùng 16 hoặc 17 Pro, khoan hãy vội nâng cấp." },
          { time: "00:15", text: "Trừ khi bạn thực sự cần thời lượng pin vượt trội và chip AI thế hệ mới." },
          { time: "00:30", text: "Hãy cân nhắc kỹ nhu cầu thực tế trước khi xuống tiền nhé!" }
        ]
      },
      {
        id: "HW_CLIP_03",
        title: "Cảnh Báo Màu Sắc Trên iPhone 18 Pro Max!",
        score: 75,
        grade: "B",
        potentialLabel: "Good potential",
        duration: "1min 10s",
        durationSec: 70,
        hookQuote: "Đặc biệt là những",
        timeAgo: "9 minutes ago",
        videoUrl: "media/video/loi_text.mp4",
        thumbnail: "media/image/farmstay_retinol_box.jpg",
        breakdown: {
          hook: { score: 88, note: "Warning hook triggers fear of missing out or buying the wrong color." },
          flow: { score: 72, note: "Hands-on close up look at surface reflection." },
          value: { score: 74, note: "Helps users avoid fingerprints and scratches." },
          trend: { score: 76, note: "New phone colorway discussions." }
        },
        transcript: [
          { time: "00:00", text: "Đặc biệt là những ai thích phiên bản màu đậm cần hết sức lưu ý." },
          { time: "00:20", text: "Viền titan năm nay bám vân tay ít hơn nhưng bề mặt rất dễ xước dăm." },
          { time: "00:50", text: "Khuyên thật lòng các bạn nên trang bị ốp lưng trong suốt chống sốc." }
        ]
      },
      {
        id: "HW_CLIP_04",
        title: "Lỗi Face ID Trên iPhone 18 Pro Max & Cách Khắc Phục",
        score: 74,
        grade: "B",
        potentialLabel: "Moderate potential",
        duration: "1min 24s",
        durationSec: 84,
        hookQuote: "Ngoài ra thì một",
        timeAgo: "11 minutes ago",
        videoUrl: "media/video/final_final.mp4",
        thumbnail: "media/image/farmstay_retinol_hand.jpg",
        breakdown: {
          hook: { score: 85, note: "Problem-focused hook targeting existing user frustration." },
          flow: { score: 75, note: "Step-by-step tutorial format." },
          value: { score: 82, note: "Instant fix for annoying hardware bug." },
          trend: { score: 65, note: "Troubleshooting evergreen content." }
        },
        transcript: [
          { time: "00:00", text: "Ngoài ra thì một số máy đời đầu gặp hiện tượng nhận diện khuôn mặt chập chờn." },
          { time: "00:30", text: "Chỉ cần vào Cài đặt -> Đặt lại cấu hình khuôn mặt trong môi trường đủ sáng." },
          { time: "01:05", text: "Tốc độ quét sẽ trở lại tức thì siêu nhanh trong 0.1 giây." }
        ]
      },
      {
        id: "HW_CLIP_05",
        title: "iPhone 18 Pro Max: Có Đáng Lên Đời Từ 17 Pro Max?",
        score: 72,
        grade: "C+",
        potentialLabel: "Moderate potential",
        duration: "1min 7s",
        durationSec: 67,
        hookQuote: "Review iPhone 18 Pro",
        timeAgo: "10 minutes ago",
        videoUrl: "media/video/loi_giong_doc.mp4",
        thumbnail: "media/image/farmstay_retinol_table.jpg",
        breakdown: {
          hook: { score: 78, note: "Comparison hook for previous generation owners." },
          flow: { score: 70, note: "Side-by-side spec sheet review." },
          value: { score: 76, note: "Highlights camera sensor upgrades." },
          trend: { score: 70, note: "Annual upgrade debates." }
        },
        transcript: [
          { time: "00:00", text: "Review iPhone 18 Pro sau 1 tuần sử dụng thực tế của mình." },
          { time: "00:25", text: "Khác biệt rõ nhất nằm ở hệ thống tản nhiệt buồng hơi mới mát rượi." },
          { time: "00:50", text: "Nếu bạn chơi game nặng nhiều thì đây là bản nâng cấp rất đáng giá." }
        ]
      },
      {
        id: "HW_CLIP_06",
        title: "Camera iPhone 18 Pro Max: Bước Ngoặt Cho Dân Content",
        score: 71,
        grade: "C+",
        potentialLabel: "Moderate potential",
        duration: "1min 50s",
        durationSec: 110,
        hookQuote: "Đó chính là về",
        timeAgo: "10 minutes ago",
        videoUrl: "media/video/loi_text.mp4",
        thumbnail: "media/image/farmstay_retinol_box.jpg",
        breakdown: {
          hook: { score: 80, note: "Niche hook specifically for creators and videographers." },
          flow: { score: 68, note: "Detailed cinematic mode sample footage." },
          value: { score: 78, note: "Pro-grade video recording settings revealed." },
          trend: { score: 68, note: "Content creator gear reviews." }
        },
        transcript: [
          { time: "00:00", text: "Đó chính là về khả năng quay video LOG thế hệ 2 không nén." },
          { time: "00:40", text: "Màu sắc kéo lại cực kỳ sâu và dải dynamic range tiệm cận máy ảnh chuyên nghiệp." },
          { time: "01:20", text: "Một thiết bị bỏ túi hoàn hảo cho mọi TikToker và YouTuber." }
        ]
      }
    ],
    finalVideos: []
  },
  {
    id: "PRJ_LIVE_1510",
    name: "Dự án: Livestream 15/10 - Flash Sale Retinol",
    creator: "LÂM",
    category: "livestream",
    categoryLabel: "Cắt Highlight Live",
    tagLabel: "Apps",
    timeAgo: "12 minutes ago",
    categoryBadgeColor: "#ef4444",
    folderId: "sale_1010",
    folderName: "SALE 10/10",
    status: "Đang hậu kỳ",
    statusCode: "processing",
    progress: 85,
    isDriveSaved: true,
    currentStep: 3,
    stepLabel: "Bước 3: Duyệt Clip Thô",
    updatedAt: "10:35",
    updatedDate: "Hôm nay 10:35",
    thumbnail: "media/image/farmstay_retinol_table.jpg",
    previewVideo: "media/video/final_final.mp4",
    duration: "02:15:30",
    streamer: "Dược Sĩ Lan Anh",
    subtext: "Mọi dữ liệu thuộc cùng một công việc nằm trong dự án, có trạng thái và quan hệ nguồn—đầu ra rõ ràng.",
    chips: [
      { label: "Livestream nguồn", count: 1, icon: "live" },
      { label: "Clip thô", count: 10, icon: "film" },
      { label: "Video thành phẩm", count: 4, icon: "check" }
    ],
    sourceMedia: {
      title: "Livestream Mega Sale 15/09 – Mỹ Nguyên TSC",
      filename: "session_recording_1509.mp4",
      duration: "02:15:30",
      resolution: "1080p Full HD",
      size: "3.2 GB",
      asrStatus: "Đã bóc băng 100% (Syrix ASR)"
    },
    rawClips: [
      {
        id: "RAW_CLIP_001",
        title: "Deal Sốc Retinol 299k Độc Quyền",
        topic: "Nhóm 2 - Báo giá & Khuyến mãi (Deal)",
        hookQuote: "Hôm nay ai có mặt trong phiên live này nhận ngay hũ Retinol giá chỉ 299 cành...",
        timeRange: "00:14:20 – 00:14:55",
        status: "Đã duyệt"
      },
      {
        id: "RAW_CLIP_002",
        title: "Test Thoa Chất Kem Collagen Trên Mu Bàn Tay",
        topic: "Nhóm 3 - Trải nghiệm & Test mỹ phẩm",
        hookQuote: "Các chị nhìn chất kem này, mỏng như nước tan ngay lập tức trên da...",
        timeRange: "00:28:10 – 00:28:48",
        status: "Đang dựng"
      },
      {
        id: "RAW_CLIP_003",
        title: "Giải Đáp Da Nhạy Cảm Dùng Retinol Có Bong Tróc Không",
        topic: "Nhóm 1 - Tư vấn chuyên sâu SP",
        hookQuote: "Rất nhiều chị hỏi em da mỏng yếu có dùng được retinol Farmstay không...",
        timeRange: "00:45:00 – 00:45:42",
        status: "Đã duyệt"
      },
      {
        id: "RAW_CLIP_004",
        title: "Tâm Sự Đêm Khuya: 10 Năm Bán Hàng Nhập Khẩu Chính Ngạch",
        topic: "Nhóm 4 - Tâm sự đời thường / Kết nối",
        hookQuote: "Em nói thật với các chị, hàng xách tay trôi nổi đầy ra nhưng tem phụ Mỹ Nguyên...",
        timeRange: "01:12:05 – 01:12:50",
        status: "Chưa duyệt"
      }
    ],
    finalVideos: [
      {
        id: "FN_001",
        title: "Deal Sốc Retinol 299k Độc Quyền Mỹ Nguyên",
        hook: "299 cành cho 1 hũ Retinol Hàn Quốc nhập khẩu chính ngạch?",
        duration: "35s",
        caption: "Deal sốc duy nhất hôm nay trên TikTok Shop Mỹ Nguyên TSC! Giữ mãi nét thanh xuân cùng Retinol chính ngạch 🔥 #mynguyentsc #retinol #dealsoc",
        hashtags: ["#mynguyentsc", "#retinol", "#dealsoc", "#farmstay"],
        thumbnail: "media/image/farmstay_retinol_table.jpg",
        videoUrl: "media/video/final_final.mp4",
        qualityScore: "9.2/10"
      },
      {
        id: "FN_002",
        title: "Da Mỏng Yếu Có Dùng Được Retinol Farmstay Không?",
        hook: "Bí mật dùng Retinol êm ru không lo bong tróc đỏ rát!",
        duration: "42s",
        caption: "Dược sĩ giải đáp cách dùng Retinol an toàn cho da mẫn cảm. Click giỏ hàng nhận ưu đãi chính hãng! ✨ #chamsocda #retinolrevive",
        hashtags: ["#mynguyentsc", "#chamsocda", "#retinolrevive"],
        thumbnail: "media/image/farmstay_retinol_box.jpg",
        videoUrl: "media/video/loi_giong_doc.mp4",
        qualityScore: "8.8/10"
      }
    ]
  },
  {
    id: "PRJ_IMG_CICA",
    name: "Dự án: Farmstay Cica Serum 20 Clips Biến Thể",
    category: "image_to_video",
    categoryLabel: "Dựng Video Từ Ảnh",
    categoryBadgeColor: "#1677ff",
    folderId: "cica_viral",
    folderName: "Farmstay Cica Serum Viral",
    status: "Hoàn thành",
    statusCode: "completed",
    progress: 100,
    isDriveSaved: false,
    updatedAt: "09:30",
    updatedDate: "Hôm nay 09:30",
    thumbnail: "media/image/farmstay_retinol_water.jpg",
    previewVideo: "media/video/loi_giong_doc.mp4",
    duration: "00:24",
    streamer: "Avatar Dược Sĩ Mai Lan",
    subtext: "Mọi dữ liệu thuộc cùng một công việc nằm trong dự án, có trạng thái và quan hệ nguồn—đầu ra rõ ràng.",
    chips: [
      { label: "Ảnh sản phẩm", count: 4, icon: "image" },
      { label: "Biến thể Hook", count: 8, icon: "hook" },
      { label: "Video thành phẩm", count: 6, icon: "check" }
    ],
    sourceMedia: {
      title: "Bộ 4 Packshot 4K Farmstay Cica Blemi-Clear Serum",
      filename: "farmstay_cica_packshot_kit.zip",
      duration: "4 Ảnh PNG",
      resolution: "4K UHD (Product Lock)",
      size: "48 MB",
      asrStatus: "Không có âm thanh gốc"
    },
    rawClips: [],
    finalVideos: [
      {
        id: "FN_003",
        title: "Dược Sĩ Da Liễu Khuyên Dùng Serum Rau Má Cica",
        hook: "Mặt mẩn đỏ kích ứng sau 20 phút xẹp ngay nhờ rau má Jeju?",
        duration: "24s",
        caption: "Cứu tinh cho da mụn mẩn đỏ cấp tốc! Tinh chất rau má Cica hữu cơ nhập khẩu độc quyền Mỹ Nguyên TSC 🌿 #cica #farmstay #damun",
        hashtags: ["#mynguyentsc", "#cica", "#farmstay", "#damun"],
        thumbnail: "media/image/farmstay_retinol_water.jpg",
        videoUrl: "media/video/loi_giong_doc.mp4",
        qualityScore: "9.5/10"
      },
      {
        id: "FN_004",
        title: "Hiệu Ứng Nước Bắn 3D Chai Serum Farmstay",
        hook: "Serum thẩm thấu nhanh hay bết dính? Xem ngay!",
        duration: "18s",
        caption: "Visual điện ảnh 3D cực mướt mát mắt. Trải nghiệm serum dưỡng ẩm số 1 Hàn Quốc! 💧 #skincare #3dvideo",
        hashtags: ["#mynguyentsc", "#skincare", "#3dvideo"],
        thumbnail: "media/image/farmstay_retinol_water.jpg",
        videoUrl: "media/video/final_final.mp4",
        qualityScore: "9.0/10"
      }
    ]
  },
  {
    id: "PRJ_LIVE_RETINOL",
    name: "Dự án: Flash Deal Retinol 10/10",
    category: "livestream",
    categoryLabel: "Cắt Highlight Live",
    categoryBadgeColor: "#ef4444",
    folderId: "sale_1010",
    folderName: "SALE 10/10",
    status: "Chờ duyệt",
    statusCode: "pending_review",
    progress: 60,
    isDriveSaved: true,
    currentStep: 4,
    stepLabel: "Bước 4: Cấu Hình Hậu Kỳ",
    updatedAt: "Hôm qua 16:40",
    updatedDate: "Hôm qua 16:40",
    thumbnail: "media/image/farmstay_retinol_box.jpg",
    previewVideo: "media/video/loi_text.mp4",
    duration: "01:45:00",
    streamer: "KOC Thu Trang",
    subtext: "Mọi dữ liệu thuộc cùng một công việc nằm trong dự án, có trạng thái và quan hệ nguồn—đầu ra rõ ràng.",
    chips: [
      { label: "Livestream nguồn", count: 1, icon: "live" },
      { label: "Clip thô", count: 8, icon: "film" },
      { label: "Video thành phẩm", count: 2, icon: "check" }
    ],
    sourceMedia: {
      title: "Flash Deal Retinol & Cica Serum 10/09",
      filename: "live_recording_1009.mp4",
      duration: "01:45:00",
      resolution: "1080p Full HD",
      size: "2.4 GB",
      asrStatus: "Đã bóc băng 100%"
    },
    rawClips: [
      {
        id: "RAW_005",
        title: "Khoảnh khắc chốt 50 combo trong 3 phút",
        topic: "Báo giá / Deal",
        hookQuote: "Còn đúng 15 suất cuối cùng tặng kèm tuýp rửa mặt...",
        timeRange: "00:32:10 – 00:32:45",
        status: "Chờ duyệt"
      }
    ],
    finalVideos: [
      {
        id: "FN_005",
        title: "Đếm Ngược Chốt Đơn 15 Suất Retinol Cuối Cùng",
        hook: "Chỉ còn 3 phút nữa hệ thống tự đóng giá khuyến mãi!",
        duration: "28s",
        caption: "Nhanh tay bấm vào góc trái màn hình rinh ngay deal sốc 10/10 🎁 #flashdeal #sale1010 #mynguyen",
        hashtags: ["#flashdeal", "#sale1010", "#mynguyen"],
        thumbnail: "media/image/farmstay_retinol_box.jpg",
        videoUrl: "media/video/loi_text.mp4",
        qualityScore: "8.6/10"
      }
    ]
  },
  {
    id: "PRJ_RAW_SEHWA",
    name: "Dự án: Unboxing & Test Chất Kem Chống Nắng Sehwa",
    category: "raw_edit",
    categoryLabel: "Chỉnh Sửa Video Gốc",
    categoryBadgeColor: "#9333ea",
    folderId: "campaign_retinol",
    folderName: "Chiến Dịch Retinol Thu Đông",
    status: "Hoàn thành",
    statusCode: "completed",
    progress: 100,
    updatedAt: "14/10 11:20",
    updatedDate: "14/10 11:20",
    thumbnail: "media/image/farmstay_retinol_hand.jpg",
    previewVideo: "media/video/final_final.mp4",
    duration: "00:32",
    streamer: "KOC Thu Trang (Quay thô)",
    subtext: "Mọi dữ liệu thuộc cùng một công việc nằm trong dự án, có trạng thái và quan hệ nguồn—đầu ra rõ ràng.",
    chips: [
      { label: "Video thô", count: 2, icon: "film" },
      { label: "Bản nháp", count: 3, icon: "draft" },
      { label: "Video thành phẩm", count: 2, icon: "check" }
    ],
    sourceMedia: {
      title: "Video thô quay điện thoại: Test kem Sehwa trên da",
      filename: "raw_footage_sehwa_phone.mov",
      duration: "03:15",
      resolution: "4K 60fps",
      size: "620 MB",
      asrStatus: "Video không lời"
    },
    rawClips: [],
    finalVideos: [
      {
        id: "FN_006",
        title: "Test Thấm Dầu Sehwa UV Shield Dưới Đèn Cao Áp",
        hook: "Kem chống nắng kiềm dầu 8 tiếng không bí bách là thật?",
        duration: "32s",
        caption: "Bất ngờ với khả năng kiềm dầu đỉnh chóp của Sehwa Sun Shield. Lớp finish nâng tone căng bóng nhẹ nhàng ☀️ #sehwa #kemchongnang",
        hashtags: ["#sehwa", "#kemchongnang", "#kiemdau"],
        thumbnail: "media/image/farmstay_retinol_hand.jpg",
        videoUrl: "media/video/final_final.mp4",
        qualityScore: "9.1/10"
      }
    ]
  },
  {
    id: "PRJ_IMG_AMPOULE",
    name: "Dự án: TVC 3D Collagen Ampoule Khổng Lồ 250ml",
    category: "image_to_video",
    categoryLabel: "Dựng Video Từ Ảnh",
    categoryBadgeColor: "#1677ff",
    folderId: "campaign_retinol",
    folderName: "Chiến Dịch Retinol Thu Đông",
    status: "Đang hậu kỳ",
    statusCode: "processing",
    progress: 75,
    updatedAt: "12/10 17:05",
    updatedDate: "12/10 17:05",
    thumbnail: "media/image/farmstay_retinol_table.jpg",
    previewVideo: "media/video/loi_giong_doc.mp4",
    duration: "00:22",
    streamer: "Avatar AI Dược Sĩ",
    subtext: "Mọi dữ liệu thuộc cùng một công việc nằm trong dự án, có trạng thái và quan hệ nguồn—đầu ra rõ ràng.",
    chips: [
      { label: "Ảnh sản phẩm", count: 3, icon: "image" },
      { label: "Biến thể Hook", count: 5, icon: "hook" },
      { label: "Video thành phẩm", count: 2, icon: "check" }
    ],
    sourceMedia: {
      title: "Ảnh Packshot Hũ Collagen 250ml Nền Trong Suốt",
      filename: "farmstay_collagen_250ml.png",
      duration: "3 Ảnh",
      resolution: "4K UHD",
      size: "35 MB",
      asrStatus: "Không có âm thanh"
    },
    rawClips: [],
    finalVideos: [
      {
        id: "FN_007",
        title: "Ampoule Collagen 250ml Hũ To Dùng Cả Năm",
        hook: "Chiếc hũ thần kỳ 250ml cứu cánh cho da khô nứt nẻ!",
        duration: "22s",
        caption: "Hạt collagen tươi vỡ tan trên da thấm sâu tức thì. Hàng phân phối độc quyền Mỹ Nguyên TSC! 💧 #collagen #duongam",
        hashtags: ["#collagen", "#duongam", "#farmstay"],
        thumbnail: "media/image/farmstay_retinol_table.jpg",
        videoUrl: "media/video/loi_giong_doc.mp4",
        qualityScore: "8.9/10"
      }
    ]
  },
  {
    id: "PRJ_LIVE_0510",
    name: "Dự án: Livestream 05/10 - Ra Mắt Cica Farmstay",
    category: "livestream",
    categoryLabel: "Cắt Highlight Live",
    categoryBadgeColor: "#ef4444",
    folderId: "livestream_monthly",
    folderName: "Livestream Tháng 10",
    status: "Hoàn thành",
    statusCode: "completed",
    progress: 100,
    currentStep: 5,
    stepLabel: "Bước 5: Thành Phẩm & Lưu Kho",
    updatedAt: "06/10 09:00",
    updatedDate: "06/10 09:00",
    thumbnail: "media/image/farmstay_retinol_water.jpg",
    previewVideo: "media/video/final_final.mp4",
    duration: "02:40:15",
    streamer: "Dược Sĩ Lan Anh & Mai Lan",
    subtext: "Mọi dữ liệu thuộc cùng một công việc nằm trong dự án, có trạng thái và quan hệ nguồn—đầu ra rõ ràng.",
    chips: [
      { label: "Livestream nguồn", count: 1, icon: "live" },
      { label: "Clip thô", count: 12, icon: "film" },
      { label: "Video thành phẩm", count: 8, icon: "check" }
    ],
    sourceMedia: {
      title: "Livestream Ra Mắt Bộ Sản Phẩm Cica Jeju 05/10",
      filename: "live_session_cica_0510.mp4",
      duration: "02:40:15",
      resolution: "1080p Full HD",
      size: "3.8 GB",
      asrStatus: "Đã bóc băng 100%"
    },
    rawClips: [],
    finalVideos: [
      {
        id: "FN_008",
        title: "Bóc Phốt Hàng Giả: Cách Xem Tem Phụ Mỹ Nguyên Chính Ngạch",
        hook: "Mua mỹ phẩm Hàn Quốc trên mạng nhất định phải biết điều này!",
        duration: "45s",
        caption: "Cảnh báo hàng trôi nổi kém chất lượng! Hướng dẫn kiểm tra tem phụ độc quyền Mỹ Nguyên TSC 🛡️ #temchinhhang #mynguyentsc",
        hashtags: ["#temchinhhang", "#mynguyentsc", "#phanthiet"],
        thumbnail: "media/image/farmstay_retinol_water.jpg",
        videoUrl: "media/video/final_final.mp4",
        qualityScore: "9.6/10"
      }
    ]
  }
];
