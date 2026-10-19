# ĐẶC TẢ PHẠM VI PHASE 1: AI LIVESTREAM-TO-SHORTS

* **Dự án:** Hệ thống Sản Xuất Video TikTok Tự Động (AI Content Factory)
* **Khách hàng / Đơn vị thụ hưởng:** Công ty TNHH TM & DV Mỹ Nguyên (Mỹ Nguyên TSC) & Mở rộng đa ngành hàng
* **Định hướng kênh:** 100% Tăng trưởng tự nhiên (Organic Reach) cho TikTok
* **Loại tài liệu:** Đặc tả Phạm vi & Kiến trúc Chức năng (Feature & Scope Specification)
* **Phiên bản:** v2.0 - Cấu trúc Quản trị theo Project (Project-Based Multi-Industry Architecture)

***

## I. PHẠM VI TRONG DỰ ÁN (IN-SCOPE: NHỮNG GÌ HỆ THỐNG SẼ LÀM)

### 1. Phân hệ Quản lý Project & Nạp dữ liệu Livestream tập trung (Project & Input Ingestion)

* **Quản trị Project theo Lĩnh vực (Domain/Niche):**
  * Cho phép tạo mới, quản lý các Project theo từng ngành hàng: Mỹ phẩm & Skincare, Đồ ăn & Thực phẩm, Thời trang, v.v. (Mỗi nhà bán hàng có thể quản lý nhiều Project tương ứng với các ngành hàng kinh doanh khác nhau).
  * Mỗi Project lưu giữ cấu hình độc lập: Bộ từ điển chuyên ngành cho ASR, phong cách kịch bản lọc highlight của Gemini, và thư viện nhạc nền (BGM) an toàn bản quyền phù hợp với ngành hàng đó.
* **Nạp dữ liệu đầu vào (Input Ingestion):**
  * Tiếp nhận file video Livestream thô hoàn chỉnh của buổi live (thời lượng từ 1 – 3 giờ) do người dùng tải lên, hỗ trợ các định dạng video chuẩn: **`.mp4`**, **`.mov`**, **`.mkv`** (dung lượng từ 1GB đến 4GB+).
* **Kho lưu trữ Livestream & Transcript dùng chung trong Project:**
  * Video livestream sau khi nạp được lưu trữ cố định vào Kho dữ liệu chung của Project (Project Workspace).
  * Toàn bộ dữ liệu bóc băng (Transcript) từ Syrix ASR được gắn vĩnh viễn với video live trong kho Project.
  * **Cơ chế tái sử dụng tài nguyên:** Khi cần trích xuất video cho các sản phẩm khác nhau hoặc các kịch bản khác nhau từ cùng một phiên live, người dùng chỉ cần chọn lại video đã có trong Project mà **không cần upload lại và không cần bóc băng lại** (bỏ qua hoàn toàn bước nạp file và ASR, tiết kiệm ngay 15–20 phút xử lý).

### 2. Cấu hình Tiêu chí Cắt, Prompt & AI Lọc mốc Bắt Hook 1–5s (AI Curation & Directives)

* **Bóc băng âm thanh (ASR - Syrix):** Tách toàn bộ lời thoại thành text + timestamp chi tiết từng từ.
* **Cấu hình Tiêu chí Cắt & Tùy biến Thư mục Chủ đề trước khi cắt:**
  * **Cung cấp sẵn bộ 4 Nhóm Kịch bản chuẩn:**
    * *Nhóm 1&#x20;*-*&#x20;Tư vấn chuyên sâu SP:* Tên SP, công dụng chính, thành phần hoạt chất, phân tích loại da & độ tuổi.
    * *Nhóm 2 - Báo giá & Khuyến mãi (Deal):* Deal sốc, voucher độc quyền, combo ưu đãi, đếm ngược chốt đơn.
    * &#x20;*Nhóm 3 - Trải nghiệm & Test mỹ phẩm:* Thoa kem/serum lên da, độ thẩm thấu, nâng tone thực tế.
    * *Nhóm 4 - Tâm sự đời thường / Kết nối:* Đời sống, câu chuyện khách hàng, chia sẻ tạo niềm tin.
  * **Tùy biến Thư mục theo nhu cầu:** Cho phép người dùng linh hoạt tích chọn chỉ cắt theo 1 vài chủ đề (ví dụ: chỉ chọn 2 nhóm Báo giá và Test SP), hoặc chỉnh sửa/thêm mới tiêu chí để phân loại thành nhiều thư mục chủ đề khác nhau cho từng đợt cắt.
  * **Ô nhập Prompt chỉ đạo bổ sung (Custom Prompt Directive):** Cung cấp khung nhập văn bản để người dùng có thể gõ thêm prompt/chỉ đạo cụ thể cho Gemini trước khi bấm cắt.
