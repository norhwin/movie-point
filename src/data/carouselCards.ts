export interface CarouselCard{
  img: string
  nameFilm: string
  description: string
}

const poster = (seed: string) => `https://picsum.photos/seed/${seed}/300/450`

export const carouselCards: CarouselCard[] = [
  {
    img: poster('inception'),
    nameFilm: 'Начало',
    description: 'Вор, который крадёт секреты из снов, получает задание не украсть идею, а внедрить её.',
  },
  {
    img: poster('matrix'),
    nameFilm: 'Матрица',
    description: 'Хакер узнаёт, что привычный мир создан машинами, и присоединяется к восстанию.',
  },
  {
    img: poster('interstellar'),
    nameFilm: 'Интерстеллар',
    description: 'Экспедиция отправляется через червоточину искать новый дом для человечества.',
  },
  {
    img: poster('gladiator'),
    nameFilm: 'Гладиатор',
    description: 'Преданный римский полководец становится рабом и идёт на арену ради мести.',
  },
  {
    img: poster('fightclub'),
    nameFilm: 'Бойцовский клуб',
    description: 'Офисный работник и харизматичный незнакомец основывают подпольный клуб, который выходит из-под контроля.',
  },
  {
    img: poster('forrest'),
    nameFilm: 'Форрест Гамп',
    description: 'Простодушный парень случайно оказывается свидетелем главных событий американской истории.',
  },
  {
    img: poster('shawshank'),
    nameFilm: 'Побег из Шоушенка',
    description: 'Банкир, осуждённый за убийство, годами готовит побег и находит друга в тюрьме.',
  },
  {
    img: poster('spirited'),
    nameFilm: 'Унесённые призраками',
    description: 'Девочка попадает в мир духов и должна спасти родителей, превращённых в свиней.',
  },
  {
    img: poster('parasite'),
    nameFilm: 'Паразиты',
    description: 'Бедная семья по одному внедряется в дом богачей, и всё идёт не по плану.',
  },
  {
    img: poster('whiplash'),
    nameFilm: 'Одержимость',
    description: 'Молодой барабанщик готов на всё, чтобы угодить жёсткому и беспощадному преподавателю.',
  },
]