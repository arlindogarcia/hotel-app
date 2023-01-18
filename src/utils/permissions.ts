export const getPermissionsSistema = (permissoes: string | undefined, permissao = "") => {
  if (!permissoes) {
    return false;
  }

  const arrayPermissions = permissoes.split(',');

  if (!permissao) {
    return arrayPermissions.some((i) => i == 'AdminGeral');
  }

  return arrayPermissions.some((i) => i == permissao) || arrayPermissions.some((i) => i == 'AdminGeral');
}