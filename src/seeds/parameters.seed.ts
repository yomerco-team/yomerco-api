import { Connection } from 'typeorm';
import { Parameter } from '../modules/parameters/parameter.entity';

export const ParameterFactory = {
  build: (connection: Connection): Parameter[] => {
    const items = [
      {
        name: 'DEFAULT_SUB_CATEGORY_NAME',
        value: 'Por Categorizar',
        description: 'default sub category'
      },
      {
        name: 'ACL_CUSTOMER_ROLE_CODE',
        value: '01C',
        description: 'customer role code in basic acl'
      }
    ];

    return items.map(item => connection.getRepository(Parameter).create({
      name: item.name,
      value: item.value,
      description: item.description || undefined
    }));
  },

  handle: async (connection: Connection): Promise<void> => {
    const items = ParameterFactory.build(connection);

    for (const item of items) {
      const found = await connection.getRepository(Parameter).createQueryBuilder('p')
        .where('p.name = :name', { name: item.name })
        .getOne();

      let itemToHandle;

      if (found) {
        itemToHandle = await connection.getRepository(Parameter).preload({
          id: found.id,
          ...item
        });
      } else itemToHandle = item;

      await connection.getRepository(Parameter).save(itemToHandle);
    }
  },

  entity: Parameter
};
