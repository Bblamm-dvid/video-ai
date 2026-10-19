# ĐẶC TẢ PHẠM VI: CẮT & TÁI DỰNG VIDEO NGẮN TỪ LIVESTREAM BẰNG AI

# ĐẶC TẢ PHẠM VI DỰ ÁN (PROJECT SCOPE SPECIFICATION)

## MODULE: HỆ THỐNG CẮT & TÁI DỰNG VIDEO NGẮN TỪ LIVESTREAM BẰNG AI

### (AI LIVESTREAM-TO-SHORTS FACTORY)

* **Dự án:** Hệ thống Sản Xuất Video TikTok Tự Động (AI Content Factory)
* **Khách hàng / Đơn vị thụ hưởng:** Công ty TNHH TM & DV Mỹ Nguyên (Mỹ Nguyên TSC)
* **Định hướng kênh:** 100% Tăng trưởng tự nhiên (Organic Reach) cho ngành Mỹ phẩm & Skincare
* **Loại tài liệu:** Đặc tả Phạm vi (Feature & Product Scope Document)
* **Phiên bản:** v1.0 (Dành cho Dev triển khai & BA/PO quản lý chất lượng)

***

## I. PHẠM VI TRONG DỰ ÁN (IN-SCOPE: NHỮNG GÌ HỆ THỐNG SẼ LÀM)

Hệ thống tập trung giải quyết trọn vẹn 6 phân hệ cốt lõi sau:

```
[1. Nạp File Live] ──► [2. Lấy transcript & AI Lọc Mốc] ──► [3. Xử Lý Âm Thanh] ──► [4. Cắt & Reframe 9:16] ──► [5. Duyệt Nhanh UI] ──► [6. Xuất Bản]
```

### 1. Nạp dữ liệu đầu vào (Input Ingestion)

* Tiếp nhận file video livestream dài (1–3 giờ) tải lên trực tiếp hệ thống:
  * Định dạng chuẩn xuất từ TikTok LIVE Center / Replay: **`.mp4`** (H.264 / AAC).
  * Hỗ trợ tương thích mở rộng thêm các file ghi hình live từ phần mềm bên ngoài (OBS / TikTok LIVE Studio): **`.mov`**, **`.mkv`**.

### 2. AI phân tích & Lọc khoảnh khắc (AI Curation & Highlight Detection)

* **Bóc băng âm thanh (ASR - Syrix):** Tách toàn bộ lời thoại của streamer thành văn bản tiếng Việt có gắn mốc thời gian (Timestamp) chi tiết từng từ.
* **Bộ lọc ngữ nghĩa thông minh (Google Gemini):**
  * Tự động quét transcript văn bản để nhận diện các đoạn tiềm năng dựa trên lời nói của streamer *(Lưu ý: Tiêu chí chi tiết sẽ được tinh chỉnh chính xác theo kết quả khảo sát từ khách hàng; dưới đây là các nhóm ví dụ tham khảo)*:
    * *Ví dụ - Cảnh tung deal/xả kho:* Nhận diện streamer nói về giá sốc, voucher độc quyền, đếm ngược chốt đơn.
    * *Ví dụ - Cảnh tư vấn công dụng sản phẩm:* Nhận diện streamer mô tả thành phần, chất kem, hướng dẫn cách dùng (dựa trên lời nói trong transcript).
    * *Ví dụ - Cảnh giải đáp thắc mắc (Q&A):* Nhận diện streamer đọc câu hỏi comment và trả lời nỗi lo của khách hàng.

### 3. Xử lý âm thanh (Audio Processing)

* **Giữ nguyên 100% âm thanh gốc:** Bảo toàn trọn vẹn âm thanh gốc từ buổi livestream theo đúng phân đoạn được cắt, đồng bộ khớp với hình ảnh, không can thiệp lồng tiếng mới.
  *(Lưu ý: Các phương án như lọc tạp âm hoặc lồng thêm nhạc nền sẽ được cân nhắc bổ sung sau khi chốt khảo sát thực tế).*

### 4. Cắt dựng & Chuẩn hóa khung hình (Video Trimming & Reframe)

