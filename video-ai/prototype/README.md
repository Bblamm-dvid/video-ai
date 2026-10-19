# HƯỚNG DẪN TRẢI NGHIỆM & THẨM ĐỊNH PROTOTYPE
## PHƯƠNG ÁN 1: NỀN TẢNG SẢN XUẤT VIDEO TỰ ĐỘNG HÓA (AI CONTENT FACTORY)
**Dự án**: TikTok Organic Growth - Công ty TNHH TM & DV Mỹ Nguyên (Mỹ Nguyên TSC)

---

## I. GIỚI THIỆU BẢN PROTOTYPE
Bản Prototype này được xây dựng độc lập, giao diện hiện đại chuẩn thẩm mỹ ngành mỹ phẩm Hàn Quốc cao cấp kết hợp công nghệ AI Studio, giúp giải quyết triệt để các bài toán cốt lõi theo yêu cầu của Mỹ Nguyên TSC:

1. **Khóa nhận diện sản phẩm (Product Lock):** Tuyệt đối giữ nguyên bao bì, tem phụ, dung tích và logo của nhãn hàng (Farmstay, Sehwa), AI chỉ can thiệp bối cảnh, ánh sáng, góc máy, người mẫu.
2. **Cỗ máy 1 (Livestream-to-Shorts):** Tự động bóc tách buổi livestream dài 1–3 tiếng thành 20–50 video ngắn dọc 9:16 có phụ đề nhảy chữ Kinetic, B-roll sản phẩm sắc nét và tem phụ tiếng Việt.
3. **Cỗ máy 2 (Static Packshots & Raw-to-Multi-Videos):** Phân luồng bộ ba động cơ theo đúng chỉ đạo:
   - **Creatify API**: Dập video quảng cáo E-commerce flash sale hàng loạt.
   - **HeyGen API**: Avatar Dược sĩ da liễu / Reviewer ảo nói tiếng Việt chuẩn ngữ điệu.
   - **Higgsfield AI**: Cảnh quay 3D điện ảnh (nước bắn, xoay 360 độ, giọt serum rơi slow-motion).
   - **Hybrid Assembly**: Ghép nối 3 phân đoạn thành video TVC TikTok triệu view.
4. **AI Quality Gate**: Hệ thống tự động chấm điểm 4 tiêu chí (Hook 3s, Product Fidelity, Audio & Sub, Dedupe). Điểm $\ge 7.5$ mới đẩy lên hàng đợi duyệt.
5. **Kho duyệt & Ready-to-Post Kit:** Cung cấp đầy đủ file video 9:16 có lớp phủ Safe-Zone TikTok, kịch bản, caption chuẩn SEO, bộ 5-7 hashtag và xuất file Excel CSV chỉ bằng 1 cú nhấp chuột.

---

## II. CÁCH KHỞI CHẠY & TRẢI NGHIỆM PROTOTYPE

### Cách 1: Mở trực tiếp bằng trình duyệt
Bạn chỉ cần mở trực tiếp file sau bằng bất kỳ trình duyệt nào (Chrome, Edge, Brave):
```
d:\xperc\video-ai\prototype\index.html
```

### Cách 2: Khởi chạy qua Local Web Server (Khuyên dùng)
Nếu muốn chạy qua cổng HTTP cục bộ:
```powershell
# Chạy server python tích hợp
cd d:\xperc\video-ai\prototype
python -m http.server 3000
```
Sau đó truy cập: `http://localhost:3000`

---

## III. HƯỚNG DẪN TEST CÁC TÍNH NĂNG CHÍNH TRÊN GIAO DIỆN

### 1. Tab "Điều Phối Lệnh (AI Prompt & n8n)"
- Bấm vào các **Gợi ý câu lệnh mẫu (Preset Chips)** ở dưới khung nhập liệu (Ví dụ: *Farmstay Cica 20 Clips* hoặc *Livestream-to-Shorts*).
- Bấm nút **⚡ Kích Hoạt Cỗ Máy Sản Xuất (Run n8n Workflow)**:
  - Xem mô phỏng luồng chạy thời gian thực qua 5 Node: *Phân rã lệnh $\rightarrow$ Sinh 10 Hook $\rightarrow$ Phân luồng 3 Engine $\rightarrow$ FFmpeg Assemble $\rightarrow$ AI Quality Gate*.
  - Quan sát nhật ký n8n ghi nhận tại khung log bên dưới.

### 2. Tab "Cỗ Máy 1: Livestream-to-Shorts"
- Quan sát **Waveform sóng âm** với các phân đoạn màu vàng (Khoảnh khắc vàng chốt deal & thử kem).
- Bấm chọn từng phân đoạn trong danh sách (Clip 001, Clip 002, Clip 003): Trình phát 9:16 bên phải sẽ tự động đổi video, cập nhật nhãn tem phụ và dòng phụ đề kinetic vàng.
- Bấm nút **👁️ Bật/Tắt Safe-Zone TikTok**: Xem lớp phủ minh họa các nút Like/Share/Caption của TikTok để đảm bảo chữ trên video không bao giờ bị che khuất.

### 3. Tab "Cỗ Máy 2: Multi-Engine"
- Chuyển đổi giữa 4 tab động cơ:
  - **Higgsfield AI**: Xem hiệu ứng 3D cinematic nước bắn xoay quanh chai serum.
  - **HeyGen API**: Xem avatar Dược sĩ review thành phần rau má bằng tiếng Việt.
  - **Creatify API**: Xem video e-commerce bán hàng nhanh flash sale.
  - **Hybrid Assembly**: Xem video TVC chuẩn kết hợp cả 3 động cơ.
- Bấm chọn các góc tiếp cận trong **Ma trận 10 loại Hook** (Bóc phốt, Chuyên gia, ASMR, So sánh, v.v.).

### 4. Tab "AI Quality Gate & Kiểm Định"
- Xem bảng chấm điểm 4 tiêu chuẩn kỹ thuật.
- Bấm nút **"Xem chi tiết"** ở bảng audit để nhảy trực tiếp tới video trong kho duyệt.

### 5. Tab "Kho Phê Duyệt & Content Kit"
- Lọc video theo SKU sản phẩm hoặc Trạng thái duyệt.
- Bấm nút **"Copy Caption"**, **"Copy Tags"**, **"Copy Kịch Bản"** để copy nhanh thông tin đăng bài.
- Bấm nút **"✓ Phê Duyệt"** để chuyển trạng thái video.
- Bấm nút **"📊 Xuất File Excel / CSV Metadata"**: Hệ thống sẽ tự động tạo và tải xuống file CSV chứa toàn bộ metadata video.
- Bấm nút **"📥 Tải Trọn Gói Hàng Đợi (Batch ZIP)"**: Mô phỏng tải trọn gói video và tài liệu.

### 6. Tab "Kiến Trúc & Dự Toán Chi Phí"
- Xem cấu trúc hệ thống 3 tầng microservices.
- Xem bảng phân tích chi phí sản xuất: **Chỉ ~$0.48 / video** (khoảng 12.000 VNĐ), tiết kiệm hơn 98% so với dựng tay truyền thống.
