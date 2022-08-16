import type { User } from "@prisma/client";

import cloudinaryClient from "integrations/cloudinary-client";

const getCoverUrl = (
  user: Pick<User, "cover_id" | "cover_version"> | null | undefined,
  size: number
) => {
  if (!user?.cover_id) return "";

  const version = user.cover_version ? `${user.cover_version}` : undefined;

  return cloudinaryClient.url(user.cover_id, {
    width: size,
    crop: "fill",
    gravity: "face",
    version,
  });
};

export default getCoverUrl;
