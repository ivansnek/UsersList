'use strict';

// @flow

import type { Gender } from 'types';
const imageMenURI = 'https://randomuser.me/api/portraits/men/$.jpg';
const imageWomenURI = 'https://randomuser.me/api/portraits/women/$.jpg';
const KITTEN_IMAGE = 'https://placekitten.com/300/300';

const getRandomNumber = () =>
  String(parseInt(Math.floor(Math.random() * 100).toFixed(2)));

const getAvatar = (id: string, gender: Gender) => {
  if (id === 'ADMIN') return KITTEN_IMAGE;
  switch (gender || 'Men') {
    case 'Men':
      return imageMenURI.replace('$', id);
    case 'Women':
      return imageWomenURI.replace('$', id);
  }
};

const hashCode = (value: string): string => {
  let hash: any = 0,
    index: number,
    character: string;
  if (value.length === 0) return hash;
  for (index = 0; index < value.length; index++) {
    character = value.charCodeAt(index);
    hash = (hash << 5) - hash + character;
    hash |= 0;
  }
  return String(Math.abs(hash));
};

export { getAvatar, getRandomNumber, hashCode };
