# Hướng dẫn cập nhật nội dung Memora

## Cài đặt cần thiết

### Node.js (bắt buộc — chỉ cài 1 lần)

1. Truy cập **https://nodejs.org**
2. Tải bản **LTS** (nút bên trái, màu xanh lá)
3. Chạy file cài đặt, bấm Next liên tục
4. Kiểm tra cài thành công: mở Terminal / Command Prompt, gõ:
   ```
   node --version
   ```
   Nếu hiện `v20.x.x` hoặc cao hơn là thành công.

---

## Cấu trúc thư mục

```
memora/
├── index.html       ← Giao diện app (không cần chỉnh)
├── kh1-5.json       ← File nội dung (BẠN CHỈNH Ở ĐÂY)
├── kh1-5.enc        ← File mã hoá (tự động tạo lại sau bước 3)
└── encrypt.js       ← Script mã hoá (không cần chỉnh)
```

---

## Quy trình cập nhật nội dung

### Bước 1 — Mở file nội dung

Mở file `kh1-5.json` bằng bất kỳ trình soạn thảo nào (Notepad, VS Code, ...).

### Bước 2 — Chỉnh sửa nội dung

Mỗi mục trong file có cấu trúc:

```json
{
  "id": "1",
  "keyword": "Kh 1:1",
  "topic": "Khải Huyền 1",
  "hints": [
    "Gợi ý thứ nhất.",
    "Gợi ý thứ hai.",
    "Gợi ý thứ ba."
  ],
  "content": "Nội dung đầy đủ của câu này."
}
```

| Trường | Ý nghĩa |
|--------|---------|
| `keyword` | Tiêu đề thẻ (ví dụ: "Kh 1:1") |
| `topic` | Nhóm/chương (dùng để lọc) |
| `hints` | Danh sách gợi ý, mỗi gợi ý là một dòng trong `[...]` |
| `content` | Nội dung hiện ra khi lật thẻ |

**Thêm mục mới:** Copy một khối `{ ... }`, dán vào cuối danh sách (trước dấu `]`), sửa nội dung. Nhớ thêm dấu phẩy `,` sau khối trước nó.

**Xoá mục:** Xoá cả khối `{ ... }` kèm dấu phẩy phía trước.

### Bước 3 — Mã hoá lại

Sau khi lưu file `kh1-5.json`, mở Terminal / Command Prompt trong thư mục `memora/` và chạy:

```
node encrypt.js MẬT-KHẨU-CỦA-BẠN
```

> Ví dụ: `node encrypt.js 144000`

Kết quả thành công trông như sau:
```
✅ Done: kh1-5.json → kh1-5.enc
   Salt: 4f8a5874...
   Size: 55701 bytes
```

File `kh1-5.enc` sẽ được tạo mới tự động — **app dùng file này**, không phải file `.json`.

### Bước 4 — Kiểm tra

Mở lại `index.html` trên trình duyệt, nhập mật khẩu, xác nhận nội dung mới đã hiển thị.

---

## Mở Terminal trong đúng thư mục

### macOS
Chuột phải vào thư mục `memora` → **New Terminal at Folder**
(hoặc mở Terminal rồi gõ `cd ` rồi kéo thả thư mục vào)

### Windows
Vào thư mục `memora` trong File Explorer → nhấn vào thanh địa chỉ → gõ `cmd` → Enter

---

## Lưu ý quan trọng

- **Không xoá file `kh1-5.json`** — đây là file nguồn bạn chỉnh sửa.
- **Không chia sẻ file `kh1-5.json`** — file này chứa toàn bộ nội dung dạng thô.
- File `kh1-5.enc` có thể chia sẻ tự do — không đọc được nếu không có mật khẩu.
- **Mỗi lần sửa `kh1-5.json` phải chạy lại Bước 3** để cập nhật file mã hoá.
- Script `encrypt.js` không lưu mật khẩu vào đâu — bạn nhập trực tiếp khi chạy.
