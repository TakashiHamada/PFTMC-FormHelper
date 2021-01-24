function doPost (e) {
    // 記録
    var log_ss = SpreadsheetApp.openById(LOG_ID).getSheetByName("Log");
    var param = e.parameter;
    log_ss.appendRow([param.timestamp, param.user_name, param.text]);
    // --
    // 言語の決定
    var text = param.text;
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
    var name = "Vote! : " + getDateString();
    var copy = template.makeCopy(name, root);
    copy.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
    // --
    // メッセージ作成
    var message = lang === "ja" ? "作成しました!" : "Done!";
    var form = FormApp.openById(copy.getId());
    var edit = "\n[edit]\n<" + form.getEditUrl() + ">";
    var view = "\n[view]\n<" + form.getPublishedUrl() + ">";
    sendMessage(message +"\n" + edit + "\n" + view);
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

// 日時文字
function getDateString() {
    const date = new Date();
    return date.getFullYear() + "_" + (date.getMonth() + 1) + date.getDate() +
        "_" + date.getHours() + date.getMinutes() + date.getSeconds();
}