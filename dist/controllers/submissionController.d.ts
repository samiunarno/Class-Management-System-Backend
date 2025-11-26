import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.js";
export declare const submitAssignment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAssignmentSubmissions: (req: Request, res: Response) => Promise<void>;
export declare const getAllSubmissions: (_req: Request, res: Response) => Promise<void>;
export declare const deleteSubmission: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=submissionController.d.ts.map