$(function () {
    clickChange();
    dataBase();
    checkBox();
    judgeInputContent();
    judgeLoginInputContent();
    login_success();
});
var all_user_data = $(".all-user-info").find(".user-info-form").find(".table-striped");

/*计算数据总量*/
var dataBase = function () {
    /*计算车友信息的数量*/
    var car_friend_num = $(".all-user-info").find(".user-info-form").find(".table-striped").find("tbody").find("tr").length;
    var am_cf = $(".total-car-friend-num");
    am_cf.val('共 '+(car_friend_num)+'条记录 ');
};

/*实现点击切换*/
var clickChange = function () {
    /*获得登录的两个需要点击的区块*/
    var login_button_01  = $("#sidebar-login");
    var login_button_02 = $(".header-login-box");

    /*获得注册的两个需要点击的区块*/
    var signUp_button_01 = $("#sidebar-sign-up");
    var signUp_button_02 = $(".header-logup-box");

    /*个人资料点击区块*/
    var personal_info = $("#sidebar-personal-info");

    /*车友信息点击区块*/
    var user_info = $("#sidebar-user-info");

    /*帮助页点击区块*/
    var help_page_button = $("#sidebar-help-page");

    /*获得侧边栏所有内容*/
    var sidebar = $(".right-side").find(".right-side-content ");

    /*获取登录界面*/
    var log_in_page = $(".log-up");

    /*获取注册界面*/
    var sign_up_page = $(".log-in");

    /*获取个人资料界面*/
    var personal_info_page = $(".personal-info");

    /*获取车友信息界面*/
    var car_friend_info_page = $(".all-car-friend-infos");

    /*获取帮助界面*/
    var help_page = $(".help");

    /*登录切换*/
    login_button_01.on("click",function () {
        sidebar.removeClass("active");
        sidebar.addClass("hidden");
        log_in_page.removeClass("hidden");
        log_in_page.addClass("active")
    });
    login_button_02.on("click",function () {
        sidebar.removeClass("active");
        sidebar.addClass("hidden");
        log_in_page.removeClass("hidden");
        log_in_page.addClass("active")
    });
    /*注册切换*/
    signUp_button_01.on("click",function () {
        sidebar.removeClass("active");
        sidebar.addClass("hidden");
        sign_up_page.removeClass("hidden");
        sign_up_page.addClass("active")
    });
    signUp_button_02.on("click",function () {
        sidebar.removeClass("active");
        sidebar.addClass("hidden");
        sign_up_page.removeClass("hidden");
        sign_up_page.addClass("active")
    });
    /*个人信息切换*/
    personal_info.on("click",function () {
        sidebar.removeClass("active");
        sidebar.addClass("hidden");
        personal_info_page.removeClass("hidden");
        personal_info_page.addClass("active")
    });

    /*车友信息切换*/
    user_info.on("click",function () {
        sidebar.removeClass("active");
        sidebar.addClass("hidden");
        car_friend_info_page.removeClass("hidden");
        car_friend_info_page.addClass("active")
    });

    /*帮助页切换*/
    help_page_button.on("click",function () {
        sidebar.removeClass("active");
        sidebar.addClass("hidden");
        help_page.removeClass("hidden");
        help_page.addClass("active")
    });
};

/*实现删除整行的函数*/
var Delete = function (e) {
    var wait_delete = e.parentNode.parentNode.parentNode.parentNode.parentNode;
    wait_delete.parentNode.removeChild(wait_delete);
    dataBase();
};

/*实现删除所有数据的函数*/
var Delete_All = function () {
    var all_data = $(".all-user-info").find(".user-info-form").find(".table-striped");
    all_data.remove();
    dataBase();
};

/*恢复所有的数据*/
var restore_allData = function () {
    var all_data_parent = $(".all-user-info").find(".user-info-form");
    all_data_parent.append(all_user_data);
    dataBase();
};

/*弹出输入框供用户输入信息*/
var disp_prompt = function () {
    var input_info_box = $(".plus-info");
    input_info_box.removeClass("hidden");
    input_info_box.addClass("active");
};

/*添加信息完成后点击确定按钮弹出框消失*/

