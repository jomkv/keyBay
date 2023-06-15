const sharp = require('sharp')

async function isImgValid(file, minHeight, minWidth) {
    try {
        const metadata = await sharp(file.buffer).metadata()
        const { width, height } = metadata

        if (width >= minWidth && height >= minHeight )
        {
            return true
        }
        else 
        {
            return false
        }
    } catch(error) {
        console.log("Problem validating img")
    }
}

async function cropImage(imageBuffer)
{
    try{
        const croppedBuffer = await sharp(imageBuffer)
            .resize(500, 500, {fit: 'cover'})
            .toBuffer()

        return croppedBuffer
    } catch(error) {
        console.log("Problem cropping image")
    }
}

module.exports = {isImgValid, cropImage}