import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.js';
export declare const authorize: (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=role.d.ts.map