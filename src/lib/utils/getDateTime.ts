import moment from 'moment';

// interface GetDate {
//     (date: string): string;
// }

export const getMonthYear = (date: Date) =>{                 
    return `${moment(date).format('Y')}-${moment(date).format('M')}`
}