* **AI Phân tích & định vị theo đúng ngữ cảnh bắt đầu nói (Google Gemini LLM):**
  * Gemini kết hợp dữ liệu transcript, bộ tiêu chí thư mục đã cấu hình và prompt chỉ đạo bổ sung của người dùng.
  * Tự động định vị `start_time` chuẩn xác ngay đúng ngữ cảnh khi streamer bắt đầu mở lời câu Hook (trọn vẹn câu thoại, không bị nuốt chữ hay ngắt ngang câu nói) tại các điểm câu hỏi nỗi đau (pain point), câu báo giá sốc hoặc lúc bắt đầu giới thiệu sản phẩm.
  * Trả ra danh sách mốc thời gian kèm gắn nhãn chính xác vào từng thư mục chủ đề đã được cấu hình.

### 3. Cắt thô & Chuẩn hóa khung hình dọc 9:16 (Pre-cut / Rough Cut)

* **Cắt video thô nhanh theo mốc:** Trích xuất nhanh các đoạn highlight từ video live, bắt đầu chuẩn xác tại đúng thời điểm streamer bắt đầu mở câu thoại và đảm bảo liền mạch ngữ cảnh.
* **Reframe dọc chuẩn TikTok (9:16):** Tự động crop/chuẩn hóa video thô sang tỉ lệ dọc `1080x1920 @ 30fps`.
  *(Khâu này chỉ cắt video thô và giữ nguyên âm thanh gốc để sẵn sàng đưa lên giao diện cho User duyệt).*

### 4. Giao diện Xem trước, Duyệt clip & Cấu hình Hậu kỳ (Human-in-the-Loop Review Gate)

* **Danh sách đề xuất theo Project:** Hiển thị các clip thô AI vừa cắt và gắn nhãn theo các nhóm chủ đề đã cấu hình, có thể gắn thêm nhãn sản phẩm.
* **Trình xem trước clip thô (Quick Preview):** Cho phép xem video thô đã cắt từ livestream.
* **Thanh kéo cắt ngắn mốc thời gian (Fine-tune Trim Slider):** Cung cấp công cụ kéo thả điểm đầu và điểm cuối để điều chỉnh thời lượng clip.
* **Duyệt chọn clip & Cấu hình Hậu kỳ:**
  * Cho phép tích chọn hoặc bỏ chọn từng clip trước khi chuyển sang khâu hậu kỳ.
  * **Cấu hình Câu Hook Mở Đầu:**
    * Cho phép người dùng xem và chỉnh sửa câu **Text Hook**.
    * Nút gạt Toggle: **Bật/Tắt Giọng đọc AI mồi Hook (AI Voiceover 2–3s)**.
  * **Cấu hình Xử lý Âm thanh, Nhạc nền & Phụ đề (Hệ thống 3 Nút Gạt Toggle Độc Lập):**
    * **Giọng Gốc Streamer:**`[GIỮ GIỌNG / TẮT GIỌNG]`*(Mặc định: GIỮ GIỌNG)*
    * **Nhạc Nền BGM TikTok:**`[CÓ NHẠC / KHÔNG NHẠC]`*(Mặc định: CÓ NHẠC)* Lồng bài nhạc từ kho BGM 
    * **Phụ Đề Trực Tiếp (Captions):**`[BẬT / TẮT]`*(Mặc định: BẬT)&#x20;*— Tự động hiển thị phụ đề chuẩn TikTok Safe Zone.
  * **Chọn khung hình Ảnh bìa:&#x20;**&#x48;iển thị ảnh bìa đề xuất từ khung hình rõ nét nhất trong 1–5s đầu, cho phép user chọn lại khung hình ưng ý nếu muốn ngay trên trình xem trước.
