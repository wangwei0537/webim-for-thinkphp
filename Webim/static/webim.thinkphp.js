//custom
(function(webim) {
	var path = _IMC.path;
	webim.extend(webim.setting.defaults.data, _IMC.setting);
    var cookie_key = "_webim_cookie_";
	if( _IMC.is_visitor ) { cookie_key = "_webim_v_cookie_"; }
    if( _IMC.user != "" ) { cookie_key = cookie_key + _IMC.user.id; }
    webim.status.defaults.key = cookie_key;
	webim.route( {
		online: path + "Index/online",
		offline: path + "Index/offline",
		deactivate: path + "Index/refresh",
		message: path + "Index/message",
		presence: path + "Index/presence",
		status: path + "Index/status",
		setting: path + "Index/setting",
		history: path + "Index/history",
		clear: path + "Index/clear_history",
		download: path + "Index/download_history",
		buddies: path + "Index/buddies",
		remove_buddy: path + "Index/remove_buddy",
        //room actions
		invite: path + "Index/invite",
		join: path + "Index/join",
		leave: path + "Index/leave",
		block: path + "Index/block",
		unblock: path + "Index/unblock",
		members: path + "Index/members",
        //notifications
		notifications: path + "Index/notifications",
        //upload files
		upload: path + "static/images/upload.php"
	} );

	webim.ui.emot.init({"dir": path + "/static/images/emot/default"});
	var soundUrls = {
		lib: path + "/static/assets/sound.swf",
		msg: path + "/static/assets/sound/msg.mp3"
	};
	var ui = new webim.ui(document.body, {
		imOptions: {
			jsonp: _IMC.jsonp
		},
		soundUrls: soundUrls,
		//layout: "layout.popup",
        layoutOptions: {
            unscalable: _IMC.is_visitor,
            //detachable: true
            maximizable: true
        },
		buddyChatOptions: {
            downloadHistory: !_IMC.is_visitor,
			//simple: _IMC.is_visitor,
			upload: _IMC.upload && !_IMC.is_visitor
		},
		roomChatOptions: {
            downloadHistory: !_IMC.is_visitor,
			upload: _IMC.upload
		}
	}), im = ui.im;
    //全局化
    window.webimUI = ui;

	if( _IMC.user ) im.setUser( _IMC.user );
	if( _IMC.menu ) ui.addApp("menu", { "data": _IMC.menu } );
	if( _IMC.enable_shortcut ) ui.layout.addShortcut( _IMC.menu );

	ui.addApp("buddy", {
		showUnavailable: _IMC.show_unavailable,
		is_login: _IMC['is_login'],
		disable_login: true,
		collapse: false,
		//disable_user: _IMC.is_visitor,
        //simple: _IMC.is_visitor,
        //online_group: false,
		loginOptions: _IMC['login_options']
	});
    if(!_IMC.is_visitor) {
        if( _IMC.enable_room )ui.addApp("room", { discussion: (_IMC.discussion && !_IMC.is_visitor) });
        if(_IMC.enable_noti )ui.addApp("notification");
    }
    if(_IMC.enable_chatbtn) {
        ui.addApp("chatbtn", {
            elmentId: null,
            chatbox: true,
            classRe: /webim-chatbtn/,
            hrefRe: [/Index\/chatbox\?uid=(\d+)$/i]
        });
    }
    ui.addApp("setting", {"data": webim.setting.defaults.data, "copyright": true});
	ui.render();
	_IMC['is_login'] && im.autoOnline() && im.online();
})(webim);

//window.webimUI.layout.addChat('buddy', '20');
