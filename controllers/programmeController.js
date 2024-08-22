const path = require("path");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Programme = require("../models/Programme");


// @desc  Get all programmes
//@route  GET /api/programmes
//access  Public
exports.getProgrammes = asyncHandler(async (req, res, next) => {
    const programmes = await Programme.find();

    res.status(200).json(res.advancedResults);
})


//@desc   Get single programme
//@route  GET /api/programmes/:id
//access  Public
exports.getProgramme = asyncHandler(async (req, res, next) => {
    const programme = await Programme.findById(req.params.id);
    if(!programme){
        return next(new ErrorResponse(`Programme not found with id of ${req.params.id}`, 404
            ));
        }

        res.status(200).json({ success: true, data: programme });
})



//@desc   Create new programme
//@route  POST /api/programmes/:id
//access  Private
exports.createProgramme = asyncHandler(async (req, res, next) => {
       // Add user to req.body
       req.body.user = req.user.id;

    const programme = await Programme.create(req.body);
    
    res.status(201).json({ success: true, data: programme });
})


//@desc   Update programme
//@route  PUT /api/programmes/:id
//access  Private
exports.updateProgramme = asyncHandler(async (req, res, next) => {
    let programme = await Programme.findById(req.params.id);

    if(!programme){
        return next(new ErrorResponse(`Programme not found with id of ${req.params.id}`, 404
            ));
            }

           programme = await Programme.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
              })

              res.status(200).json({ success: true, data: programme });
})


//@desc   Delete programme
//@route  DELETE /api/programmes/:id
//access  Private
exports.deleteProgramme = asyncHandler(async (req, res, next) => {
    const programme = await Programme.findById(req.params.id);

    if (!programme) {
        return next(
          new ErrorResponse(
            `Programme not found with the id of ${req.params.id}`,
            404
          )
        );
      }

      programme.deleteOne();

      res.status(200).json({ success: true, data: {} });
})


// @desc      Upload photo for programme
// @route     PUT /api/programmes/:id/photo
// @access    Private
exports.programmePhotoUpload = asyncHandler(async (req, res, next) => {
    const programme = await Programme.findById(req.params.id);

    if (!programme) {
        return next(new ErrorResponse(`Programme not found with id of ${req.params.id}`, 404
            ));
            }

            // Check if file is provided
            if (!req.files) {
                return next(new ErrorResponse(`Please upload a file`, 400));
                }

                const file = req.files.file;

                //Make sure the image is a photo
                if (!file.mimetype.startsWith('image')) {
                    return next(new ErrorResponse('Please upload an image file', 400));
                    }

                    //Check filesize
                    if (file.size > process.env.MAX_FILE_UPLOAD) {
                        return next(new ErrorResponse(`Please upload an image that is less than ${process.env.MAX_FILE_UPLOAD}`, 400
                            ));
                            }
                            //Create custom filename
                            filename = `photo_${programme._id}${path.parse(file.name).ext}`;

                            file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
                                if (err) {
                                  console.error(err);
                                  return next(new ErrorResponse(`Problem with file upload`, 500));
                                }

                                await Programme.findByIdAndUpdate(req.params.id, {photo:
                                    filename
                                });

                                res.status(200).json({
                                    success: true,
                                    data: file.name
                                  });
                                });

})