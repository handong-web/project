import Vue from 'vue'
var comsys = {
  install(Vue) {
    Vue.prototype.comsys = {
      // 不能为空
      notNull(value, element) {
        return value == null || value.trim() == ""
      },
      //数字
      onlyNumber(value, element) {
        var rex = /^-?\d+$/
        return rex.test(value);
      },
      //邮箱
      email(value, element) {
        var rex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        return rex.test(value);
      },
      //身份证号码
      IDCard(value, element, param) {
        var rex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|x)$)/;
        return rex.test(value);
      },
      //手机号码
      phone(value, element, param) {
        var rex = /^1[345789]\d{9}$/;
        return rex.test(value);
      },
      //QQ号
      qq(value, element, param) {
        var rex = /^[1-9][0-9]{4,10}$/;
        return rex.test(value);
      },
      //密码强度 (最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符)
      passWord(value, element, param) {
        var rex = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        return rex.test(value);
      },
    };

  }
}
Vue.use(comsys);
