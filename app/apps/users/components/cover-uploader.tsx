import type { FC } from "react";

import { useState } from "react";
import { invalidateQuery, useMutation } from "blitz";

import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/react";

import uploadImageToCloudinary from "app/apps/core/helpers/upload-image-to-cloudinary";

import useCurrentUser from "../hooks/use-current-user";
import changeCoverMutation from "../mutations/change-cover-mutation";
import userQuery from "../queries/user-query";
import currentUserQuery from "../queries/current-user-query";

const CoverUploader: FC = () => {
  const currentUser = useCurrentUser();
  const [changeCover] = useMutation(changeCoverMutation);
  const toast = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 3145728,
    onDrop: async (files) => {
      setLoading(true);

      if (currentUser) {
        const file = files[0];

        if (file) {
          try {
            const data = await uploadImageToCloudinary(file, {
              folder: "covers",
              filename: currentUser.username,
            });

            await changeCover(data);

            invalidateQuery(userQuery, { username: currentUser.username });
            invalidateQuery(currentUserQuery);

            toast({
              title: t(
                "ChangeCoverSuccess",
                "Your cover was changed successfully"
              ),
              status: "success",
            });
          } catch (error) {
            toast({
              title: t(
                "ChangeCoverError",
                "Oops, there was a problem changing your cover"
              ),
              status: "error",
            });
          }
        }
      }

      setLoading(false);
    },
  });

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      <Button isLoading={loading} size="sm">
        {t("ChangeCover", "Change cover")}
      </Button>
    </Box>
  );
};

export default CoverUploader;
