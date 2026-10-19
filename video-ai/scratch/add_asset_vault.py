import re

with open('prototype/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

asset_vault_code = '''  // ==========================================
  // KHO 2: KHO ẢNH & VIDEO SẢN PHẨM (DRIVE FOLDERS THEO SKU - TODO6)
  // ==========================================
  assetVault: {
    productFolders: [
      {
        id: "folder_all",
        name: "Tất Cả Thư Mục",
        isPublic: true
      },
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

      { id: "DF_05", folderId: "folder_collagen", name: "Hu_250ml_Chinh_Dien.jpg", type: "image", thumb: "media/image/farmstay_retinol_hand.jpg", size: "2.5 MB" },
      { id: "DF_06", folderId: "folder_collagen", name: "Tem_Chinh_Ngach_TSC.jpg", type: "image", thumb: "media/image/farmstay_retinol_box.jpg", size: "2.1 MB" },
      { id: "DF_07", folderId: "folder_collagen", name: "Collagen_Ampoule_Goc_Nghieng.jpg", type: "image", thumb: "media/image/farmstay_retinol_water.jpg", size: "3.3 MB" },
      { id: "DF_08", folderId: "folder_collagen", name: "Texture_Hat_Collagen.jpg", type: "image", thumb: "media/image/farmstay_retinol_texture.jpg", size: "3.9 MB" },

      { id: "DF_09", folderId: "folder_sehwa", name: "Tuyp_Sehwa_Chinh_Dien.jpg", type: "image", thumb: "media/image/farmstay_retinol_box.jpg", size: "2.2 MB" },
      { id: "DF_10", folderId: "folder_sehwa", name: "Tem_Phu_Bo_Y_Te.jpg", type: "image", thumb: "media/image/farmstay_retinol_water.jpg", size: "1.9 MB" },
      { id: "DF_11", folderId: "folder_sehwa", name: "Goc_Nghieng_Tuyp_45.jpg", type: "image", thumb: "media/image/farmstay_retinol_hand.jpg", size: "2.7 MB" },
      { id: "DF_12", folderId: "folder_sehwa", name: "Test_Kiem_Dau_8H.jpg", type: "image", thumb: "media/image/farmstay_retinol_texture.jpg", size: "3.5 MB" },

      { id: "DF_13", folderId: "folder_cleanser", name: "Chai_Sua_Rua_Mat.jpg", type: "image", thumb: "media/image/farmstay_retinol_texture.jpg", size: "2.1 MB" },
      { id: "DF_14", folderId: "folder_cleanser", name: "Tem_Tieng_Viet_Chinh_Hang.jpg", type: "image", thumb: "media/image/farmstay_retinol_box.jpg", size: "2.4 MB" },
      { id: "DF_15", folderId: "folder_cleanser", name: "Bong_Bot_Cica_Jeju.jpg", type: "image", thumb: "media/image/farmstay_retinol_water.jpg", size: "3.0 MB" },
      { id: "DF_16", folderId: "folder_cleanser", name: "Texture_Gel_BHA.jpg", type: "image", thumb: "media/image/farmstay_retinol_hand.jpg", size: "3.6 MB" }
    ]
  },
'''

target = "  // ==========================================\n  // KHO 4: KHO ẢNH & PERSONA MODEL (TODO7)"
assert target in text, "Could not find target in data.js"
text = text.replace(target, asset_vault_code + "\n" + target)

with open('prototype/data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("assetVault added successfully to data.js!")