var box_hidden = function () {
    var inputBox_content = $(".plus-info");
    inputBox_content.removeClass("active");
    inputBox_content.addClass("hidden");
    //增加车量信息
    var cardata={
        name:" ",
        nickname:" ",
        platenumber:" ",
        occupation:" ",
        drage:"",
        age:"",
        brand:"",
        money:"",
        color:"",
        gender:""
    };
    cardata.brand=$("input[name='brand']:checked").val();
    cardata.name=$("#input-name").val();
    cardata.nickname=$("#input-nickName").val();
    cardata.platenumber=$("#input-placeNumber").val();
    cardata.occupation=$("#input-occupation").val();
    cardata.drage=$("#input-drive-age").val();
    cardata.age=$("#input-age").val();
    cardata.money=$("#input-cost").val();
    cardata.color=$("#input-color").val();
    cardata.gender=$("#input-type").val();
    $.ajax({
        url: "http://127.0.0.1:8081/restcar",
        type: "post",
        dataType:"json",
        data: cardata,
        async: false,
        success: function (resp) {
            console.log(resp);
        },
        error: function (resp) {
            console.log(resp);
        }
    });

};

/*单选框全选*/
var all_check = function () {
    var select_box = $(".user-info-table").find("tbody").find(".checkbox").children();
    select_box.prop("checked","checked");
};

/*全不选*/
var title_id_checkbox = $(".table-check").children();
var all_not_check = function () {
    var select_box = $(".user-info-table").find("tbody").find(".checkbox").children();
    select_box.prop("checked",false);
};

/*在全选与全不选之前切换*/
var checkBox = function () {
    var click_time = 0;
    title_id_checkbox.on("click",function () {
        click_time++;
        console.log(click_time);
        if (click_time % 2 == 0){
            all_not_check();
        }
        else{
            all_check();
        }
    });
};
/*登陆成功提示*/
var login_success = function () {
    $("#loginButtonParentBox").click(function () {
        alert("登陆成功!");
    });
};
/*登录内容判断    不能为空*/
var judgeLoginInputContent = function () {
    /*获取登录点击按钮*/
    var getLogIn_BUTTON = $(".am-btn-primary");
    /*获取登录各个框*/
    var $getLoginName = $("#login-name");
    changeBorderColor($getLoginName);
    var $getLoginPwd = $("#login-user-password");
    changeBorderColor($getLoginPwd);
};
/*注册内容判断    不能为空*/
var judgeInputContent = function () {
    /*获取注册点击按钮*/
    var getSignIN_button = $(".login-group").find(".log-up");
    /*获取注册各个框*/
    var $getName = $("#user-name");
    changeBorderColor($getName);
    var getNick_name = $("#nick-name");
    changeBorderColor(getNick_name)
    var getPlateNumber = $("#user-plateNumber");
    changeBorderColor(getPlateNumber)
    var getEmail = $("#user-email");
    changeBorderColor(getEmail)
    var getPhoneNumber = $("#user-phone");
    changeBorderColor(getPhoneNumber)
    var getQQ = $("#user-QQ");
    changeBorderColor(getQQ);
    var getPwd_first = $("#user-password");
    changeBorderColor(getPwd_first)
    var getPwd_confirm = $("#confirm-password");
    /*判断两次输入的密码是否一致*/
    getPwd_confirm.blur(function () {
        if (getPwd_confirm.val() != getPwd_first.val()){
            alert("两次输入的密码不一致");
            getPwd_confirm.val("");
        }else if (getPwd_confirm.val() == getPwd_first.val()){
            getPwd_confirm.css({
                "border": "1px solid #00CC00"
            })
        }else if (getPwd_confirm.val() == ""){
            alert("请再次确认密码");
            getPwd_confirm.css({
                "border": "1px solid red"
            })
        }
    });
};
/*根据是否输入为空改变边框颜色*/
var changeBorderColor = function (e) {
    e.blur(function () {
        if (e.val() == ""){
            e.css({
                "border": "1px solid red"
            })
        }else{
            e.css({
                "border": "1px solid #00CC00"
            })
        }
    });
};


