export const shuffleArray = (array:object[]) => array.map((el:any) =>el.url).sort(() => Math.random() - 0.5);
