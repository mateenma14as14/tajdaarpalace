/**
 * Placeholder photography.
 *
 * All images are free-to-use Unsplash photos, loaded straight from their CDN
 * so there is nothing to download or license. To swap in your own pictures,
 * drop the files into /public/images and replace the values below with e.g.
 * "/images/hero.jpg" — nothing else in the app needs to change.
 */

const UNSPLASH = "https://images.unsplash.com/photo-";

/**
 * Build a sized, cropped Unsplash URL from a photo id.
 *
 * Anything that already looks like a path or URL is returned untouched, so you
 * can move to your own photographs one at a time: replace an id below with
 * "/images/grand-hall.jpg" and it will just work.
 */
export function img(id, width = 1200, height = 800, quality = 72) {
  if (!id) return "";
  if (id.startsWith("/") || id.startsWith("http") || id.startsWith("data:")) return id;
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&h=${height}&q=${quality}`;
}

/** Named photos used across the site. */
export const PHOTO = {
  heroHall: "1519225421980-715cb0215aed",
  heroCouple: "1519741497674-611481863552",
  heroTable: "1520854221256-17451cc331bf",

  aboutStory: "1511285560929-80b456fea0bc",
  aboutDetail: "1465495976277-4387d4b0b4c6",

  serviceWedding: "1519741497674-611481863552",
  serviceCatering: "1555244162-803834f70033",
  serviceDecor: "1478146896981-b80fe463b330",
  serviceCorporate: "1540575467063-178a50c2df87",
  serviceBirthday: "1464349095431-e9a21285b5f3",
  servicePhotography: "1516450360452-9312f5e86fc7",

  hallGrand: "1519225421980-715cb0215aed",
  hallGarden: "1470337458703-46ad1756a187",
  hallRoyal: "1511285560929-80b456fea0bc",
};

/** Pool of verified photo ids used for galleries and project covers. */
export const PHOTO_POOL = [
  "1519741497674-611481863552",
  "1464366400600-7168b8af9bc3",
  "1519225421980-715cb0215aed",
  "1511285560929-80b456fea0bc",
  "1520854221256-17451cc331bf",
  "1465495976277-4387d4b0b4c6",
  "1522673607200-164d1b6ce486",
  "1478146896981-b80fe463b330",
  "1583939003579-730e3918a45a",
  "1511578314322-379afb476865",
  "1492684223066-81342ee5ff30",
  "1530103862676-de8c9debad1d",
  "1555244162-803834f70033",
  "1414235077428-338989a2e8c0",
  "1546069901-ba9599a7e63c",
  "1540575467063-178a50c2df87",
  "1497366754035-f200968a6e72",
  "1519671482749-fd09be7ccebf",
  "1464349095431-e9a21285b5f3",
  "1511795409834-ef04bbd61622",
  "1469371670807-013ccf25f16a",
  "1470337458703-46ad1756a187",
  "1507504031003-b417219a0fde",
  "1513151233558-d860c5398176",
  "1478147427282-58a87a120781",
  "1515934751635-c81c6bc9a2d8",
  "1501281668745-f7f57925c3b4",
  "1519744792095-2f2205e87b6f",
  "1516450360452-9312f5e86fc7",
  "1550005809-91ad75fb315f",
  "1533090161767-e6ffed986c88",
  "1487530811176-3780de880c2d",
  "1528605248644-14dd04022da1",
  "1470753937643-efeb931202a9",
  "1600891964092-4316c288032e",
  "1517248135467-4c7edcad34c4",
  "1523438885200-e635ba2c371e",
];
