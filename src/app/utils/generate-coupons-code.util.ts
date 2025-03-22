export function generateCouponCode(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let couponCode = '';
    for (let i = 0; i < length; i++) {
      couponCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return couponCode;
  }
  