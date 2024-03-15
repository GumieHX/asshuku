export interface AsshukuOptions {
    // compress quality 1 ~ 100
    quality : number;
    // mult compress options
    multAsshukuOptions ?: MultAsshukuOptions;
}

export interface MultAsshukuOptions {
    // target size
    targetSize : number;
    // max retry num
    maxRetryNum : number;
    // quality change function
    qualityChangeFn ?: (quality : number) => number;
}