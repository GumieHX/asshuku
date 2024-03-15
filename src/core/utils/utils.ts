export function file2Base64Url (file : File) : Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const fileReader : FileReader = new FileReader();

        fileReader.onload = function() {
            if (fileReader.result && typeof fileReader.result == "string") resolve(fileReader.result);
        }

        fileReader.onerror = function(e) {
            reject(e);
        }

        fileReader.readAsDataURL(file);
    })
}

export function base64Url2Image (base64Url : string) : Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const image : HTMLImageElement = new Image();
        image.onload = () => resolve(image);
        image.src = base64Url;
    });
}

export function canvas2File (canvas: HTMLCanvasElement, type: string, quality: number) : Promise<Blob> {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob as Blob), type, quality);
    })
}

export function quality2Bit (quality: number) : number {
    const bit : number = (quality > 100 || quality <= 0) ? 0 : quality * 0.01 * 256;

    return bit;
}