import fse from "fs-extra"
import imagemin from "imagemin"
import imageminJpegtran from "imagemin-jpegtran"
import imageminSvgo from "imagemin-svgo"
import imageminGifsicle from "imagemin-gifsicle"
import imageminWebp from "imagemin-webp"
import sharp from "sharp"
import imageminPngquant from "imagemin-pngquant"

let inputFolder ="src";
let outputFolder="opt";
let targetWidth =1920;

const proccesImg =async()=>{
    try {
        const files = await fse.readdir(inputFolder);
        for (const file of files) {
            let inputPath =`${inputFolder}/${file}`
            let outputPath =`${outputFolder}/${file}`
            await sharp(inputPath).resize(targetWidth).toFile(outputPath)
            await imagemin([outputPath],{
                destination:outputFolder,
                plugins:[
                    imageminJpegtran({quality: 80}),
                    imageminPngquant(),
                    imageminSvgo(),
                    imageminWebp({quality: 80}),
                    imageminGifsicle(),
                ],
            });
            console.log(`se ah optimizado la imagen ${file}`)
        }
        console.log("se ah terminado la optimizacion de tus imagenes")
    } catch (err) {
        console.error(err)
    }
}

proccesImg();

