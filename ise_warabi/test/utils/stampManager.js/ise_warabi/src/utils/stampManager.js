const stampsKey = 'userStamps';

export const addStamp = () => {
  const currentStamps = JSON.parse(localStorage.getItem(stampsKey)) || 0;
  const newStamps = currentStamps + 1;
  localStorage.setItem(stampsKey, JSON.stringify(newStamps));
  return newStamps;
};

export const getStamps = () => {
  return JSON.parse(localStorage.getItem(stampsKey)) || 0;
};

export const hasFiveStamps = () => {
  return getStamps() >= 5;
};

export const resetStamps = () => {
  localStorage.removeItem(stampsKey);
};