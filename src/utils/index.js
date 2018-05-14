'use strict';

// @flow

import type { Gender } from 'types';
const imageMenURI = 'https://randomuser.me/api/portraits/men/$.jpg';
const imageWomenURI = 'https://randomuser.me/api/portraits/women/$.jpg';

const getRandomNumber = () =>
  String(parseInt(Math.floor(Math.random() * 100).toFixed(2)));

const generateRandomAvatar = (gender: Gender) => {
  switch (gender) {
    case 'Men':
      return imageMenURI.replace('$', getRandomNumber());
    case 'Women':
      return imageWomenURI.replace('$', getRandomNumber());
  }
};

export { generateRandomAvatar };
