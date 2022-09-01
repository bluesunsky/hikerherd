import { resolver } from "blitz";

import db from "db";

const currentUserQuery = resolver.pipe(async (_, ctx) => {
  if (!ctx.session || !ctx.session.userId) return null;

  const user = await db.user.findFirst({
    where: { id: ctx.session.userId },
    select: {
      id: true,
      username: true,
      firstname: true,
      lastname: true,
      email: true,
      role: true,
      avatar_id: true,
      avatar_version: true,
      cover_id: true,
      cover_version: true,
      weightUnit: true,
      currency: true,
      language: true,
    },
  });

  return user;
});

export default currentUserQuery;
