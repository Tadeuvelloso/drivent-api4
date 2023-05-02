import { ApplicationError } from '@/protocols';

export function dontHavePermissionToAccess(): ApplicationError {
  return {
    name: "Don't have permission to access",
    message: 'Cannot list hotels!',
  };
}
