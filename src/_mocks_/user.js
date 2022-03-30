import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.random.number(),
  avatarUrl: faker.image.animals(500, 500, true),
  name: faker.name.firstName(),
  species: sample(['cat', 'dog']),
  age: faker.random.number(17),
  isSpecial: faker.datatype.boolean(),
  status: sample(['adopted', 'for adoption']),
  gender: sample(['Male', 'Female'])
}));

export default users;
