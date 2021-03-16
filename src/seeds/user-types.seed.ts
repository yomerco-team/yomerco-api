import { Connection } from 'typeorm';
import { UserType } from '../modules/user-types/user-type.entity';

export const UserTypeFactory = {
  build: (connection: Connection): UserType[] => {
    const items = [
      {
        name: 'Customer',
        code: '01C'
      },
      {
        name: 'Farmer',
        code: '02F'
      }
    ];

    return items.map(item => connection.getRepository(UserType).create({
      name: item.name,
      code: item.code
    }));
  },

  handle: async (connection: Connection): Promise<void> => {
    const items = UserTypeFactory.build(connection);

    for (const item of items) {
      const found = await connection.getRepository(UserType).createQueryBuilder('t')
        .where('t.code = :code', { code: item.code })
        .getOne();

      let itemToHandle;

      if (found) {
        itemToHandle = await connection.getRepository(UserType).preload({
          id: found.id,
          ...item
        });
      } else itemToHandle = item;

      await connection.getRepository(UserType).save(itemToHandle);
    }
  },

  entity: UserType
};
