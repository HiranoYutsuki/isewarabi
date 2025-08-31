// スタンプ数をlocalStorageで管理
export function getStampCount() {
  return parseInt(localStorage.getItem('stampCount') || '0', 10);
}

export function addStamp() {
  const current = getStampCount();
  if (current >= 5) return; // 最大5個まで
  localStorage.setItem('stampCount', current + 1);
}

export function resetStamp() {
  localStorage.setItem('stampCount', 0);
}