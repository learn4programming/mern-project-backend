const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    mixlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    mixlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// instance methods
userSchema.methods.isStudent = function () {
  return this.role == "student";
};
userSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};

userSchema.methods.comparePassword = async function (
  password,
  callbackFunction
) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return callbackFunction(null, result);
  } catch (e) {
    return callbackFunction(e, result);
  }
};

// mongoose middlewares
// 若使用者為新用戶，或是正在更改密碼，則將密碼進行雜湊處理
// 這邊使用 async function才可以抓到this是甚麼
// 如果使用async arrow function才可以抓到this是甚麼，如果使用async則無法
userSchema.pre("save", async function (next) {
  // this 代表mongoDB內的 document
  // 在mongoose裡面有內建屬性
  // this.isNew確認帳號是否為新，this.isModified確認密碼是否被更改過
  if (this.isNew || this.isModified("password")) {
    // 將密碼進行雜湊處理
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
