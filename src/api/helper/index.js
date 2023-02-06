export const get_day_between_2day = (d1, d2) => {
    let ms1 = d1.getTime();
    let ms2 = d2.getTime();
    return Math.ceil((ms2 - ms1) / (24*60*60*1000));
};