* **Nút hành động:** Bấm **"Xác nhận duyệt & Tiến hành hậu kỳ"**.

### 5. Hậu kỳ tự động trên các clip đã duyệt (Automated Post-Production Engine)

Hệ thống thực hiện render hậu kỳ cho danh sách clip đã duyệt:

* **Cơ chế Ghép Hook Mở Đầu:**
  * **Về hình:&#x20;**&#x54;rích xuất khung hình đầu tiên của đoạn cắt, giữ **đóng băng hình ảnh (Freeze frame) trong 2–3 giây&#x20;**&#x6C;àm nền tĩnh (lúc này video live chưa phát), chèn dòng chữ **Text Hook to, nổi bật&#x20;**&#x1EDF; giữa màn hình.
  * **Về tiếng:&#x20;**&#x41;I Voiceover đọc nội dung câu Hook này.
  * **Chuyển tiếp:&#x20;**&#x48;ết 2–3 giây mở đầu, video live bắt đầu chuyển động và phát tiếng nói thật của streamer bình thường.
* **Chèn Phụ đề trực tiếp (Auto Burn-in Captions):**
  * Có thể Bật/Tắt Phụ đề tự động (Captions ON/OFF).
  * Render chữ phụ đề trực tiếp lên video theo timestamp chi tiết từng từ của Syrix ASR.
  * Định dạng hiển thị: Font chữ đậm, viền nét, đổ bóng, đổi màu chữ theo nhịp giọng nói.
  * Căn vị trí tại Vùng an toàn (TikTok Safe Zone) ở trung tâm phía thân dưới màn hình.
