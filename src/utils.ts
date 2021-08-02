export let uniqId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const allowedImgType = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/bmp",
];
