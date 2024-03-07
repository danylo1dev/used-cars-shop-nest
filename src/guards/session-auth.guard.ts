import { CanActivate, ExecutionContext } from "@nestjs/common";

export class SessionAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (req.session) return req.session.userId;
    return false;
  }
}
