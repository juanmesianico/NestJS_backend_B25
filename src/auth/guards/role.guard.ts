import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const roles: string[] = this.reflector.get<string[]>('role', context.getHandler()); //acá me estoy trayendo la lista de todos los roles. 

    if(!roles){
      return true;
    }

    const request = context.switchToHttp().getRequest(); //traigase la actual solicitud
    const { user } = request; //busqueme en la solicitud el atributo user

    const authRole = roles.includes(user.role); //la lista de roles contiene un rol como el que tiene el usuario?

    return user && authRole; //si encuentra un usuario y el resultado de authRole es true, dejelo pasar
  }
}
