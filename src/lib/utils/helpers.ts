export const shuffleArray = (array:object[]) => array.map((el:any) =>el.url).sort(() => Math.random() - 0.5);


export const getArray = (arr:object):object=>{
    return Object.entries(arr).map((el) =>{return el[1]});
}