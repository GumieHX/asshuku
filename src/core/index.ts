import { AsshukuOptions } from "./types/index";
import Asshuku from "./asshuku/asshuku";

export async function asshukuImage(file: File, options : AsshukuOptions = { quality : 80 }): Promise<File> {

    if (Object.hasOwnProperty.call(options, 'multAsshukuOptions') && 
        !(Object.hasOwnProperty.call(options.multAsshukuOptions, 'targetSize') && Object.hasOwnProperty.call(options.multAsshukuOptions, 'maxRetryNum'))
    ) {
        throw Error(`[Asshuku Error] If you set parameter multAsshukuOptions, its sub parameters targetSize and maxRetryNum are required.`);
    }

    const asshuku : Asshuku = new Asshuku(options);

    return await asshuku.imageAsshuku(file);
}