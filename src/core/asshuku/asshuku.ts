import type { AsshukuOptions } from "../types";
import UPNG from "../utils/UPNG.js";

import { file2Base64Url, base64Url2Image, canvas2File, quality2Bit } from '../utils/utils';

class Asshuku {

    options : AsshukuOptions = {
        quality : 80
    }

    constructor(options : AsshukuOptions) {

        if (Object.hasOwnProperty.call(options, 'multAsshukuOptions')) {

            if (Object.hasOwnProperty.call(options.multAsshukuOptions, 'qualityChangeFn')) {
                if(typeof options.multAsshukuOptions!.qualityChangeFn!(100) !== 'number') {
                    throw new Error("[Asshuku Error] The function qualityChangeFn needs to return a value of type Number.")
                }                
            } else {
                options.multAsshukuOptions!.qualityChangeFn = (quality) => quality / 2;
            }
        }

        Object.assign(this.options, options);
    }

    async imageAsshuku(file : File) : Promise<File> {
        // -----------  Parameter check start -----------
        if(!file) throw new Error("[Asshuku Error] Parameter file can't be null.");

        if(!this.isImageFile(file)) throw new Error("[Asshuku Error] Parameter file must be a Image File.");

        if(Object.hasOwnProperty.call(this.options, 'multAsshukuOptions') && file.size < this.options.multAsshukuOptions!.targetSize) return file;
        // -----------  Parameter check end -----------

        try {
            // create canvas element
            const canvas : HTMLCanvasElement = document.createElement("canvas");
            // change file to base64 Data Url
            const base64Url : string = await file2Base64Url(file);
            // change base64 Data Url to Image Element
            const image : HTMLImageElement = await base64Url2Image(base64Url);

            canvas.width = image.width;
            canvas.height = image.height;

            const context = canvas.getContext("2d") as CanvasRenderingContext2D;

            context.clearRect(0, 0, image.width, image.height);
            context.drawImage(image, 0, 0, image.width, image.height);

            
            if (["image/jpeg", "image/jpg"].includes(file.type)) {
                // image type is jpeg or jpg, use canvas to compress

                let blob : Blob = await canvas2File(canvas, file.type, this.options.quality);

                /**
                 * Setup multAsshukuOptions during instantiation.
                 */
                if (Object.hasOwnProperty.call(this.options, 'multAsshukuOptions') && this.options.multAsshukuOptions!.targetSize < blob.size) {
                    let current_quality : number = this.options.multAsshukuOptions!.qualityChangeFn!(this.options.quality);
                    let retryCount : number = this.options.multAsshukuOptions!.maxRetryNum;

                    while(blob.size > this.options.multAsshukuOptions!.targetSize && retryCount > 0) {
                        blob = await canvas2File(canvas, file.type, current_quality);

                        current_quality = this.options.multAsshukuOptions!.qualityChangeFn!(current_quality) > 0 ? this.options.multAsshukuOptions!.qualityChangeFn!(current_quality) : 0;
                        retryCount--;
                    }
                }

                return new File([blob], file.name, { type: file.type });

            } else {
                // other type use upng to compress

                const imageData : Uint8ClampedArray = context.getImageData(0, 0, image.width, image.height).data;

                let png : ArrayBufferLike = UPNG.encode([imageData.buffer], image.width, image.height, quality2Bit(this.options.quality));
                let _file : File = new File([png], file.name, { type: file.type });

                /**
                 * Setup multAsshukuOptions during instantiation.
                 */

                if (Object.hasOwnProperty.call(this.options, 'multAsshukuOptions') && this.options.multAsshukuOptions!.targetSize < _file.size) {
                    let current_quality : number = this.options.multAsshukuOptions!.qualityChangeFn!(this.options.quality);
                    let retryCount : number = this.options.multAsshukuOptions!.maxRetryNum;

                    while(_file.size > this.options.multAsshukuOptions!.targetSize && retryCount > 0) {
                        png = UPNG.encode([imageData.buffer], image.width, image.height, quality2Bit(current_quality));
                        _file = new File([png], file.name, { type: file.type });

                        current_quality = this.options.multAsshukuOptions!.qualityChangeFn!(current_quality) > 0 ? this.options.multAsshukuOptions!.qualityChangeFn!(current_quality) : 0;
                        retryCount--;
                    }
                }
          
                return _file
            }
        } catch(e : any) {
            throw new Error(e);
        }
    }

    isImageFile(file : File) : boolean {
        return file.type.includes('image/');
    }
}

export default Asshuku;