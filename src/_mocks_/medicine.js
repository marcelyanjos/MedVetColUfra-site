import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const data = [
  {
    id: 1,
    drugName: 'Meloxicam',
    type: 'Analgésico',
    minPrize: 19.9,
    maxPrize: 32.9,
    qtdStorage: 54,
    qtdEssencial: 79
  },
  {
    id: 2,
    drugName: 'Furolisin',
    type: 'Anti-inflamatório',
    minPrize: 16.2,
    maxPrize: 39.9,
    qtdStorage: 86,
    qtdEssencial: 112
  },
  {
    id: 3,
    drugName: 'Reconcile',
    type: 'Antidepressivo',
    minPrize: 19.9,
    maxPrize: 32.9,
    qtdStorage: 9,
    qtdEssencial: 64
  },
  {
    id: 4,
    drugName: 'Simparic',
    type: 'Antipulga',
    minPrize: 57.23,
    maxPrize: 82.9,
    qtdStorage: 54,
    qtdEssencial: 79
  },
  {
    id: 5,
    drugName: 'Furanil',
    type: 'Antiséptico',
    minPrize: 19.9,
    maxPrize: 32.9,
    qtdStorage: 54,
    qtdEssencial: 79
  },
  {
    id: 6,
    drugName: 'Drontal',
    type: 'Vermifugo',
    minPrize: 19.9,
    maxPrize: 32.9,
    qtdStorage: 54,
    qtdEssencial: 79
  },
  {
    id: 7,
    drugName: 'Glicopan',
    type: 'Vitamina',
    minPrize: 19.9,
    maxPrize: 32.9,
    qtdStorage: 54,
    qtdEssencial: 79
  }
];

export default data;
