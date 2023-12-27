//匹配url host正则  http://10.20.80.124:8011/
export const hostPattern = /^http(s)?:\/\/(.*?)\//;

//匹配url parameters正则  /rbac/login/loginDetail
export const parametersPattern = /\/[A-Za-z0-9-_\/]*(?=\?|$)/;

//匹配url parameters最后一段正则  /loginDetail
export const parametersLastPattern = /\/([A-Za-z0-9-_]+)(?=\?|$)/;

//匹配url parameters rbac接口
export const rbacPattern = /\/rbac\//;

//座机号
export const phonePattern = /^(\d{3,4}\-){1}(\d)+(\(\d+\))?$/;

//手机号
export const mobilePattern = /^1\d{10}$/;

//特殊字符
export const specialCharactersPattern = /[\s~#|【】· {}+=*^&%$@!.,，。<>;:：；‘’“”'"?`]/;
