/* Локальная копия каталога. Используется, пока не подключён Sanity
   (см. lib/catalog.js и README). Порядок массива = порядок вывода. */

export const CATEGORIES = [
  { id: "giants", title: "Букеты-гиганты", note: "то, с чего всё началось" },
  { id: "boxes", title: "Коробки и композиции", note: "от 12 000 ₽" },
  { id: "round", title: "Круглые букеты", note: "около 10 000 ₽" },
  { id: "b6000", title: "Букеты 6 000 – 8 500 ₽", note: "" },
  { id: "b4000", title: "Букеты 4 000 – 5 000 ₽", note: "" },
  { id: "b3000", title: "Букеты 3 000 – 4 000 ₽", note: "" },
  { id: "b2000", title: "Букеты 2 000 – 3 000 ₽", note: "" },
  { id: "balloons", title: "Фонтаны из гелиевых шаров", note: "" },
];

export const PRODUCTS = [
  // Букеты-гиганты
  { id: "g-1", category: "giants", title: "Букет сердце", price: 27000, shape: 4, hue: 350 },
  { id: "g-2", category: "giants", title: "Букет из роз", price: 17000, shape: 1, hue: 348 },
  { id: "g-3", category: "giants", title: "Букет с гортензиями", price: 13950, shape: 2, hue: 268 },
  { id: "g-4", category: "giants", title: "Букет", price: 9250, shape: 3, hue: 316 },
  { id: "g-5", category: "giants", title: "Сборный букет", price: 8500, shape: 1, hue: 332 },

  // Коробки и композиции
  { id: "bx-1", category: "boxes", title: "Сборная коробка-гигант", price: 30000, shape: 4, hue: 300 },
  { id: "bx-2", category: "boxes", title: "Сборная коробка-гигант, вариант II", price: 30000, shape: 4, hue: 340 },
  { id: "bx-3", category: "boxes", title: "Композиция из французских роз", price: 20000, shape: 1, hue: 356 },
  { id: "bx-4", category: "boxes", title: "Коробка сборная", price: 20000, shape: 2, hue: 288 },
  { id: "bx-5", category: "boxes", title: "Композиция из 51 пионовидной розы", price: 17000, shape: 1, hue: 344 },
  { id: "bx-6", category: "boxes", title: "Коробка из хризантем", price: 12000, shape: 3, hue: 84 },

  // Круглые букеты
  { id: "r-1", category: "round", title: "Букет с гортензиями", price: 13950, shape: 2, hue: 262 },
  { id: "r-2", category: "round", title: "Букет-гигант из гортензий", price: 13500, shape: 2, hue: 272 },
  { id: "r-3", category: "round", title: "Букет из роз", price: 13500, shape: 1, hue: 352 },
  { id: "r-4", category: "round", title: "Букет сборный круглый", price: 10500, shape: 3, hue: 320 },
  { id: "r-5", category: "round", title: "Розовые розы, 39 шт", price: 10300, shape: 1, hue: 338 },
  { id: "r-6", category: "round", title: "«Любовь»", price: 8700, shape: 4, hue: 358 },

  // 6 000 – 8 500 ₽
  { id: "s6-1", category: "b6000", title: "Букеты из французской вывернутой розы", price: 8500, shape: 1, hue: 354 },
  { id: "s6-2", category: "b6000", title: "Сборный букет", price: 8500, shape: 3, hue: 312 },
  { id: "s6-3", category: "b6000", title: "Букет", price: 7800, shape: 2, hue: 296 },
  { id: "s6-4", category: "b6000", title: "«Нежность весны»", price: 7150, shape: 4, hue: 328 },
  { id: "s6-5", category: "b6000", title: "Букет из пионовидной розы", price: 6200, shape: 1, hue: 346 },
  { id: "s6-6", category: "b6000", title: "Сборный яркий букет", price: 6200, shape: 3, hue: 24 },
  { id: "s6-7", category: "b6000", title: "Букет из пионовидных роз", price: 6100, shape: 1, hue: 340 },
  { id: "s6-8", category: "b6000", title: "Букет сборный", price: 6000, shape: 3, hue: 306 },

  // 4 000 – 5 000 ₽
  { id: "s4-1", category: "b4000", title: "Розы", price: 4400, shape: 1, hue: 350 },
  { id: "s4-2", category: "b4000", title: "Букет сборный", price: 4300, shape: 3, hue: 318 },
  { id: "s4-3", category: "b4000", title: "Сборный букет", price: 4250, shape: 3, hue: 300 },
  { id: "s4-4", category: "b4000", title: "Букет сборный", price: 4200, shape: 3, hue: 330 },
  { id: "s4-5", category: "b4000", title: "Букет", price: 4200, shape: 2, hue: 284 },
  { id: "s4-6", category: "b4000", title: "Букет из кенийской розы", price: 4200, shape: 1, hue: 12 },
  { id: "s4-7", category: "b4000", title: "Букет", price: 4100, shape: 2, hue: 292 },
  { id: "s4-8", category: "b4000", title: "Букет сборный в белом оформлении", price: 4100, shape: 4, hue: 96 },

  // 3 000 – 4 000 ₽
  { id: "s3-1", category: "b3000", title: "Букет из роз", price: 3950, shape: 1, hue: 344 },
  { id: "s3-2", category: "b3000", title: "«С заботой»", price: 3950, shape: 4, hue: 310 },
  { id: "s3-3", category: "b3000", title: "Сборный букет", price: 3850, shape: 3, hue: 322 },
  { id: "s3-4", category: "b3000", title: "Букет сборный", price: 3650, shape: 3, hue: 298 },
  { id: "s3-5", category: "b3000", title: "Букет сборный", price: 3600, shape: 3, hue: 336 },
  { id: "s3-6", category: "b3000", title: "Забота", price: 3500, shape: 4, hue: 276 },
  { id: "s3-7", category: "b3000", title: "Букет", price: 3350, shape: 2, hue: 288 },
  { id: "s3-8", category: "b3000", title: "Букет сборный", price: 3350, shape: 3, hue: 316 },
  { id: "s3-9", category: "b3000", title: "Сборная композиция", price: 3100, shape: 2, hue: 302 },
  { id: "s3-10", category: "b3000", title: "Сборный букет", price: 3000, shape: 3, hue: 326 },

  // 2 000 – 3 000 ₽
  { id: "s2-1", category: "b2000", title: "Сборный букет", price: 3000, shape: 3, hue: 320 },
  { id: "s2-2", category: "b2000", title: "«Внимание»", price: 2950, shape: 4, hue: 306 },
  { id: "s2-3", category: "b2000", title: "Сборная композиция", price: 2900, shape: 2, hue: 294 },
  { id: "s2-4", category: "b2000", title: "Сборный букет", price: 2900, shape: 3, hue: 334 },
  { id: "s2-5", category: "b2000", title: "Букет из хризантем", price: 2600, shape: 3, hue: 88 },
  { id: "s2-6", category: "b2000", title: "Очарование", price: 2600, shape: 4, hue: 312 },

  // Шары
  { id: "bl-1", category: "balloons", title: "Гелиевые шары", price: 3800, shape: 5, hue: 300 },
  { id: "bl-2", category: "balloons", title: "Фонтан №16", price: 3300, shape: 5, hue: 200 },
  { id: "bl-3", category: "balloons", title: "Фонтан №19", price: 2050, shape: 5, hue: 344 },
  { id: "bl-4", category: "balloons", title: "Фонтан №17", price: 1750, shape: 5, hue: 60 },
];
