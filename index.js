const IOST = require("iost");
const bs58 = require("bs58");

// init iost sdk
const iost = new IOST.IOST({
  // will use default setting if not set
  gasRatio: 1,
  gasLimit: 4000000,
  delay: 0,
  expiration: 90,
});
// http://18.209.137.246:30001   http://54.180.196.80:30001 https://iost.mytokenpocket.vip
// const rpc = new IOST.RPC(new IOST.HTTPProvider('http://api.iost.io'));
const rpc = new IOST.RPC(new IOST.HTTPProvider("http://api.iost.io"));

iost.setRPC(rpc);

// init admin account
const account = new IOST.Account("");
// 创建密钥对
const privateKey = "";
const kp = new IOST.KeyPair(bs58.decode(privateKey));
account.addKeyPair(kp, "owner");
account.addKeyPair(kp, "active");

iost.setAccount(account);
var ix = 0;
for (let i = 0; i < 500; i++) {
  const tx = iost.callABI(
    "Contract6vU3ZWL57jQeFpbuqUxQfL5PGeFJekWrDG2WVGjWqrKx",
    "mint",
    ["iOSI", "1000"]
  );
  tx.addApprove('iost', 10)
  account.signTx(tx);

  // 发送交易
  rpc.transaction
    .sendTx(tx)
    .then((res) => {
      ix++;
      console.log(`当前第${ix}次aaa`);
      console.log("成功响应aaa：", res);
    })
    .catch((err) => {
      console.log("失败响应aaa：", err);
    });
    delay(3000);
}
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
