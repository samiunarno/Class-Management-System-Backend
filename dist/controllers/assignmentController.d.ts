import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
export declare const createAssignment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllAssignments: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAssignmentById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateAssignment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteAssignment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMonitorStats: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getStudentStats: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=assignmentController.d.ts.map