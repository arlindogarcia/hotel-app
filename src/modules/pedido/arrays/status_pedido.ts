export const getStatusPedido = (status: number | null) => {
  const array = [
    {
      value: 0,
      label: 'Nenhum',
    },
    {
      value: 1,
      label: 'Em preparação',
    },
    {
      value: 2,
      label: 'Pedido enviado',
    },
    {
      value: 3,
      label: 'Pedido entregue',
    },
  ]

  if (status === null) {
    return array;
  }

  return array[status]?.label || '';
}