* **Xử lý âm thanh & Lồng nhạc nền (Thực thi theo 2 nút gạt):**
  * **Xử lý Giọng gốc host (****`GIỮ GIỌNG`****&#x20;/&#x20;****`TẮT GIỌNG`****):**
    * Nếu gạt `GIỮ GIỌNG`: Giữ 100% âm thanh lời thoại tự nhiên của streamer từ live gốc.
    * Nếu gạt `TẮT GIỌNG`: Mute hoàn toàn (tắt tiếng) của streamer, chỉ lấy hình ảnh chuyển động.
  * **Xử lý Nhạc nền BGM (****`CÓ NHẠC`****&#x20;/&#x20;****`KHÔNG NHẠC`****):**
    * Nếu gạt `CÓ NHẠC`: Lấy nhạc từ kho BGM của Project (hoặc file user tải lên) lồng vào video; tự động hạ nhỏ âm lượng nhạc khi streamer nói và tự tăng âm lượng khi ngắt nghỉ (*Audio Ducking*).
    * Nếu gạt `KHÔNG NHẠC`: Không chèn thêm bất kỳ file nhạc nền nào vào clip.
* **Trích xuất Ảnh bìa (Cover Thumbnail):**
  * Xuất file Ảnh bìa `.jpg` đi kèm video (từ khung hình rõ nét nhất và áp dụng khung hình do user chọn lại nếu có trên trình xem trước).

### 6. Cấu trúc Quản lý Kho Asset trong Project (Project Asset Repositories)

Hệ thống thiết lập và quản lý 5 kho tài nguyên độc lập cho từng Project:

* **1. Kho Livestream nguồn:**
  * Lưu trữ file video Livestream thô (thời lượng 1–3 giờ, định dạng `.mp4`, `.mov`, `.mkv`).
  * Lưu trữ dữ liệu bóc băng ASR (văn bản kèm timestamp chi tiết từng từ).
* **2. Kho Hook Asset Library:**
  * Lưu trữ và phân loại danh sách các câu Hook mở đầu (Text Hooks) theo từng nhóm chủ đề / góc tiếp cận (Bóc phốt/Cảnh báo, Nỗi đau khách hàng, Báo giá sốc/Deal hời, Test trải nghiệm sản phẩm, Tò mò/Bí mật...).
  * Quản lý danh sách mẫu câu Hook của Project, cho phép người dùng thêm mới, chỉnh sửa, lưu trữ các câu Hook trên giao diện duyệt clip.
* **3. Kho Video chưa hậu kỳ / Video thô (Pre-cut / Raw Clips Storage):**
  * Lưu trữ các clip highlight dọc 9:16 vừa cắt thô từ live theo mốc AI đề xuất.
  * Giữ nguyên âm thanh gốc của livestream, chưa chèn phụ đề, chưa ghép BGM.
  * Phân loại theo Tên sản phẩm / Chủ đề.
  * Dùng phục vụ màn hình xem nháp, cắt ngắn thời lượng (Trim) và duyệt clip.
* **4. Kho Video thành phẩm / Đã hậu kỳ (Post-produced Final Video Storage):**
  * Lưu trữ các video hoàn chỉnh sau khi hoàn tất render hậu kỳ (định dạng `.mp4`, tỉ lệ 9:16, `1080x1920 @ 30fps`, có phụ đề và âm thanh theo cấu hình đã duyệt).
  * *Mỗi video đi kèm 01 file Ảnh bìa**`.jpg`**&#x20;**(từ khung hình rõ nét nhất và cho phép user chọn lại khung hình ưng ý nếu muốn ngay trên trình xem trước).*
  * Tự động phân loại và lưu trữ vào các thư mục theo đúng cấu hình chủ đề của người dùng (mặc định theo 4 nhóm kịch bản chuẩn, hoặc 2, 5 nhóm tùy chọn theo cấu hình):
    * **Nhóm 1 - Tư vấn chuyên sâu SP**
    * **Nhóm 2 - Báo giá & Khuyến mãi (Deal)**
    * **Nhóm 3 - Trải nghiệm & Test mỹ phẩm**
    * **Nhóm 4 - Tâm sự đời thường / Kết nối**
      *(hoặc các thư mục chủ đề tùy biến do người dùng tạo lập)*.
* **5. Kho Nhạc nền (BGM Library):**
  * Lưu trữ các file nhạc nền theo phong cách của Project.
  * Lưu trữ các file âm thanh/nhạc do người dùng tải lên.

***

## II. PHẠM VI NGOÀI DỰ ÁN (OUT-OF-SCOPE: NHỮNG GÌ HỆ THỐNG KHÔNG LÀM TRONG PHASE 1)

Các hạng mục nằm ngoài phạm vi Phase 1:

1. **KHÔNG tự động đăng video lên TikTok:** Hệ thống xuất video vào kho thành phẩm, không tự động đăng lên kênh.
2. **KHÔNG thực hiện Face-swap / Deepfake:** Giữ nguyên hình ảnh streamer thực tế.
3. **KHÔNG xử lý video đầu vào dưới chuẩn:** Từ chối xử lý video có độ phân giải dưới 720p hoặc âm thanh hỏng không nhận diện được giọng nói.
4. **KHÔNG quản lý hoặc tối ưu quảng cáo (TikTok Ads):** Không thiết lập chiến dịch hay chi phí quảng cáo.
5. **KHÔNG quét hoặc cấp phép nhạc thương mại có bản quyền:** Chỉ sử dụng kho BGM của Project hoặc file người dùng tự nạp.
6. **KHÔNG lồng tiếng AI toàn phần:&#x20;**&#x48;ệ thống chỉ ứng dụng giọng đọc AI ngắn cho riêng câu Hook mở đầu; tuyệt đối không tạo giọng đọc AI giả lập để đọc thay thế toàn bộ lời thoại của streamer trong suốt video.
7. **KHÔNG tự động tạo Caption và Hashtags đăng bài:** Không sinh tự động nội dung văn bản bài đăng TikTok.

***

## III. TIÊU CHÍ NGHIỆM THU (ACCEPTANCE CRITERIA)

Một phiên bản được coi là hoàn thành phạm vi (Done) khi đạt các tiêu chuẩn định lượng sau:

* [ ] **Quản trị Project & 5 Kho Asset:** Cho phép tạo và quản lý độc lập các Project theo lĩnh vực; lưu trữ và phân loại đầy đủ 5 kho asset (Kho Live & Transcript, Kho Câu Hook, Kho Video chưa hậu kỳ, Kho Video thành phẩm theo các thư mục kịch bản, Kho nhạc nền).
* [ ] **Cấu hình Tiêu chí Cắt & Custom Prompt:** Cho phép tùy chọn hoặc thêm/bớt số lượng thư mục chủ đề (từ 2 đến 5+ thư mục) và nhập prompt bổ sung để chỉ đạo Gemini trước khi bấm cắt.
* [ ] **Độ chính xác cắt mốc theo ngữ cảnh:** Video cắt bắt đầu đúng thời điểm streamer bắt đầu nói (đúng ngữ cảnh mở đầu câu, trọn vẹn câu thoại, không bị nuốt chữ hay ngắt ngang giữa chừng) và kết thúc trọn vẹn ý.
* [ ] **Sản lượng trích xuất:** Đề xuất các clip highlight theo tiêu chí cắt.
* [ ] **Giao diện duyệt clip:** Có tính năng xem trước video thô, thanh trượt Trim thời lượng, ô xem/sửa và chọn câu Hook từ Kho Hook. Cung cấp đủ 3 công tắc gạt độc lập: Giọng gốc (GIỮ GIỌNG / TẮT GIỌNG), Nhạc nền (CÓ NHẠC / KHÔNG NHẠC), Phụ đề (BẬT / TẮT).
* [ ] **Xử lý âm thanh theo Toggle:** Thực thi chính xác theo trạng thái 2 nút gạt âm thanh của người dùng (hỗ trợ tắt tiếng streamer khi cần và tự động hạ âm lượng BGM khi có tiếng streamer nói).
* [ ] **Định dạng video xuất xưởng:** Chuẩn dọc 9:16 (`1080x1920 @ 30fps`).
* [ ] **Phụ đề trực tiếp:** Render phụ đề chuẩn khớp timestamp, hiển thị trong TikTok Safe Zone.
* [ ] **Cơ chế Hook mở đầu:** Render đoạn Hook đầu (khung hình tĩnh + AI đọc câu hook + hiển thị Text Hook) trước khi video live phát chuyển động.
* [ ] **Tài nguyên đầu ra:** Mỗi clip hoàn chỉnh đi kèm file video `.mp4` và file ảnh bìa `.jpg` (từ khung hình rõ nét nhất và cho phép user chọn lại khung hình ưng ý nếu muốn ngay trên trình xem trước), lưu đúng vào các thư mục chủ đề đã cấu hình.

***

## IV. GIẢ LẬP THỜI GIAN XỬ LÝ CHO 1h LIVE (Còn điều chỉnh dựa theo theo VM Syrix)

Phần này cung cấp bảng giả lập thời gian xử lý thực tế cho từng bước trong quy trình xử lý livestream (từ khi nạp file đến khi xuất thành phẩm).

*(Quy tắc nhân rộng: Với buổi live dài hơn, các khâu tải file & ASR sẽ nhân theo thời lượng; các khâu AI Lọc và Duyệt UI thời gian gần như không đổi. Dung lượng video live tải về thực tế: YouTube tải về \~900MB – 1GB (cho video có hoạt ảnh liên tục, thời lượng 1h mode 1080p), TikTok Live Replay tải về \~1.2GB–1.8GB.*

| **Bước trong quy trình**              | **Bản chất kỹ thuật & Tác vụ**                                        | **Thời lượng (1h Live)**                      | **Tỷ trọng (%)** |
| ------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------- | ---------------- |
| **Bước 1: Nạp file Live**             | Tải video live đã tải về (\~1GB) lên hệ thống                         | 1 – 2 phút                                    | \~5 – 8%         |
| **Bước 2: Lấy Transcript từ ASR thô** | Syrix ASR nhận diện tiếng nói ra text + timestamp thô                 | **11 – 16 phút**                              | **\~70 – 75%**   |
| **Bước 3: LLM Xử lý & Lọc Highlight** | Gemini làm sạch hội thoại thô & trích xuất mốc                        | **1 – 3 phút**                                | **\~8 – 12%**    |
| **Bước 4: Cắt & Reframe 9:16**        | Trích xuất & crop dọc 9:16 (5–8 clip/live)                            | 30 – 45s / clip \~ 3 – 5 phút (tổng 5–8 clip) | \~15 – 20%       |
| **TỔNG THỜI GIAN XỬ LÝ**              | **Hệ thống tự động xử lý từ file thô đến khi ra 5–8 clip hoàn chỉnh** | **\~ 16 – 25 phút**                           | **100%**         |

 
