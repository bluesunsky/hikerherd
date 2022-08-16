import { resolver } from "blitz";

import db from "db";

import changeCoverSchema from "../schemas/change-cover-schema";

const changeCoverMutation = resolver.pipe(
  resolver.zod(changeCoverSchema),
  resolver.authorize(),

  async ({ publicId, version }, ctx) => {
    return await db.user.update({
      where: { id: ctx.session.userId },
      data: {
        cover_id: publicId,
        cover_version: version,
      },
    });
  }
);

export default changeCoverMutation;