* **Cắt video chính xác theo mốc (Precise Trimming):** Trích xuất phân đoạn highlight từ video live dài, đảm bảo liền mạch, không bị lệch âm thanh hay đứng hình.
* **Reframe dọc chuẩn TikTok (9:16):** Tự động crop/chuẩn hóa video sang tỉ lệ `1080x1920`.

### 5. Giao diện xem trước & Can thiệp nhanh (Human-in-the-Loop Web UI)

* Màn hình danh sách đề xuất: Hiển thị các clip tiềm năng mà AI đã tìm thấy.
* Trình xem trước (Quick Preview): Người dùng có thể bấm xem thử từng đoạn.
* Tích chọn nhiều clip cùng lúc để bấm: **"XUẤT BẢN CÁC CLIP ĐÃ CHỌN"**.

### 6. Đầu ra & Lưu trữ thành phẩm (Export & Storage)

* Render video chất lượng cao: Định dạng `.mp4`, tốc độ khung hình 30fps.
* Lưu trữ tập trung tại kho thành phẩm để sẵn sàng tải về.

***

## II. PHẠM VI NGOÀI DỰ ÁN (OUT-OF-SCOPE: NHỮNG GÌ HỆ THỐNG KHÔNG LÀM)

Các hạng mục sau **nằm ngoài phạm vi**:

1. **KHÔNG tự động đăng thẳng video lên TikTok mà không có người duyệt:** Hệ thống chỉ xuất video ra giao diện. Việc kiểm tra và bấm đăng do nhân sự phụ trách để tránh rủi ro vi phạm tiêu chuẩn cộng đồng của TikTok.
2. **KHÔNG thực hiện Face-swap / Deepfake thay mặt người dẫn live:** Tuân thủ 100% chính sách của Google Gemini. Giữ nguyên khuôn mặt streamer thực tế hoặc chỉ zoom vào góc quay sản phẩm/bàn tay.
3. **KHÔNG xử lý các video có chất lượng đầu vào quá tệ:** Các video livestream có độ phân giải dưới 720p, âm thanh bị rè nát tiếng hoặc micro bị hỏng không nghe được lời thoại sẽ bị từ chối xử lý để đảm bảo chất lượng đầu ra.
4. **KHÔNG bao gồm việc tối ưu quảng cáo (TikTok Ads):** Module này chỉ phục vụ sản xuất video nội dung tự nhiên (Organic Reach), không phụ trách setup chiến dịch hay tối ưu chi phí chạy ads.
5. **TẠM HOÃN Tạo phụ đề tự động (Auto Subtitles) & Dán đè tem nhãn/sticker thương hiệu:** Giai đoạn này tập trung giải quyết triệt để bài toán: AI tìm trúng mốc highlight, cắt chuẩn xác không lệch tiếng và reframe 9:16 sắc nét. Khâu phụ đề và tem nhãn sẽ do editor tự chèn hoặc triển khai ở phase sau.
6. **TẠM HOÃN Lồng tiếng AI mới (Voiceover / Redub):** Giữ nguyên 100% âm thanh gốc của buổi live, không dùng AI viết kịch bản đọc đè lên.
7. **TẠM HOÃN Tự động tạo Caption & Hashtags:** Hệ thống tập trung xuất video hoàn chỉnh, khâu viết caption đăng tải do nhân sự vận hành phụ trách.

***

## III. TIÊU CHÍ NGHIỆM THU (ACCEPTANCE CRITERIA / DEFINITION OF DONE)

Một phiên bản được coi là hoàn thành phạm vi (Done) khi đạt đầy đủ các tiêu chuẩn định lượng sau:

* [ ] **Độ chính xác cắt mốc:** Video cắt ra giữ trọn vẹn nội dung của đoạn highlight, bắt đầu và kết thúc đúng ngữ cảnh.
* [ ] **Sản lượng trích xuất:** Hệ thống đề xuất được các đoạn highlight đáp ứng được tiêu chí chọn từ khách hàng.
* [ ] **Chất lượng hiển thị (Visual Quality):** Video xuất ra chuẩn dọc 9:16 (`1080x1920 @ 30fps`).
* [ ] **Trải nghiệm người dùng:** Giao diện cho phép xem trước video nháp trước khi xuất file cuối cùng.
