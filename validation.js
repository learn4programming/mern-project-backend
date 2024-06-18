const Joi = require("joi");

// 有人要註冊的話要經過registerValidation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(6).max(50).required().messages({
      "string.base": "用戶名稱必須是文字",
      "string.empty": "用戶名稱不能為空",
      "string.min": "用戶名稱最少要有6個字元",
      "string.max": "用戶名稱最多可以有50個字元",
      "any.required": "用戶名稱是必填項",
      "string.alphanum": "用戶名稱只能使用 a-zA-Z0-9",
    }),
    email: Joi.string().max(50).required().email().messages({
      "string.base": "電子郵件必須是文字",
      "string.empty": "電子郵件不能為空",
      "string.email": "無效的電子郵件格式",
      "any.required": "電子郵件是必填項",
    }),
    password: Joi.string().min(6).max(255).required().messages({
      "string.base": "密碼必須是文字",
      "string.empty": "密碼不能為空",
      "string.min": "密碼最少要有6個字元",
      "string.max": "密碼最多可以有255個字元",
      "any.required": "密碼是必填項",
    }),
    role: Joi.string().required().valid("student", "instructor").messages({
      "string.empty": "身份不能為空",
      "any.only": '身份只能是 "student" 或 "instructor"',
      "any.required": "身份是必填項",
    }),
  });

  // 使用validate檢查 schema 輸入的資料是否符合格式，回傳true/false
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().max(50).required().email().messages({
      "string.base": "電子郵件必須是文字",
      "string.empty": "電子郵件不能為空",
      "string.email": "無效的電子郵件格式",
      "any.required": "電子郵件是必填項",
    }),
    password: Joi.string().min(6).max(255).required().messages({
      "string.base": "密碼必須是文字",
      "string.empty": "密碼不能為空",
      "string.min": "密碼最少要有6個字元",
      "string.max": "密碼最多可以有255個字元",
      "any.required": "密碼是必填項",
    }),
  });
  return schema.validate(data);
};

const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(50).required().messages({
      "string.base": "標題必須是文字",
      "string.empty": "標題不能為空",
      "string.min": "標題最少要有6個字元",
      "string.max": "標題最多可以有50個字元",
      "any.required": "標題是必填項",
    }),
    description: Joi.string().min(6).max(50).required().messages({
      "string.base": "描述必須是文字",
      "string.empty": "描述不能為空",
      "string.min": "描述最少要有6個字元",
      "string.max": "描述最多可以有50個字元",
      "any.required": "描述是必填項",
    }),
    price: Joi.number().min(1).max(9999).required().messages({
      "number.base": "價格必須是數字",
      "number.min": "價格不得低於1元",
      "number.max": "價格上限為9999元",
      "any.required": "價格是必填項",
    }),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidation = courseValidation;
