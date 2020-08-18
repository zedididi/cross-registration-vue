/**
 * 对手机号进行判断
 */
export function isPhone(phone) {
    const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (phoneReg.test(phone)) {
      return true;
    } else {
      return false;
    }
  }