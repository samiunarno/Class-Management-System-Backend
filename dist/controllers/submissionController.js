import Assignment from '../models/Assignment.js';
import Submission from '../models/Submission.js';
import { validatePdfFile } from '../utils/validateFile.js';
import { isDeadlinePassed } from '../utils/validateDeadline.js';
import { uploadToCloudinary } from '../services/cloudinaryService.js';
import { TextDecoder } from 'util';
// 🔥 Fix mojibake from multer
const decodeFilename = (name) => {
    const bytes = Buffer.from(name, 'binary');
    return new TextDecoder('utf-8').decode(bytes);
};
export const submitAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;
        if (!file)
            return res.status(400).json({ message: 'No file uploaded' });
        // Decode original filename
        const decodedName = decodeFilename(file.originalname)
            .trim()
            .normalize('NFKC');
        file.originalname = decodedName;
        // Validate PDF
        const fileValidation = validatePdfFile(file);
        if (!fileValidation.valid)
            return res.status(400).json({ message: fileValidation.error });
        // Check assignment exists
        const assignment = await Assignment.findById(id);
        if (!assignment)
            return res.status(404).json({ message: 'Assignment not found' });
        // Check if the submission deadline has passed
        if (isDeadlinePassed(assignment.deadline))
            return res.status(400).json({ message: 'Submission deadline has passed' });
        // Check for existing submission
        const existingSubmission = await Submission.findOne({
            assignmentId: id,
            studentId: req.user._id,
        });
        if (existingSubmission)
            return res.status(400).json({ message: 'Assignment already submitted' });
        // -----------------------------------------
        // 🔥 Cloudinary Upload
        // -----------------------------------------
        let cloudinaryResult;
        try {
            console.log('🚀 Starting file upload process...', {
                assignmentId: id,
                filename: file.originalname,
                studentId: req.user._id
            });
            cloudinaryResult = await uploadToCloudinary(file);
            console.log('🎉 Cloudinary upload completed:', {
                url: cloudinaryResult.url,
                publicId: cloudinaryResult.publicId
            });
        }
        catch (uploadError) {
            console.error('💥 Cloudinary upload failed:', {
                errorName: uploadError.name,
                errorMessage: uploadError.message,
                errorCode: uploadError.http_code,
                stack: uploadError.stack
            });
            // Better error messages
            if (uploadError.message.includes('Missing Cloudinary environment variables')) {
                return res.status(500).json({
                    message: 'Server configuration error. Please contact administrator.'
                });
            }
            else if (uploadError.http_code === 401) {
                return res.status(500).json({
                    message: 'Upload service authentication failed.'
                });
            }
            else if (uploadError.http_code === 400) {
                return res.status(500).json({
                    message: 'Invalid file format or size.'
                });
            }
            else {
                return res.status(500).json({
                    message: `Upload failed: ${uploadError.message}`
                });
            }
        }
        // -----------------------------------------
        // 🔥 Save Submission (No Email)
        // -----------------------------------------
        const submission = new Submission({
            assignmentId: id,
            studentId: req.user._id,
            filename: file.originalname,
            cloudinaryUrl: cloudinaryResult.url,
            cloudinaryPublicId: cloudinaryResult.publicId,
        });
        await submission.save();
        return res.status(201).json({
            message: 'Assignment submitted successfully',
            submission: {
                id: submission._id,
                filename: submission.filename,
                uploadedAt: submission.uploadedAt,
                cloudinaryUrl: submission.cloudinaryUrl,
                cloudinaryPublicId: submission.cloudinaryPublicId,
            },
        });
    }
    catch (error) {
        console.error('Submission error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
// ------------------------------------------------------------
// VIEW SUBMISSIONS
// ------------------------------------------------------------
export const getAssignmentSubmissions = async (req, res) => {
    try {
        const { id } = req.params;
        const submissions = await Submission.find({ assignmentId: id })
            .populate('studentId', 'name email')
            .populate('assignmentId', 'title')
            .sort({ uploadedAt: -1 });
        res.json(submissions);
    }
    catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const getAllSubmissions = async (_req, res) => {
    try {
        const submissions = await Submission.find()
            .populate('studentId', 'name email')
            .populate('assignmentId', 'title')
            .sort({ uploadedAt: -1 });
        res.json(submissions);
    }
    catch (error) {
        console.error('Error fetching all submissions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
// ------------------------------------------------------------
// DELETE SUBMISSION
// ------------------------------------------------------------
export const deleteSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Submission.findById(id);
        if (!submission)
            return res.status(404).json({ message: 'Submission not found' });
        // Delete submission from database
        await Submission.findByIdAndDelete(id);
        return res.json({ message: 'Submission deleted successfully' });
    }
    catch (error) {
        console.error('Delete submission error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
//# sourceMappingURL=submissionController.js.map