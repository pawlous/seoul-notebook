# 首爾散步手帳

2026/10/13–10/17 的首爾參考行程。手機友善介面、建議時段、Naver 地圖連結及可編輯備註。

未登入時，備註儲存在目前瀏覽器的 localStorage。登入後使用 Supabase 雲端備註，每個帳號只可存取自己的資料。其他裝置登入同一帳號後重新載入即可讀取最新內容；同一行程同時編輯採最後儲存的內容。

「匯入此裝置備註」只新增雲端沒有的行程備註，不覆蓋既有雲端內容，也不刪除裝置原始資料。原 Sites 網站的雲端備註不會自動轉移。

## Supabase setup

1. 在專案 SQL Editor 執行 `supabase/setup.sql`，建立資料表、啟用 RLS 與個人資料權限。
2. 在 Authentication → Users → Add user → Create new user 建立自己的 Email／密碼帳號。若有 Auto Confirm User 選項，勾選以直接啟用自己建立的帳號；不需設定寄信服務。密碼只在 Supabase 後台與網站登入表單輸入。
3. 回到網站登入，並在有舊備註的裝置選擇匯入。

`lib/supabase.ts` 只包含可公開的 project URL 與 publishable key。不得加入 secret key 或 service role key。資料隔離依賴 SQL 中的 RLS；發布前後應驗證不同帳號的隔離。

## Development

Node.js 24: `npm ci`, then `npm run dev`. Run `npm run build` for the static site. GitHub Actions deploys the `dist` directory on pushes to main.

## Photo credit

[Dongdaemun Design Plaza & Park](https://commons.wikimedia.org/wiki/File:Dongdaemun_Design_Plaza_%26_Park_-_13461828345.jpg) by Nestor Lacle, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). Displayed cropped.
