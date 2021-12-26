// 生成验证码
export function createCanvas(value, dom, imgUrl, loadedCb) {
  // 创建canvas
  const tempArr = value.split(""); // 字符串转数组
  const canvasStr = tempArr.join(" "); // 数组转字符串
  const canvas = dom; // 获取canvas
  const ctx = canvas.getContext("2d"); // 获取canvas的上下文
  const x = canvas.width / 2; // 获取canvas的宽度
  const oImg = new Image(); // 创建图片对象
  oImg.src = imgUrl; // 设置图片路径
  oImg.width = 120; // 设置图片宽度
  oImg.width = 40; // 设置图片高度
  oImg.onload = function() {
    // 图片加载完成后
    loadedCb && typeof loadedCb === "function" && loadedCb(); // 回调
    const pattern = ctx.createPattern(oImg, "repeat"); //在指定的方向内重复指定的元素
    ctx.fillStyle = pattern; //填充绘画的颜色
    ctx.fillRect(0, 0, canvas.width, canvas.height); // 填充矩形
    ctx.textAlign = "center"; // 文字居中
    ctx.fillStyle = "	#DC143C"; // 设置字体颜色
    ctx.font = "26px Roboto Slab"; // 设置字体
    ctx.setTransform(1, -0.12, 0.2, 1, 0, 0); // 设置倾斜角度
    ctx.fillText(canvasStr, x, 40); //  绘制文字
  };
}
