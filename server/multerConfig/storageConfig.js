const multer = require ('multer')

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
         const filename = `file-${Date.now()}-${file.originalname}`
         callback(null,filename)
    }
})

const fileFilter = (req, file, callback) => {
    // Check if the file is  PDF 
    if (
        file.mimetype === 'application/pdf'
    ) {
        callback(null, true); // Allow the file upload
    } else {
        callback(null, false); // Reject the file upload
        return callback(new Error('Only PDF  formats are allowed!'));
    }
};

// define upload

const upload = multer({
    storage,
    fileFilter
})

// export upload
module.exports = upload
