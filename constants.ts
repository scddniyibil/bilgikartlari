import { Card, Category } from './types';

export const CATEGORIES: Category[] = [
  'Favoriler',
  'Tarih',
  'Coğrafya',
  'Vatandaşlık',
  'Güncel Bilgiler',
  'Spor',
  'Sinema',
  'Bilim',
  'Teknoloji',
  'Edebiyat',
  'Sanat'
];

export const INITIAL_CARDS: Card[] = [
  {
    id: '1',
    category: 'Tarih',
    text: 'Türkiye Cumhuriyeti\'nin ilk cumhurbaşkanı kimdir?',
    imageUrl: 'https://picsum.photos/seed/ataturk/400/200',
    backgroundColor: '#ffffff'
  },
  {
    id: '2',
    category: 'Coğrafya',
    text: 'Türkiye\'nin en yüksek dağı hangisidir?',
    backgroundColor: '#e0f2fe'
  },
  {
    id: '3',
    category: 'Vatandaşlık',
    text: 'Türkiye Büyük Millet Meclisi (TBMM) kaç milletvekilinden oluşur?',
    backgroundColor: '#ede9fe'
  },
  {
    id: '4',
    category: 'Güncel Bilgiler',
    text: '2023 yılında Nobel Edebiyat Ödülü\'nü kim kazanmıştır?',
    backgroundColor: '#fef3c7'
  },
  {
    id: '5',
    category: 'Spor',
    text: '2022 FIFA Dünya Kupası\'nı hangi ülke kazanmıştır?',
    imageUrl: 'https://picsum.photos/seed/football/400/200',
    backgroundColor: '#ffffff'
  },
  {
    id: '6',
    category: 'Sinema',
    text: '"Bir Zamanlar Anadolu\'da" filminin yönetmeni kimdir?',
    backgroundColor: '#d1fae5'
  },
  {
    id: '7',
    category: 'Bilim',
    text: 'DNA\'nın yapısını keşfeden bilim insanları kimlerdir?',
    imageUrl: 'https://picsum.photos/seed/dna/400/200',
    backgroundColor: '#ffffff'
  },
  {
    id: '8',
    category: 'Teknoloji',
    text: 'Türkiye\'nin ilk yerli otomobilinin adı nedir?',
    backgroundColor: '#fee2e2'
  },
    {
    id: '9',
    category: 'Tarih',
    text: 'İstanbul\'un Fethi hangi tarihte gerçekleşmiştir?',
    backgroundColor: '#fce7f3'
  },
  {
    id: '10',
    category: 'Coğrafya',
    text: 'Türkiye\'nin en büyük gölü hangisidir?',
    imageUrl: 'https://picsum.photos/seed/lake/400/200',
    backgroundColor: '#ffffff'
  }
];
