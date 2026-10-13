# Online Test（Unit 6 Grammar Quiz）

学生がブラウザでテストを受け、先生が全員の解答・点数を見られるページです。

| ファイル | 役割 |
|---|---|
| `index.html` | 学生用のテストページ（GitHub Pages で公開） |
| `teacher.html` | 先生用の結果ページ（パスワードで保護） |
| `config.js` | Apps Script の URL を 1 か所で設定するファイル |
| `Code.gs` | Google Apps Script（採点・Google スプレッドシートへの保存・結果の返却） |

```
学生 ──(解答)──▶ index.html ──POST──▶ Apps Script (Code.gs) ──▶ Google スプレッドシート
先生 ──(パスワード)──▶ teacher.html ──POST──▶ Apps Script ──▶ 全員の解答を表示
```

答え（正解）は `Code.gs` の中だけにあり、学生のブラウザには送られません。

## セットアップ

### 1. Google スプレッドシート + Apps Script

1. Google ドライブで新しいスプレッドシートを作る。
2. メニュー **拡張機能 → Apps Script** を開き、`Code.gs` の中身をすべて貼り付けて保存。
3. 左の ⚙️ **プロジェクトの設定 → スクリプト プロパティ → プロパティを追加**
   - プロパティ: `TEACHER_PASSWORD`
   - 値: 先生用ページのパスワード（学生に知られないもの）
4. 右上 **デプロイ → 新しいデプロイ → 種類: ウェブアプリ**
   - 次のユーザーとして実行: **自分**
   - アクセスできるユーザー: **全員**
5. 表示された **ウェブアプリの URL**（`https://script.google.com/macros/s/.../exec`）をコピー。
6. その URL をブラウザで一度開くと「score sheet is ready」と出て、`Results` と `Summary` シートが作られます。

> `Code.gs` を後で変更したら、**デプロイ → デプロイを管理 → 編集 → バージョン: 新バージョン** で更新してください（URL は変わりません）。

### 2. URL を設定

`config.js` の `PASTE_YOUR_WEB_APP_URL_HERE` を、手順 1-5 の URL に書き換えてコミット。

### 3. GitHub Pages で公開

リポジトリの **Settings → Pages → Build and deployment**
- Source: **Deploy from a branch**
- Branch: `main`（このファイルがあるブランチ）/ `/ (root)` → Save

数分後に次の URL で公開されます。

- 学生用: `https://<ユーザー名>.github.io/<リポジトリ名>/`
- 先生用: `https://<ユーザー名>.github.io/<リポジトリ名>/teacher.html`

## 先生用ページでできること

- **Students 学生一覧**: 学生ごとの点数・セクション別得点。並べ替え可。行をクリックすると、その学生の全解答（正誤・正解つき）を表示。
- **All answers 全員の解答**: 学生 × 問題の表で、全員の解答を一覧（緑 = 正解、赤 = 不正解）。
- **Item analysis 問題別**: 問題ごとの正答率と、よくある誤答。
- **Show**: 1 回目のみ / 最高点 / 最新 / すべての提出 を切り替え。
- **CSV**: 表示中のデータをダウンロード（Excel で開けます）。
- 同じ結果は Google スプレッドシートの `Results` / `Summary` シートでも見られます。

## 注意

- パスワードは `Code.gs` ではなくスクリプト プロパティに保存するので、リポジトリが公開でも漏れません。
- `teacher.html` は誰でも開けますが、パスワードがないとデータは表示されません。
- 受験は 1 人 1 回のみ。**名前・学生番号・メールのどれか 1 つでも**既に提出済みなら「終了済み」と表示され、受け付けません（大文字小文字・空白の違いは同じとみなします）。
- もう一度受けさせたいときは、スプレッドシートの `Results` シートからその学生の行を削除してください。
