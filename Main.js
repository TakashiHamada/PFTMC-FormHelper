function doPost (e) {
    // 記録
    // --
    // 言語の決定
    var text = e.parameter.text;
    var lang = -1 !== text.indexOf("フォーム作成") ? "ja" 
        : -1 !== text.indexOf("MAKE FORM") ? "en" 
            : null;
    // 例外
    if (lang === null) {
        sendMessage("該当するコマンドが見つかりませんでした… 会場チャンネルのトピックに記載のコマンドを確認してください");
        return;
    }
    // フォーク作成には時間がかかるので、ひとまず反応
    sendMessage(lang == "ja" ? "フォームを作成しています、少々お待ち下さい..."
        : "Please wait a moment to create the form...");
    // --
    // テンプレートの取得
    var template = DriveApp.getFileById(lang === "ja" ? TEMPLATE_JA : TEMPLATE_EN);
    // 複製
    var root = DriveApp.getFolderById(ROOT_FOLDER);
    var name = "hoge";
    var copy = template.makeCopy(name, root);
    // --
    var message = lang === "ja" ? "作成しました!" : "Done!";
    var url = copy.getUrl();
    sendMessage(message + "\n<" + url + ">");
}

// 送信部
function sendMessage (answer) {
    var jsonData = {
        "text" : answer
    };
    var payload = JSON.stringify(jsonData);
    var options = {
        "method" : "post",
        "contentType" : "application/json",
        "payload" : payload
    };
    UrlFetchApp.fetch("https://hooks.slack.com/services/" + SLACK_ID, options);
}
