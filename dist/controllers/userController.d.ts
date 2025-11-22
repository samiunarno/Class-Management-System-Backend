import { Request, Response } from 'express';
export declare const getAllUsers: (req: Request, res: Response) => Promise<void>;
export declare const getPendingUsers: (req: Request, res: Response) => Promise<void>;
export declare const approveUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateUserRole: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAdminStats: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map