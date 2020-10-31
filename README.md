# PFTMC-FromHelper
## 概要
SlackのメッセージをGoogleのサーバで受け取り、Googleフォームを作成して、そのURLをSlackに通知するツールです。

## 環境について
Google Apps Scriptのプロジェクトです。  
Claspを使ってローカルで開発を行います。

## 無視ファイルについて
SlackやGoogleDriveの秘密のキーを公開情報にしないように、パラメータファイルを無視しています。

パラメータは以下のとおりです。適当に宣言をしてください。

```
const LOG_ID = "";
const SLACK_ID = "";
const TEMPLATE_JA = "";
const TEMPLATE_EN = "";
const ROOT_FOLDER = "";
```

## デバッグ用
```
if (!e) {
    //デバッグ用
    e = {
        parameter : {
            token : "???",
            team_id : "T0001",
            channel_id : "C0ZBA510W",
            channel_name : "test",
            timestamp : "1475517523.000005",
            user_id : "U2147483697",
            user_name : "hamada",
            text : "テスト",
            trigger_word : "MyFirstBot:"
        }
    };
}
```